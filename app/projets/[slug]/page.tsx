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

  const quickInfoItems = [
    { label: "Client", value: (project as any).client },
    { label: "Type", value: project.type },
    { label: "Secteur", value: (project as any).sector },
    { label: "Année", value: (project as any).year },
    { label: "Rôle", value: (project as any).role },
  ].filter((item) => item.value);

  const hasQuickInfo = quickInfoItems.length > 0;
  const hasResults = (project as any).results?.length;
  const hasKosmondeRoles = (project as any).kosmondeRoles?.length;
  const hasTestimonial = Boolean((project as any).testimonial);

  const currentIndex = projects.findIndex((p) => p.slug === cleanSlug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen pb-16 flex flex-col">
      <Header />

      {/* HERO */}
      <section className="border-b border-slate-900/60 bg-slate-950/95">
        <div className="container-kosmonde py-10 sm:py-12 space-y-8 text-center max-w-4xl mx-auto">
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
            <span className="text-slate-300 line-clamp-1">{project.title}</span>
          </div>

          {/* Type + statut */}
          <div className="flex justify-center items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              {project.type}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-200">
              <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`} />
              {statusLabel}
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
            {project.title}
          </h1>

          {/* Résumé hero */}
          {(project as any).heroSummary || project.shortDesc ? (
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 px-4">
              {(project as any).heroSummary || project.shortDesc}
            </p>
          ) : null}

          {/* Bloc iMac en CSS : écran + menton + pied */}
          <div className="relative mx-auto max-w-3xl w-full group mt-4 sm:mt-6">
            {/* Écran + menton */}
            <div className="relative w-full">
              {/* Glow derrière l'écran */}
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)] opacity-70" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.7)]">
                {/* Barre du haut */}
                <div className="flex h-8 items-center gap-1 border-b border-slate-800 bg-slate-950/90 px-3 rounded-t-3xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-[10px] text-slate-500">
                    Aperçu du site
                  </span>
                </div>

                {/* Image + bouton */}
                <div className="relative h-56 sm:h-72 lg:h-80">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 768px, 100vw"
                    className="object-cover object-center"
                  />

                  {project.link && (
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4">
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2 text-[11px] sm:text-xs font-medium text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-300"
                      >
                        Voir le site ↗
                      </Link>
                    </div>
                  )}
                </div>

                {/* Menton iMac : même couleur que le cadre + KOSMONDE en blanc */}
                <div className="h-9 sm:h-10 md:h-11 flex items-center justify-center border-t border-slate-800 bg-slate-900/90">
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.35em] text-slate-50 uppercase">
                    KOSMONDE
                  </span>
                </div>
              </div>
            </div>

            {/* Pied iMac clair, centré */}
            <div className="-mt-2 sm:-mt-3 flex flex-col items-center pointer-events-none select-none">
              <div className="h-9 sm:h-10 md:h-11 w-16 sm:w-20 md:w-24 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 rounded-b-[999px] shadow-[0_20px_40px_rgba(15,23,42,0.9)]" />
            </div>
          </div>

          {/* Infos rapides */}
          {hasQuickInfo && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 pt-6">
              {quickInfoItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5 text-[10px] sm:text-[11px] flex items-center gap-1.5"
                >
                  <span className="text-slate-400">{item.label} :</span>
                  <span className="font-medium text-slate-100 truncate max-w-[140px] sm:max-w-none">
                    {item.value as string}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="container-kosmonde py-10 lg:py-14 space-y-10">
        {/* Description + Contexte + Stack */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6 space-y-6">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-50">
              Description du projet
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {project.desc}
            </p>
          </div>

          {project.context && (
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                Contexte du projet
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {project.context}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              Approche & stack technique
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {project.techStack}
            </p>

            {(project as any).techBadges && (
              <div className="mt-4 flex flex-wrap gap-2">
                {(project as any).techBadges.map((badge: string) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[10px] uppercase tracking-wide text-slate-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Résultats / Témoignage / Rôle */}
        {(hasResults || hasTestimonial || hasKosmondeRoles) && (
          <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
            {hasResults && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="text-sm font-semibold text-slate-50">
                  Résultats & impact
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-[13px] text-slate-300">
                  {(project as any).results.map((result: string) => (
                    <li key={result} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasTestimonial && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="text-sm font-semibold text-slate-50">
                  Témoignage client
                </h3>
                <p className="mt-3 text-xs sm:text-[13px] text-slate-200 italic">
                  “{(project as any).testimonial}”
                </p>
                {((project as any).testimonialName ||
                  (project as any).testimonialRole) && (
                  <p className="mt-3 text-[11px] text-slate-400">
                    {(project as any).testimonialName && (
                      <span className="font-medium text-slate-200">
                        {(project as any).testimonialName}
                      </span>
                    )}
                    {(project as any).testimonialRole && (
                      <span> • {(project as any).testimonialRole}</span>
                    )}
                  </p>
                )}
              </div>
            )}

            {hasKosmondeRoles && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="text-sm font-semibold text-slate-50">
                  Rôle de KOSMONDE
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-[13px] text-slate-300">
                  {(project as any).kosmondeRoles.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Fonctionnalités clés */}
        {project.features.length > 0 && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-50">
              Fonctionnalités clés
            </h3>
            <ul className="mt-4 grid gap-2 text-xs sm:text-[13px] text-slate-300 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA final */}
        <div className="border-t border-slate-900/60 pt-6 text-center space-y-6">
          <p className="text-xs sm:text-[13px] text-slate-400">
            Tu veux un site avec des fonctionnalités similaires pour ton projet ?{" "}
            <Link href="/#contact" className="text-sky-300 hover:text-sky-200">
              Parlons-en
            </Link>
            .
          </p>

          <Link
            href="/#projets"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-xs font-medium text-slate-100 hover:border-slate-500"
          >
            Retour aux projets
          </Link>

          {(prevProject || nextProject) && (
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              {prevProject ? (
                <Link
                  href={`/projets/${prevProject.slug}`}
                  className="inline-flex items-center gap-1 hover:text-sky-300 max-w-[45%] truncate"
                >
                  <span>←</span>
                  <span className="truncate">{prevProject.title}</span>
                </Link>
              ) : (
                <span />
              )}

              {nextProject && (
                <Link
                  href={`/projets/${nextProject.slug}`}
                  className="inline-flex items-center gap-1 hover:text-sky-300 ml-auto max-w-[45%] truncate"
                >
                  <span className="truncate">{nextProject.title}</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
