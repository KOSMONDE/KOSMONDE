type IconProps = {
  className?: string;
};

/* Icônes sociales simples en SVG */
function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        ry="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="7" y="10" width="2" height="7" fill="currentColor" />
      <circle cx="8" cy="7" r="1.2" fill="currentColor" />
      <path
        d="M12 10h2v1.1c.3-.7.9-1.2 1.9-1.2 1.3 0 2.1.8 2.1 2.4V17h-2v-4.1c0-.8-.3-1.2-.9-1.2-.6 0-1.1.4-1.1 1.3V17h-2v-7z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3.5A8.5 8.5 0 0 0 4.1 16L3 20.5 7.6 19.4A8.5 8.5 0 1 0 12 3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9.5 9.1c.2-.4.3-.4.6-.4h.5c.2 0 .4 0 .5.3.2.4.5 1 .6 1.1.1.1.1.2 0 .3-.1.2-.2.3-.4.5-.1.1-.2.2-.1.4.1.2.6 1 1.4 1.6.7.4.9.4 1.1.3.3-.2.5-.6.8-.9.1-.2.3-.2.5-.1l1.1.5c.3.1.5.3.5.5-.1.5-.4 1.2-1 1.6-.5.4-1 .4-1.7.4-.9 0-1.9-.3-2.8-.9-.8-.5-1.8-1.5-2.3-2.2-.3-.4-.7-1.1-.9-1.7-.3-.8-.3-1.5-.3-1.9 0-.4.2-.7.4-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-900/60 bg-[#0A111C] overflow-hidden">
      {/* Glow léger */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.05),transparent_70%)]" />

      <div className="container-kosmonde py-12">
        {/* 4 colonnes réparties régulièrement, responsive */}
        <div className="mx-auto max-w-6xl flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Colonne 1 : texte studio */}
          <div className="md:w-1/4 space-y-4">
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
          <div className="md:w-1/4 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Navigation
            </p>

            <nav className="flex flex-col space-y-1.5 text-xs text-slate-400">
              <a href="#hero" className="hover:text-sky-300 transition">
                Accueil
              </a>
              <a href="#projets" className="hover:text-sky-300 transition">
                Projets
              </a>
              <a href="#services" className="hover:text-sky-300 transition">
                Services
              </a>
              <a href="#a-propos" className="hover:text-sky-300 transition">
                À propos
              </a>
              <a href="/faq" className="hover:text-sky-300 transition">
                FAQ
              </a>
              <a href="#contact" className="hover:text-sky-300 transition">
                Contact
              </a>
            </nav>
          </div>

          {/* Colonne 3 : réseaux sociaux */}
          <div className="md:w-1/4 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Réseaux
            </p>

            <p className="text-xs text-slate-400">
              Suivre le studio et voir les coulisses des projets.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/kosmonde/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 hover:text-sky-300 hover:border-sky-500 transition"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 hover:text-sky-300 hover:border-sky-500 transition"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 hover:text-sky-300 hover:border-sky-500 transition"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Colonne 4 : phrase + CTA */}
          <div className="md:w-1/4 space-y-4 md:text-right">
            <p className="text-sm text-slate-300 leading-relaxed">
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
