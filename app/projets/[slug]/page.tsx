import Image from "next/image";
import Link from "next/link";
import { projects } from "../data";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

type ParamsPromise = Promise<{ slug: string }>;

type Props = {
  params: ParamsPromise;
};

// On normalise les statuts français venant des données
function getStatusConfig(rawStatus: unknown) {
  const value = String(rawStatus ?? "").trim();

  switch (value) {
    case "En ligne":
      return {
        label: "En ligne",
        dotClass: "bg-emerald-400",
      };
    case "En cours":
      return {
        label: "En cours",
        dotClass: "bg-amber-400",
      };
    case "Liste d’attente":
      return {
        label: "Liste d’attente",
        dotClass: "bg-violet-400",
      };
    case "Refont":
      return {
        label: "Refonte en cours",
        dotClass: "bg-sky-400",
      };
    default:
      return {
        label: value || "Statut à définir",
        dotClass: "bg-slate-500",
      };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const cleanSlug = slug.trim();

  const project = projects.find((p) => p.slug === cleanSlug);

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-slate-300">Projet introuvable.</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Status FR venant des données (Ex: "En ligne", "En cours", "Liste d’attente", "Refont")
  const { label: statusLabel, dotClass: statusDotClass } = getStatusConfig(
    (project as any).status
  );

  const quickInfoItems = [
    { label: "Client", value: (project as any).client },
    { label: "Type", value: project.type },
    { label: "Secteur", value: (project as any).sector },
    { label: "Année", value: (project as any).year },
    { label: "Rôle", value: (project as any).role },
  ].filter((i) => i.value);

  const hasQuickInfo = quickInfoItems.length > 0;
  const hasResults = (project as any).results?.length;
  const hasTestimonial = Boolean((project as any).testimonial);
  const hasRoles = (project as any).kosmondeRoles?.length;

  const currentIndex = projects.findIndex((p) => p.slug === cleanSlug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="relative bg-slate-950 text-slate-50 min-h-screen flex flex-col overflow-hidden">
      {/* Ambiance KOSMONDE (glows + léger cosmos) */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.4),transparent_55%)]" />

      <Header />

      {/* ======================== HERO ======================== */}
      <section className="border-b border-slate-900/60 pb-14 pt-16">
        <div className="container-kosmonde max-w-4xl mx-auto text-center space-y-8">
          {/* FIL D’ARIANE */}
          <nav
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-1.5 text-[11px] text-slate-400 mx-auto shadow-[0_12px_40px_rgba(15,23,42,0.6)]"
            aria-label="Fil d’Ariane"
          >
            <Link href="/" className="hover:text-slate-200">
              Accueil
            </Link>
            <span>·</span>
            <Link href="/#projets" className="hover:text-slate-200">
              Projets
            </Link>
            <span>·</span>
            <span className="text-slate-300">{project.title}</span>
          </nav>

          {/* TYPE + STATUT */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.23em] text-slate-400/90">
              {project.type}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-1.5 text-[11px] shadow-[0_0_0_1px_rgba(148,163,184,0.12)]">
              <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`} />
              {statusLabel}
            </span>
          </div>

          {/* TITRE */}
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            {project.title}
          </h1>

          {/* SOUS-TITRE */}
          {(project as any).heroSummary || project.shortDesc ? (
            <p className="max-w-2xl mx-auto text-[13px] leading-relaxed text-slate-300/90 px-4">
              {(project as any).heroSummary || project.shortDesc}
            </p>
          ) : null}
        </div>

        {/* ======================== iMAC ======================== */}
        <div className="container-kosmonde max-w-4xl mx-auto mt-8">
          <div className="relative mx-auto max-w-3xl w-full group">
            <div className="relative w-full transition-transform duration-500 group-hover:-translate-y-1">
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_65%)] opacity-90 blur-[1px]" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.9)] group-hover:shadow-[0_30px_100px_rgba(8,47,73,0.9)] transition-shadow duration-500">
                {/* Barre du haut */}
                <div className="flex h-8 items-center gap-1 border-b border-slate-800 bg-slate-950/95 px-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                  <span className="ml-3 text-[10px] text-slate-500">
                    Aperçu du site
                  </span>
                </div>

                {/* IMAGE */}
                <div className="relative h-60 sm:h-72 lg:h-80 overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.03]"
                  />

                  {/* BOUTON CENTRÉ */}
                  {project.link && (
                    <div className="absolute inset-0 flex justify-center items-end pb-6">
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="bg-sky-400 text-slate-950 px-7 py-3 rounded-full text-sm font-semibold shadow-xl hover:bg-sky-300 transition-transform duration-300 hover:-translate-y-0.5"
                        aria-label={`Voir le site ${project.title}`}
                      >
                        Voir le site ↗
                      </Link>
                    </div>
                  )}
                </div>

                {/* Menton */}
                <div className="h-10 flex justify-center items-center border-t border-slate-800/80 bg-slate-900/95">
                  <span className="text-[11px] tracking-[0.35em] text-slate-50/90">
                    KOSMONDE
                  </span>
                </div>
              </div>
            </div>

            {/* Pied */}
            <div className="-mt-3 flex justify-center">
              <div className="h-12 w-28 bg-gradient-to-b from-slate-200 to-slate-300 rounded-b-[999px] shadow-[0_20px_40px_rgba(15,23,42,0.95)]" />
            </div>
          </div>

          {/* Infos rapides — style fiche technique */}
          {hasQuickInfo && (
            <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-slate-800/70 bg-slate-950/80 px-5 py-4 sm:px-6 sm:py-5">
              <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-slate-400 mb-3">
                Infos projet
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
                {quickInfoItems.map((i, index) => (
                  <div
                    key={i.label}
                    className={`flex items-baseline justify-between gap-4 border-slate-800/60 pb-2 ${
                      index >= quickInfoItems.length - 2 ? "border-none pb-0" : "border-b"
                    }`}
                  >
                    <dt className="text-slate-400">{i.label}</dt>
                    <dd className="text-slate-100 font-medium text-right">
                      {i.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* ======================== CONTENU + SIDEBAR ======================== */}
      <section className="container-kosmonde pt-12 pb-16">
        <div className="grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-10">
          {/* SIDEBAR STICKY (desktop) */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-28 h-fit text-[12px]">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 mb-2">
                Aperçu
              </p>
              <p className="text-slate-200 text-xs mb-3">
                Parcours le projet, les résultats, puis découvre comment KOSMONDE
                peut t’accompagner.
              </p>

              {/* Barre de progression statique (design) */}
              <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden mb-4">
                <div className="h-full w-1/3 bg-gradient-to-r from-sky-400/70 via-sky-300/80 to-sky-400/70" />
              </div>

              <nav className="space-y-1">
                <a
                  href="#description"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Description</span>
                  <span className="text-slate-600 text-[10px]">01</span>
                </a>
                {(hasResults || hasTestimonial || hasRoles) && (
                  <a
                    href="#resultats"
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                  >
                    <span>Résultats & avis</span>
                    <span className="text-slate-600 text-[10px]">02</span>
                  </a>
                )}
                <a
                  href="#fonctionnalites"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Fonctionnalités</span>
                  <span className="text-slate-600 text-[10px]">03</span>
                </a>
                <a
                  href="#cta-kosmonde"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Parler de ton projet</span>
                  <span className="text-slate-600 text-[10px]">04</span>
                </a>
              </nav>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 px-4 py-3 text-xs text-slate-300">
              <p className="font-medium mb-1">KOSMONDE</p>
              <p className="text-slate-400">
                Création de sites web sur-mesure, pensés pour ton univers et tes
                objectifs.
              </p>
            </div>
          </aside>

          {/* CONTENU PRINCIPAL */}
          <div className="space-y-12">
            {/* DESCRIPTION */}
            <div
              id="description"
              className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-4 shadow-[0_16px_40px_rgba(15,23,42,0.7)]"
            >
              <h2 className="text-lg font-semibold">Description du projet</h2>
              <p className="text-sm text-slate-300">{project.desc}</p>

              <h3 className="text-sm font-semibold mt-4">Contexte du projet</h3>
              <p className="text-sm text-slate-300">{project.context}</p>

              <h3 className="text-sm font-semibold mt-4">
                Approche & stack technique
              </h3>
              <p className="text-sm text-slate-300">{project.techStack}</p>
            </div>

            {/* BANDE PREMIUM / RÉSULTATS */}
            {(hasResults || hasTestimonial || hasRoles) && (
              <div
                id="resultats"
                className="max-w-5xl mx-auto rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950 px-5 py-7 sm:px-7 sm:py-8 shadow-[0_22px_60px_rgba(15,23,42,0.9)] backdrop-blur-sm"
              >
                <h2 className="text-center text-[12px] font-medium mb-8 uppercase tracking-[0.25em] text-slate-300">
                  Résultats · Avis client · Rôle de KOSMONDE
                </h2>

                <div className="grid gap-6 lg:grid-cols-3">
                  {hasResults && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.7)] hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-sm font-semibold text-slate-50">
                        Résultats
                      </h3>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        {(project as any).results.map((r: string) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {hasTestimonial && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 p-5 hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-sm font-semibold text-slate-50">
                        Témoignage
                      </h3>
                      <p className="mt-3 text-xs text-slate-200 italic leading-relaxed">
                        “{(project as any).testimonial}”
                      </p>

                      <p className="mt-3 text-[11px] text-slate-400">
                        {(project as any).testimonialName}
                        {project.testimonialRole && (
                          <> · {(project as any).testimonialRole}</>
                        )}
                      </p>
                    </div>
                  )}

                  {hasRoles && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 p-5 hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-sm font-semibold text-slate-50">
                        Rôle de KOSMONDE
                      </h3>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        {(project as any).kosmondeRoles.map((r: string) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-sky-400/90" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FONCTIONNALITÉS */}
            <div
              id="fonctionnalites"
              className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-sm font-semibold">Fonctionnalités clés</h3>
              <ul className="mt-4 grid gap-2 text-xs sm:grid-cols-2 text-slate-300">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="h-1.5 w-1.5 bg-sky-400 rounded-full mt-1.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA FINAL + NAVIGATION */}
            <div
              id="cta-kosmonde"
              className="pt-6 border-t border-slate-900/60"
            >
              <div className="max-w-3xl mx-auto text-center rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-8 space-y-4 shadow-[0_20px_60px_rgba(15,23,42,0.8)]">
                <h3 className="text-sm font-semibold text-slate-50">
                  Tu veux un site dans l’esprit de ce projet ?
                </h3>
                <p className="text-xs text-slate-400 max-w-xl mx-auto">
                  On discute de ton projet, de tes objectifs, et on voit comment
                  KOSMONDE peut t’aider à passer un cap en ligne. Tu poses ton
                  univers, on s’occupe du reste.
                </p>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-6 py-2 text-xs font-semibold text-slate-950 hover:brightness-110 transition-transform hover:-translate-y-0.5"
                  >
                    Parler de mon projet ↗
                  </Link>

                  <Link
                    href="/#projets"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2 text-xs text-slate-200 hover:border-slate-500"
                  >
                    Voir d’autres projets
                  </Link>
                </div>
              </div>

              {(prevProject || nextProject) && (
                <div className="flex justify-between text-[11px] text-slate-400 mt-6">
                  {prevProject ? (
                    <Link
                      href={`/projets/${prevProject.slug}`}
                      className="hover:text-sky-300 flex gap-1"
                    >
                      ← {prevProject.title}
                    </Link>
                  ) : (
                    <span />
                  )}

                  {nextProject && (
                    <Link
                      href={`/projets/${nextProject.slug}`}
                      className="hover:text-sky-300 flex gap-1"
                    >
                      {nextProject.title} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
