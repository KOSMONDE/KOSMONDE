import { Header } from "../../components/Header";
import { ProjectsSection } from "../../components/ProjectsSection";
import { ContactSection } from "../../components/ContactSection";
import { Footer } from "../../components/Footer";

export default function ProjetsPage() {
  return (
    <main className="bg-slate-950 text-slate-50">
      <Header />

      {/* Section des projets */}
      <ProjectsSection />

      {/* Section contact pour inciter à te joindre après avoir vu les travaux */}
      <ContactSection />

      <Footer />
    </main>
  );
}
