"use client";
import { useTranslations } from "next-intl";

export default function Expertise() {
  const t = useTranslations("expertise");

  const items: string[] = t.raw("items");

  return (
    <section id="expertise" className="bg-white px-5 py-12 md:px-[60px] md:py-[120px]">
      {/* Section label */}
      <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-10">
        {t("num")} &mdash; {t("label")}
      </p>

      {/* Inner grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-[100px]">
        {/* Left */}
        <div>
          <h2 className="font-syne text-[clamp(24px,2.5vw,36px)] font-medium text-black leading-[1.15] mb-6 whitespace-pre-line">
            {t("title")}
          </h2>
          <p className="text-[15px] font-light leading-[1.75] text-gray-600">
            {t("desc")}
          </p>
        </div>

        {/* Right - items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-gray-200">
          {items.map((item, i) => (
            <div
              key={i}
              className={`py-5 border-b border-gray-200 flex items-center gap-3.5 ${
                i % 2 === 0 ? "md:pr-6" : "md:pl-6"
              }`}
            >
              <span className="inline-block w-5 h-px bg-red flex-shrink-0" />
              <span className="text-sm font-light text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
