"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#111]">
      {/* Top row — logo + nav + socials */}
      <div className="border-t border-white/[0.06] px-5 md:px-14 py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-8 md:gap-20 items-start">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/phoenix-red.png"
                alt="Phoenix Communication"
                width={32}
                height={32}
                className="h-7 w-auto opacity-80"
              />
              <span className="font-syne text-[11px] font-medium tracking-[0.08em] text-white/60 uppercase">
                Phoenix Communication
              </span>
            </div>
            <p className="text-[13px] font-light text-white/30 leading-relaxed max-w-[320px]">
              {t("tagline")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-syne text-[9px] font-bold tracking-[0.16em] uppercase text-red/60 mb-4">
              {t("navLabel")}
            </div>
            <nav className="flex flex-col gap-2.5">
              {["about", "services", "expertise", "clients", "contact"].map(
                (id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-[13px] font-light text-white/40 hover:text-red transition-colors"
                  >
                    {t(`links.${id}`)}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <div className="font-syne text-[9px] font-bold tracking-[0.16em] uppercase text-red/60 mb-4">
              {t("contactLabel")}
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+420222510799"
                className="text-[13px] font-light text-white/40 hover:text-red transition-colors"
              >
                +420 222 510 799
              </a>
              <a
                href="mailto:praha@phoenixcom.cz"
                className="text-[13px] font-light text-white/40 hover:text-red transition-colors"
              >
                praha@phoenixcom.cz
              </a>
              <span className="text-[13px] font-light text-white/25 mt-1">
                Opletalova 918/7, Praha 1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright + lang */}
      <div className="border-t border-white/[0.06] px-5 md:px-14 py-4 safe-bottom">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-light text-white/25 text-center md:text-left">
            {t("copy")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-[10px] font-light text-white/25 hover:text-white/50 transition-colors"
            >
              {t("privacy")}
            </a>
            <LanguageSwitcher dark />
          </div>
        </div>
      </div>
    </footer>
  );
}
