export type EventPhoto = {
  src: string;
  caption: { cs: string; sk: string; en: string };
};

// Photos from events shown in the strip under "O agentuře".
// Files go to public/images/events/, format 4:3 (1600×1200 px).
// The strip is hidden while this list is empty.
export const eventPhotos: EventPhoto[] = [];
