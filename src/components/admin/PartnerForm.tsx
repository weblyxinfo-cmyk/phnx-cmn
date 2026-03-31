"use client";

import { useState, useRef } from "react";

export default function PartnerForm({
  onAdded,
}: {
  onAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("Žádný soubor");
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!name.trim()) return;
    setSaving(true);

    let logoUrl: string | undefined;

    if (fileRef.current?.files?.[0]) {
      const formData = new FormData();
      formData.append("file", fileRef.current.files[0]);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        logoUrl = data.url;
      }
    }

    const res = await fetch("/api/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        url: url.trim() || undefined,
        logoUrl,
      }),
    });

    if (res.ok) {
      setName("");
      setUrl("");
      setFileName("Žádný soubor");
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      onAdded();
    }
    setSaving(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="bg-white border border-[#E8E6E2] p-7 mb-5">
      <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#555] mb-5 pb-3 border-b border-[#E8E6E2]">
        Přidat nového partnera / klienta
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-xs text-[#555] mb-1.5">
            Název firmy *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="např. Panasonic"
            className="w-full border border-[#E8E6E2] bg-white text-[13px] font-light text-[#111] px-3 py-2 outline-none focus:border-[#C8251E] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xs text-[#555] mb-1.5">
            Odkaz (web)
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://panasonic.com"
            className="w-full border border-[#E8E6E2] bg-white text-[13px] font-light text-[#111] px-3 py-2 outline-none focus:border-[#C8251E] transition-colors"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs text-[#555] mb-1.5">
          Logo (PNG / SVG s průhledným pozadím)
        </label>
        <label className="inline-flex items-center gap-2.5 cursor-pointer mt-1">
          <input
            ref={fileRef}
            type="file"
            accept=".png,.svg,.jpg,.webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="border border-[#E8E6E2] px-4 py-2 text-xs text-[#555] bg-[#fafaf9] cursor-pointer">
            Vybrat soubor
          </span>
          <span className="text-xs text-[#bbb]">{fileName}</span>
        </label>
        {preview && (
          <div className="mt-2.5">
            <img
              src={preview}
              alt="Preview"
              className="max-h-10 max-w-[120px] border border-[#E8E6E2] p-1.5 bg-white"
            />
          </div>
        )}
        <div className="text-[11px] text-[#bbb] mt-1.5">
          Doporučená výška: 40–60 px · Průhledné pozadí
        </div>
      </div>
      <div className="flex items-center mt-1">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-[#111] text-white text-[11px] font-normal tracking-[0.08em] uppercase px-6 py-2.5 cursor-pointer hover:bg-[#C8251E] transition-colors disabled:opacity-50"
        >
          {saving ? "Ukládám..." : "+ Přidat"}
        </button>
        {saved && (
          <span className="text-xs text-[#4CAF50] ml-3">✓ Přidáno</span>
        )}
      </div>
    </div>
  );
}
