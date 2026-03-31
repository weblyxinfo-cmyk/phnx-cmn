"use client";
import { useTranslations } from "next-intl";

/* Inline SVG icons for each service */
function IconStrategicPR() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <rect x="6" y="8" width="32" height="22" rx="2" />
      <line x1="16" y1="30" x2="28" y2="30" />
      <line x1="22" y1="30" x2="22" y2="35" />
      <line x1="16" y1="35" x2="28" y2="35" />
      <path d="M14 16h6M14 20h10" />
      <circle cx="31" cy="17" r="3" />
    </svg>
  );
}

function IconMediaRelations() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <rect x="18" y="8" width="8" height="4" rx="1" />
      <rect x="16" y="12" width="12" height="8" rx="1" />
      <line x1="22" y1="20" x2="22" y2="28" />
      <line x1="15" y1="28" x2="29" y2="28" />
      <path d="M11 32h22" />
      <circle cx="22" cy="24" r="1" fill="currentColor" />
      <path d="M13 15v-1a1 1 0 011-1h2M29 15v-1a1 1 0 00-1-1h-2" />
    </svg>
  );
}

function IconSocialMedia() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <circle cx="22" cy="22" r="13" />
      <ellipse cx="22" cy="22" rx="6" ry="13" />
      <line x1="9" y1="17" x2="35" y2="17" />
      <line x1="9" y1="27" x2="35" y2="27" />
      <line x1="22" y1="9" x2="22" y2="35" />
    </svg>
  );
}

function IconInfluencer() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <circle cx="16" cy="16" r="4" />
      <circle cx="28" cy="16" r="4" />
      <circle cx="22" cy="28" r="4" />
      <line x1="19" y1="18" x2="21" y2="25" />
      <line x1="25" y1="18" x2="23" y2="25" />
      <line x1="20" y1="16" x2="24" y2="16" />
    </svg>
  );
}

function IconInternalComm() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <path d="M10 12h18a2 2 0 012 2v10a2 2 0 01-2 2H16l-4 4v-4h-2a2 2 0 01-2-2V14a2 2 0 012-2z" />
      <path d="M30 18h4a2 2 0 012 2v10a2 2 0 01-2 2h-2v4l-4-4h-8a2 2 0 01-2-2v-2" />
      <line x1="15" y1="18" x2="23" y2="18" />
      <line x1="15" y1="22" x2="21" y2="22" />
    </svg>
  );
}

function IconEvents() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <path d="M10 32h24" />
      <path d="M14 32V18l8-6 8 6v14" />
      <path d="M14 18L6 24v8h8M30 18l8 6v8h-8" />
      <circle cx="22" cy="24" r="3" />
      <line x1="22" y1="15" x2="22" y2="12" />
      <line x1="18" y1="13" x2="22" y2="12" />
      <line x1="26" y1="13" x2="22" y2="12" />
    </svg>
  );
}

const icons = [
  IconStrategicPR,
  IconMediaRelations,
  IconSocialMedia,
  IconInfluencer,
  IconInternalComm,
  IconEvents,
];

export default function Services() {
  const t = useTranslations("services");

  const items: { name: string; desc: string }[] = t.raw("items");

  return (
    <section id="services" className="bg-gray-900 px-5 py-12 md:px-[60px] md:py-[120px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-20 gap-4">
        <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-white/40">
          {t("num")} &mdash; {t("label")}
        </p>
        <h2 className="font-syne text-[clamp(28px,3vw,44px)] font-medium text-white max-w-[500px] leading-[1.15] whitespace-pre-line">
          {t("title")}
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08]">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="group bg-gray-900 p-6 md:p-[52px_44px] relative overflow-hidden transition-colors hover:bg-gray-800"
            >
              {/* Red bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-red w-8 group-hover:w-full transition-all duration-400" />

              {Icon && (
                <div className="mb-7">
                  <Icon />
                </div>
              )}

              <h3 className="font-syne text-[17px] md:text-[19px] font-medium text-white mb-3 md:mb-4 leading-[1.3]">
                {item.name}
              </h3>
              <p className="text-[13px] leading-[1.75] text-gray-400 font-light">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
