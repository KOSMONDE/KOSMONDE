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

// Styles visuels des statuts (badge + couleur du point)
// Palette 1 : KOSMONDE Premium
function getStatusStyles(status: NormalizedStatus) {
  switch (status) {
    case "online":
      return {
        label: "En ligne",
        // vert / mint
        dotClass:
          "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.7)]",
        badgeBorderClass: "border-emerald-400/75",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
    case "progress":
      return {
        label: "En cours",
        // doré
        dotClass:
          "bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.7)]",
        badgeBorderClass: "border-amber-300/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "animate-pulse",
      };
    case "queue":
      return {
        label: "Liste d’attente",
        // violet doux
        dotClass:
          "bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.7)]",
        badgeBorderClass: "border-dashed border-violet-400/90",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
    case "refonte":
    default:
      return {
        label: "Refonte",
        // bleu clair
        dotClass:
          "bg-sky-300 shadow-[0_0_6px_rgba(56,189,248,0.7)]",
        badgeBorderClass: "border-sky-300/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
  }
}

export function ProjectsSection() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredProjects = projects.filter((p) => {
    const normalized = normalizeStatus(p.status);
    return statusFilter === "all" ? true : normalized === statusFilter;
  });

  const hasProjects = filteredProjects.length > 0;

  const heroProject = hasProjects ? filteredProjects[0] : null;
  const otherProjects = hasProjects ? filteredProjects.slice(1) : [];

  return (
    <section
      id="projets"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden scroll-mt-24"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.16),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde space-y-10 py-20 relative">
        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl space-y-3 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
              Projets & exemples
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Une sélection de projets finis ou en cours.
            </p>
          </div>

          <div className="space-y-3 text-center sm:text-right">
            <p className="text-[11px] text-slate-500 tracking-[0.22em] uppercase">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} ·{" "}
              {getFilterLabel(statusFilter)}
            </p>

            <div className="relative">
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
                          ? "border-sky-400 bg-sky-500/15 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]"
                          : "border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:bg-slate-900/90",
                      ].join(" ")}
                    >
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_6px_rgba(56,189,248,0.8)]"
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

        {/* ETAT VIDE */}
        {!hasProjects && (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-sky-400/45 bg-slate-950/80 px-6 py-12 shadow-[0_14px_45px_rgba(15,23,42,0.8)]">
            <p className="text-sm text-slate-100">Aucun projet trouvé.</p>
          </div>
        )}

        {hasProjects && (
          <div className="space-y-8">
            {/* -----------------------------------------------------------
                1) CARTE HERO
            ----------------------------------------------------------- */}
            {heroProject && (() => {
              const normalizedStatus = normalizeStatus(heroProject.status);
              const {
                label,
                dotClass,
                badgeBorderClass,
                badgeBgClass,
                dotExtraClass,
              } = getStatusStyles(normalizedStatus);

              const services = heroProject.services ?? [];
              const hasPack = services.length > 1;

              return (
                <Link
                  href={`/projets/${heroProject.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <article
                    className={[
                      "relative group flex h-full flex-col lg:flex-row overflow-hidden rounded-2xl",
                      "border border-sky-400/60 bg-slate-950/80 px-0 py-0",
                      "shadow-[0_14px_45px_rgba(15,23,42,0.8)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(8,47,73,0.85)]",
                    ].join(" ")}
                  >
                    {/* Glow hover (comme ProcessSection) */}
                    <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)]" />

                    {/* Badge statut */}
                    <span
                      className={[
                        "absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] text-slate-100 backdrop-blur-sm",
                        badgeBorderClass,
                        badgeBgClass,
                      ].join(" ")}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${dotClass} ${dotExtraClass}`}
                      />
                      {label}
                    </span>

                    {/* Image hero */}
                    <div className="relative w-full lg:w-[55%] border-b lg:border-r border-slate-800/80 bg-slate-900/40">
                      <div className="relative h-60 sm:h-72 lg:h-full overflow-hidden">
                        <Image
                          src={heroProject.img}
                          alt={heroProject.title}
                          fill
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
                      </div>
                    </div>

                    {/* Contenu hero */}
                    <div className="flex-1 px-7 py-7 flex flex-col gap-6">
                      <header className="space-y-1.5">
                        <p className="text-[11px] tracking-[0.23em] text-slate-400 uppercase">
                          {heroProject.type}
                        </p>
                        <h3 className="text-[1.55rem] font-semibold text-slate-50">
                          {heroProject.title}
                        </h3>
                      </header>

                      {hasPack && (
                        <div className="mt-1 rounded-2xl border border-sky-400/45 bg-sky-500/5 px-4 py-3">
                          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                            Pack du projet
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                              <span
                                key={service}
                                className="inline-flex items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 px-3.5 py-1.5 text-[11px] text-slate-100"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {!hasPack && services.length === 1 && (
                        <div className="inline-flex items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 px-3.5 py-1.5 text-[11px] text-slate-100 w-fit">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                          {services[0]}
                        </div>
                      )}

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {heroProject.shortDesc}
                      </p>

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
            })()}

            {/* -----------------------------------------------------------
                2) AUTRES CARTES EN GRILLE
            ----------------------------------------------------------- */}
            {otherProjects.length > 0 && (
              <div className="grid gap-7 md:grid-cols-2 items-stretch">
                {otherProjects.map((proj) => {
                  const normalizedStatus = normalizeStatus(proj.status);
                  const {
                    label,
                    dotClass,
                    badgeBorderClass,
                    badgeBgClass,
                    dotExtraClass,
                  } = getStatusStyles(normalizedStatus);

                  const services = proj.services ?? [];
                  const hasPack = services.length > 1;

                  return (
                    <Link
                      key={proj.slug}
                      href={`/projets/${proj.slug}`}
                      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <article
                        className={[
                          "relative group flex h-full flex-col overflow-hidden rounded-2xl",
                          "border border-sky-400/60 bg-slate-950/80 px-0 py-0",
                          "shadow-[0_14px_45px_rgba(15,23,42,0.8)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(8,47,73,0.85)]",
                        ].join(" ")}
                      >
                        {/* Glow hover */}
                        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)]" />

                        {/* Badge statut */}
                        <span
                          className={[
                            "absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] text-slate-100 backdrop-blur-sm",
                            badgeBorderClass,
                            badgeBgClass,
                          ].join(" ")}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${dotClass} ${dotExtraClass}`}
                          />
                          {label}
                        </span>

                        {/* Image */}
                        <div className="relative w-full border-b border-slate-800/80 bg-slate-900/40">
                          <div className="relative h-44 sm:h-52 overflow-hidden">
                            <Image
                              src={proj.img}
                              alt={proj.title}
                              fill
                              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 px-6 py-6 flex flex-col gap-4">
                          <header className="space-y-1">
                            <p className="text-[11px] tracking-[0.23em] text-slate-400 uppercase">
                              {proj.type}
                            </p>
                            <h3 className="text-lg font-semibold text-slate-50">
                              {proj.title}
                            </h3>
                          </header>

                          {hasPack && (
                            <div className="rounded-2xl border border-sky-400/45 bg-sky-500/5 px-3.5 py-2.5">
                              <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                                Pack du projet
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {services.map((service) => (
                                  <span
                                    key={service}
                                    className="inline-flex items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 px-3 py-1.5 text-[11px] text-slate-100"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {!hasPack && services.length === 1 && (
                            <div className="inline-flex items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 px-3 py-1.5 text-[11px] text-slate-100 w-fit">
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                              {services[0]}
                            </div>
                          )}

                          <p className="text-sm text-slate-300 leading-relaxed">
                            {proj.shortDesc}
                          </p>

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
        )}
      </div>
    </section>
  );
}
