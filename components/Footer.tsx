import Link from "next/link";

type IconProps = {
  className?: string;
};

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
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
    <footer className="relative overflow-hidden border-t border-slate-900/60 bg-[#0A111C]">
      {/* Glow de fond */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.05),transparent_70%)]" />

      <div className="container-kosmonde py-10 sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Colonne 1 – Identité */}
          <div className="space-y-4 text-center md:w-1/4 md:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-300">
              KOSMONDE
            </p>

            <p className="text-sm leading-relaxed text-slate-200">
              Studio web indépendant basé en Suisse.
              Sites clairs, sobres et utiles pour les petites structures ambitieuses.
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                href="mailto:contact@kosmonde.ch"
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-900/70 px-3 py-1.5 text-xs text-sky-200 transition hover:border-sky-300 hover:text-sky-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>contact@kosmonde.ch</span>
              </a>
            </div>
          </div>

          {/* Colonne 2 – Navigation */}
          <div className="space-y-3 text-center md:w-1/4 md:text-left">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">
              Navigation
            </p>

            <nav className="flex flex-col space-y-1.5 text-xs text-slate-200">
              <Link href="/#hero" className="transition hover:text-sky-300">
                Accueil
              </Link>
              <Link href="/#projets" className="transition hover:text-sky-300">
                Projets
              </Link>
              <Link href="/#services" className="transition hover:text-sky-300">
                Services
              </Link>
              <Link href="/#a-propos" className="transition hover:text-sky-300">
                À propos
              </Link>
              <Link href="/faq" className="transition hover:text-sky-300">
                FAQ
              </Link>
              <Link href="/#contact" className="transition hover:text-sky-300">
                Contact
              </Link>
            </nav>
          </div>

          {/* Colonne 3 – Réseaux */}
          <div className="space-y-3 text-center md:w-1/4 md:text-left">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">
              Réseaux
            </p>

            <p className="text-xs text-slate-200">
              Suivre le studio et voir les coulisses des projets.
            </p>

            <div className="flex items-center justify-center gap-3 md:justify-start">
              <a
                href="https://www.instagram.com/kosmonde/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-sky-500 hover:text-sky-300 md:h-8 md:w-8"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-sky-500 hover:text-sky-300 md:h-8 md:w-8"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-sky-500 hover:text-sky-300 md:h-8 md:w-8"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>

            <p className="text-[11px] text-slate-300">
              Discuter d’un projet ou poser une question rapide.
            </p>
          </div>

          {/* Colonne 4 – Positionnement + CTA */}
          <div className="space-y-4 text-center md:w-1/4 md:text-right">
            <p className="text-sm leading-relaxed text-slate-300">
              Un site simple, lisible et aligné avec votre réalité.
            </p>

            <Link
              href="/#contact"
              className="text-xs text-sky-300 transition hover:text-sky-200"
            >
              Discuter de votre projet ↗
            </Link>

            <p className="text-[10px] text-slate-400">
              Simplicité · Clarté · Structure
            </p>
          </div>
        </div>
      </div>

      {/* Bas de page : copyright + liens légaux */}
      <div className="border-t border-slate-900/70 py-3">
        <div className="container-kosmonde">
          <div className="flex flex-col items-center justify-center gap-1 text-center text-[10px] text-slate-400 md:flex-row md:gap-3">
            <span>© {year} KOSMONDE — Tous droits réservés.</span>
            <div className="flex items-center gap-3">
              <Link
                href="/mentions-legales"
                className="transition hover:text-sky-300"
              >
                Mentions légales
              </Link>
              <span className="text-slate-700">•</span>
              <Link
                href="/politique-confidentialite"
                className="transition hover:text-sky-300"
              >
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
