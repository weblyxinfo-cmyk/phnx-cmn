"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactFormBlock() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("website") ?? "");

    if (honeypot) {
      // bot — silently succeed
      setStatus("success");
      form.reset();
      return;
    }
    if (!name || !email || !message) {
      setErrorMsg(t("errorRequired"));
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrorMsg(t("errorEmail"));
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg(t("errorGeneric"));
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 md:mt-10 border-t border-white/10 pt-8 md:pt-10"
      noValidate
    >
      <p className="font-syne text-[12px] font-semibold tracking-[0.18em] uppercase text-red mb-5">
        {t("title")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="block text-[11px] tracking-[0.1em] uppercase text-white/50 mb-1.5">
            {t("name")} *
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className="w-full bg-transparent border border-white/15 text-[14px] font-light text-white px-3 py-2.5 outline-none focus:border-red transition-colors placeholder:text-white/25"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] tracking-[0.1em] uppercase text-white/50 mb-1.5">
            {t("email")} *
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className="w-full bg-transparent border border-white/15 text-[14px] font-light text-white px-3 py-2.5 outline-none focus:border-red transition-colors placeholder:text-white/25"
          />
        </label>
      </div>

      <label className="block mb-4">
        <span className="block text-[11px] tracking-[0.1em] uppercase text-white/50 mb-1.5">
          {t("company")}
        </span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={t("companyPlaceholder")}
          className="w-full bg-transparent border border-white/15 text-[14px] font-light text-white px-3 py-2.5 outline-none focus:border-red transition-colors placeholder:text-white/25"
        />
      </label>

      <label className="block mb-5">
        <span className="block text-[11px] tracking-[0.1em] uppercase text-white/50 mb-1.5">
          {t("message")} *
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="w-full bg-transparent border border-white/15 text-[14px] font-light text-white px-3 py-2.5 outline-none focus:border-red transition-colors placeholder:text-white/25 resize-y"
        />
      </label>

      {/* Honeypot — hidden from users, visible to bots */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-red text-white font-syne text-[12px] font-semibold tracking-[0.1em] uppercase px-6 py-3 cursor-pointer hover:bg-[#a01c17] transition-colors disabled:opacity-50"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
        {status === "success" && (
          <span className="text-[13px] font-light text-green-400">
            {t("success")}
          </span>
        )}
        {status === "error" && (
          <span className="text-[13px] font-light text-red-300">
            {errorMsg || t("errorGeneric")}
          </span>
        )}
      </div>
    </form>
  );
}
