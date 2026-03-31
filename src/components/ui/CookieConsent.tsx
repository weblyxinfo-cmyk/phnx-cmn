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
      <div className="bg-[#111] border-t border-red/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-14 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          {/* Icon + text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0 mt-2" />
            <div>
              <p className="text-[13px] font-light text-white/70 leading-relaxed">
                {t("text")}
              </p>
              <a
                href="#"
                className="text-[11px] text-red/70 hover:text-red transition-colors mt-1 inline-block"
              >
                {t("more")}
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={decline}
              className="text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 hover:text-white/70 transition-colors px-4 py-2.5 border border-white/10 hover:border-white/20"
            >
              {t("decline")}
            </button>
            <button
              onClick={accept}
              className="text-[11px] font-medium tracking-[0.06em] uppercase text-white bg-red hover:bg-red-dark transition-colors px-5 py-2.5"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
