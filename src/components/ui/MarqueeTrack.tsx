"use client";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
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
        {tripled.map((partner, i) => (
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
        ))}
      </div>
    </div>
  );
}
