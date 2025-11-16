import Image from "next/image";
import Link from "next/link";
import { projects } from "../data";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

type ParamsPromise = Promise<{ slug: string }>;

type Props = {
  params: ParamsPromise;
};

export default async function ProjectPage({ params }: Props) {
  // Next 16 : params est une Promise
  const { slug } = await params;
  const cleanSlug = slug.trim();

  const project = projects.find((p) => p.slug === cleanSlug);

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-3 text-center">
            <p className="text-sm text-slate-300">Projet introuvable</p>
            <p className="text-xs text-slate-500">
              Slug demandé :{" "}
              <span className="font-mono text-sky-300">
                {cleanSlug || "(vide)"}
              </span>
            </p>
            <p className="text-xs text-slate-500">
              Slugs disponibles :{" "}
              <span className="font-mono text-sky-300">
                {projects.map((p) => p.slug).join(", ")}
              </span>
            </p>
            <Link
              href="/#projets"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-sky-400 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-sky-300"
            >
              Retour aux projets
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const statusLabel =
    project.status === "online"
      ? "En ligne"
      : project.status === "progress"
      ? "En cours"
      : "Refonte en cours";

  const statusDotClass =
    project.status === "online"
      ? "bg-emerald-400"
      : project.status === "progress"
      ? "bg-amber-400"
      : "bg-sky-400";

  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen pb-16 flex flex-col">
      <Header />

      {/* HERO CENTRÉ */}
      <section className="border-b border-slate-900/60 bg-slate-950/95">
        <div className="container-kosmonde py-12 space-y-8 text-center max-w-3xl mx-auto">
          {/* Fil d’Ariane */}
          <div className="flex justify-center gap-2 text-[11px] text-slate-400">
            <Link href="/" className="hover:text-slate-100">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/#projets" className="hover:text-slate-100">
              Projets
            </Link>
            <span>/</span>
            <span className="text-slate-300">{project.title}</span>
          </div>

          {/* TYPE + STATUT */}
          <div className="flex justify-center items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              {project.type}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-200">
              <span
                className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`}
              />
              {statusLabel}
            </span>
          </div>

          {/* TITRE */}
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-slate-50">
            {project.title}
          </h1>

          {/* IMAGE */}
          <div className="relative mx-auto max-w-3xl">
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)] opacity-70" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.7)]">
              <div className="flex h-8 items-center gap-1 border-b border-slate-800/80 bg-slate-950/80 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-[10px] text-slate-500">
                  Aperçu du site
                </span>
              </div>

              <div className="relative h-64 w-full sm:h-72 lg:h-80">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION SOUS L’IMAGE */}
          <p className="max-w-2xl mx-auto text-sm text-slate-300 px-4">
            {project.shortDesc}
          </p>

          {/* CTA CENTRÉ */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-full bg-sky-400 px-6 py-2.5 text-xs font-medium text-slate-950 hover:bg-sky-300"
              >
                <span>Voir le site</span>
                <span className="text-[11px]">↗</span>
              </Link>
            )}

            <Link
              href="/#projets"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-xs font-medium text-slate-100 hover:border-slate-500"
            >
              Retour aux projets
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENU PRINCIPAL ÉPURÉ */}
      <section className="bg-slate-950 flex-1">
        <div className="container-kosmonde py-10 lg:py-14 space-y-10">
          {/* Description + contexte + stack */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-start">
            <div className="space-y-4 max-w-3xl mx-auto lg:mx-0 text-sm text-slate-300">
              <h2 className="text-base font-semibold text-slate-50">
                Description du projet
              </h2>
              <p className="text-slate-300">{project.desc}</p>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-50">
                  Contexte du projet
                </h3>
                <p className="text-slate-400">{project.context}</p>
              </div>
            </div>

            <div className="max-w-md mx-auto lg:mx-0 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Approche & stack technique
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                {project.techStack}
              </p>
            </div>
          </div>

          {/* Fonctionnalités clés */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <h3 className="text-sm font-semibold text-slate-50">
              Fonctionnalités clés
            </h3>
            <ul className="mt-4 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action final */}
          <div className="border-t border-slate-900/60 pt-6 text-xs text-slate-400 text-center">
            <p>
              Tu veux un site avec des fonctionnalités similaires pour ton
              projet ?{" "}
              <Link
                href="/#contact"
                className="text-sky-300 hover:text-sky-200"
              >
                Parlons-en
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
