"use client";
import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "expertise", href: "#expertise" },
  { key: "clients", href: "#clients" },
  { key: "contact", href: "#contact" },
] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggle}
        className="relative z-[210] flex flex-col justify-center items-center w-10 h-10 gap-[5px] md:hidden"
        aria-label="Menu"
      >
        <span
          className={`block w-5 h-[1.5px] bg-black transition-all duration-300 ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-black transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-black transition-all duration-300 ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[190] backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#0d0d0d] z-[200] transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Brand accent */}
        <div className="h-1 bg-red" />

        <nav className="flex flex-col pt-20 px-7">
          {navLinks.map((link, i) => (
            <a
              key={link.key}
              href={link.href}
              onClick={close}
              className={`font-syne text-[15px] font-medium text-white/80 hover:text-red py-3.5 transition-colors ${
                i < navLinks.length - 1 ? "border-b border-white/[0.06]" : ""
              }`}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="px-7 mt-8">
          <LanguageSwitcher dark />
        </div>

        {/* Contact shortcut */}
        <div className="absolute bottom-8 left-7 right-7">
          <a
            href="#contact"
            onClick={close}
            className="flex items-center justify-center gap-2 bg-red text-white font-syne text-[12px] font-semibold tracking-[0.08em] uppercase py-3.5 w-full hover:bg-red-dark transition-colors"
          >
            Kontakt
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
