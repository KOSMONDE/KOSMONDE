"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Phase = "building" | "ready";

export function HeroSitePreview() {
  const [phase, setPhase] = useState<Phase>("building");
  const [progress, setProgress] = useState(0);
  const [buildStage, setBuildStage] = useState(0); // 0 → 3

  useEffect(() => {
    const totalTicks = 5;
    let tick = 0;

    const interval = setInterval(() => {
      tick += 1;
      const ratio = tick / totalTicks;

      setProgress(Math.min(100, Math.round(ratio * 100)));
      setBuildStage((prev) => (prev < 3 ? prev + 1 : prev));

      if (tick >= totalTicks) {
        setPhase("ready");
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const isBuilding = phase === "building";

  return (
    <div
        className="
        relative w-full
        rounded-3xl border border-slate-800/80
        bg-gradient-to-b from-slate-900/95 to-slate-950
        px-4 py-4 shadow-[0_22px_60px_rgba(15,23,42,0.95)]
        min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]
        sm:px-5 sm:py-5
      "
    >
      <div className="flex h-full flex-col">
        {/* Barre du navigateur */}
        <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>

        {/* Barre de progression */}
        <div className="mb-4 h-1.5 w-full rounded-full bg-slate-900/90">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 space-y-4 text-xs text-slate-300">
        {/* BLOC PRINCIPAL AVEC DOUBLE COUCHE */}
        <div
          className={`relative min-h-[8rem] overflow-hidden rounded-2xl border transition-all duration-500 ${
            isBuilding
              ? "border-slate-800 bg-slate-950/80"
              : "border-sky-500/50 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),linear-gradient(to_br,#020617,#0f172a)] shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
          }`}
        >
          <div className="px-4 py-3">
            <div className="w-full max-w-full space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200/90">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Site prêt à convertir les visiteurs Google
              </div>

              <p className="text-sm font-semibold text-slate-50">
                Une page d’accueil claire qui rassure et déclenche la prise de contact.
              </p>

              <p className="mt-1 text-[11px] text-slate-200/85">
                Sections claires, preuves sociales et CTA visibles pour capter des leads qualifiés.
              </p>
            </div>
          </div>

          {/* Couche BUILDING */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl bg-slate-950/85 px-4 py-3 transition-opacity duration-500 backdrop-blur ${
              isBuilding ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 opacity-35 animate-pulse">
              <div className="absolute inset-x-0 top-4 h-4 bg-slate-800/70" />
              <div className="absolute inset-x-0 top-11 h-4 bg-slate-900/70" />
              <div className="absolute inset-x-0 top-18 h-4 bg-slate-800/60" />
            </div>

            <div className="relative flex h-full items-center">
              <div className="w-full max-w-full space-y-2">
                {buildStage >= 1 && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200/90 transition-all duration-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    Mise en place du site
                  </div>
                )}

                {buildStage >= 2 && (
                  <p className="text-sm font-semibold text-slate-50 transition-all duration-500">
                    Structure, contenu et appels à l’action se mettent en place…
                  </p>
                )}

                {buildStage >= 3 && (
                  <p className="mt-1 text-[11px] text-slate-200/85 transition-all duration-500">
                    Préparation de votre hero, de vos services et de votre bloc contact pour garder une cohérence globale.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

          {/* FORMATS (One-page / Vitrine) */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* One-page */}
            <div
              className={`relative flex-1 rounded-xl border px-3 py-3 transition-all duration-500 ${
                isBuilding
                  ? "border-slate-800 bg-slate-900/80"
                  : "border-slate-800/80 bg-slate-900/80"
              }`}
            >
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-100">Site one-page</p>
                <p className="text-[11px] text-slate-400">
                  Page fluide, CTA unique et focus SEO local pour lancer ou tester une offre.
                </p>
              </div>

              <div
                className={`pointer-events-none absolute inset-0 rounded-xl bg-slate-950/85 transition-opacity duration-500 backdrop-blur ${
                  isBuilding ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="h-full w-full animate-pulse rounded-xl bg-slate-900/70">
                  <div className="space-y-2 px-3 py-3">
                    <div className="h-2.5 w-24 rounded-full bg-slate-700/80" />
                    <div className="h-2 w-32 rounded-full bg-slate-800/80" />
                    <div className="h-2 w-20 rounded-full bg-slate-800/70" />
                  </div>
                </div>
              </div>
            </div>

            {/* Site vitrine */}
            <div
              className={`relative flex-1 rounded-xl border px-3 py-3 transition-all duration-500 ${
                isBuilding
                  ? "border-slate-800 bg-slate-900/80"
                  : "border-slate-800/80 bg-slate-900/80"
              }`}
            >
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-sky-300">Site vitrine</p>
                <p className="text-[11px] text-slate-400">
                  Parcours structuré, preuves sociales, balises SEO optimisées par page.
                </p>
              </div>

              <div
                className={`pointer-events-none absolute inset-0 rounded-xl bg-slate-950/85 transition-opacity duration-500 backdrop-blur ${
                  isBuilding ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="h-full w-full animate-pulse rounded-xl bg-slate-900/70">
                  <div className="space-y-2 px-3 py-3">
                    <div className="h-2.5 w-20 rounded-full bg-sky-500/80" />
                    <div className="h-2 w-28 rounded-full bg-slate-800/80" />
                    <div className="h-2 w-24 rounded-full bg-slate-800/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA synthétique */}
          <div className="relative flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-100">Formats principaux</p>
              <p className="text-[11px] text-slate-400">One-page, vitrine ou sur-mesure.</p>
            </div>
            <div className="sm:flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/#services"
                aria-disabled={isBuilding}
                onClick={(e) => {
                  if (isBuilding) e.preventDefault();
                }}
                className={`flex h-11 w-full sm:w-40 items-center justify-center rounded-full text-xs font-semibold tracking-[0.18em] transition-all duration-500 ${
                  isBuilding
                    ? "cursor-default bg-sky-500/60 text-slate-900/70"
                    : "bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 text-slate-950 shadow-[0_12px_30px_rgba(8,47,73,0.9)] hover:brightness-110"
                }`}
              >
                Voir les formats
              </Link>
            </div>
          </div>

          {/* Stats synthétiques */}
          <div className="space-y-2 text-[11px] text-slate-400">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-slate-200">
                <span>Sites livrés</span>
                <span className="font-semibold text-emerald-300">20+</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-slate-200">
                <span>Réponse</span>
                <span className="font-semibold text-emerald-300">24 h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
