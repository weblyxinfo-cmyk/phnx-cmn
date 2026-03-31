import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Expertise from "@/components/sections/Expertise";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <Expertise />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
