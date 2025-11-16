import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { PourQuiSection } from "../components/PourQuiSection";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { PourquoiEtTarifsSection } from "../components/PourquoiEtTarifsSection";
import { AProposSection } from "../components/AProposSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { TrustCarousel } from "../components/TrustCarousel";

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-50">
      <Header />
      <HeroSection />
      <PourQuiSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <PourquoiEtTarifsSection />
      <AProposSection />
      <TrustCarousel />
      <ContactSection />
      <Footer />
    </main>
  );
}
