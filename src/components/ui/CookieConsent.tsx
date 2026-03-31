"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("phx-cookies");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
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
        <div className="max-w-[1200px] mx-auto px-4 md:px-14 py-2.5 md:py-4 flex items-center gap-3 md:gap-6">
          <p className="text-[11px] md:text-[13px] font-light text-white/60 leading-tight flex-1 min-w-0">
            Cookies{" "}
            <a href="#" className="text-red/60 hover:text-red transition-colors">
              {t("more")}
            </a>
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="text-[10px] font-medium tracking-[0.04em] uppercase text-white/30 hover:text-white/60 transition-colors px-2.5 py-1.5"
            >
              {t("decline")}
            </button>
            <button
              onClick={accept}
              className="text-[10px] font-medium tracking-[0.04em] uppercase text-white bg-red hover:bg-red-dark transition-colors px-3.5 py-1.5 rounded-sm"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
