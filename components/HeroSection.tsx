import { HeroSitePreview } from "@/components/HeroSitePreview";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-slate-900/60 bg-slate-950"
    >
      {/* Ambiance KOSMONDE */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.35),transparent_55%)]" />

      {/* MOBILE optimisé / Desktop inchangé */}
      <div className="container-kosmonde relative flex flex-col gap-8 py-14 sm:py-20 lg:flex-row lg:items-center lg:gap-12">
        
        {/* COLONNE GAUCHE */}
        <div className="max-w-xl space-y-7">
          
          {/* Tag */}
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Création de sites web sur mesure
          </span>

          {/* Titre */}
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl xl:text-6xl max-w-sm sm:max-w-none">
            Des sites web clairs, modernes et efficaces
            <span className="block text-sky-300">
              pour valoriser votre activité en ligne.
            </span>
          </h1>

          {/* Paragraphe */}
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Un site simple, efficace et évolutif. Parfait pour les petites structures ambitieuses.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] transition-transform hover:-translate-y-0.5 hover:brightness-110"
            >
              Parler de votre projet ↗
            </a>

            <a
              href="#projets"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-100 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/70 transition-colors"
            >
              Voir les projets
            </a>
          </div>

          {/* Texte final — ✔️ une seule ligne sur tablet/desktop, pas de dépassement mobile */}
          <p className="text-[13px] text-slate-400 sm:text-xs whitespace-normal sm:whitespace-nowrap">
            Un site clair, fiable et responsive. Sur mesure, expliqué simplement.
          </p>
        </div>

        {/* COLONNE DROITE */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md group">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] border border-slate-800/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_55%)] opacity-70 blur-sm" />
            <div className="pointer-events-none absolute -right-10 -top-8 h-20 w-20 rounded-full border border-sky-500/40 opacity-50" />
            <div className="pointer-events-none absolute -left-6 bottom-0 h-16 w-16 rounded-full border border-slate-700/60 opacity-40" />

            <HeroSitePreview />
          </div>
        </div>

      </div>
    </section>
  );
}
