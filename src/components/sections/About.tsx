"use client";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  const points: string[] = t.raw("points");

  return (
    <section id="about" className="bg-[#0d0d0d] px-5 py-12 md:px-[60px] md:py-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[100px] items-start">
        {/* Left */}
        <div>
          <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-5">
            {t("num")} &mdash; {t("label")}
          </p>
          <h2 className="font-syne text-[24px] md:text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-white whitespace-pre-line">
            {t("headline")}
          </h2>
        </div>

        {/* Right - bullet list */}
        <ul className="flex flex-col gap-0 list-none">
          {points.map((point, i) => (
            <li
              key={i}
              className={`flex gap-5 py-5 border-b border-white/[0.06] ${
                i === 0 ? "border-t border-t-white/[0.06]" : ""
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0 mt-2" />
              <span className="text-sm font-light leading-[1.7] text-white/75">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
