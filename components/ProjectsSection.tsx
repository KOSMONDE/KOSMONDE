import Image from "next/image";
import Link from "next/link";
import { projects } from "../app/projets/data";

export function ProjectsSection() {
  return (
    <section
  id="projets"
  className="border-b border-slate-900/40 bg-linear-to-b from-slate-950 to-slate-950"
  >

      <div className="container-kosmonde space-y-8 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-title">Projets & exemples</h2>
            <p className="section-subtitle">
              Quelques réalisations représentatives du style, des structures et
              des fonctionnalités que je crée.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Statut indiqué pour chaque projet : en ligne, en cours ou en
            refonte.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((proj) => (
            <Link
              key={proj.slug}
              href={`/projets/${proj.slug}`}
              className="group"
            >
              <article
                className={`card relative flex flex-col overflow-hidden transition-colors group-hover:border-sky-400/60 ${
                  proj.status === "online"
                    ? "border-emerald-500/30"
                    : proj.status === "progress"
                    ? "border-amber-400/30"
                    : "border-sky-400/40"
                }`}
              >
                {/* BADGE DE STATUT */}
                <span className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-medium text-slate-200 backdrop-blur-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      proj.status === "online"
                        ? "bg-emerald-400"
                        : proj.status === "progress"
                        ? "bg-amber-400 animate-pulse"
                        : "bg-sky-400 animate-pulse"
                    }`}
                  />
                  {proj.status === "online"
                    ? "En ligne"
                    : proj.status === "progress"
                    ? "En cours"
                    : "Refonte en cours"}
                </span>

                {/* IMAGE */}
                <div className="relative h-32 w-full overflow-hidden rounded-xl">
                  <Image
                    src={proj.img}
                    alt={proj.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* TEXTES */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-50">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {proj.type}
                  </p>
                  <p className="text-xs text-slate-400">{proj.shortDesc}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
