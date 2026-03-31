"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("phx-cookies");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("phx-cookies", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("phx-cookies", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[200]
        transform transition-transform duration-500 ease-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="bg-[#111]/95 backdrop-blur-sm border-t border-red/30 safe-bottom">
        <div className="max-w-[1200px] mx-auto px-4 md:px-14 py-3 md:py-5 flex items-center gap-3 md:gap-8">
          {/* Dot + text */}
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0 mt-1.5" />
            <p className="text-[12px] md:text-[13px] font-light text-white/70 leading-snug">
              {t("text")}{" "}
              <a
                href="#"
                className="text-red/70 hover:text-red transition-colors"
              >
                {t("more")}
              </a>
            </p>
          </div>

          {/* Buttons - inline, compact */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="text-[10px] md:text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 hover:text-white/70 transition-colors px-3 py-2 border border-white/10 hover:border-white/20"
            >
              {t("decline")}
            </button>
            <button
              onClick={accept}
              className="text-[10px] md:text-[11px] font-medium tracking-[0.06em] uppercase text-white bg-red hover:bg-red-dark transition-colors px-4 py-2"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
