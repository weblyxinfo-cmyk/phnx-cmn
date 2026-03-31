"use client";

import { useState } from "react";

const NAV_GROUPS = [
  {
    label: "Obsah",
    items: [
      { id: "logos", icon: "🏢", label: "Loga klientů" },
      { id: "contact", icon: "📍", label: "Kontakt" },
    ],
  },
  {
    label: "Nastavení",
    items: [{ id: "languages", icon: "🌐", label: "Jazyky" }],
  },
];

export default function AdminSidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside className="bg-[#1a1a1a] py-6 min-h-full">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-6">
          <div className="text-[9px] font-medium tracking-[0.16em] uppercase text-[#3a3a3a] px-5 pb-2">
            {group.label}
          </div>
          {group.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-light cursor-pointer border-l-2 transition-all ${
                active === item.id
                  ? "text-white border-l-[#C8251E] bg-[rgba(200,37,30,0.07)]"
                  : "text-[#777] border-l-transparent hover:text-[#ccc] hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-[15px] w-[18px] text-center">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}
