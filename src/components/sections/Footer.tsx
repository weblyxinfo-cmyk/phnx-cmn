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
        className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full blur-[160px] opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #C8251E 0%, transparent 65%)" }}
      />

      {/* MAIN CONTENT */}
      <div className="relative px-5 md:px-14 pt-12 md:pt-20 pb-0">
        <div className="max-w-[1280px] mx-auto">
          {/* Brand block */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10 md:pb-14 border-b border-white/[0.06]">
            <div className="max-w-[480px]">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <Image
                  src="/images/phoenix-red.png"
                  alt="Phoenix Communication"
                  width={48}
                  height={48}
                  className="h-10 md:h-12 w-auto"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-syne text-[16px] md:text-[18px] font-bold tracking-[0.03em] text-white uppercase">
                    Phoenix
                  </span>
                  <span className="font-syne text-[10px] md:text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase mt-0.5">
                    Communication
                  </span>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] font-light text-white/40 leading-[1.7]">
                {t("tagline")}
              </p>
            </div>

            {/* CTA + LinkedIn */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/10667028"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-white/50 hover:text-white hover:bg-red hover:border-red transition-all"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-red hover:bg-red-dark text-white font-syne text-[11px] font-bold tracking-[0.14em] uppercase px-6 py-3.5 transition-colors"
              >
                {t("links.contact")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 md:gap-10 py-10 md:py-14">
            {/* Contact */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/80 mb-4">
                {t("contactLabel")}
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href="tel:+420222510799"
                  className="text-[14px] font-light text-white/70 hover:text-red transition-colors w-fit"
                >
                  +420 222 510 799
                </a>
                <a
                  href="mailto:praha@phoenixcom.cz"
                  className="text-[14px] font-light text-white/70 hover:text-red transition-colors w-fit break-all"
                >
                  praha@phoenixcom.cz
                </a>
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/80 mb-4">
                {t("addressLabel")}
              </div>
              <address className="not-italic text-[14px] font-light text-white/55 leading-[1.65]">
                Opletalova 918/7
                <br />
                110 00 Praha 1
                <br />
                <span className="text-white/35 text-[12px]">Budova ČTK</span>
              </address>
            </div>

            {/* Navigation */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/80 mb-4">
                {t("navLabel")}
              </div>
              <nav className="flex flex-col gap-2">
                {["about", "services", "expertise", "clients", "contact"].map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-[13px] font-light text-white/45 hover:text-white hover:pl-1 transition-all w-fit"
                  >
                    {t(`links.${id}`)}
                  </a>
                ))}
              </nav>
            </div>

            {/* Language */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/80 mb-4">
                {t("followLabel")}
              </div>
              <LanguageSwitcher dark />
            </div>
          </div>
        </div>
      </div>

      {/* GIANT WATERMARK */}
      <div
        aria-hidden="true"
        className="relative pointer-events-none select-none overflow-hidden hidden md:block"
      >
        <div
          className="font-syne font-bold whitespace-nowrap text-center leading-[0.8] text-transparent"
          style={{
            fontSize: "clamp(80px, 18vw, 260px)",
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          }}
        >
          PHOENIX COMMUNICATION
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/[0.06] px-5 md:px-14 py-5 md:py-6 safe-bottom">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
          <span className="text-[11px] font-light text-white/30">
            © 2026 Phoenix Communication a.s.
            <span className="hidden md:inline"> — IČO 28976126</span>
          </span>
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="#"
              className="text-[11px] font-light text-white/30 hover:text-white/60 transition-colors"
            >
              {t("privacy")}
            </a>
            <span className="text-white/15" aria-hidden="true">·</span>
            <a
              href="https://weblyx.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[11px] font-light text-white/30 hover:text-red transition-colors"
            >
              <span>{t("madeBy")}</span>
              <span className="font-syne font-semibold tracking-[0.04em] text-white/55 group-hover:text-red transition-colors">
                weblyx.cz
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
