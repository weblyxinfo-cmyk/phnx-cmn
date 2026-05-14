import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { partners, settings } from "./schema";

const DEFAULT_PARTNERS = [
  { name: "Dermacol", url: "https://dermacol.cz", logoUrl: "/images/partners/dermacol.png", color: "#C8251E" },
  { name: "Veolia", url: "https://veolia.cz", logoUrl: "/images/partners/veolia.png", color: "#E30613" },
  { name: "Stihl", url: "https://stihl.cz", logoUrl: "/images/partners/stihl.png", color: "#F47B00" },
  { name: "Sage", url: "https://sage.com", logoUrl: "/images/partners/sage.png", color: "#00B140" },
  { name: "Forescope", url: "https://forscope.eu", logoUrl: "/images/partners/forescope.png", color: "#1A1A1A" },
  { name: "AGRO CS", url: "https://agrocs.cz", logoUrl: "/images/partners/agrocs.png", color: "#6AA939" },
  { name: "Panasonic HAC", url: "https://panasonic.com", logoUrl: "/images/partners/panasonic_hac.png", color: "#003087" },
  { name: "NOARK", url: "https://noark-electric.com", logoUrl: "/images/partners/noark.png", color: "#E30613" },
  { name: "Fieldmann", url: "https://fieldmann.cz", logoUrl: "/images/partners/fieldmann.png", color: "#1A1A1A" },
  { name: "Pumpa", url: "https://pumpa.cz", logoUrl: "/images/partners/pumpa.png", color: "#1A1A1A" },
  { name: "IVF Cube", url: "https://ivfcube.com", logoUrl: "/images/partners/ivfcube.png", color: "#1A1A1A" },
  { name: "Sodastream", url: "https://sodastream.cz", logoUrl: "/images/partners/sodastream.png", color: "#00AEEF" },
  { name: "CBRE", url: "https://cbre.com", logoUrl: "/images/partners/cbre.png", color: "#006A4D" },
  { name: "Novartis", url: "https://novartis.com", logoUrl: "/images/partners/novartis.png", color: "#005CA9" },
  { name: "Sencor", url: "https://sencor.eu", logoUrl: "/images/partners/sencor.png", color: "#E2001A" },
  { name: "Catler", url: "https://catler.cz", logoUrl: "/images/partners/catler.png", color: "#1A1A1A" },
  { name: "Isover", url: "https://isover.cz", logoUrl: "/images/partners/isover.png", color: "#6AA939" },
  { name: "Retlux", url: "https://retlux.eu", logoUrl: "/images/partners/retlux.png", color: "#E30613" },
  { name: "VEKA", url: "https://veka.cz", logoUrl: "/images/partners/veka.png", color: "#005FA8" },
  { name: "Natura", url: null, logoUrl: "/images/partners/natura.png", color: "#1A1A1A" },
  { name: "Schlieger", url: null, logoUrl: "/images/partners/schlieger.png", color: "#1A1A1A" },
  { name: "Butchi's", url: null, logoUrl: "/images/partners/butchis.png", color: "#1A1A1A" },
  { name: "Cosmonde", url: null, logoUrl: "/images/partners/cosmonde.png", color: "#1A1A1A" },
  { name: "ČLZ", url: null, logoUrl: "/images/partners/cluz.png", color: "#1A1A1A" },
  { name: "Buxton", url: null, logoUrl: "/images/partners/buxton.png", color: "#1A1A1A" },
  { name: "Floria Premium", url: null, logoUrl: "/images/partners/floria.png", color: "#1A1A1A" },
  { name: "Port 1560", url: null, logoUrl: "/images/partners/port1560.png", color: "#1A1A1A" },
  { name: "Stihl Timbersports", url: null, logoUrl: "/images/partners/stihl_timbersports.png", color: "#F47B00" },
  { name: "ÚNMZ", url: "https://unmz.cz", logoUrl: "/images/partners/unmz.png", color: "#1A1A1A" },
  { name: "ČAS", url: null, logoUrl: "/images/partners/cas.png", color: "#1A1A1A" },
  { name: "Agro", url: null, logoUrl: "/images/partners/agro.png", color: "#6AA939" },
  { name: "Fashion Arena", url: null, logoUrl: "/images/partners/fashionarena.png", color: "#1A1A1A" },
  { name: "Kristalon", url: null, logoUrl: "/images/partners/kristalon.png", color: "#1A1A1A" },
  { name: "Microsoft NGO", url: "https://microsoft.com", logoUrl: "/images/partners/microsoftngo.png", color: "#0078D4" },
  { name: "Moët Hennessy", url: "https://moethennessy.com", logoUrl: "/images/partners/moethennesy.png", color: "#1A1A1A" },
  { name: "Mostek Energo", url: null, logoUrl: "/images/partners/mostekenergo.png", color: "#1A1A1A" },
  { name: "Orea Hotels", url: "https://orea.cz", logoUrl: "/images/partners/orea.png", color: "#C8963C" },
  { name: "RSJ", url: "https://rsj.com", logoUrl: "/images/partners/rsj.png", color: "#1A1A1A" },
  { name: "Vitality Komplex", url: null, logoUrl: "/images/partners/vitalitykomplex.png", color: "#1A1A1A" },
  { name: "Vize 97", url: null, logoUrl: "/images/partners/vize97.png", color: "#1A1A1A" },
  { name: "XT Card", url: null, logoUrl: "/images/partners/xtcard.png", color: "#1A1A1A" },
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
      logoUrl: p.logoUrl,
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
