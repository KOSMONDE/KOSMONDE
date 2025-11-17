"use client";

import { useEffect, useState } from "react";

type Phase = "building" | "ready";

/* ---------------- Console infinie avec typing ---------------- */

function InfiniteConsole() {
  const lines = [
    "mise en place des balises SEO…",
    "analyse du projet du client…",
    "génération de la structure des pages…",
    "chargement des sections principales…",
    "optimisation du rendu mobile…",
    "préparation des animations du hero…",
    "mise en cache des assets statiques…",
    "synchronisation des polices web…",
    "compression des images principales…",
    "nettoyage du code inutilisé…",
    "optimisation du temps de chargement…"
  ];

  const [state, setState] = useState<{
    currentLineIndex: number;
    currentCharIndex: number;
    pauseTicks: number;
    history: string[]; // lignes déjà complètes (max 3)
  }>({
    currentLineIndex: 0,
    currentCharIndex: 0,
    pauseTicks: 0,
    history: []
  });

  const typingSpeedMs = 90; // plus lent / naturel
  const maxPauseTicks = 14; // petite pause à la fin de chaque ligne

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const line = lines[prev.currentLineIndex];

        // Tape caractère par caractère
        if (prev.currentCharIndex < line.length) {
          return {
            ...prev,
            currentCharIndex: prev.currentCharIndex + 1,
            pauseTicks: 0
          };
        }

        // Pause une fois la ligne terminée
        if (prev.pauseTicks < maxPauseTicks) {
          return {
            ...prev,
            pauseTicks: prev.pauseTicks + 1
          };
        }

        // On passe à la ligne suivante et on ajoute la ligne finie à l'historique
        const newHistory = [...prev.history, line];
        if (newHistory.length > 3) {
          newHistory.shift(); // on garde 3 lignes max en historique
        }

        const nextIndex = (prev.currentLineIndex + 1) % lines.length;

        return {
          currentLineIndex: nextIndex,
          currentCharIndex: 0,
          pauseTicks: 0,
          history: newHistory
        };
      });
    }, typingSpeedMs);

    return () => clearInterval(interval);
  }, []);

  const currentLine = lines[state.currentLineIndex];
  const currentText = currentLine.slice(0, state.currentCharIndex);

  // 3 lignes historiques + 1 ligne en cours = 4 lignes visibles
  const visibleLines = [...state.history, currentText];

  return (
    <div className="h-24 overflow-hidden text-[11px] font-mono leading-relaxed text-slate-400 flex flex-col justify-end">
      {visibleLines.map((line, i) => {
        const isLast = i === visibleLines.length - 1;
        return (
          <div
            key={`${i}-${line}`}
            className={`flex items-center gap-1 ${
              isLast ? "text-sky-300" : "text-slate-500"
            }`}
          >
            <span className="text-slate-600">›</span>
            <span>{line}</span>
            {isLast && (
              <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-sky-300/60" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Carte principale du hero ---------------- */

export function HeroSitePreview() {
  const [phase, setPhase] = useState<Phase>("building");
  const [progress, setProgress] = useState(0);
  const [buildStage, setBuildStage] = useState(0); // 0 → 3 pour révéler les contenus

  // Compte à rebours (exemple : 7 jours)
  const [secondsLeft, setSecondsLeft] = useState(7 * 24 * 60 * 60);

  // Animation de construction (barre + apparition progressive)
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

  // Décrément du compte à rebours
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isBuilding = phase === "building";

  const days = Math.floor(secondsLeft / (24 * 3600));
  const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);

  return (
    <div className="relative w-full rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/95 to-slate-950 px-4 py-4 sm:px-5 sm:py-5 shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
      {/* Barre du faux navigateur */}
      <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[11px] text-slate-400">kosmonde.ch</span>
      </div>

      {/* Barre de progression */}
      <div className="mb-4 h-1.5 w-full rounded-full bg-slate-900/90">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Contenu principal */}
      <div className="space-y-4 text-xs text-slate-300">
        {/* RECTANGLE 1 — OFFRE BLACK FRIDAY + COMPTE À REBOURS */}
        <div
          className={`relative h-32 overflow-hidden rounded-2xl border transition-all duration-500 ${
            isBuilding
              ? "border-slate-800 bg-slate-950/80"
              : "border-sky-500/50 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),linear-gradient(to_br,#020617,#0f172a)] shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
          }`}
        >
          {/* squelette de fond */}
          <div
            className={`absolute inset-0 opacity-35 ${
              isBuilding ? "animate-pulse" : ""
            }`}
          >
            <div className="absolute inset-x-0 top-4 h-4 bg-slate-800/70" />
            <div className="absolute inset-x-0 top-11 h-4 bg-slate-900/70" />
            <div className="absolute inset-x-0 top-18 h-4 bg-slate-800/60" />
          </div>

          <div className="relative flex h-full items-center px-4 py-3">
            <div className="space-y-2 w-full max-w-full">
              {/* Tag */}
              {buildStage >= 1 && (
                <div
                  className={`inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200/90 transition-all duration-500 ${
                    isBuilding ? "animate-pulse" : ""
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  {isBuilding ? "Offre en préparation" : "Offre Black Friday"}
                </div>
              )}

              {/* Titre */}
              {buildStage >= 2 && (
                <p
                  className={`text-sm font-semibold text-slate-50 transition-all duration-500 ${
                    isBuilding ? "animate-pulse" : ""
                  }`}
                >
                  {isBuilding
                    ? "Mise en place de tes offres en ligne..."
                    : "-20% sur la création de ton site web"}
                </p>
              )}

              {/* Description + compte à rebours */}
              {buildStage >= 3 && (
                <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-slate-200/85">
                    {isBuilding
                      ? "Le contenu de ta page d’accueil se structure : hero, services, offres et appel à l’action."
                      : "Une promotion limitée pour lancer ton projet avec un budget optimisé."}
                  </p>

                  {!isBuilding && secondsLeft > 0 && (
                    <div className="inline-flex items-center gap-1 rounded-full border border-sky-400/50 bg-slate-950/70 px-2.5 py-1 text-[10px] text-sky-200 whitespace-nowrap">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Se termine dans&nbsp;</span>
                      <span className="font-semibold">
                        {days}j {hours}h {minutes}min
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RECTANGLES 2 & 3 — SERVICES */}
        <div className="flex gap-3">
          {/* RECTANGLE 2 — Carte de visite */}
          <div
            className={`flex-1 rounded-xl border px-3 py-3 transition-all duration-500 ${
              isBuilding
                ? "border-slate-800 bg-slate-900/80 animate-pulse"
                : "border-slate-800/80 bg-slate-900/80"
            }`}
          >
            {isBuilding ? (
              <div className="space-y-2">
                <div className="h-2.5 w-20 rounded-full bg-slate-700/80" />
                <div className="h-2 w-28 rounded-full bg-slate-800/80" />
                <div className="h-2 w-16 rounded-full bg-slate-800/70" />
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-100">
                  Carte de visite
                </p>
                <p className="text-[11px] text-slate-400">
                  Design propre et professionnel, prêt pour l’impression, adapté
                  à ton identité visuelle.
                </p>
              </div>
            )}
          </div>

          {/* RECTANGLE 3 — Logo */}
          <div
            className={`flex-1 rounded-xl border px-3 py-3 transition-all duration-500 ${
              isBuilding
                ? "border-slate-800 bg-slate-900/80 animate-pulse"
                : "border-slate-800/80 bg-slate-900/80"
            }`}
          >
            {isBuilding ? (
              <div className="space-y-2">
                <div className="h-2.5 w-16 rounded-full bg-sky-500/80" />
                <div className="h-2 w-24 rounded-full bg-slate-800/80" />
                <div className="h-2 w-20 rounded-full bg-slate-800/70" />
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-sky-300">
                  Création de logo
                </p>
                <p className="text-[11px] text-slate-400">
                  Logo simple et moderne, décliné pour le web et l’impression,
                  pour donner une identité claire à ton projet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RECTANGLE 4 — BANDE CTA */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            {isBuilding ? (
              <>
                <div className="h-2.5 w-32 rounded-full bg-slate-800/80 animate-pulse" />
                <div className="h-2 w-40 rounded-full bg-slate-800/80 animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-[11px] font-semibold text-slate-100">
                  Profite des offres du moment
                </p>
                <p className="text-[11px] text-slate-400">
                  Donne une vraie présence en ligne à ton projet avec un
                  accompagnement personnalisé.
                </p>
              </>
            )}
          </div>
          <div className="sm:flex-shrink-0">
            <a
              href="/offres"
              className={`flex h-8 w-32 items-center justify-center rounded-full text-[11px] font-semibold tracking-wide transition-all duration-500 ${
                isBuilding
                  ? "bg-sky-500/60 text-slate-900/70 cursor-default"
                  : "bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 text-slate-950 shadow-[0_12px_30px_rgba(8,47,73,0.9)] hover:brightness-110"
              }`}
            >
              {!isBuilding && <span>Mes prestations</span>}
            </a>
          </div>
        </div>

        {/* CONSOLE — effet construction */}
        <div className="mt-1 rounded-2xl border border-slate-800/70 bg-slate-950/95 px-4 py-3">
          <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span>Console KOSMONDE</span>
            {isBuilding ? (
              <span className="ml-auto text-[10px] text-sky-300">
                construction du site...
              </span>
            ) : (
              <span className="ml-auto text-[10px] text-emerald-300">
                site prêt à être lancé
              </span>
            )}
          </div>

          <InfiniteConsole />
        </div>

        {/* Texte final optimisé KOSMONDE */}
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Un site clair, moderne et facile à parcourir. Chez KOSMONDE, chaque
          page est pensée pour expliquer ton activité en quelques secondes,
          valoriser ce que tu fais et aider tes visiteurs à trouver rapidement
          les informations essentielles.
        </p>
      </div>
    </div>
  );
}
