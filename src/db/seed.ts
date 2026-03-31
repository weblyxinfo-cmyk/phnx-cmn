import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { partners, settings } from "./schema";

const DEFAULT_PARTNERS = [
  { name: "T-Mobile", url: "https://t-mobile.cz", color: "#E20074" },
  { name: "Panasonic", url: "https://panasonic.com", color: "#003087" },
  { name: "Novartis", url: "https://novartis.com", color: "#005CA9" },
  { name: "CBRE", url: "https://cbre.com", color: "#006A4D" },
  { name: "Stihl", url: "https://stihl.cz", color: "#F47B00" },
  { name: "Sodastream", url: "https://sodastream.cz", color: "#00AEEF" },
  { name: "Melitta", url: "https://melitta.cz", color: "#C8201A" },
  { name: "Sencor", url: "https://sencor.eu", color: "#E2001A" },
  { name: "BaByliss", url: "https://babyliss.cz", color: "#1A1A1A" },
  { name: "Sage", url: "https://sage.com", color: "#00B140" },
  { name: "Groupe SEB", url: "https://groupeseb.com", color: "#003A70" },
  { name: "Provident", url: "https://provident.cz", color: "#7B2D8B" },
  { name: "G4S", url: "https://g4s.com", color: "#E30613" },
  { name: "Isover", url: "https://isover.cz", color: "#6AA939" },
  { name: "Aviva", url: "https://aviva.com", color: "#009DDB" },
  { name: "Retlux", url: "https://retlux.eu", color: "#E30613" },
  { name: "Etnetera", url: "https://etnetera.cz", color: "#0066CC" },
  { name: "Catler", url: "https://catler.cz", color: "#1A1A1A" },
  { name: "Studio Moderna", url: "https://studiomoderna.com", color: "#E31E24" },
  { name: "VEKA", url: "https://veka.cz", color: "#005FA8" },
  { name: "Panasonic HAC", url: "https://panasonic.com", color: "#003087" },
  { name: "ADL", url: null, color: "#1A1A1A" },
  { name: "TechSoup", url: "https://techsoup.cz", color: "#E85D04" },
  { name: "XT Card", url: null, color: "#1A1A1A" },
  { name: "Orea Hotels", url: "https://orea.cz", color: "#C8963C" },
  { name: "Prague Polo Cup", url: null, color: "#1A1A1A" },
  { name: "Hazená Praha", url: null, color: "#D62B1F" },
];

const DEFAULT_SETTINGS: Record<string, string> = {
  company_name: "Phoenix Communication a.s.",
  building: "Budova ČTK",
  street: "Opletalova 918/7",
  city: "110 00 Praha 1",
  phone: "+420 222 510 799",
  email: "praha@phoenixcom.cz",
  ico: "28976126",
  registration: "B 15636 vedená u Městského soudu v Praze",
};

async function seed() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const db = drizzle(client);

  console.log("Seeding partners...");
  for (let i = 0; i < DEFAULT_PARTNERS.length; i++) {
    const p = DEFAULT_PARTNERS[i];
    await db.insert(partners).values({
      name: p.name,
      url: p.url,
      color: p.color,
      position: i,
    });
  }
  console.log(`Seeded ${DEFAULT_PARTNERS.length} partners.`);

  console.log("Seeding settings...");
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await db.insert(settings).values({ key, value });
  }
  console.log(`Seeded ${Object.keys(DEFAULT_SETTINGS).length} settings.`);

  console.log("Done!");
}

seed().catch(console.error);
