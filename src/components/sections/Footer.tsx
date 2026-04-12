"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">
      {/* Top red line */}
      <div className="h-[3px] bg-gradient-to-r from-red/0 via-red to-red/0" />

      {/* Ambient red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full blur-[160px] opacity-[0.09]"
        style={{ background: "radial-gradient(circle, #C8251E 0%, transparent 65%)" }}
      />

      {/* Floating phoenix bird */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[60px] right-[-80px] md:right-[-40px] w-[280px] md:w-[420px] opacity-[0.035]"
      >
        <Image
          src="/images/phoenix-bird.png"
          alt=""
          width={420}
          height={420}
          className="w-full h-auto"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative px-5 md:px-14 pt-12 md:pt-32 pb-8 md:pb-14">
        <div className="max-w-[1280px] mx-auto">
          {/* Top kicker */}
          <div className="flex items-center gap-4 mb-6 md:mb-14">
            <span className="inline-block w-10 md:w-14 h-px bg-red" />
            <span className="font-syne text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-red">
              {t("contactLabel")}
            </span>
          </div>

          {/* Huge statement */}
          <h2 className="font-syne font-semibold text-[36px] sm:text-[56px] md:text-[clamp(64px,9vw,140px)] leading-[0.95] tracking-[-0.02em] mb-8 md:mb-20">
            <span className="block text-white/90">{t("statementLead")}</span>
            <span className="block text-red">{t("statementMain")}</span>
          </h2>

          {/* Big email CTA */}
          <div className="mb-10 md:mb-24">
            <div className="font-syne text-[10px] md:text-[11px] font-bold tracking-[0.22em] uppercase text-white/30 mb-3 md:mb-5">
              {t("emailLabel")}
            </div>
            <a
              href="mailto:praha@phoenixcom.cz"
              className="group inline-flex items-center gap-3 md:gap-6 font-syne text-[18px] sm:text-[28px] md:text-[clamp(32px,4.5vw,58px)] font-medium leading-none text-white hover:text-red transition-colors break-all"
            >
              <span>praha@phoenixcom.cz</span>
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 md:w-12 md:h-12 flex-shrink-0 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-10deg] transition-transform duration-400"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
            </a>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 md:gap-10 pt-8 md:pt-12 border-t border-white/[0.08]">
            {/* Phone */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-4">
                {t("phoneLabel")}
              </div>
              <a
                href="tel:+420222510799"
                className="block font-syne text-[17px] md:text-[19px] font-medium text-white hover:text-red transition-colors"
              >
                +420 222 510 799
              </a>
            </div>

            {/* Address */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-4">
                {t("addressLabel")}
              </div>
              <address className="not-italic text-[15px] font-light text-white/75 leading-[1.65]">
                Opletalova 918/7
                <br />
                110 00 Praha 1
                <br />
                <span className="text-white/40 text-[13px]">Budova ČTK</span>
              </address>
            </div>

            {/* Navigation */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-4">
                {t("navLabel")}
              </div>
              <nav className="flex flex-col gap-2">
                {["about", "services", "expertise", "clients"].map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="group font-syne text-[13px] font-medium tracking-[0.1em] uppercase text-white/65 hover:text-white transition-colors w-fit"
                  >
                    <span className="inline-block group-hover:translate-x-1 transition-transform">
                      {t(`links.${id}`)}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Follow + language */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-4">
                {t("followLabel")}
              </div>
              <a
                href="https://www.linkedin.com/company/10667028"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group inline-flex items-center gap-3 mb-6"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-white/70 group-hover:text-white group-hover:bg-red group-hover:border-red transition-all">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </span>
                <span className="font-syne text-[13px] font-semibold tracking-[0.08em] uppercase text-white/55 group-hover:text-white transition-colors">
                  LinkedIn
                </span>
              </a>
              <div>
                <LanguageSwitcher dark />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GIANT WATERMARK */}
      <div
        aria-hidden="true"
        className="relative pointer-events-none select-none overflow-hidden hidden md:block"
      >
        <div className="font-syne font-bold whitespace-nowrap text-center leading-[0.8] text-transparent"
             style={{
               fontSize: "clamp(80px, 18vw, 260px)",
               WebkitTextStroke: "1px rgba(255,255,255,0.07)",
             }}
        >
          PHOENIX COMMUNICATION
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/[0.06] px-5 md:px-14 py-5 md:py-6 safe-bottom">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
          {/* Left: brand + copyright */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/phoenix-red.png"
              alt="Phoenix Communication"
              width={24}
              height={24}
              className="h-5 w-auto"
            />
            <span className="text-[11px] font-light text-white/35">
              © 2026 Phoenix Communication a.s.
              <span className="hidden md:inline"> — IČO 28976126</span>
            </span>
          </div>

          {/* Right: legal + credit */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="#"
              className="text-[11px] font-light text-white/35 hover:text-white/70 transition-colors"
            >
              {t("privacy")}
            </a>
            <span className="text-white/15" aria-hidden="true">·</span>
            <a
              href="https://weblyx.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[11px] font-light text-white/35 hover:text-red transition-colors"
            >
              <span>{t("madeBy")}</span>
              <span className="font-syne font-semibold tracking-[0.04em] text-white/60 group-hover:text-red transition-colors">
                weblyx.cz
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
