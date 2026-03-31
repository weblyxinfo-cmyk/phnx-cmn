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
          className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[190]"
          onClick={close}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[300px] bg-[#111] z-[200] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col pt-24 px-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={close}
              className="font-syne text-[15px] font-medium text-white/80 hover:text-red py-3 border-b border-white/[0.06] transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
        <div className="px-8 mt-10">
          <LanguageSwitcher dark />
        </div>
      </div>
    </>
  );
}
