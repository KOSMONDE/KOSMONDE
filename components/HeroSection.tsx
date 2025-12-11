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
      <div className="container-kosmonde relative flex flex-col gap-8 py-12 sm:py-18 lg:flex-row lg:items-center lg:gap-10">
        
        {/* COLONNE GAUCHE */}
        <div className="max-w-xl space-y-6">
          
          {/* Tag */}
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.28em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Studio web & SEO · Genève
          </span>

          {/* Titre */}
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-[46px] xl:text-[52px] max-w-2xl">
            Création de sites web rapides, SEO-ready et prêts à convertir
          </h1>

          {/* Paragraphe */}
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base max-w-xl">
            Studio web à Genève. Nous livrons des sites sur mesure sécurisés, rapides à charger, optimisés Google et pensés pour convertir vos prospects.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:pt-1 sm:justify-start justify-center items-center">
            <a
              href="#contact"
              aria-label="Parler de votre projet avec Kosmonde"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_12px_32px_rgba(8,47,73,0.65)] transition-transform hover:-translate-y-0.5 hover:brightness-110"
            >
              Parler de votre projet
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#projets"
              aria-label="Voir les projets Kosmonde"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-slate-800 px-6 py-2.5 text-sm font-medium text-slate-100 bg-slate-900/50 hover:border-sky-400/60 hover:bg-slate-900/70 transition-colors shadow-[0_10px_28px_rgba(8,47,73,0.35)]"
            >
              Voir les projets
            </a>
          </div>

          {/* Texte final */}
          <p className="text-xs text-slate-400 sm:text-xs text-center sm:text-left">
            Visio 15 min offerte · plan d’action sous 24 h.
          </p>
        </div>

        {/* COLONNE DROITE */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md group">
            <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[28px] border border-slate-800/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_55%)] opacity-70 blur-sm sm:-inset-6 sm:rounded-[32px]" />
            <div className="pointer-events-none absolute -right-8 -top-6 h-16 w-16 rounded-full border border-sky-500/40 opacity-50 sm:-right-10 sm:-top-8 sm:h-20 sm:w-20" />
            <div className="pointer-events-none absolute -left-4 bottom-2 h-12 w-12 rounded-full border border-slate-700/60 opacity-40 sm:-left-6 sm:bottom-0 sm:h-16 sm:w-16" />

            <div className="rounded-[24px] border border-slate-800/70 bg-slate-950/60 shadow-[0_24px_100px_rgba(8,47,73,0.35)] sm:rounded-[28px] sm:shadow-[0_30px_120px_rgba(8,47,73,0.45)]">
              <HeroSitePreview />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
