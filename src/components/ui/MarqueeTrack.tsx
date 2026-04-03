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
              className="inline-flex items-center justify-center mx-4 sm:mx-6 md:mx-8 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={48}
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ) : (
            <span
              key={`${partner.name}-${i}`}
              className="inline-flex items-center border rounded-sm px-3 py-1.5 mx-2 sm:mx-3 text-[11px] sm:text-[13px] font-medium transition-colors duration-200 border-gray-300 text-gray-500 hover:border-gray-600 hover:text-gray-800 cursor-default flex-shrink-0"
            >
              {partner.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}
