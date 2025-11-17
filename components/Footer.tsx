export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-900/60 bg-[#0A111C] overflow-hidden">
      {/* Glow léger */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.05),transparent_70%)]" />

      <div className="container-kosmonde py-12">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Colonne 1 : texte studio */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold tracking-[0.38em] text-slate-500 uppercase">
              KOSMONDE
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Studio web indépendant basé en Suisse.  
              Sites clairs, sobres et utiles pour petites structures ambitieuses.
            </p>

            <a
              href="mailto:contact@kosmonde.ch"
              className="text-xs text-sky-300 hover:text-sky-200"
            >
              contact@kosmonde.ch
            </a>
          </div>

          {/* Colonne 2 : navigation */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Navigation
            </p>

            <nav className="flex flex-col space-y-1.5 text-xs text-slate-400">
              <a href="#hero" className="hover:text-sky-300 transition">Accueil</a>
              <a href="#projets" className="hover:text-sky-300 transition">Projets</a>
              <a href="#services" className="hover:text-sky-300 transition">Services</a>
              <a href="#a-propos" className="hover:text-sky-300 transition">À propos</a>
              <a href="#contact" className="hover:text-sky-300 transition">Contact</a>
            </nav>
          </div>

          {/* Colonne 3 : réseaux sociaux */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Réseaux
            </p>

            <p className="text-xs text-slate-400">
              Suivre le studio et voir les coulisses des projets.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-[11px] text-slate-200 hover:text-sky-300 hover:border-sky-500 transition"
              >
                in
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-[11px] text-slate-200 hover:text-sky-300 hover:border-sky-500 transition"
              >
                ig
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-[11px] text-slate-200 hover:text-sky-300 hover:border-sky-500 transition"
              >
                gh
              </a>
            </div>
          </div>

          {/* Colonne 4 : phrase + CTA */}
          <div className="space-y-4 md:text-right">
            <p className="text-sm text-slate-300 leading-relaxed whitespace-nowrap">
              Un site simple, lisible et aligné avec ta réalité.
            </p>

            <a
              href="#contact"
              className="text-xs text-sky-300 hover:text-sky-200"
            >
              Discuter de ton projet ↗
            </a>

            <p className="text-[10px] text-slate-600">
              Simplicité · Clarté · Structure
            </p>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-slate-900/70 py-3 text-center text-[10px] text-slate-600">
        © {year} KOSMONDE — Tous droits réservés.
      </div>
    </footer>
  );
}
