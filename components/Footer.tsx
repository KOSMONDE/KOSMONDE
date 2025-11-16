export function Footer() {
  return (
    <footer className="relative border-t border-slate-900/60 bg-slate-950 overflow-hidden">
      {/* Glow subtil global */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.06),transparent_70%)] opacity-40" />

      <div className="container-kosmonde py-10 flex flex-col gap-10 md:flex-row md:justify-between md:items-start">
        {/* Bloc texte gauche */}
        <div className="space-y-3 max-w-xs">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-400">
            K O S M O N D E
          </p>

          <p className="text-sm text-slate-400 leading-relaxed">
            Création de sites web clairs, modernes et efficaces.
            Un accompagnement simple, structuré, pensé pour les petites
            structures ambitieuses.
          </p>

          <a
            href="mailto:contact@kosmonde.ch"
            className="inline-block text-xs text-sky-300 hover:text-sky-200"
          >
            contact@kosmonde.ch
          </a>
        </div>

        {/* Navigation */}
        <div className="space-y-3 text-xs text-slate-400">
          <p className="font-medium text-slate-300 tracking-wide uppercase text-[10px]">
            Navigation
          </p>
          <nav className="flex flex-col space-y-1">
            <a href="#hero" className="hover:text-sky-300 transition">
              Accueil
            </a>
            <a href="#projets" className="hover:text-sky-300 transition">
              Projets
            </a>
            <a href="#services" className="hover:text-sky-300 transition">
              Services
            </a>
            <a href="#tarifs" className="hover:text-sky-300 transition">
              Tarifs
            </a>
            <a href="#a-propos" className="hover:text-sky-300 transition">
              À propos
            </a>
            <a href="#contact" className="hover:text-sky-300 transition">
              Contact
            </a>
          </nav>
        </div>

        {/* Bloc droit : contexte studio */}
        <div className="space-y-2 text-xs text-slate-500 md:text-right">
          <p className="text-slate-300">
            Studio web indépendant basé en Suisse
          </p>
          <p>Disponible à distance pour les petites structures ambitieuses.</p>
          <p className="text-[10px] text-slate-600">
            Simplicité · Clarté · Structure
          </p>
        </div>
      </div>

      {/* Ligne finale */}
      <div className="border-t border-slate-900/70 py-3 text-center text-[10px] text-slate-600">
        © {new Date().getFullYear()} KOSMONDE — Tous droits réservés.
      </div>
    </footer>
  );
}
