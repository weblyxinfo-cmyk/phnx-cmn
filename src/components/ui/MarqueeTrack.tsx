"use client";
import Image from "next/image";

interface Partner {
  name: string;
  logo?: string;
  color?: string;
}

interface MarqueeTrackProps {
  partners: Partner[];
  direction?: "left" | "right";
  speed?: number;
}

export default function MarqueeTrack({
  partners,
  direction = "left",
  speed = 40,
}: MarqueeTrackProps) {
  const tripled = [...partners, ...partners, ...partners];

  return (
    <div className="overflow-hidden group">
      <div
        className={`flex items-center whitespace-nowrap group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-l" : "animate-marquee-r"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {tripled.map((partner, i) =>
          partner.logo ? (
            <div
              key={`${partner.name}-${i}`}
              className="relative mx-2 sm:mx-3 md:mx-4 flex-shrink-0 w-[100px] h-[48px] sm:w-[120px] sm:h-[56px] md:w-[140px] md:h-[64px] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, 140px"
                className="object-contain"
              />
            </div>
          ) : (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center mx-2 sm:mx-3 md:mx-4 flex-shrink-0 w-[100px] h-[48px] sm:w-[120px] sm:h-[56px] md:w-[140px] md:h-[64px]"
            >
              <span className="inline-flex items-center border rounded-sm px-3 py-1.5 text-[11px] sm:text-[13px] font-semibold transition-colors duration-200 border-gray-300 text-gray-600 hover:border-gray-600 hover:text-gray-900 cursor-default">
                {partner.name}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
