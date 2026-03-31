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
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-[12px] border-b border-red/40">
      <div className="flex items-center justify-between px-5 py-3 md:px-[60px] md:py-0">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 py-3">
          <Image
            src="/images/phoenix-red.png"
            alt="Phoenix Communication"
            width={52}
            height={52}
            className="h-[36px] w-auto md:h-[52px]"
          />
          <span className="font-syne text-[13px] font-medium tracking-[0.06em] text-black hidden sm:inline">
            PHOENIX COMMUNICATION
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="font-inter text-[13px] text-gray-600 hover:text-red transition-colors py-6"
            >
              {t(link.key)}
            </a>
          ))}
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
