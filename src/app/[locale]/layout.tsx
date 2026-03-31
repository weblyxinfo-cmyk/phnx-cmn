import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Syne, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieConsent from "@/components/ui/CookieConsent";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne-var",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-var",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.metadata as { title: string; description: string };

  return {
    title: meta?.title || "Phoenix Communication",
    description: meta?.description || "",
    alternates: {
      languages: {
        cs: "/cs",
        sk: "/sk",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "cs" | "sk" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${syne.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
