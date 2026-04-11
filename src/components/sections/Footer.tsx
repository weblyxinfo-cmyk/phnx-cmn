"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#0A0A0A] relative overflow-hidden border-t-2 border-red">
      {/* Ambient red glow */}
      <div
        className="pointer-events-none absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #C8251E 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative px-5 md:px-14 pt-16 pb-8 md:pt-24 md:pb-10">
        <div className="max-w-[1280px] mx-auto">
          {/* Top: brand + CTA */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-14 md:mb-20">
            {/* Brand */}
            <div className="max-w-[420px]">
              <div className="flex items-center gap-3 mb-5">
                <Image
                  src="/images/phoenix-red.png"
                  alt="Phoenix Communication"
                  width={44}
                  height={44}
                  className="h-9 md:h-11 w-auto"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-syne text-[15px] md:text-[16px] font-bold tracking-[0.04em] text-white uppercase">
                    Phoenix
                  </span>
                  <span className="font-syne text-[10px] md:text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase mt-0.5">
                    Communication
                  </span>
                </div>
              </div>
              <p className="text-[14px] font-light text-white/45 leading-[1.7]">
                {t("tagline")}
              </p>

              {/* Social + language under brand */}
              <div className="flex items-center gap-5 mt-8">
                <a
                  href="https://www.linkedin.com/company/10667028"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.1] text-white/50 hover:text-white hover:border-red hover:bg-red/10 transition-all"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <LanguageSwitcher dark />
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center self-start lg:self-auto gap-4 bg-red hover:bg-red-dark text-white font-syne text-[12px] font-bold tracking-[0.14em] uppercase px-7 py-4 transition-colors"
            >
              {t("links.contact")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Middle: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 pb-10 md:pb-14 border-t border-white/[0.06] pt-12 md:pt-16">
            {/* Navigation */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-6">
                {t("navLabel")}
              </div>
              <nav className="flex flex-col gap-3">
                {["about", "services", "expertise", "clients", "contact"].map(
                  (id) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="group font-syne text-[13px] font-medium tracking-[0.08em] uppercase text-white/55 hover:text-white transition-colors w-fit"
                    >
                      <span className="inline-block group-hover:translate-x-1 transition-transform">
                        {t(`links.${id}`)}
                      </span>
                    </a>
                  )
                )}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-6">
                {t("contactLabel")}
              </div>
              <div className="flex flex-col gap-3">
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
                <a
                  href="https://www.linkedin.com/company/10667028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-light text-white/70 hover:text-red transition-colors w-fit"
                >
                  LinkedIn →
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="font-syne text-[10px] font-bold tracking-[0.22em] uppercase text-red/90 mb-6">
                Phoenix Communication a.s.
              </div>
              <address className="not-italic text-[14px] font-light text-white/55 leading-[1.75]">
                Opletalova 918/7
                <br />
                110 00 Praha 1
                <br />
                <span className="text-white/35">Budova ČTK</span>
              </address>
              <div className="mt-4 text-[12px] font-light text-white/35">
                IČO 28976126
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.05] px-5 md:px-14 py-6 safe-bottom">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-light text-white/30 text-center sm:text-left">
            © 2026 Phoenix Communication a.s.
          </p>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="#"
              className="text-[11px] font-light text-white/30 hover:text-white/60 transition-colors"
            >
              {t("privacy")}
            </a>
            <span className="text-white/10" aria-hidden="true">·</span>
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
