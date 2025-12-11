"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  function getBasePath(href: string) {
    const [path] = href.split("#");
    return path || "/";
  }

  function isActive(href: string) {
    return getBasePath(href) === pathname;
  }

  function toggleMenu() {
    setOpen((o) => !o);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-900/50 bg-slate-950/85 backdrop-blur-xl">
        <div className="container-kosmonde flex h-14 items-center justify-between md:h-20">
          {/* LOGO */}
          <Link
            href="/"
            className="text-[11px] font-semibold uppercase tracking-[0.3em] hover:text-sky-300 transition-colors"
          >
            KOSMONDE
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-xs text-slate-300" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group transition ${isActive(link.href) ? "text-white" : "hover:text-white"}`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <Link
            href="/rdv"
            aria-label="Accéder à la page de prise de rendez-vous"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_8px_22px_rgba(56,189,248,0.28)] transition hover:translate-y-0.5 hover:brightness-110"
          >
            Prendre rendez-vous
            <span aria-hidden="true" className="text-base leading-none">↗</span>
          </Link>

          {/* BOUTON MOBILE */}
          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-300 hover:text-white transition"
            onClick={toggleMenu}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
          >
            {open ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 6h12M4 10h12M4 14h12" strokeLinecap="round" />
              </svg>
            )}
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
        <nav
          id="mobile-menu"
          className={`relative h-full transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
          aria-label="Navigation mobile"
        >
          <div className="container-kosmonde flex h-full flex-col pt-4 pb-8">
            {/* TOP */}
            <div className="flex items-center justify-between h-10 mb-8">
              <span className="text-[11px] font-semibold tracking-[0.3em] text-slate-300">
                KOSMONDE
              </span>

              <button
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-300 hover:text-white transition"
                aria-label="Fermer le menu"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M6 6l6 6M12 6L6 12" strokeLinecap="round" />
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
                  className={`text-lg tracking-wide transition ${isActive(link.href) ? "text-white" : "text-slate-100 hover:text-white"}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/rdv"
                onClick={closeMenu}
                aria-label="Accéder à la page de prise de rendez-vous"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_12px_30px_rgba(8,47,73,0.6)] transition hover:brightness-110"
              >
                Prendre rendez-vous
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {/* FOOTER MOBILE */}
            <div className="pt-8 text-[11px] text-center text-slate-400">
              Studio web basé en Suisse · Disponible à distance
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
