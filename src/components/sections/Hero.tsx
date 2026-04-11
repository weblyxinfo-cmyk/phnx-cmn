"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  const tags: string[] = t.raw("tags");
  const [activeTag, setActiveTag] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTag((prev) => (prev + 1) % tags.length);
    }, 2600);
    return () => clearInterval(id);
  }, [tags.length]);

  return (
    <section id="hero" className="grid grid-cols-1 md:grid-cols-2 min-h-[100svh] pt-[56px] md:pt-[80px]">
      {/* Dark panel — HIDDEN on mobile, only visible on md+ */}
      <div className="hidden md:flex order-last bg-hero-dark relative flex-col items-center justify-center min-h-[600px] overflow-hidden">
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
          className="w-[200px] animate-float-bird drop-shadow-[0_0_40px_rgba(200,37,30,0.3)] mix-blend-screen relative z-10"
        />

        {/* Label */}
        <p className="font-syne text-[11px] font-semibold tracking-[0.2em] uppercase text-white/35 mt-6 relative z-10">
          {t("kicker")}
        </p>
      </div>

      {/* Content panel */}
      <div className="bg-white flex flex-col justify-center px-5 py-10 md:px-[60px] md:py-[80px]">
        {/* Kicker — visible on mobile as red subtitle */}
        <p className="font-syne text-[10px] font-semibold tracking-[0.18em] uppercase text-red mb-5 md:hidden">
          {t("kicker")}
        </p>

        {/* Dynamic tag ticker */}
        <div className="relative h-[26px] md:h-[30px] mb-5 md:mb-8 animate-fade-in-up-1">
          {tags.map((tag: string, i: number) => (
            <span
              key={tag}
              className={`absolute inset-0 font-inter text-[14px] md:text-[16px] font-medium text-gray-700 transition-all duration-700 ${
                i === activeTag
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <span className="inline-block w-5 h-px bg-red align-middle mr-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Claim */}
        <h1 className="font-syne text-[32px] sm:text-[36px] md:text-[clamp(36px,4.5vw,60px)] font-semibold leading-[1.05] mb-5 md:mb-7 animate-fade-in-up-2">
          {t("claim1")}
          <br />
          {t("claim2")}
          <br />
          <span className="text-red">
            {t("claim3")} {t("claim4")}
          </span>
        </h1>

        {/* Description */}
        <p className="text-[15px] md:text-[17px] font-light leading-[1.7] text-gray-600 max-w-[460px] mb-7 md:mb-10 animate-fade-in-up-3">
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
