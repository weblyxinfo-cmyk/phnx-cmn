"use client";
import { useTranslations } from "next-intl";

/* Modern line icons — stroke-only, editable */
const iconProps = {
  width: 44,
  height: 44,
  viewBox: "0 0 44 44",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-red",
};

/* Strategické poradenství — chessboard queen + growth arrow */
function IconStrategy() {
  return (
    <svg {...iconProps}>
      <path d="M12 34h20" />
      <path d="M14 34l-1-10 4 3 5-8 5 8 4-3-1 10" />
      <circle cx="13" cy="22" r="2" />
      <circle cx="22" cy="18" r="2" />
      <circle cx="31" cy="22" r="2" />
      <path d="M9 10l4 4M35 10l-4 4" />
    </svg>
  );
}

/* Media Relations — megaphone + waves */
function IconMediaRelations() {
  return (
    <svg {...iconProps}>
      <path d="M8 18v8l16 6V12L8 18z" />
      <path d="M24 14v16" />
      <path d="M12 26v5a2 2 0 002 2h2a2 2 0 002-2v-3" />
      <path d="M28 18c2 1 2 7 0 8M32 15c4 2 4 12 0 14" />
    </svg>
  );
}

/* Sociální sítě — network nodes */
function IconSocialMedia() {
  return (
    <svg {...iconProps}>
      <circle cx="22" cy="10" r="3" />
      <circle cx="10" cy="24" r="3" />
      <circle cx="34" cy="24" r="3" />
      <circle cx="22" cy="34" r="3" />
      <path d="M22 13v18M13 24h18M20 12l-8 10M24 12l8 10M12 26l8 6M32 26l-8 6" />
    </svg>
  );
}

/* Influencer Marketing — person with heart badge */
function IconInfluencer() {
  return (
    <svg {...iconProps}>
      <circle cx="22" cy="16" r="5" />
      <path d="M12 36c0-5.5 4.5-10 10-10s10 4.5 10 10" />
      <path d="M30 10c1.2-1.2 3.1-1.2 4.3 0 1.2 1.2 1.2 3.1 0 4.3L32 16.6l-2.3-2.3c-1.2-1.2-1.2-3.1 0-4.3 1.2-1.2 3.1-1.2 4.3 0" />
    </svg>
  );
}

/* Interní komunikace — chat bubbles overlap */
function IconInternalComm() {
  return (
    <svg {...iconProps}>
      <path d="M8 12h18a2 2 0 012 2v10a2 2 0 01-2 2H15l-5 4v-4H8a2 2 0 01-2-2V14a2 2 0 012-2z" />
      <path d="M14 30v2a2 2 0 002 2h14l4 3v-3h2a2 2 0 002-2V22a2 2 0 00-2-2h-4" />
    </svg>
  );
}

/* Event management a projekty — calendar with star */
function IconEvents() {
  return (
    <svg {...iconProps}>
      <rect x="7" y="11" width="30" height="24" rx="2" />
      <path d="M7 18h30" />
      <path d="M14 8v6M30 8v6" />
      <path d="M22 22l1.8 3.8 4.2.5-3 2.9.7 4.1L22 31.4l-3.7 1.9.7-4.1-3-2.9 4.2-.5L22 22z" />
    </svg>
  );
}

const icons = [
  IconStrategy,
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
    <section id="services" className="bg-gray-900 px-5 py-10 md:px-[60px] md:py-[120px]">
      {/* Header */}
      <div className="mb-6 md:mb-20">
        <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-5">
          {t("label")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.08]">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="group bg-gray-900 p-4 sm:p-6 md:p-[52px_44px] relative overflow-hidden transition-colors hover:bg-gray-800"
            >
              {/* Red bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-red w-8 group-hover:w-full transition-all duration-400" />

              {Icon && (
                <div className="mb-4 md:mb-7 [&>svg]:w-8 [&>svg]:h-8 md:[&>svg]:w-11 md:[&>svg]:h-11">
                  <Icon />
                </div>
              )}

              <h3 className="font-syne text-[15px] sm:text-[18px] md:text-[21px] font-semibold text-white mb-2 md:mb-4 leading-[1.3]">
                {item.name}
              </h3>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] md:leading-[1.75] text-gray-400 font-light">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
