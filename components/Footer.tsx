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
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33775867250";
  const whatsappMessage = encodeURIComponent("Bonjour Kosmonde");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const cardClass =
    "relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/90 p-4 sm:p-5 text-left text-sm text-slate-200 shadow-[0_10px_28px_rgba(15,23,42,0.35)] backdrop-blur-sm flex h-full min-h-[150px] flex-col gap-4 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_65%)]";

  return (
    <footer className="relative overflow-hidden border-t border-slate-900/60 bg-[#0A111C] scroll-m-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.04),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-slate-950 via-slate-900/60 to-slate-950" />

      <div className="container-kosmonde px-4 sm:px-6 py-8 sm:py-10">
        <div className="mx-auto grid max-w-5xl auto-rows-fr gap-4 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
          <div className={cardClass}>
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-200">
                KOSMONDE
              </h3>
              <div className="h-px w-12 bg-gradient-to-r from-sky-400/70 via-cyan-300/70 to-sky-400/70" />
              <p className="leading-snug text-slate-100">
                Studio web indépendant : cadrage d’offre, UX de conversion, sites vitrines et one-page qui transforment vos prospects en clients.
              </p>
            </div>
            <div className="pt-3">
              <Link
                href="/rdv"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_12px_26px_rgba(56,189,248,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                aria-label="Accéder à la page de prise de rendez-vous"
              >
                Prendre rendez-vous
                <span aria-hidden="true" className="text-base leading-none">↗</span>
              </Link>
            </div>
          </div>

          <div className={cardClass}>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Réseaux
              </h3>
              <div className="h-px w-12 bg-gradient-to-r from-sky-400/70 via-cyan-300/70 to-sky-400/70" />
              <p className="leading-snug text-slate-100">
                Suivez KOSMONDE et discutez en direct via nos canaux préférés.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/kosmonde/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group flex flex-col items-center gap-2 text-slate-200 transition"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 transition group-hover:-translate-y-0.5 group-hover:border-sky-500 group-hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 md:h-10 md:w-10">
                  <InstagramIcon className="h-5 w-5" />
                </span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="group flex flex-col items-center gap-2 text-slate-200 transition"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 transition group-hover:-translate-y-0.5 group-hover:border-sky-500 group-hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 md:h-10 md:w-10">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
              </a>
            </div>
          </div>

          <div className={cardClass}>
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Contact direct
              </h3>
              <div className="h-px w-12 bg-gradient-to-r from-sky-400/70 via-cyan-300/70 to-sky-400/70" />
              <a
                href="mailto:contact@kosmonde.ch"
                className="inline-flex items-center gap-2 text-sky-200 transition hover:text-sky-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                contact@kosmonde.ch
              </a>
              <p className="text-[11px] text-slate-300">
                Lun–Ven, 9h–18h CET. Réponse sous 24h.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href="/rdv"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-[13px] font-semibold text-slate-100 transition hover:border-sky-500 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  Prendre rendez-vous
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/80 bg-slate-900/60 px-4 py-2 text-[13px] font-semibold text-emerald-200 transition hover:border-emerald-400 hover:text-emerald-100 hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bas de page : copyright + liens légaux */}
      <div className="mt-6 border-t border-slate-900/70 py-3">
        <div className="container-kosmonde">
          <div className="relative flex w-full flex-col items-center gap-3 text-center text-xs text-slate-300 md:flex-row md:items-center md:justify-center md:gap-4">
            <span className="text-center md:px-8">© 2025 KOSMONDE. Tous droits réservés.</span>
            <div className="flex items-center gap-3 md:absolute md:right-0">
              <Link
                href="/mentions-legales"
                className="transition hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                Mentions légales
              </Link>
              <span className="text-slate-700">•</span>
              <Link
                href="/politique-confidentialite"
                className="transition hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
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
