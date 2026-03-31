"use client";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#1a1a1a] px-6 py-5 md:px-14 md:py-[22px] flex flex-col md:flex-row justify-between items-center gap-2.5 border-t border-white/5">
      <p className="text-[11px] font-light text-gray-600 text-center md:text-left">
        {t("copy")}
      </p>
      <LanguageSwitcher dark />
    </footer>
  );
}
