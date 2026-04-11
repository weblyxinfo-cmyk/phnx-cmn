"use client";
import Image from "next/image";

type Photo = { src: string | null; alt: string };

const photos: Photo[] = [
  { src: null, alt: "Projekt 1" },
  { src: null, alt: "Projekt 2" },
  { src: null, alt: "Projekt 3" },
  { src: null, alt: "Projekt 4" },
  { src: null, alt: "Projekt 5" },
  { src: null, alt: "Projekt 6" },
  { src: null, alt: "Projekt 7" },
  { src: null, alt: "Projekt 8" },
];

export default function PhotoStrip() {
  const tripled = [...photos, ...photos, ...photos];

  return (
    <section
      aria-label="Phoenix Communication projekty"
      className="w-full bg-black overflow-hidden"
    >
      <div
        className="flex animate-marquee-l"
        style={{ animationDuration: "60s" }}
      >
        {tripled.map((photo, i) => (
          <div
            key={`${photo.alt}-${i}`}
            className="relative h-[120px] md:h-[172px] aspect-square flex-shrink-0 border-r border-white/[0.04]"
          >
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 120px, 172px"
                className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0f0f] to-black flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-red/25"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
