"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  const tags: string[] = t.raw("tags");

  return (
    <section id="hero" className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-20">
      {/* Right - dark panel (order-first on mobile) */}
      <div className="order-first md:order-last bg-hero-dark relative flex flex-col items-center justify-center min-h-[240px] md:min-h-[600px] overflow-hidden">
        {/* Stripes */}
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-white/[0.04]" />
          ))}
        </div>

        {/* Phoenix bird */}
        <Image
          src="/images/phoenix-bird.png"
          alt="Phoenix"
          width={200}
          height={200}
          className="w-[110px] md:w-[200px] animate-float-bird drop-shadow-[0_0_40px_rgba(200,37,30,0.3)] mix-blend-screen relative z-10"
        />

        {/* Label */}
        <p className="font-syne text-[11px] font-semibold tracking-[0.2em] uppercase text-white/35 mt-6 relative z-10">
          {t("kicker")}
        </p>
      </div>

      {/* Left - white panel */}
      <div className="bg-white flex flex-col justify-center px-6 py-12 md:px-[60px] md:py-[80px]">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up-1">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="border border-gray-300 rounded-sm px-3.5 py-1.5 text-[11px] text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Claim */}
        <h1 className="font-syne text-[36px] md:text-[clamp(36px,4.5vw,60px)] font-semibold leading-[1.05] mb-7 animate-fade-in-up-2">
          {t("claim1")}
          <br />
          {t("claim2")}
          <br />
          {t("claim3")}{" "}
          <span className="text-red">{t("claim4")}</span>
        </h1>

        {/* Description */}
        <p className="text-base font-light leading-[1.75] text-gray-600 max-w-[420px] mb-10 animate-fade-in-up-3">
          {t("desc")}
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-black text-white font-inter text-[13px] tracking-[0.08em] uppercase px-[30px] py-[15px] hover:bg-red hover:gap-5 transition-all w-full md:w-auto justify-center md:justify-start"
          >
            {t("cta")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
