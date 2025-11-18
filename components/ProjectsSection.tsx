"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../app/projets/data";

type StatusFilter = "all" | "online" | "progress" | "redesign";

// Normalise toutes les valeurs possibles vers 3 statuts
function normalizeStatus(status: string): StatusFilter {
  if (status === "online") return "online";
  if (status === "progress") return "progress";
  return "redesign"; // tout le reste = refonte
}

export function ProjectsSection() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredProjects = projects.filter((p) => {
    const normalized = normalizeStatus(p.status as string);
    return statusFilter === "all" ? true : normalized === statusFilter;
  });

  // Hero activé seulement si au moins 3 projets
  const enableHero = filteredProjects.length >= 3;

  return (
    <section
      id="projets"
      className="relative border-b border-slate-900/40 bg-slate-950 overflow-hidden"
    >
      {/* Glows d’ambiance KOSMONDE */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="container-kosmonde space-y-8 py-16 relative">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
              Projets & exemples
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Une sélection de projets pour te donner une idée du style, des
              structures et des niveaux de détail que je propose.
            </p>
          </div>

          <div className="space-y-2 text-right">
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
              {projects.length} projets · en ligne · en cours · refonte
            </p>

            {/* FILTRES */}
            <div className="flex flex-wrap justify-end gap-2 text-[11px]">
              {[
                { label: "Tous", value: "all" as StatusFilter },
                { label: "En ligne", value: "online" as StatusFilter },
                { label: "En cours", value: "progress" as StatusFilter },
                { label: "Refonte", value: "redesign" as StatusFilter },
              ].map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setStatusFilter(f.value)}
                  className={`rounded-full border px-3 py-1 transition-colors ${
                    statusFilter === f.value
                      ? "border-sky-400 bg-sky-500/10 text-sky-200"
                      : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GRID PROJETS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj, index) => {
            const normalizedStatus = normalizeStatus(proj.status as string);
            const isHero = enableHero && index === 0;

            const statusLabel =
              normalizedStatus === "online"
                ? "En ligne"
                : normalizedStatus === "progress"
                ? "En cours"
                : "Refonte";

            const statusDotClass =
              normalizedStatus === "online"
                ? "bg-emerald-400"
                : normalizedStatus === "progress"
                ? "bg-amber-400"
                : "bg-sky-400";

            const borderClass =
              normalizedStatus === "online"
                ? "border-emerald-500/40"
                : normalizedStatus === "progress"
                ? "border-amber-400/40"
                : "border-sky-400/40";

            return (
              <Link
                key={proj.slug}
                href={`/projets/${proj.slug}`}
                className={isHero ? "md:col-span-2 lg:col-span-3 group" : "group"}
              >
                <article
                  className={[
                    "relative flex flex-col overflow-hidden rounded-2xl border bg-slate-950/85 px-4 pb-4 pt-4 shadow-[0_16px_45px_rgba(15,23,42,0.85)] transition-transform duration-300",
                    "hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(8,47,73,0.95)]",
                    borderClass,
                    isHero && "md:flex-row md:items-stretch md:gap-6",
                  ].join(" ")}
                >
                  {/* Glow hover */}
                  <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_70%)]" />

                  {/* BADGE STATUT */}
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-950/80 px-2.5 py-1 text-[10px] font-medium text-slate-100 backdrop-blur-sm">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${statusDotClass} ${
                        normalizedStatus === "online" ? "" : "animate-pulse"
                      }`}
                    />
                    {statusLabel}
                  </span>

                  {/* IMAGE */}
                  <div
                    className={[
                      "relative overflow-hidden rounded-xl border border-slate-800/70 bg-slate-900/80",
                      isHero ? "md:w-1/2 h-40 sm:h-56" : "h-32 w-full",
                    ].join(" ")}
                  >
                    <Image
                      src={proj.img}
                      alt={proj.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  </div>

                  {/* TEXTES */}
                  <div
                    className={[
                      "mt-4 space-y-2",
                      isHero ? "md:mt-0 md:flex-1" : "",
                    ].join(" ")}
                  >
                    <h3 className="text-sm font-semibold text-slate-50">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {proj.type}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {proj.shortDesc}
                    </p>

                    {isHero && (
                      <p className="text-[11px] text-sky-300 pt-1">
                        Projet mis en avant pour découvrir concrètement l’approche KOSMONDE.
                      </p>
                    )}

                    {/* FOOTER CARD */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/70 pt-3">
                      <span className="text-[11px] text-slate-500">
                        Voir le projet en détail
                      </span>
                      <span className="text-[11px] text-sky-300 group-hover:translate-x-0.5 transition-transform">
                        Découvrir ↗
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
