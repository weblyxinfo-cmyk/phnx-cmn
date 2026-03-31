"use client";

import { useState, useEffect } from "react";

const FIELDS = [
  { id: "company_name", label: "Název společnosti", type: "text" },
  { id: "building", label: "Poznámka k budově", type: "text" },
  { id: "street", label: "Ulice a číslo", type: "text" },
  { id: "city", label: "PSČ a město", type: "text" },
  { id: "phone", label: "Telefon", type: "tel" },
  { id: "email", label: "E-mail", type: "email" },
  { id: "ico", label: "IČO", type: "text" },
  { id: "registration", label: "Spisová značka", type: "text" },
];

const SOCIAL_FIELDS = [
  { id: "linkedin_url", label: "LinkedIn URL", type: "url" },
  { id: "instagram_url", label: "Instagram URL", type: "url" },
];

const DEFAULTS: Record<string, string> = {
  company_name: "Phoenix Communication a.s.",
  building: "Budova ČTK",
  street: "Opletalova 918/7",
  city: "110 00 Praha 1",
  phone: "+420 222 510 799",
  email: "praha@phoenixcom.cz",
  ico: "28976126",
  registration: "B 15636 vedená u Městského soudu v Praze",
};

export default function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setValues((prev) => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  if (loading) return <div className="text-sm text-[#999]">Načítám...</div>;

  return (
    <div>
      <div className="text-[22px] font-medium mb-1.5">Kontakt & adresa</div>
      <div className="text-[13px] text-[#999] mb-8 leading-relaxed">
        Údaje zobrazené v kontaktní sekci webu.
      </div>

      <div className="bg-white border border-[#E8E6E2] p-7 mb-5">
        <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#555] mb-5 pb-3 border-b border-[#E8E6E2]">
          Kontaktní údaje
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <div key={f.id} className="mb-4">
              <label className="block text-xs text-[#555] mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                value={values[f.id] || ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [f.id]: e.target.value }))
                }
                className="w-full border border-[#E8E6E2] bg-white text-[13px] font-light text-[#111] px-3 py-2 outline-none focus:border-[#C8251E] transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#E8E6E2] p-7 mb-5">
        <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#555] mb-5 pb-3 border-b border-[#E8E6E2]">
          Sociální sítě
        </div>
        <div className="grid grid-cols-2 gap-4">
          {SOCIAL_FIELDS.map((f) => (
            <div key={f.id} className="mb-4">
              <label className="block text-xs text-[#555] mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                value={values[f.id] || ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [f.id]: e.target.value }))
                }
                placeholder={
                  f.id === "linkedin_url"
                    ? "https://linkedin.com/company/..."
                    : "https://instagram.com/..."
                }
                className="w-full border border-[#E8E6E2] bg-white text-[13px] font-light text-[#111] px-3 py-2 outline-none focus:border-[#C8251E] transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSave}
          className="bg-[#111] text-white text-[11px] font-normal tracking-[0.08em] uppercase px-6 py-2.5 cursor-pointer hover:bg-[#C8251E] transition-colors"
        >
          Uložit
        </button>
        {saved && (
          <span className="text-xs text-[#4CAF50] ml-3">✓ Uloženo</span>
        )}
      </div>
    </div>
  );
}
