"use client";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { cs: "CZ", sk: "SK", en: "EN" };

export default function LanguageSwitcher({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(pathname + hash, { locale: newLocale });
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="text-gray-300 text-xs mx-1">|</span>}
          <button
            onClick={() => switchLocale(loc)}
            className={`font-syne text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 transition-colors ${
              locale === loc
                ? "text-red"
                : dark
                  ? "text-gray-600 hover:text-white"
                  : "text-gray-400 hover:text-black"
            }`}
          >
            {labels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
