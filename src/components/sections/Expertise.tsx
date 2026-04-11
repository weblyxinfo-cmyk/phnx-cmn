"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

type TileKey =
  | "energetika"
  | "technologie"
  | "bydleni"
  | "zdravi"
  | "kosmetika"
  | "lifestyle";

const tileImages: Record<TileKey, string | null> = {
  energetika: "/images/expertise/energetika.png",
  technologie: "/images/expertise/technologie.png",
  bydleni: null,
  zdravi: null,
  kosmetika: null,
  lifestyle: null,
};

const tileOrder: TileKey[] = [
  "energetika",
  "technologie",
  "bydleni",
  "zdravi",
  "kosmetika",
  "lifestyle",
];

export default function Expertise() {
  const t = useTranslations("expertise");

  const items: string[] = t.raw("items");

  return (
    <section id="expertise" className="bg-white px-5 py-12 md:px-[60px] md:py-[120px]">
      {/* Section label */}
      <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-10">
        {t("label")}
      </p>

      {/* Headline block */}
      <div className="max-w-[1200px] mb-10 md:mb-16">
        <h2 className="font-syne text-[26px] sm:text-[clamp(28px,3vw,44px)] font-medium text-black leading-[1.1] mb-5 md:mb-7 whitespace-pre-line">
          {t("title")}
        </h2>
        <p className="text-[15px] md:text-[17px] font-light leading-[1.75] text-gray-600 max-w-[640px]">
          {t("desc")}
        </p>
      </div>

      {/* Tile grid 3x2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {tileOrder.map((key, i) => {
          const img = tileImages[key];
          const label = items[i];
          return (
            <div
              key={key}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-900"
            >
              {img ? (
                <Image
                  src={img}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-white/25"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <span className="inline-block w-6 h-px bg-red mb-2 md:mb-3" />
                <h3 className="font-syne text-[15px] sm:text-[18px] md:text-[22px] font-semibold text-white leading-tight">
                  {label}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
