"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Phase = "building" | "ready";

export function HeroSitePreview() {
  const [phase, setPhase] = useState<Phase>("building");
  const [progress, setProgress] = useState(0);
  const [buildStage, setBuildStage] = useState(0); // 0 → 3

  useEffect(() => {
    const totalTicks = 8;
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
    }, 900);

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
            className={`relative h-32 overflow-hidden rounded-2xl border transition-all duration-500 ${
              isBuilding
                ? "border-slate-800 bg-slate-950/80"
                : "border-sky-500/50 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),linear-gradient(to_br,#020617,#0f172a)] shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
            }`}
          >
            {/* Couche BUILDING */}
            <div
              className={`absolute inset-0 px-4 py-3 transition-opacity duration-500 ${
                isBuilding ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* squelette */}
              <div className="absolute inset-0 opacity-35 animate-pulse">
                <div className="absolute inset-x-0 top-4 h-4 bg-slate-800/70" />
                <div className="absolute inset-x-0 top-11 h-4 bg-slate-900/70" />
                <div className="absolute inset-x-0 top-18 h-4 bg-slate-800/60" />
              </div>

              <div className="relative flex h-full items-center">
                <div className="w-full max-w-full space-y-2">
                  {/* Tag */}
                  {buildStage >= 1 && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200/90 transition-all duration-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      Mise en place du site
                    </div>
                  )}

                  {/* Titre */}
                  {buildStage >= 2 && (
                    <p className="text-sm font-semibold text-slate-50 transition-all duration-500">
                      Structure, contenu et appels à l’action se mettent en
                      place…
                    </p>
                  )}

                  {/* Description */}
                  {buildStage >= 3 && (
                    <p className="mt-1 text-[11px] text-slate-200/85 transition-all duration-500">
                      Préparation de votre hero, de vos services et de votre
                      bloc contact pour garder une cohérence globale.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Couche READY */}
            <div
              className={`absolute inset-0 px-4 py-3 transition-opacity duration-500 ${
                isBuilding ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="relative flex h-full items-center">
                <div className="w-full max-w-full space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    Site prêt à accueillir vos visiteurs
                  </div>

                  <p className="text-sm font-semibold text-slate-50">
                    Une page d’accueil claire pour présenter votre activité.
                  </p>

                  <p className="mt-1 text-[11px] text-slate-200/85">
                    Un site pensé pour être lisible, rassurant et agréable à
                    parcourir, sur ordinateur comme sur mobile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORMATS (One-page / Vitrine) */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* One-page */}
            <div
              className={`flex-1 rounded-xl border px-3 py-3 transition-all duration-500 ${
                isBuilding
                  ? "border-slate-800 bg-slate-900/80 animate-pulse"
                  : "border-slate-800/80 bg-slate-900/80"
              }`}
            >
              {isBuilding ? (
                <div className="space-y-2">
                  <div className="h-2.5 w-24 rounded-full bg-slate-700/80" />
                  <div className="h-2 w-32 rounded-full bg-slate-800/80" />
                  <div className="h-2 w-20 rounded-full bg-slate-800/70" />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-100">
                    Site one-page
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Une page claire pour présenter votre offre et proposer un
                    point de contact simple.
                  </p>
                </div>
              )}
            </div>

            {/* Site vitrine */}
            <div
              className={`flex-1 rounded-xl border px-3 py-3 transition-all duration-500 ${
                isBuilding
                  ? "border-slate-800 bg-slate-900/80 animate-pulse"
                  : "border-slate-800/80 bg-slate-900/80"
              }`}
            >
              {isBuilding ? (
                <div className="space-y-2">
                  <div className="h-2.5 w-20 rounded-full bg-sky-500/80" />
                  <div className="h-2 w-28 rounded-full bg-slate-800/80" />
                  <div className="h-2 w-24 rounded-full bg-slate-800/70" />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-sky-300">
                    Site vitrine
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Plusieurs pages pour présenter vos services, votre histoire
                    et vos informations de contact.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* BANDE CTA */}
          <div className="flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              {isBuilding ? (
                <>
                  <div className="h-2.5 w-36 rounded-full bg-slate-800/80 animate-pulse" />
                  <div className="h-2 w-40 rounded-full bg-slate-800/80 animate-pulse" />
                </>
              ) : (
                <>
                  <p className="text-[11px] font-semibold text-slate-100">
                    Choisir le format adapté
                  </p>
                  <p className="text-[11px] text-slate-400">
                    One-page, site vitrine ou projet sur mesure : la structure
                    s’adapte à votre besoin réel.
                  </p>
                </>
              )}
            </div>

            <div className="sm:flex-shrink-0">
              <Link
                href="/#services"
                aria-disabled={isBuilding}
                onClick={(e) => {
                  if (isBuilding) e.preventDefault();
                }}
                className={`flex h-8 w-36 items-center justify-center rounded-full text-[11px] font-semibold tracking-wide transition-all duration-500 ${
                  isBuilding
                    ? "cursor-default bg-sky-500/60 text-slate-900/70"
                    : "bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 text-slate-950 shadow-[0_12px_30px_rgba(8,47,73,0.9)] hover:brightness-110"
                }`}
              >
                Voir les formats
              </Link>
            </div>
          </div>

          {/* Texte final */}
          <p className="text-[11px] leading-relaxed text-slate-500">
            L’objectif : un site structuré, lisible et cohérent avec votre
            activité. Une base solide que vous pourrez faire évoluer à votre
            rythme.
          </p>
        </div>
      </div>
    </div>
  );
}
