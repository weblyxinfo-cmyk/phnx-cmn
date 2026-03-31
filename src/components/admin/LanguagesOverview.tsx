"use client";

const LANGUAGES = [
  {
    flag: "🇨🇿",
    name: "Čeština (CZ)",
    note: "Výchozí jazyk — vždy aktivní",
    status: "active" as const,
  },
  {
    flag: "🇸🇰",
    name: "Slovenčina (SK)",
    note: "Čeká na dodání textů klientem",
    status: "warn" as const,
  },
  {
    flag: "🇬🇧",
    name: "English (EN)",
    note: "Čeká na dodání textů klientem",
    status: "warn" as const,
  },
];

export default function LanguagesOverview() {
  return (
    <div>
      <div className="text-[22px] font-medium mb-1.5">Jazykové verze</div>
      <div className="text-[13px] text-[#999] mb-8 leading-relaxed">
        Přepínač jazyků CZ / SK / EN je na webu aktivní. Překlady pro SK a EN
        doplní vývojář Weblyx po dodání textů.
      </div>

      <div className="bg-white border border-[#E8E6E2] p-7">
        <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#555] mb-5 pb-3 border-b border-[#E8E6E2]">
          Stav jazyků
        </div>

        {LANGUAGES.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center justify-between px-4 py-3.5 border border-[#E8E6E2] mb-2 bg-[#fafaf9]"
          >
            <div className="flex items-center gap-3">
              <span className="text-[22px]">{lang.flag}</span>
              <div>
                <div className="text-[13px] font-medium">{lang.name}</div>
                <div className="text-[11px] text-[#bbb] mt-0.5">
                  {lang.note}
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-medium px-2.5 py-1 ${
                lang.status === "active"
                  ? "text-[#4CAF50] bg-[#e8f5e9]"
                  : "text-[#FF9800] bg-[#fff3e0]"
              }`}
            >
              {lang.status === "active" ? "● Aktivní" : "⚠ Texty chybí"}
            </span>
          </div>
        ))}

        <div className="mt-5 p-4 bg-[#f9f8f6] border border-[#E8E6E2]">
          <div className="text-xs font-medium mb-2">
            Jak aktivovat SK / EN:
          </div>
          <ol className="text-xs text-[#777] leading-[1.9] pl-4 list-decimal">
            <li>
              Připravte překlady všech textů webu (hero, o agentuře, služby,
              kontakt)
            </li>
            <li>
              Zašlete je na <strong>weblyx@weblyx.cz</strong>
            </li>
            <li>
              Vývojář Weblyx texty zapracuje do webu do 2 pracovních dnů
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
