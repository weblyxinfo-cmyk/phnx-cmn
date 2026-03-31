"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PartnerForm from "@/components/admin/PartnerForm";
import PartnerList from "@/components/admin/PartnerList";
import ContactForm from "@/components/admin/ContactForm";
import LanguagesOverview from "@/components/admin/LanguagesOverview";

interface Partner {
  id: number;
  name: string;
  url: string | null;
  logoUrl: string | null;
  color: string | null;
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      onLogin();
    } else {
      setError("Nesprávné heslo");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-2 h-2 rounded-full bg-[#C8251E]" />
          <span className="text-[13px] font-medium text-white tracking-[0.06em]">
            PHOENIX COMMUNICATION
          </span>
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo pro přístup"
            className="w-full border border-[#333] bg-[#1a1a1a] text-[13px] font-light text-white px-4 py-3 outline-none focus:border-[#C8251E] transition-colors"
          />
        </div>
        {error && (
          <div className="text-xs text-[#C8251E] mb-3">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-[#C8251E] text-white text-[11px] font-medium tracking-[0.08em] uppercase px-6 py-3 cursor-pointer hover:bg-[#a01c17] transition-colors"
        >
          Přihlásit se
        </button>
      </form>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [section, setSection] = useState("logos");
  const [partners, setPartners] = useState<Partner[]>([]);

  const loadPartners = useCallback(async () => {
    const res = await fetch("/api/partners");
    if (res.ok) {
      const data = await res.json();
      setPartners(data);
    }
  }, []);

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/auth", { method: "GET" })
      .then((r) => {
        if (r.ok) {
          setAuthenticated(true);
          loadPartners();
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, [loadPartners]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <div className="w-2 h-2 rounded-full bg-[#C8251E] animate-pulse" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <LoginForm
        onLogin={() => {
          setAuthenticated(true);
          loadPartners();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader />
      <div className="grid grid-cols-[200px_1fr] min-h-[calc(100vh-60px)]">
        <AdminSidebar active={section} onNavigate={setSection} />
        <main className="p-10 max-w-[900px]">
          {section === "logos" && (
            <div>
              <div className="text-[22px] font-medium mb-1.5">
                Klienti & partneři
              </div>
              <div className="text-[13px] text-[#999] mb-8 leading-relaxed">
                Správa firem zobrazených v animovaném pásu na webu. Každý záznam
                má název, logo a volitelný odkaz.
              </div>
              <div className="bg-[#f0f7ff] border-l-[3px] border-[#4a90d9] p-3.5 mb-6">
                <p className="text-xs text-[#2a5a8a] leading-[1.65]">
                  💡 Loga se zobrazují v animovaném pásu. Přetažením měníte
                  pořadí. Kliknutím na × záznam odstraníte. Logo: PNG/SVG s
                  průhledným pozadím, max 200 KB.
                </p>
              </div>
              <PartnerForm onAdded={loadPartners} />
              <PartnerList
                partners={partners}
                onRefresh={loadPartners}
              />
            </div>
          )}
          {section === "contact" && <ContactForm />}
          {section === "languages" && <LanguagesOverview />}
        </main>
      </div>
    </div>
  );
}
