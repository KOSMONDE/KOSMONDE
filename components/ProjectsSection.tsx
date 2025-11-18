"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, ProjectStatus } from "@/app/projets/data";

// -----------------------------------------------------------
//  NORMALISATION DES STATUTS (FR → codes techniques)
// -----------------------------------------------------------
type NormalizedStatus = "online" | "progress" | "queue" | "refonte";
type StatusFilter = "all" | NormalizedStatus;

// Convertit les statuts FR du backend en un code simple à utiliser dans le front
function normalizeStatus(status: ProjectStatus | string): NormalizedStatus {
  const value = String(status).trim();

  switch (value) {
    case "En ligne":
      return "online";
    case "En cours":
      return "progress";
    case "Liste d’attente":
      return "queue";
    case "Refont":
      return "refonte";
    default:
      return "refonte";
  }
}

// Filtres disponibles dans le header
const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "Tous", value: "all" },
  { label: "En ligne", value: "online" },
  { label: "En cours", value: "progress" },
  { label: "Liste d’attente", value: "queue" },
  { label: "Refonte", value: "refonte" },
];

// Texte affiché dans le header selon le filtre actif
function getFilterLabel(value: StatusFilter): string {
  switch (value) {
    case "online":
      return "projets en ligne";
    case "progress":
      return "projets en cours";
    case "queue":
      return "projets en liste d’attente";
    case "refonte":
      return "projets en refonte";
    default:
      return "tous les statuts";
  }
}

// Styles visuels des statuts (bordure carte + badge statut)
function getStatusStyles(status: NormalizedStatus) {
  switch (status) {
    case "online":
      return {
        label: "En ligne",
        dotClass:
          "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]",
        borderClass: "border-emerald-500/40",
        badgeBorderClass: "border-emerald-500/70",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
    case "progress":
      return {
        label: "En cours",
        dotClass: "bg-amber-400",
        borderClass: "border-amber-500/40",
        badgeBorderClass: "border-amber-500/70",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "animate-pulse",
      };
    case "queue":
      return {
        label: "Liste d’attente",
        dotClass: "bg-violet-400",
        borderClass: "border-violet-500/40",
        badgeBorderClass: "border-dashed border-violet-500/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
    case "refonte":
    default:
      return {
        label: "Refonte",
        dotClass: "bg-sky-400",
        borderClass: "border-sky-500/40",
        badgeBorderClass: "border-sky-500/70",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
  }
}

export function ProjectsSection() {
  // Filtre actif dans le header
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Sélectionne uniquement les projets correspondant au filtre actif
  const filteredProjects = projects.filter((p) => {
    const normalized = normalizeStatus(p.status);
    return statusFilter === "all" ? true : normalized === statusFilter;
  });

  const hasProjects = filteredProjects.length > 0;

  return (
    <section
      id="projets"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden scroll-mt-24"
    >
      {/* Glow design d'ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />

      <div className="container-kosmonde space-y-10 py-20 relative">
        {/* -----------------------------------------------------------
            HEADER (Titre + filtres)
        ----------------------------------------------------------- */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl space-y-3 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
              Projets & exemples
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Une sélection de projets finis ou en cours.
            </p>
          </div>

          {/* Infos filtre */}
          <div className="space-y-3 text-center sm:text-right">
            <p className="text-[11px] text-slate-500 tracking-[0.22em] uppercase">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} ·{" "}
              {getFilterLabel(statusFilter)}
            </p>

            {/* Boutons filtre */}
            <div className="relative">
              {/* Indication de scroll horizontal sur mobile */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-slate-950 to-transparent sm:hidden" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-slate-950 to-transparent sm:hidden" />

              <div className="flex justify-center sm:justify-end gap-2 text-[11px] overflow-x-auto pb-1 scrollbar-none">
                {FILTERS.map((f) => {
                  const isActive = statusFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      onClick={() => setStatusFilter(f.value)}
                      className={[
                        "inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                        isActive
                          ? "border-sky-400 bg-sky-500/15 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.3)]"
                          : "border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:bg-slate-900/90",
                      ].join(" ")}
                    >
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
                          aria-hidden="true"
                        />
                      )}
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------
            SI AUCUN PROJET
        ----------------------------------------------------------- */}
        {!hasProjects && (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/80 px-6 py-12 text-center shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80">
              <span className="text-lg text-slate-200" aria-hidden="true">
                ∅
              </span>
            </div>
            <p className="text-sm text-slate-100">Aucun projet trouvé.</p>
          </div>
        )}

        {/* -----------------------------------------------------------
            LISTE DES PROJETS (empilés comme SEKOBA)
        ----------------------------------------------------------- */}
        {hasProjects && (
          <div className="space-y-8">
            {filteredProjects.map((proj) => {
              const normalizedStatus = normalizeStatus(proj.status);
              const {
                label,
                dotClass,
                borderClass,
                badgeBorderClass,
                badgeBgClass,
                dotExtraClass,
              } = getStatusStyles(normalizedStatus);

              // Tous les services du projet
              const services = proj.services ?? [];

              // IMPORTANT :
              // Si un projet a PLUS D’UN service → affichage PACK DU PROJET
              const hasPack = services.length > 1;

              return (
                <Link
                  key={proj.slug}
                  href={`/projets/${proj.slug}`}
                  className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <article
                    className={[
                      "relative flex flex-col md:flex-row overflow-hidden rounded-3xl border bg-slate-950/95 shadow-[0_18px_45px_rgba(15,23,42,0.80)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)]",
                      borderClass,
                    ].join(" ")}
                  >
                    {/* -----------------------------------------------------------
                        BADGE STATUT (coin supérieur droit)
                    ----------------------------------------------------------- */}
                    <span
                      className={[
                        "absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] text-slate-100 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.9)]",
                        badgeBorderClass,
                        badgeBgClass,
                      ].join(" ")}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${dotClass} ${dotExtraClass}`}
                      />
                      {label}
                    </span>

                    {/* -----------------------------------------------------------
                        IMAGE DU PROJET
                        → Pour changer l’image : proj.img dans data.ts
                    ----------------------------------------------------------- */}
                    <div className="relative w-full md:w-1/2 border-b md:border-r border-slate-800/80 bg-slate-900/40">
                      <div className="relative h-48 sm:h-64 md:h-full overflow-hidden">
                        <Image
                          src={proj.img}
                          alt={proj.title}
                          fill
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
                      </div>
                    </div>

                    {/* -----------------------------------------------------------
                        CONTENU DU PROJET (titre, pack, résumé…)
                    ----------------------------------------------------------- */}
                    <div className="flex-1 px-6 py-6 md:px-7 md:py-7 flex flex-col gap-5 md:gap-6">
                      <header className="space-y-1.5">
                        <p className="text-[11px] tracking-[0.23em] text-slate-400 uppercase">
                          {proj.type}
                        </p>
                        <h3 className="text-xl md:text-[1.35rem] font-semibold text-slate-50">
                          {proj.title}
                        </h3>
                      </header>

                      {/* -----------------------------------------------------------
                          PACK DU PROJET (si +1 service)
                          → Pour AJOUTER un badge : proj.services dans data.ts
                          → Pour ENLEVER le pack : mettre 1 seul service
                      ----------------------------------------------------------- */}
                      {hasPack && (
                        <div className="mt-1 rounded-2xl border border-sky-500/40 bg-sky-500/5 px-4 py-3 shadow-[0_0_0_1px_rgba(56,189,248,0.12)]">
                          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                            Pack du projet
                          </p>

                          {/* Tous les badges */}
                          <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                              <span
                                key={service}
                                className="inline-flex items-center gap-1 rounded-full border border-sky-500/70 bg-sky-500/15 px-3.5 py-1.5 text-[11px] text-slate-100"
                              >
                                {/* Petit point bleu */}
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* -----------------------------------------------------------
                          CAS 1 SEUL BADGE
                          → Ici PAS de "Pack du projet"
                          → Badge simple
                      ----------------------------------------------------------- */}
                      {!hasPack && services.length === 1 && (
                        <div className="inline-flex items-center gap-1 rounded-full border border-sky-500/70 bg-sky-500/15 px-3.5 py-1.5 text-[11px] text-slate-100 w-fit">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          {services[0]}
                        </div>
                      )}

                      {/* -----------------------------------------------------------
                          DESCRIPTION COURTE
                          → À modifier dans data.ts
                      ----------------------------------------------------------- */}
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {proj.shortDesc}
                      </p>

                      {/* CTA bas de carte */}
                      <div className="mt-auto flex justify-between border-t border-slate-800 pt-3 text-[11px]">
                        <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                          Voir le projet en détail
                        </span>
                        <span className="text-sky-300 group-hover:text-sky-200 group-hover:translate-x-1 transition">
                          Découvrir ↗
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
