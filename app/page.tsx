import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { PourquoiSection } from "../components/PourquoiSection";
import { AProposSection } from "../components/AProposSection";
import { ContactSection } from "../components/ContactSection";
import { MiniFAQ } from "../components/MiniFAQ";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-50">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <PourquoiSection />
      <AProposSection />
      <ContactSection />
      <MiniFAQ />
      <Footer />
    </main>
  );
}
