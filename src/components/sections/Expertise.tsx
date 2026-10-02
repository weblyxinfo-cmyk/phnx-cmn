"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Tile = {
  key: string;
  img: string | null;
};

// Order matches `expertise.items` in messages/*.json. Tiles are 4:3 — photos 1600×1200 px.
const tiles: Tile[] = [
  { key: "energetika", img: "/images/expertise/energetika.jpg" },
  { key: "technologie", img: "/images/expertise/technologie.jpg" },
  { key: "ekonomika", img: null },
  { key: "bydleni", img: "/images/expertise/bydleni.jpg" },
  { key: "krasa", img: "/images/expertise/kosmetika.jpg" },
  { key: "kultura", img: null },
  { key: "ict", img: null },
  { key: "csr", img: null },
];

export default function Expertise() {
  const t = useTranslations("expertise");
  const items: string[] = t.raw("items");

  return (
    <section id="expertise" className="bg-white px-5 py-10 md:px-[60px] md:py-[120px]">
      {/* Section label */}
      <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-6 md:mb-10">
        {t("label")}
      </p>

      {/* Headline block */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 md:gap-16 items-end mb-8 md:mb-16 max-w-[1280px]">
        <h2 className="font-syne text-[24px] sm:text-[30px] md:text-[clamp(32px,3.2vw,48px)] font-medium text-black leading-[1.08] whitespace-pre-line">
          {t("title")}
        </h2>
        <p className="text-[14px] md:text-[17px] font-light leading-[1.7] text-gray-600 max-w-[640px]">
          {t("desc")}
        </p>
      </div>

      {/* 4 × 2 grid of 4:3 tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {tiles.map((tile, i) => {
          const label = items[i];
          return (
            <div
              key={tile.key}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-900"
            >
              {tile.img ? (
                <Image
                  src={tile.img}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#1a0e0e] to-black">
                  {/* Subtle diagonal lines pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 8px, #C8251E 8px, #C8251E 9px)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-red/20"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="1" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <span className="inline-block w-8 h-px bg-red mb-2 md:mb-3 group-hover:w-14 transition-[width] duration-400" />
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
