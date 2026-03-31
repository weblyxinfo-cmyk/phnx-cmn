"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Partner {
  id: number;
  name: string;
  url: string | null;
  logoUrl: string | null;
  color: string | null;
}

function SortablePartner({
  partner,
  onDelete,
  onLogoChange,
}: {
  partner: Partner;
  onDelete: (id: number) => void;
  onLogoChange: (id: number, file: File) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: partner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 px-3.5 py-3 border border-[#E8E6E2] bg-[#fafaf9]"
    >
      <span
        {...attributes}
        {...listeners}
        className="text-[#ccc] text-base cursor-grab active:cursor-grabbing"
      >
        ⠿
      </span>
      <div className="w-16 h-9 border border-[#E8E6E2] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-[30px] max-w-[58px] object-contain"
          />
        ) : (
          <span className="text-[8px] font-semibold tracking-[0.06em] uppercase text-[#aaa] text-center">
            {partner.name}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium">{partner.name}</div>
        <div className="text-[11px] text-[#bbb] mt-0.5">
          {partner.url || "Bez odkazu"}
        </div>
      </div>
      <label className="cursor-pointer text-[11px] text-[#555] border border-[#E8E6E2] px-2.5 py-1.5 bg-white whitespace-nowrap">
        {partner.logoUrl ? "↺ Logo" : "+ Logo"}
        <input
          type="file"
          accept=".png,.svg,.jpg,.webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0])
              onLogoChange(partner.id, e.target.files[0]);
          }}
        />
      </label>
      <button
        onClick={() => onDelete(partner.id)}
        className="text-[#ccc] cursor-pointer text-lg px-1 flex-shrink-0 hover:text-[#C8251E] transition-colors bg-transparent border-none"
        title="Odebrat"
      >
        ×
      </button>
    </div>
  );
}

export default function PartnerList({
  partners: initialPartners,
  onRefresh,
}: {
  partners: Partner[];
  onRefresh: () => void;
}) {
  const [partners, setPartners] = useState(initialPartners);
  const [saved, setSaved] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = partners.findIndex((p) => p.id === active.id);
    const newIndex = partners.findIndex((p) => p.id === over.id);
    const newOrder = arrayMove(partners, oldIndex, newIndex);
    setPartners(newOrder);
  }

  async function saveOrder() {
    const items = partners.map((p, i) => ({ id: p.id, position: i }));
    const res = await fetch("/api/partners/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Odebrat tohoto partnera?")) return;
    const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
      onRefresh();
    }
  }

  async function handleLogoChange(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!uploadRes.ok) return;
    const { url } = await uploadRes.json();

    const updateRes = await fetch(`/api/partners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logoUrl: url }),
    });
    if (updateRes.ok) {
      setPartners((prev) =>
        prev.map((p) => (p.id === id ? { ...p, logoUrl: url } : p))
      );
    }
  }

  // Sync with parent when initialPartners change
  if (initialPartners.length !== partners.length) {
    setPartners(initialPartners);
  }

  return (
    <div className="bg-white border border-[#E8E6E2] p-7">
      <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#555] mb-5 pb-3 border-b border-[#E8E6E2]">
        Aktuální klienti & partneři{" "}
        <span className="font-light text-[#bbb]">({partners.length})</span>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={partners.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {partners.map((partner) => (
              <SortablePartner
                key={partner.id}
                partner={partner}
                onDelete={handleDelete}
                onLogoChange={handleLogoChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="flex items-center mt-5">
        <button
          onClick={saveOrder}
          className="bg-[#111] text-white text-[11px] font-normal tracking-[0.08em] uppercase px-6 py-2.5 cursor-pointer hover:bg-[#C8251E] transition-colors"
        >
          Uložit pořadí
        </button>
        {saved && (
          <span className="text-xs text-[#4CAF50] ml-3">✓ Uloženo</span>
        )}
      </div>
    </div>
  );
}
