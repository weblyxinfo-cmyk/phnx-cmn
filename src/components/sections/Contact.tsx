"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  const infoRows = [
    {
      labelKey: "company",
      render: (
        <span>
          {t("values.company")}
          <br />
          <span className="text-gray-500 text-xs">{t("values.companyNote")}</span>
        </span>
      ),
    },
    {
      labelKey: "address",
      render: (
        <span className="whitespace-pre-line">{t("values.address")}</span>
      ),
    },
    {
      labelKey: "phone",
      render: (
        <a
          href={`tel:${t("values.phone").replace(/\s/g, "")}`}
          className="text-gray-300 hover:text-red transition-colors"
        >
          {t("values.phone")}
        </a>
      ),
    },
    {
      labelKey: "email",
      render: (
        <a
          href={`mailto:${t("values.email")}`}
          className="text-gray-300 hover:text-red transition-colors break-all"
        >
          {t("values.email")}
        </a>
      ),
    },
    {
      labelKey: "ico",
      render: <span>{t("values.ico")}</span>,
    },
  ];

  return (
    <section id="contact" className="bg-black px-5 py-12 md:px-14 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Left */}
        <div>
          <p className="font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-5">
            {t("num")} &mdash; {t("label")}
          </p>

          <h2 className="font-syne text-[24px] sm:text-[clamp(28px,3.5vw,48px)] font-medium text-white leading-[1.1] mb-8 md:mb-12 whitespace-pre-line">
            {t("title")}
          </h2>

          <p className="text-sm font-light text-gray-500 mb-6 md:mb-8">
            {t("desc")}
          </p>

          {/* Info grid */}
          <div className="flex flex-col">
            {infoRows.map((row) => (
              <div
                key={row.labelKey}
                className="flex flex-col gap-1 py-4 border-b border-white/[0.07] sm:grid sm:grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] sm:gap-0"
              >
                <span className="font-syne text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-red/85">
                  {t(`labels.${row.labelKey}`)}
                </span>
                <span className="text-sm font-light text-gray-300 leading-[1.7]">
                  {row.render}
                </span>
              </div>
            ))}
          </div>

          {/* Logo block */}
          <div className="mt-10 md:mt-12 pt-8 md:pt-9 border-t border-white/[0.08] flex items-center gap-5">
            <Image
              src="/images/phoenix-logo-contact.png"
              alt="Phoenix Communication"
              width={120}
              height={44}
              className="h-[36px] md:h-[44px] w-auto opacity-70 mix-blend-screen"
            />
            <span className="text-xs text-gray-600 font-light">
              phoenixcom.cz
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col">
          {/* Building photo */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/sidlo.jpg"
              alt={t("photoCaption")}
              width={800}
              height={320}
              className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover grayscale-[15%]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
              <p className="font-syne text-[12px] md:text-[13px] font-medium text-white mb-1">
                {t("photoCaption")}
              </p>
              <p className="text-[10px] md:text-[11px] font-light text-white/60">
                {t("photoCaptionNote")}
              </p>
            </div>
          </div>

          {/* Google Maps */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.0!2d14.4278!3d50.0833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94ee4cc39ef1%3A0x9c4e8d2f43f7e8a0!2sOpletalova%20918%2F7%2C%20110%2000%20Nov%C3%A9%20M%C4%9Bsto!5e0!3m2!1scs!2scz!4v1710000000000!5m2!1scs!2scz"
            className="w-full h-[200px] md:h-[260px] border-0 grayscale-[40%] invert-[90%] hue-rotate-180 opacity-85"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
