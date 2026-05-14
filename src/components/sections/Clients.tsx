import { getTranslations } from "next-intl/server";
import MarqueeTrack from "@/components/ui/MarqueeTrack";
import { getActivePartners } from "@/lib/partners";

const FALLBACK_PARTNERS: { name: string; logo: string }[] = [
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

async function loadPartners(): Promise<{ name: string; logo?: string }[]> {
  try {
    const dbPartners = await getActivePartners();
    if (dbPartners.length > 0) {
      return dbPartners.map((p) => ({
        name: p.name,
        logo: p.logoUrl ?? undefined,
      }));
    }
  } catch {
    // DB unavailable (missing env vars, network…) — fall through to static list
  }
  return FALLBACK_PARTNERS;
}

export default async function Clients() {
  const t = await getTranslations("clients");
  const refItems: string[] = t.raw("refItems");

  const items = await loadPartners();
  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid);

  return (
    <section id="clients" className="bg-gray-100 px-5 py-10 md:px-[60px] md:py-[120px]">
      <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-red mb-5">
        {t("label")}
      </p>
      <h2 className="font-syne text-[22px] sm:text-[clamp(24px,2.5vw,36px)] font-medium text-black leading-[1.15] mb-3 md:mb-4 whitespace-pre-line">
        {t("title")}
      </h2>
      <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-gray-600 max-w-[600px] mb-8 md:mb-12">
        {t("desc")}
      </p>

      <div className="flex flex-col gap-2 md:gap-3 mb-10 md:mb-16">
        {row1.length > 0 && <MarqueeTrack partners={row1} direction="left" speed={40} />}
        {row2.length > 0 && <MarqueeTrack partners={row2} direction="right" speed={35} />}
      </div>

      <div className="bg-white border-l-4 border-red p-5 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start">
        <div>
          <h3 className="font-syne text-[17px] font-medium text-black mb-5 leading-[1.4]">
            {t("refTitle")}
          </h3>
          <ul className="flex flex-col gap-3">
            {refItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-block w-5 h-px bg-red flex-shrink-0 mt-2.5" />
                <span className="text-sm font-light text-gray-600 leading-[1.6]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="#contact"
          className="font-syne text-[12px] font-semibold tracking-[0.1em] uppercase text-red flex items-center gap-2.5 hover:gap-4 transition-all whitespace-nowrap"
        >
          {t("refCta")}
        </a>
      </div>
    </section>
  );
}
