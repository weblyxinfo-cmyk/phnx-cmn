import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans-var",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phoenix Communication — Admin",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={dmSans.variable}>
      <body
        className="min-h-screen"
        style={{
          fontFamily: "var(--font-dm-sans-var), sans-serif",
          fontWeight: 300,
          background: "#F5F4F2",
          color: "#111",
        }}
      >
        {children}
      </body>
    </html>
  );
}
