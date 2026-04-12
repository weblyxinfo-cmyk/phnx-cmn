"use client";
import { useTranslations } from "next-intl";
import MarqueeTrack from "@/components/ui/MarqueeTrack";

const row1 = [
  { name: "Dermacol", logo: "/images/partners/dermacol.png" },
  { name: "Veolia", logo: "/images/partners/veolia.png" },
  { name: "Stihl", logo: "/images/partners/stihl.png" },
  { name: "Sage", logo: "/images/partners/sage.png" },
  { name: "Forscope", logo: "/images/partners/forscope.svg" },
  { name: "AGRO CS", logo: "/images/partners/agrocs.png" },
  { name: "Panasonic HAC", logo: "/images/partners/panasonic-hac.png" },
  { name: "NOARK", logo: "/images/partners/noark.png" },
  { name: "Fieldmann", logo: "/images/partners/fieldmann.png" },
  { name: "Pumpa", logo: "/images/partners/pumpa.png" },
  { name: "IVF Cube" },
];

const row2 = [
  { name: "Butchi's", logo: "/images/partners/butchis.png" },
  { name: "Cosmonde", logo: "/images/partners/cosmonde.jpg" },
  { name: "ČLZ", logo: "/images/partners/clz.png" },
  { name: "Buxton", logo: "/images/partners/buxton.png" },
  { name: "Floria Premium", logo: "/images/partners/floria.png" },
  { name: "SST", logo: "/images/partners/sst.png" },
  { name: "Port 1560", logo: "/images/partners/port1560.png" },
  { name: "Stihl Timbersport", logo: "/images/partners/stihl-timbersport.png" },
  { name: "ÚNMZ", logo: "/images/partners/unmz.png" },
  { name: "ČAS", logo: "/images/partners/cas.png" },
  { name: "Retlux" },
];

export default function Clients() {
  const t = useTranslations("clients");

  const refItems: string[] = t.raw("refItems");

  return (
    <section id="clients" className="bg-gray-100 px-5 py-10 md:px-[60px] md:py-[120px]">
      {/* Header */}
      <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-5">
        {t("label")}
      </p>
      <h2 className="font-syne text-[22px] sm:text-[clamp(24px,2.5vw,36px)] font-medium text-black leading-[1.15] mb-3 md:mb-4 whitespace-pre-line">
        {t("title")}
      </h2>
      <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-gray-600 max-w-[600px] mb-8 md:mb-12">
        {t("desc")}
      </p>

      {/* Marquee rows */}
      <div className="flex flex-col gap-2 md:gap-3 mb-10 md:mb-16">
        <MarqueeTrack partners={row1} direction="left" speed={40} />
        <MarqueeTrack partners={row2} direction="right" speed={35} />
      </div>

      {/* Reference box */}
      <div className="bg-white border-l-4 border-red p-5 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start">
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
