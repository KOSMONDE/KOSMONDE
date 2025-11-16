import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-900/60 bg-slate-950/80 backdrop-blur">
      <div className="container-kosmonde flex h-16 items-center justify-between">
        
        {/* LOGO CLIQUABLE */}
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.3em] hover:text-sky-300 transition-colors"
        >
          KOSMONDE
        </Link>

        <nav className="hidden items-center gap-6 text-xs text-slate-300 md:flex">
          <Link
            href="/#hero"
            className="hover:text-white hover:underline underline-offset-4"
          >
            Accueil
          </Link>
          <Link
            href="/#services"
            className="hover:text-white hover:underline underline-offset-4"
          >
            Services
          </Link>
          <Link
            href="/#projets"
            className="hover:text-white hover:underline underline-offset-4"
          >
            Projets
          </Link>
          <Link
            href="/#a-propos"
            className="hover:text-white hover:underline underline-offset-4"
          >
            À propos
          </Link>
          <Link
            href="/#contact"
            className="hover:text-white hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>

        <Link
          href="/#contact"
          className="rounded-full bg-sky-400 px-4 py-2 text-xs font-medium text-slate-950 shadow-sm hover:bg-sky-300"
        >
          Parler de mon projet
        </Link>
      </div>
    </header>
  );
}
