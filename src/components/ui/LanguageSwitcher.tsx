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
    <div
      className={`inline-flex items-center rounded-sm overflow-hidden border ${
        dark ? "border-white/10" : "border-gray-200"
      } ${className}`}
    >
      {routing.locales.map((loc, i) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`
              relative font-syne text-[11px] font-semibold tracking-[0.08em] uppercase
              px-3 py-1.5 transition-all duration-200
              ${i > 0 ? (dark ? "border-l border-white/10" : "border-l border-gray-200") : ""}
              ${
                isActive
                  ? "bg-red text-white"
                  : dark
                    ? "bg-transparent text-gray-500 hover:text-white hover:bg-white/5"
                    : "bg-transparent text-gray-400 hover:text-black hover:bg-gray-50"
              }
            `}
          >
            {labels[loc]}
          </button>
        );
      })}
    </div>
  );
}
