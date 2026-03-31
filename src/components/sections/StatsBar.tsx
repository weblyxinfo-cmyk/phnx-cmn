"use client";
import { useTranslations } from "next-intl";

export default function StatsBar() {
  const t = useTranslations("stats");

  const items: { num: string; label: string }[] = t.raw("items");

  return (
    <section className="w-full bg-red">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={`px-5 py-6 md:px-12 md:py-11 hover:bg-red-dark transition-colors ${
              i < items.length - 1 ? "md:border-r md:border-white/15" : ""
            }`}
          >
            <p className="font-syne text-[30px] md:text-[40px] font-semibold text-white leading-none mb-2">
              {item.num}
            </p>
            <p className="text-[13px] font-light text-white/70">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
