"use client";

import { useState } from "react";
import Link from "next/link";

// NOUVEL ORDRE DES LIENS
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Services", href: "/#services" },
  { label: "Projets", href: "/#projets" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen((o) => !o);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-900/50 bg-[#0B1525CC] backdrop-blur-xl">
        <div className="container-kosmonde flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] hover:text-sky-300 transition-colors"
          >
            KOSMONDE
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-xs text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group hover:text-white transition"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <Link
            href="/#contact"
            className="hidden md:inline-flex rounded-full bg-sky-400 px-5 py-2 text-xs font-medium text-slate-950 shadow-sm hover:bg-sky-300"
          >
            Parler de mon projet
          </Link>

          {/* BOUTON MOBILE */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition"
            onClick={toggleMenu}
          >
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h18M4 13h18M4 19h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* OVERLAY MOBILE */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 backdrop-blur-2xl bg-[#0A1A2BCC]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_75%)] pointer-events-none" />

        {/* MENU MOBILE */}
        <div
          className={`relative h-full transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="container-kosmonde flex h-full flex-col pt-6 pb-10">

            {/* TOP */}
            <div className="flex items-center justify-between h-12 mb-12">
              <span className="text-[11px] font-semibold tracking-[0.3em] text-slate-300">
                KOSMONDE
              </span>

              <button onClick={closeMenu} className="text-slate-300 hover:text-white transition">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l10 10M16 6L6 16" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* LINKS MOBILE */}
            <div className="flex-1 flex flex-col items-center justify-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg text-slate-100 hover:text-white tracking-wide transition"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={closeMenu}
                className="mt-4 inline-flex rounded-full bg-sky-400 px-7 py-3 text-sm font-medium text-slate-950 hover:bg-sky-300 shadow-[0_12px_30px_rgba(8,47,73,0.6)]"
              >
                Parler de mon projet
              </Link>
            </div>

            {/* FOOTER MOBILE */}
            <div className="pt-10 text-[11px] text-center text-slate-400">
              Studio web basé en Suisse · Disponible à distance
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
