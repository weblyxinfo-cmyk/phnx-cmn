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
              className={`font-syne text-[14px] font-semibold tracking-[0.12em] uppercase text-white/80 hover:text-red py-3.5 transition-colors ${
                i < navLinks.length - 1 ? "border-b border-white/[0.06]" : ""
              }`}
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/company/10667028"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label="LinkedIn"
            className="flex items-center gap-2 font-syne text-[14px] font-semibold tracking-[0.12em] uppercase text-white/80 hover:text-red py-3.5 border-t border-white/[0.06] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
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
