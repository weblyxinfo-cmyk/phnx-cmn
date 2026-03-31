"use client";
import { useTranslations } from "next-intl";
import MarqueeTrack from "@/components/ui/MarqueeTrack";

const row1 = [
  { name: "T-Mobile", color: "#E20074" },
  { name: "Panasonic", color: "#003087" },
  { name: "Novartis", color: "#005CA9" },
  { name: "Stihl", color: "#F47B00" },
  { name: "CBRE", color: "#006A4D" },
  { name: "Sodastream", color: "#00AEEF" },
  { name: "Melitta", color: "#C8201A" },
  { name: "Sencor", color: "#E2001A" },
  { name: "BaByliss", color: "#1A1A1A" },
  { name: "Sage", color: "#00B140" },
  { name: "Groupe SEB", color: "#003A70" },
  { name: "Provident", color: "#7B2D8B" },
  { name: "Studio Moderna", color: "#E31E24" },
  { name: "Aviva", color: "#009DDB" },
];

const row2 = [
  { name: "G4S", color: "#E30613" },
  { name: "Isover", color: "#6AA939" },
  { name: "Catler", color: "#1A1A1A" },
  { name: "Retlux", color: "#E30613" },
  { name: "Etnetera", color: "#0066CC" },
  { name: "VEKA", color: "#005FA8" },
  { name: "Panasonic HAC", color: "#003087" },
  { name: "ADL", color: "#1A1A1A" },
  { name: "TechSoup", color: "#E85D04" },
  { name: "XT Card", color: "#1A1A1A" },
  { name: "Orea Hotels", color: "#C8963C" },
  { name: "Prague Polo Cup", color: "#1A1A1A" },
  { name: "Hazena Praha", color: "#D62B1F" },
];

export default function Clients() {
  const t = useTranslations("clients");

  const refItems: string[] = t.raw("refItems");

  return (
    <section id="clients" className="bg-gray-100 px-6 py-14 md:px-[60px] md:py-[120px]">
      {/* Header */}
      <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-5">
        {t("num")} &mdash; {t("label")}
      </p>
      <h2 className="font-syne text-[clamp(24px,2.5vw,36px)] font-medium text-black leading-[1.15] mb-4 whitespace-pre-line">
        {t("title")}
      </h2>
      <p className="text-[15px] font-light leading-[1.75] text-gray-600 max-w-[600px] mb-12">
        {t("desc")}
      </p>

      {/* Marquee rows */}
      <div className="flex flex-col gap-3 mb-16">
        <MarqueeTrack partners={row1} direction="left" speed={40} />
        <MarqueeTrack partners={row2} direction="right" speed={35} />
      </div>

      {/* Reference box */}
      <div className="bg-white border-l-4 border-red p-6 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start">
        <div>
          <h3 className="font-syne text-[17px] font-medium text-black mb-5 leading-[1.4]">
            {t("refTitle")}
          </h3>
          <ul className="flex flex-col gap-3">
            {refItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-block w-5 h-px bg-red flex-shrink-0 mt-2.5" />
                <span className="text-sm font-light text-gray-600 leading-[1.6]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="#contact"
          className="font-syne text-[12px] font-semibold tracking-[0.1em] uppercase text-red flex items-center gap-2.5 hover:gap-4 transition-all whitespace-nowrap"
        >
          {t("refCta")}
        </a>
      </div>
    </section>
  );
}
