"use client";

interface Partner {
  name: string;
  color: string;
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
        className={`flex whitespace-nowrap group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-l" : "animate-marquee-r"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {tripled.map((partner, i) => (
          <span
            key={`${partner.name}-${i}`}
            className="inline-flex items-center border rounded-sm px-3 py-1.5 mx-1 text-[11px] sm:px-4 sm:py-2 sm:mx-1.5 sm:text-[13px] font-medium transition-colors duration-200 border-gray-300 text-gray-600 hover:border-[var(--lc)] hover:text-[var(--lc)] cursor-default flex-shrink-0"
            style={{ "--lc": partner.color } as React.CSSProperties}
          >
            {partner.name}
          </span>
        ))}
      </div>
    </div>
  );
}
