"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import MobileMenu from "@/components/ui/MobileMenu";

const navLinks = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "expertise", href: "#expertise" },
  { key: "clients", href: "#clients" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-[12px] border-b-2 border-red h-[56px] md:h-[80px]">
      <div className="flex items-center justify-between h-full px-5 md:px-[60px]">
        {/* Logo — always visible with text */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/phoenix-red.png"
            alt="Phoenix Communication"
            width={52}
            height={52}
            className="h-[28px] w-auto md:h-[44px]"
          />
          <div className="flex flex-col leading-none">
            <span className="font-syne text-[12px] sm:text-[13px] font-bold tracking-[0.03em] text-black uppercase">
              Phoenix
            </span>
            <span className="font-syne text-[8px] sm:text-[9px] font-medium tracking-[0.08em] text-gray-400 uppercase">
              Communication
            </span>
          </div>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="font-syne text-[12px] font-semibold tracking-[0.12em] uppercase text-gray-700 hover:text-red transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/company/10667028"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-red transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </nav>

        {/* Desktop language switcher */}
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
