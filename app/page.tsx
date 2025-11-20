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
      {/* 1. Header */}
      <Header />

      {/* 2. Hero : accroche + promesse */}
      <HeroSection />

      {/* 3. À propos : humaniser et donner confiance */}
      <AProposSection />

      {/* 4. Services : solutions proposées */}
      <ServicesSection />

      {/* 5. Processus : rassurer le client */}
      <ProcessSection />

      {/* 6. Portfolio : preuves concrètes */}
      <ProjectsSection />

      {/* 7. Pourquoi : besoins + problèmes */}
      <PourquoiSection />

      {/* 8. FAQ : répondre aux objections */}
      <MiniFAQ />

      {/* 9. Contact : convertir */}
      <ContactSection />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
