"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-red/40 to-transparent" />

      {/* Main footer content */}
      <div className="px-5 md:px-14 pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="max-w-[1200px] mx-auto">
          {/* Top: Logo + CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/phoenix-red.png"
                  alt="Phoenix Communication"
                  width={36}
                  height={36}
                  className="h-8 w-auto"
                />
                <span className="font-syne text-[13px] font-semibold tracking-[0.06em] text-white/80 uppercase">
                  Phoenix Communication
                </span>
              </div>
              <p className="text-[13px] font-light text-white/30 leading-relaxed max-w-[380px]">
                {t("tagline")}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/10667028"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/40 hover:text-red transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 font-syne text-[11px] font-bold tracking-[0.14em] uppercase text-red hover:text-white transition-colors"
              >
                {t("links.contact")}
                <span className="inline-block w-6 h-px bg-red group-hover:w-10 group-hover:bg-white transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Middle: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pb-12 md:pb-16 border-b border-white/[0.06]">
            {/* Nav */}
            <div>
              <div className="font-syne text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 mb-5">
                {t("navLabel")}
              </div>
              <nav className="flex flex-col gap-2">
                {["about", "services", "expertise", "clients", "contact"].map(
                  (id) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="text-[13px] font-light text-white/35 hover:text-red hover:pl-2 transition-all duration-200"
                    >
                      {t(`links.${id}`)}
                    </a>
                  )
                )}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <div className="font-syne text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 mb-5">
                {t("contactLabel")}
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href="tel:+420222510799"
                  className="text-[13px] font-light text-white/35 hover:text-red transition-colors"
                >
                  +420 222 510 799
                </a>
                <a
                  href="mailto:praha@phoenixcom.cz"
                  className="text-[13px] font-light text-white/35 hover:text-red transition-colors"
                >
                  praha@phoenixcom.cz
                </a>
                <span className="text-[12px] font-light text-white/20 mt-1">
                  Opletalova 918/7
                  <br />
                  110 00 Praha 1
                </span>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="font-syne text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 mb-5">
                IČO
              </div>
              <span className="text-[13px] font-light text-white/35">
                28976126
              </span>
              <div className="mt-6">
                <div className="font-syne text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 mb-3">
                  {t("navLabel")}
                </div>
                <LanguageSwitcher dark />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 md:px-14 py-4 safe-bottom">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[10px] font-light text-white/15">
            {t("copy")}
          </p>
          <a
            href="#"
            className="text-[10px] font-light text-white/15 hover:text-white/40 transition-colors"
          >
            {t("privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
