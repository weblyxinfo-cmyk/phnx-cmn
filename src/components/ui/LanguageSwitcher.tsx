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
      className={`inline-flex items-center gap-1 rounded-full p-1 ${
        dark ? "bg-white/[0.04]" : "bg-black/[0.04]"
      } ${className}`}
    >
      {routing.locales.map((loc) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`
              font-syne text-[10px] font-semibold tracking-[0.1em] uppercase
              rounded-full px-3 py-1.5 transition-all duration-200
              ${
                isActive
                  ? "bg-red text-white shadow-[0_1px_4px_rgba(200,37,30,0.3)]"
                  : dark
                    ? "text-white/30 hover:text-white/60"
                    : "text-gray-400 hover:text-gray-700"
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
