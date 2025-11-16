export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-slate-900/60 bg-slate-950"
    >
      {/* Ambiance KOSMONDE */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde relative flex flex-col gap-12 py-20 sm:py-24 lg:flex-row lg:items-center">
        {/* COLONNE GAUCHE */}
        <div className="max-w-xl space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Création de sites web
          </span>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl xl:text-6xl">
            Des sites web clairs, modernes et efficaces
            <span className="block text-sky-300">
              pour les petites structures ambitieuses.
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            KOSMONDE t’accompagne dans la création d’un site simple à comprendre,
            agréable à utiliser et facile à faire évoluer. Idéal pour indépendants,
            petites entreprises, artistes et projets créatifs.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] transition-transform hover:-translate-y-0.5 hover:brightness-110"
            >
              Demander un site web ↗
            </a>
            <a
              href="#projets"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-100 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/70 transition-colors"
            >
              Voir les projets
            </a>
          </div>

          <p className="text-xs text-slate-400">
            100% sur mesure · Mobile-friendly · Explications simples
          </p>
        </div>

        {/* COLONNE DROITE : PREVIEW KOSMONDE */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md group">
            {/* Ornements derrière la carte */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] border border-slate-800/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_55%)] opacity-70 blur-sm" />
            <div className="pointer-events-none absolute -right-10 -top-8 h-20 w-20 rounded-full border border-sky-500/40 opacity-50" />
            <div className="pointer-events-none absolute -left-6 bottom-0 h-16 w-16 rounded-full border border-slate-700/60 opacity-40" />

            <div className="relative rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/95 to-slate-950 shadow-[0_22px_60px_rgba(15,23,42,0.95)] px-4 py-4 sm:px-5 sm:py-5 transition-transform duration-500 group-hover:-translate-y-1">
              {/* Barre du haut */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-[11px] text-slate-400">
                  Aperçu d&apos;un site KOSMONDE
                </span>
              </div>

              <div className="space-y-4 pt-4 text-xs text-slate-300">
                {/* Hero du site */}
                <div className="h-32 rounded-2xl border border-slate-800/80 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),linear-gradient(to_br,#020617,#0f172a)] shadow-[0_16px_40px_rgba(15,23,42,0.9)]" />

                {/* Deux blocs de contenu */}
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 space-y-2">
                    <div className="h-2.5 w-20 rounded-full bg-slate-700/80" />
                    <div className="h-2 w-28 rounded-full bg-slate-800/80" />
                    <div className="h-2 w-16 rounded-full bg-slate-800/70" />
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 space-y-2">
                    <div className="h-2.5 w-16 rounded-full bg-sky-500/70" />
                    <div className="h-2 w-24 rounded-full bg-slate-800/80" />
                    <div className="h-2 w-20 rounded-full bg-slate-800/70" />
                  </div>
                </div>

                {/* Bande CTA */}
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="h-2.5 w-24 rounded-full bg-slate-700/80" />
                    <div className="h-2 w-32 rounded-full bg-slate-800/80" />
                  </div>
                  <div className="h-7 w-20 rounded-full bg-sky-400/90 shadow-[0_12px_30px_rgba(8,47,73,0.9)]" />
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Un design sobre, lisible et facile à parcourir. L’objectif :
                  que ton visiteur comprenne en quelques secondes ce que tu
                  proposes, et trouve rapidement ce qu’il cherche.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
