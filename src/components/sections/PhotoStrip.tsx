import Image from "next/image";
import { getActivePartners } from "@/lib/partners";

const FALLBACK_LOGOS: { name: string; logo: string }[] = [
  { name: "Dermacol", logo: "/images/partners/dermacol.png" },
  { name: "Veolia", logo: "/images/partners/veolia.png" },
  { name: "Stihl", logo: "/images/partners/stihl.png" },
  { name: "Sage", logo: "/images/partners/sage.png" },
  { name: "Forescope", logo: "/images/partners/forescope.png" },
  { name: "AGRO CS", logo: "/images/partners/agrocs.png" },
  { name: "Panasonic HAC", logo: "/images/partners/panasonic_hac.png" },
  { name: "NOARK", logo: "/images/partners/noark.png" },
  { name: "Fieldmann", logo: "/images/partners/fieldmann.png" },
  { name: "Pumpa", logo: "/images/partners/pumpa.png" },
  { name: "IVF Cube", logo: "/images/partners/ivfcube.png" },
  { name: "Sodastream", logo: "/images/partners/sodastream.png" },
  { name: "CBRE", logo: "/images/partners/cbre.png" },
  { name: "Novartis", logo: "/images/partners/novartis.png" },
  { name: "Sencor", logo: "/images/partners/sencor.png" },
  { name: "Catler", logo: "/images/partners/catler.png" },
  { name: "Isover", logo: "/images/partners/isover.png" },
  { name: "Retlux", logo: "/images/partners/retlux.png" },
  { name: "VEKA", logo: "/images/partners/veka.png" },
  { name: "Natura", logo: "/images/partners/natura.png" },
  { name: "Schlieger", logo: "/images/partners/schlieger.png" },
  { name: "Butchi's", logo: "/images/partners/butchis.png" },
  { name: "Cosmonde", logo: "/images/partners/cosmonde.png" },
  { name: "ČLZ", logo: "/images/partners/cluz.png" },
  { name: "Buxton", logo: "/images/partners/buxton.png" },
  { name: "Floria Premium", logo: "/images/partners/floria.png" },
  { name: "Port 1560", logo: "/images/partners/port1560.png" },
  { name: "Stihl Timbersports", logo: "/images/partners/stihl_timbersports.png" },
  { name: "ÚNMZ", logo: "/images/partners/unmz.png" },
  { name: "ČAS", logo: "/images/partners/cas.png" },
  { name: "Agro", logo: "/images/partners/agro.png" },
  { name: "Fashion Arena", logo: "/images/partners/fashionarena.png" },
  { name: "Kristalon", logo: "/images/partners/kristalon.png" },
  { name: "Microsoft NGO", logo: "/images/partners/microsoftngo.png" },
  { name: "Moët Hennessy", logo: "/images/partners/moethennesy.png" },
  { name: "Mostek Energo", logo: "/images/partners/mostekenergo.png" },
  { name: "Orea Hotels", logo: "/images/partners/orea.png" },
  { name: "RSJ", logo: "/images/partners/rsj.png" },
  { name: "Vitality Komplex", logo: "/images/partners/vitalitykomplex.png" },
  { name: "Vize 97", logo: "/images/partners/vize97.png" },
  { name: "XT Card", logo: "/images/partners/xtcard.png" },
];

async function loadLogos(): Promise<{ name: string; logo: string }[]> {
  try {
    const dbPartners = await getActivePartners();
    const withLogos = dbPartners
      .filter((p) => p.logoUrl)
      .map((p) => ({ name: p.name, logo: p.logoUrl as string }));
    if (withLogos.length > 0) return withLogos;
  } catch {
    // DB unavailable — fall through
  }
  return FALLBACK_LOGOS;
}

export default async function PhotoStrip() {
  const logos = await loadLogos();
  const tripled = [...logos, ...logos, ...logos];

  return (
    <section
      aria-label="Phoenix Communication klienti a partneři"
      className="w-full bg-black overflow-hidden"
    >
      <div
        className="flex animate-marquee-l"
        style={{ animationDuration: "60s" }}
      >
        {tripled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="relative h-[88px] md:h-[156px] aspect-square flex-shrink-0 border-r border-white/[0.04] flex items-center justify-center p-4 md:p-6"
          >
            <Image
              src={item.logo}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 88px, 156px"
              className="object-contain p-4 md:p-6 brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
