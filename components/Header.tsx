"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-900/60 bg-slate-950/80 backdrop-blur">
      <div className="container-kosmonde flex h-16 items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.3em] hover:text-sky-300 transition-colors"
        >
          KOSMONDE
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300">
          <Link href="/#hero" className="hover:text-white hover:underline underline-offset-4">
            Accueil
          </Link>
          <Link href="/#services" className="hover:text-white hover:underline underline-offset-4">
            Services
          </Link>
          <Link href="/#projets" className="hover:text-white hover:underline underline-offset-4">
            Projets
          </Link>
          <Link href="/#a-propos" className="hover:text-white hover:underline underline-offset-4">
            À propos
          </Link>
          <Link href="/#contact" className="hover:text-white hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>

        {/* CTA Desktop */}
        <Link
          href="/#contact"
          className="hidden md:inline-flex rounded-full bg-sky-400 px-4 py-2 text-xs font-medium text-slate-950 shadow-sm hover:bg-sky-300"
        >
          Parler de mon projet
        </Link>

        {/* BOUTON MOBILE */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-slate-200 hover:text-white transition"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h16M3 12h16M3 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* MENU MOBILE FULLSCREEN */}
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-sm animate-fade-in">
          <div className="container-kosmonde flex flex-col pt-20 space-y-8 text-center">
            
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-slate-300 hover:text-white"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l10 10M16 6l-10 10" strokeLinecap="round" />
              </svg>
            </button>

            <Link onClick={closeMenu} href="/#hero" className="text-xl text-slate-200 hover:text-white">
              Accueil
            </Link>
            <Link onClick={closeMenu} href="/#services" className="text-xl text-slate-200 hover:text-white">
              Services
            </Link>
            <Link onClick={closeMenu} href="/#projets" className="text-xl text-slate-200 hover:text-white">
              Projets
            </Link>
            <Link onClick={closeMenu} href="/#a-propos" className="text-xl text-slate-200 hover:text-white">
              À propos
            </Link>
            <Link onClick={closeMenu} href="/#contact" className="text-xl text-slate-200 hover:text-white">
              Contact
            </Link>

            <Link
              onClick={closeMenu}
              href="/#contact"
              className="mt-4 inline-flex mx-auto rounded-full bg-sky-400 px-6 py-3 text-sm font-medium text-slate-950 hover:bg-sky-300"
            >
              Parler de mon projet
            </Link>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}
