export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-slate-900/60"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,1),_transparent_55%)]" />
      <div className="container-kosmonde relative flex flex-col gap-10 py-20 sm:py-24 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-6">
          <span className="badge">Création de sites web</span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl xl:text-6xl">
            Des sites web clairs, modernes et efficaces
            <span className="block text-sky-300">
              pour les petites structures ambitieuses.
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            KOSMONDE t’accompagne dans la création d’un site simple à
            comprendre, agréable à utiliser et facile à faire évoluer. Idéal
            pour indépendants, petites entreprises, artistes et projets
            créatifs.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-sky-400 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-sky-300"
            >
              Demander un site web
            </a>
            <a
              href="#projets"
              className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-500"
            >
              Voir les projets
            </a>
          </div>
          <p className="text-xs text-slate-400">
            100% sur mesure · Mobile-friendly · Explications simples
          </p>
        </div>

        <div className="flex-1">
          <div className="card-soft">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-[11px] text-slate-400">
                Aperçu d&apos;un site KOSMONDE
              </span>
            </div>
            <div className="space-y-3 pt-4 text-xs text-slate-300">
              <div className="h-32 rounded-xl bg-linear-to-br from-sky-500/20 via-slate-900 to-purple-500/10" />
              <div className="flex gap-3">
                <div className="h-16 flex-1 rounded-lg bg-slate-900/80" />
                <div className="h-16 flex-1 rounded-lg bg-slate-900/80" />
              </div>
              <div className="h-10 rounded-lg bg-slate-900/80" />
              <p className="text-[11px] text-slate-500">
                Un design sobre, lisible et facile à parcourir. L’objectif :
                que ton visiteur comprenne en quelques secondes ce que tu
                proposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
