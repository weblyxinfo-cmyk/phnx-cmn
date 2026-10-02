import Image from "next/image";
import { getLocale } from "next-intl/server";
import { eventPhotos, type EventPhoto } from "@/data/eventPhotos";

// The marquee shifts by one third of the track, so one third has to cover wide screens.
const MIN_PER_SET = 10;

type Locale = keyof NonNullable<EventPhoto["caption"]>;

export default async function PhotoStrip() {
  if (eventPhotos.length === 0) return null;

  const locale = (await getLocale()) as Locale;

  const set: EventPhoto[] = [];
  while (set.length < MIN_PER_SET) set.push(...eventPhotos);
  const tripled = [...set, ...set, ...set];

  return (
    <section className="w-full bg-black overflow-hidden">
      <div
        className="flex w-max animate-marquee-l hover:[animation-play-state:paused]"
        style={{ animationDuration: `${set.length * 6}s` }}
      >
        {tripled.map((photo, i) => {
          const caption = photo.caption?.[locale] ?? photo.caption?.cs;
          return (
            <figure
              key={i}
              aria-hidden={i >= eventPhotos.length ? true : undefined}
              className="group relative h-[150px] md:h-[260px] aspect-[4/3] flex-shrink-0 overflow-hidden"
            >
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={caption ?? ""}
                  fill
                  sizes="(max-width: 768px) 200px, 347px"
                  className="object-cover"
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
              {caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pt-8 pb-3 md:px-5 md:pt-12 md:pb-4 text-[12px] md:text-[14px] font-light leading-snug text-white opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-300">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
