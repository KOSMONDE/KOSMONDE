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
    case "Refont":
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

const MOBILE_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "Tous", value: "all" },
  { label: "En ligne", value: "online" },
  { label: "En cours", value: "progress" },
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

const STATUS_DESCRIPTIONS: Record<StatusFilter, string> = {
  all: "Projets déjà publiés, en cours et en refonte.",
  online: "Projets déjà publiés.",
  progress: "Sites en cours de réalisation.",
  queue: "Demandes programmées.",
  refonte: "Refontes ou évolutions.",
};

const STATUS_ORDER: Record<NormalizedStatus, number> = {
  online: 0,
  progress: 1,
  queue: 2,
  refonte: 3,
};

function getYearValue(year: unknown): number {
  const num = Number(year);
  return Number.isFinite(num) ? num : 0;
}

function clampProgress(value: unknown): number | null {
  const num = Math.round(Number(value));
  if (!Number.isFinite(num)) return null;
  return Math.min(100, Math.max(0, num));
}

function sortProjects(list: typeof projects) {
  return [...list].sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;

    const aStatus = STATUS_ORDER[normalizeStatus(a.status)];
    const bStatus = STATUS_ORDER[normalizeStatus(b.status)];
    if (aStatus !== bStatus) return aStatus - bStatus;

    const aYear = getYearValue(a.year);
    const bYear = getYearValue(b.year);
    return bYear - aYear;
  });
}

function getProjectExcerpt(project: (typeof projects)[number]) {
  return (
    project.heroSummary ??
    project.shortDesc ??
    project.metrics?.[0] ??
    project.results?.[0] ??
    project.sector ??
    null
  );
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
        cardBorder: "border-emerald-400/50",
        glow: "from-emerald-400/25 to-transparent",
        timelineDot: "bg-emerald-300",
        progressBarClass: "from-emerald-400 via-emerald-300 to-emerald-100",
      };
    case "progress":
      return {
        label: "En cours",
        dotClass: "bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.7)]",
        badgeBorderClass: "border-amber-300/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "animate-pulse",
        cardBorder: "border-amber-300/60",
        glow: "from-amber-300/25 to-transparent",
        timelineDot: "bg-amber-300",
        progressBarClass: "from-amber-300 via-amber-200 to-amber-50",
      };
    case "queue":
      return {
        label: "Liste d’attente",
        dotClass: "bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.7)]",
        badgeBorderClass: "border-dashed border-violet-400/90",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
        cardBorder: "border-violet-400/60",
        glow: "from-violet-400/20 to-transparent",
        timelineDot: "bg-violet-400",
        progressBarClass: "from-violet-400 via-violet-300 to-violet-100",
      };
    case "refonte":
    default:
      return {
        label: "Refonte",
        dotClass: "bg-sky-300 shadow-[0_0_6px_rgba(56,189,248,0.7)]",
        badgeBorderClass: "border-sky-300/80",
        badgeBgClass: "bg-slate-950/95",
        dotExtraClass: "",
        cardBorder: "border-sky-300/60",
        glow: "from-sky-400/20 to-transparent",
        timelineDot: "bg-sky-300",
        progressBarClass: "from-sky-300 via-sky-200 to-white",
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

  const displayed = compact && services.length > 2 ? services.slice(0, 2) : services;
  const remaining = compact && services.length > 2 ? services.length - 2 : 0;
  const hasPack = services.length > 1;

  if (hasPack) {
    const pillSize = compact ? "px-3 py-1.5 text-[11px]" : "px-3.5 py-2 text-[12px]";
    const pillsLayout = compact ? "flex flex-col gap-2" : "flex flex-col gap-2";

    return (
      <div
        className={[
          "rounded-2xl border border-sky-400/45 bg-sky-500/5",
          compact ? "px-3 py-2" : "px-4 py-3",
        ].join(" ")}
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">
          Pack du projet
        </p>

        <div className={pillsLayout}>
          {displayed.map((service) => (
            <span
              key={service}
              className={[
                "inline-flex items-center gap-2 rounded-full border border-sky-400/80 bg-sky-500/10 text-slate-100 shadow-[0_4px_18px_rgba(15,23,42,0.35)]",
                pillSize,
              ].join(" ")}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              {service}
            </span>
          ))}
          {remaining > 0 && (
            <span
              className={[
                "inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-200",
                pillSize,
              ].join(" ")}
            >
              +{remaining}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-sky-400/80 bg-sky-500/15 px-3.5 py-1.5 text-[11px] text-slate-100">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
      {displayed[0]}
    </div>
  );
}

function ProjectProgressBar({
  value,
  status,
  compact = false,
}: {
  value?: number;
  status: NormalizedStatus;
  compact?: boolean;
}) {
  const normalizedValue = clampProgress(value);
  const { progressBarClass } = getStatusStyles(status);
  if (normalizedValue === null) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Avancement</span>
        <span className="font-semibold text-slate-100">{normalizedValue}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
        aria-label={`Avancement du projet : ${normalizedValue}%`}
        className={[
          "relative w-full overflow-hidden rounded-full border border-slate-800/80 bg-slate-950/85",
          compact ? "h-2" : "h-2.5",
        ].join(" ")}
      >
        <div
          className={`absolute inset-0 opacity-50 blur-sm bg-gradient-to-r ${progressBarClass}`}
          aria-hidden="true"
        />
        <div
          className={[
            "relative h-full rounded-full bg-gradient-to-r",
            progressBarClass,
          ].join(" ")}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------
//  SECTION PRINCIPALE
// -----------------------------------------------------------

export function ProjectsSection() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const sortedProjects = sortProjects(projects);

  const filteredProjects = sortedProjects.filter((p) => {
    const normalized = normalizeStatus(p.status);
    return statusFilter === "all" || normalized === statusFilter;
  });

  const hasProjects = filteredProjects.length > 0;
  const heroProject = hasProjects ? filteredProjects[0] : null;
  const otherProjects = hasProjects ? filteredProjects.slice(1) : [];
  const timelineProjects = otherProjects;

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
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-[0_16px_45px_rgba(8,47,73,0.45)]">
          <div className="max-w-xl space-y-3 text-center sm:text-left">
            <span className="inline-flex w-fit items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 pl-4 pr-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/90 shadow-[0_0_0_1px_rgba(8,47,73,0.45)] sm:text-[11px]">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
              Réalisations clients
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Projets & réalisations
            </h2>
            <p className="text-sm text-slate-400 sm:text-base">
              Inspirez-vous : votre site commence ici.
            </p>
          </div>

          <div className="space-y-3 text-center sm:text-right">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} ·{" "}
              {getFilterLabel(statusFilter)}
            </p>

            {/* Filtres mobile (pills simplifiées) */}
            <div className="block sm:hidden">
              <div className="flex flex-nowrap gap-2 pb-1 text-[11px] justify-center">
                {MOBILE_FILTERS.map((f) => {
                  const isActive = statusFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setStatusFilter(f.value)}
                      className={[
                        "inline-flex items-center gap-1 rounded-full border px-3 py-2 text-[11px] font-medium tracking-wide transition-all duration-150",
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

            {/* Filtres desktop/tablette */}
            <div className="hidden sm:block">
              <div className="flex flex-wrap gap-2 pb-1 text-[11px] justify-end">
                {FILTERS.map((f) => {
                  const isActive = statusFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setStatusFilter(f.value)}
                      className={[
                        "inline-flex items-center gap-1 rounded-full border px-3 py-2 text-[11px] font-medium tracking-wide transition-all duration-150",
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
            <p className="text-[11px] text-slate-500">
              {STATUS_DESCRIPTIONS[statusFilter]}
            </p>
          </div>
        </div>

        {/* ÉTAT VIDE */}
        {!hasProjects && (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-sky-400/45 bg-slate-950/80 px-6 py-12 shadow-[0_14px_45px_rgba(15,23,42,0.8)]">
            <p className="text-sm text-slate-100">Aucun projet trouvé.</p>
          </div>
        )}

        {hasProjects && (
          <div className="space-y-12">
            {heroProject &&
              (() => {
                const normalizedStatus = normalizeStatus(heroProject.status);
                const statusMeta = getStatusStyles(normalizedStatus);
                const heroExcerpt = getProjectExcerpt(heroProject);
                return (
                  <Link
                    href={`/projets/${heroProject.slug}`}
                    aria-label={`Voir le projet "${heroProject.title}" (${statusMeta.label}) en détail`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <article className="group relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-slate-950/80 shadow-[0_18px_50px_rgba(8,47,73,0.4)] transition-all duration-500 hover:-translate-y-1">
                      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="flex flex-col lg:flex-row">
                        <div className="relative w-full overflow-hidden lg:w-[58%] bg-slate-950">
                          <ProjectStatusBadge
                            status={normalizedStatus}
                            className="absolute left-5 top-5"
                          />
                          <div className="relative h-full min-h-[300px]">
                            <Image
                              src={heroProject.img}
                              alt={heroProject.title}
                              fill
                              quality={95}
                              className="object-cover object-center"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-4 px-7 py-8 lg:px-10 lg:py-10">
                          <header className="space-y-2">
                            <p className="text-[11px] uppercase tracking-[0.23em] text-slate-500">
                              {heroProject.type}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-[1.85rem] font-semibold text-slate-50">
                                {heroProject.title}
                              </h3>
                              <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-0.5 text-[10px] uppercase tracking-[0.2em] text-sky-100">
                                Projet phare
                              </span>
                            </div>
                            {heroExcerpt && (
                              <p
                                className="text-sm text-slate-300 min-h-[48px]"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {heroExcerpt}
                              </p>
                            )}
                          </header>

                          <ProjectProgressBar
                            status={normalizedStatus}
                            value={heroProject.progress}
                          />

                          <div className="mt-auto flex w-full flex-col gap-2 pb-2">
                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/10 px-5 py-2 text-[12px] font-semibold text-slate-100 transition group-hover:border-sky-400 group-hover:text-white">
                              Voir le projet
                              <span className="text-base">↗</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })()}

            {timelineProjects.length > 0 && (
              <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                {timelineProjects.map((proj) => {
                  const normalizedStatus = normalizeStatus(proj.status);
                  const services = proj.services ?? [];
                  const statusMeta = getStatusStyles(normalizedStatus);
                  const highlight = getProjectExcerpt(proj);

                  return (
                    <Link
                      key={proj.slug}
                      href={`/projets/${proj.slug}`}
                      aria-label={`Voir le projet "${proj.title}" (${statusMeta.label}) en détail`}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <article
                        className={[
                          "relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border bg-slate-950/85 shadow-[0_18px_55px_rgba(8,47,73,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]",
                          "border-sky-400/50",
                        ].join(" ")}
                      >
                        <div className="relative aspect-[5/3] overflow-hidden border-b border-slate-800/70">
                          <Image
                            src={proj.img}
                            alt={proj.title}
                            fill
                            quality={85}
                            className="object-cover object-center"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                          <ProjectStatusBadge
                            status={normalizedStatus}
                            className="absolute right-4 top-4"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 px-6 py-5 sm:py-6">
                          <header className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                              {proj.type}
                            </p>
                            <h3 className="text-xl font-semibold text-slate-50">
                              {proj.title}
                            </h3>
                            {highlight && (
                              <p className="text-sm text-slate-300 min-h-[48px]">
                                {highlight}
                              </p>
                            )}
                          </header>
                          <ProjectProgressBar
                            status={normalizedStatus}
                            value={proj.progress}
                            compact
                          />
                          <ProjectServices services={services} compact />
                          <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
                            <span>{statusMeta.label}</span>
                            <span className="inline-flex items-center gap-2 text-sky-200">
                              Voir le projet
                              <span className="text-base">↗</span>
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

        <div className="flex justify-center">
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
          >
            Voir tous les projets
            <span className="text-base">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
