export type EventPhoto = {
  /** null = placeholder tile until the photo is delivered */
  src: string | null;
  caption?: { cs: string; sk: string; en: string };
};

// Photos from events shown in the strip under "O agentuře".
// Files go to public/images/events/, format 4:3 (1600×1200 px).
// The two "vzor-*" files are low-res crops from the client's mockup — replace with originals.
export const eventPhotos: EventPhoto[] = [
  {
    src: "/images/events/vzor-agro-cs.jpg",
    caption: {
      cs: "Naše první návštěva v AGRO CS",
      sk: "Naša prvá návšteva v AGRO CS",
      en: "Our first visit to AGRO CS",
    },
  },
  { src: null },
  { src: "/images/events/vzor-colgate.jpg" },
  { src: null },
];
