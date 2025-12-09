"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, ProjectStatus } from "@/app/projets/data";

// -----------------------------------------------------------
//  NORMALISATION DES STATUTS
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
    case "Refonte":
      return "refonte";
    default:
      return "refonte";
  }
}

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "Tous", value: "all" },
  { label: "En ligne", value: "online" },
  { label: "En cours", value: "progress" },
  { label: "Liste d’attente", value: "queue" },
  { label: "Refonte", value: "refonte" },
];

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

function getStatusStyles(status: NormalizedStatus) {
  switch (status) {
    case "online":
      return {
        label: "En ligne",
        dotClass: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.7)]",
        badgeBorderClass: "border-emerald-400/75",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
    case "progress":
      return {
        label: "En cours",
        dotClass: "bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.7)]",
        badgeBorderClass: "border-amber-300/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "animate-pulse",
      };
    case "queue":
      return {
        label: "Liste d’attente",
        dotClass: "bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.7)]",
        badgeBorderClass: "border-dashed border-violet-400/90",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
    case "refonte":
    default:
      return {
        label: "Refonte",
        dotClass: "bg-sky-300 shadow-[0_0_6px_rgba(56,189,248,0.7)]",
        badgeBorderClass: "border-sky-300/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
      };
  }
}

// -----------------------------------------------------------
//  COMPOSANTS
// -----------------------------------------------------------

function ProjectStatusBadge({
  status,
  className = "",
}: {
  status: NormalizedStatus;
  className?: string;
}) {
  const { label, dotClass, badgeBorderClass, badgeBgClass, dotExtraClass } =
    getStatusStyles(status);

  return (
    <span
      className={[
        "z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] text-slate-100 backdrop-blur-sm",
        badgeBorderClass,
        badgeBgClass,
        className,
      ].join(" ")}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${dotClass} ${dotExtraClass}`}
      />
      {label}
    </span>
  );
}

function ProjectServices({
  services,
  compact = false,
}: {
  services: string[];
  compact?: boolean;
}) {
  if (!services || services.length === 0) return null;

  const hasPack = services.length > 1;
  const dense = services.length >= 3;

  if (hasPack) {
    const wrapperPadding = compact
      ? "px-3 py-2"
      : dense
      ? "px-3.5 py-2.5"
      : "px-4 py-3";

    const pillsLayout = dense
      ? "flex flex-wrap gap-1.5"
      : "flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3";

    const pillSize =
      dense || compact ? "px-3 py-1 text-[10px]" : "px-3.5 py-1.5 text-[11px]";

    return (
      <div
        className={[
          "rounded-2xl border border-sky-400/45 bg-sky-500/5",
          wrapperPadding,
        ].join(" ")}
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">
          Pack du projet
        </p>

        <div className={pillsLayout}>
          {services.map((service) => (
            <span
              key={service}
              className={[
                "inline-flex items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 text-slate-100",
                pillSize,
              ].join(" ")}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              {service}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 px-3.5 py-1.5 text-[11px] text-slate-100">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
      {services[0]}
    </div>
  );
}

// -----------------------------------------------------------
//  SECTION PRINCIPALE
// -----------------------------------------------------------

export function ProjectsSection() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredProjects = projects.filter((p) => {
    const normalized = normalizeStatus(p.status);
    return statusFilter === "all" || normalized === statusFilter;
  });

  const hasProjects = filteredProjects.length > 0;
  const heroProject = hasProjects ? filteredProjects[0] : null;
  const otherProjects = hasProjects ? filteredProjects.slice(1) : [];

  return (
    <section
      id="projets"
      className="scroll-mt-24 md:scroll-mt-28 relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.16),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde relative space-y-10 py-20">
        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl space-y-3 text-center sm:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Projets & réalisations
            </h2>
            <p className="text-sm text-slate-400 sm:text-base">
              Inspirez-vous. Votre prochain site commence ici.
            </p>
          </div>

          <div className="space-y-3 text-center sm:text-right">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} ·{" "}
              {getFilterLabel(statusFilter)}
            </p>

            {/* MOBILE : select simple */}
            <div className="sm:hidden">
              <label htmlFor="projects-status-filter" className="sr-only">
                Filtrer par statut
              </label>
              <select
                id="projects-status-filter"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as StatusFilter)
                }
                className="w-full rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-xs text-slate-100 shadow-[0_10px_25px_rgba(15,23,42,0.7)] focus:outline-none focus:ring-2 focus:ring-sky-400/70 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                {FILTERS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* TABLETTE / DESKTOP : pills */}
            <div className="relative hidden sm:block">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-slate-950 to-transparent md:hidden" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-slate-950 to-transparent md:hidden" />

              <div className="flex gap-2 overflow-x-auto pb-1 text-xs scrollbar-none justify-end">
                {FILTERS.map((f) => {
                  const isActive = statusFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setStatusFilter(f.value)}
                      className={[
                        "inline-flex items-center gap-1 rounded-full border px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-150",
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

        {/* ÉTAT VIDE */}
        {!hasProjects && (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-sky-400/45 bg-slate-950/80 px-6 py-12 shadow-[0_14px_45px_rgba(15,23,42,0.8)]">
            <p className="text-sm text-slate-100">Aucun projet trouvé.</p>
          </div>
        )}

        {hasProjects && (
          <div className="space-y-8">
            {/* HERO CARD */}
            {heroProject &&
              (() => {
                const normalizedStatus = normalizeStatus(heroProject.status);
                const services = heroProject.services ?? [];

                return (
                  <Link
                    href={`/projets/${heroProject.slug}`}
                    aria-label={`Voir le projet "${heroProject.title}" en détail`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <article
                      className={[
                        "group relative flex h-full flex-col overflow-hidden rounded-2xl lg:flex-row",
                        "border border-sky-400/60 bg-slate-950/80 px-0 py-0",
                        "shadow-[0_14px_45px_rgba(15,23,42,0.8)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(8,47,73,0.85)]",
                      ].join(" ")}
                    >
                      {/* Glow hover */}
                      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Image hero + badge */}
                      <div className="relative w-full border-b border-slate-800/80 bg-slate-900/60 lg:w-[55%] lg:border-r">
                        <ProjectStatusBadge
                          status={normalizedStatus}
                          className="absolute right-4 top-4 lg:right-5 lg:top-5"
                        />
                        <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden lg:aspect-auto lg:h-full">
                          <Image
                            src={heroProject.img}
                            alt={heroProject.title}
                            fill
                            quality={90}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Contenu hero */}
                      <div className="flex flex-1 flex-col gap-6 px-7 py-7">
                        <header className="space-y-1.5">
                          <p className="text-[11px] uppercase tracking-[0.23em] text-slate-400">
                            {heroProject.type}
                          </p>
                          <h3 className="text-[1.55rem] font-semibold text-slate-50">
                            {heroProject.title}
                          </h3>
                        </header>

                        {/* Zone badges */}
                        <div className="min-h-[72px] sm:min-h-[88px] flex items-start">
                          <ProjectServices services={services} />
                        </div>

                        <p className="text-sm leading-relaxed text-slate-300">
                          {heroProject.shortDesc}
                        </p>

                        {/* Bouton Découvrir : plus large + centré */}
                        <div className="mt-auto flex justify-center pt-4">
                          <span
                            className="
                              inline-flex items-center justify-center gap-1.5 rounded-full border border-sky-400/50
                              bg-sky-500/10 px-6 py-2.5 text-[12px] font-medium text-sky-100
                              min-w-[9rem]
                              transition-all duration-300
                              group-hover:bg-sky-500/20 group-hover:text-sky-50 group-hover:border-sky-400/80
                            "
                          >
                            Découvrir
                            <span className="translate-y-[1px]">↗</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })()}

            {/* AUTRES PROJETS */}
            {otherProjects.length > 0 && (
              <div className="grid items-stretch gap-7 md:grid-cols-2">
                {otherProjects.map((proj) => {
                  const normalizedStatus = normalizeStatus(proj.status);
                  const services = proj.services ?? [];

                  return (
                    <Link
                      key={proj.slug}
                      href={`/projets/${proj.slug}`}
                      aria-label={`Voir le projet "${proj.title}" en détail`}
                      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <article
                        className={[
                          "group relative flex h-full flex-col overflow-hidden rounded-2xl",
                          "border border-sky-400/60 bg-slate-950/80 px-0 py-0",
                          "shadow-[0_14px_45px_rgba(15,23,42,0.8)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(8,47,73,0.85)]",
                        ].join(" ")}
                      >
                        {/* Glow hover */}
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Image + badge */}
                        <div className="relative w-full border-b border-slate-800/80 bg-slate-900/60">
                          <ProjectStatusBadge
                            status={normalizedStatus}
                            className="absolute right-3.5 top-3.5 lg:right-5 lg:top-5"
                          />
                          <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden">
                            <Image
                              src={proj.img}
                              alt={proj.title}
                              fill
                              quality={90}
                              className="object-contain"
                            />
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                          <header className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.23em] text-slate-400">
                              {proj.type}
                            </p>
                            <h3 className="text-lg font-semibold text-slate-50">
                              {proj.title}
                            </h3>
                          </header>

                          {/* Badges */}
                          <div className="min-h-[72px] sm:min-h-[88px] flex items-start">
                            <ProjectServices services={services} compact />
                          </div>

                          <p className="text-sm leading-relaxed text-slate-300">
                            {proj.shortDesc}
                          </p>

                          {/* Bouton Découvrir : plus large + centré */}
                          <div className="mt-auto flex justify-center pt-4">
                            <span
                              className="
                                inline-flex items-center justify-center gap-1.5 rounded-full border border-sky-400/50
                                bg-sky-500/10 px-6 py-2.5 text-[12px] font-medium text-sky-100
                                min-w-[9rem]
                                transition-all duration-300
                                group-hover:bg-sky-500/20 group-hover:text-sky-50 group-hover:border-sky-400/80
                              "
                            >
                              Découvrir
                              <span className="translate-y-[1px]">↗</span>
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
