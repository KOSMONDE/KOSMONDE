import Image from "next/image";
import Link from "next/link";
import { projects } from "../data";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

type ParamsPromise = Promise<{ slug: string }>;

type Props = {
  params: ParamsPromise;
};

// Normalisation du statut
function getStatusConfig(rawStatus: unknown) {
  const value = String(rawStatus ?? "").trim();

  switch (value) {
    case "En ligne":
      return { label: "En ligne", dotClass: "bg-emerald-400" };
    case "En cours":
      return { label: "En cours", dotClass: "bg-amber-400" };
    case "Liste d’attente":
      return { label: "Liste d’attente", dotClass: "bg-violet-400" };
    case "Refont":
      return { label: "Refonte en cours", dotClass: "bg-sky-400" };
    default:
      return { label: value || "Statut à définir", dotClass: "bg-slate-500" };
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

  const {
    client,
    sector,
    year,
    role,
    heroSummary,
    clientObjectives: clientObjectivesRaw,
    challenges: challengesRaw,
    solutions: solutionsRaw,
    beforeState,
    afterState,
    results: resultsRaw,
    metrics: metricsRaw,
    testimonial,
    testimonialName,
    testimonialRole,
    kosmondeRoles: kosmondeRolesRaw,
    processSteps: processStepsRaw,
    techBadges: techBadgesRaw,
    context,
    techStack,
  } = project;

  const { label: statusLabel, dotClass: statusDotClass } = getStatusConfig(
    project.status
  );

  // Infos rapides
  const quickInfoItems = [
    { label: "Client", value: client },
    { label: "Secteur", value: sector },
    { label: "Année", value: year },
    { label: "Rôle", value: role },
    { label: "Type", value: project.type },
  ].filter((i) => i.value);

  const hasQuickInfo = quickInfoItems.length > 0;

  // Données avancées
  const clientObjectives = clientObjectivesRaw ?? [];
  const hasClientObjectives = clientObjectives.length > 0;

  const challenges = challengesRaw ?? [];
  const solutions = solutionsRaw ?? [];
  const hasChallengesSolutions =
    challenges.length > 0 || solutions.length > 0;

  const hasBeforeAfter = Boolean(beforeState && afterState);

  const results = resultsRaw ?? [];
  const hasResults = results.length > 0;

  const metrics = metricsRaw ?? [];
  const hasMetrics = metrics.length > 0;

  const hasTestimonial = Boolean(testimonial);

  const kosmondeRoles = kosmondeRolesRaw ?? [];
  const hasRoles = kosmondeRoles.length > 0;

  const processSteps = processStepsRaw ?? [];
  const hasProcess = processSteps.length > 0;

  const techBadges = techBadgesRaw ?? [];

  const currentIndex = projects.findIndex((p) => p.slug === cleanSlug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* FOND PREMIUM */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.4),transparent_55%)]" />

      <Header />

      {/* ======================================================================
         HERO PREMIUM
      ======================================================================= */}
      <section className="border-b border-slate-900/70 pt-16 pb-14">
        <div className="container-kosmonde max-w-6xl mx-auto">
          {/* Fil d’Ariane */}
          <nav
            aria-label="Fil d’Ariane"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/60 px-4 py-1.5 text-[11px] text-slate-400 shadow-[0_12px_40px_rgba(15,23,42,0.6)] mb-6"
          >
            <Link href="/" className="hover:text-slate-100">
              Accueil
            </Link>
            <span>·</span>
            <Link href="/#projets" className="hover:text-slate-100">
              Projets
            </Link>
            <span>·</span>
            <span className="text-slate-200">{project.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
            {/* Colonne gauche : titre + pitch */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.23em] text-slate-400/90">
                <span>{project.type}</span>
                <span className="h-0.5 w-4 rounded-full bg-slate-600/70" />
                <span className="inline-flex items-center gap-2 text-[10px] normal-case tracking-[0.16em]">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`}
                  />
                  {statusLabel}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                  {project.title}
                </h1>
                <p className="max-w-xl text-[13px] sm:text-sm leading-relaxed text-slate-300">
                  {heroSummary || project.shortDesc || undefined}
                </p>
              </div>

              {/* Mini bénéfice business */}
              <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-[11px] text-emerald-100 shadow-[0_12px_40px_rgba(16,185,129,0.25)]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-[12px]">
                  +
                </span>
                <span>
                  Un projet pensé pour clarifier ton offre, rassurer tes
                  visiteurs et faciliter la prise de contact.
                </span>
              </div>
            </div>

            {/* Colonne droite : infos rapides */}
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.85)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Carte du projet
                </p>
                {techBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {techBadges.slice(0, 3).map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-slate-700/80 bg-slate-900/90 px-2.5 py-0.5 text-[10px] text-slate-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {hasQuickInfo && (
                <dl className="space-y-2 text-[12px]">
                  {quickInfoItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <dt className="flex items-center gap-2 text-slate-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500/80" />
                        {item.label}
                      </dt>
                      <dd className="text-slate-100 font-medium text-right">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.link && (
                <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-400">
                    Voir le site en ligne
                  </p>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/90 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-sky-300 transition-transform hover:-translate-y-0.5"
                  >
                    Ouvrir le site ↗
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         MOCKUP PRINCIPAL
      ======================================================================= */}
      <section className="border-b border-slate-900/70 pb-16 pt-4">
        <div className="container-kosmonde max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-x-10 -inset-y-6 -z-10 bg-gradient-to-r from-sky-500/10 via-sky-300/5 to-violet-500/10 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-[0_32px_100px_rgba(15,23,42,0.95)] group-hover:shadow-[0_40px_120px_rgba(15,23,42,0.98)] transition-all duration-500">
              {/* Barre de fenêtre */}
              <div className="flex h-8 items-center gap-1 border-b border-slate-800 bg-slate-950/95 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                <span className="ml-3 text-[10px] text-slate-500">
                  Aperçu du projet
                </span>
              </div>

              {/* Image principale */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.03]"
                  priority
                />
              </div>

              {/* Bandeau bas */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/95 text-[11px] text-slate-400">
                <span className="tracking-[0.26em] text-slate-200/90">
                  KOSMONDE · ÉTUDE DE CAS
                </span>
                {project.link && (
                  <span className="hidden sm:inline">
                    {project.link.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         CONTENU + SIDEBAR
      ======================================================================= */}
      <section className="container-kosmonde max-w-6xl mx-auto pt-10 pb-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-28 h-fit text-[12px]">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 mb-2">
                Parcours de l’étude de cas
              </p>

              <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden mb-4">
                <div className="h-full w-1/3 bg-gradient-to-r from-sky-400/70 via-sky-300/80 to-sky-400/70" />
              </div>

              <nav className="space-y-1.5">
                <a
                  href="#objectifs-client"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Objectifs du client</span>
                  <span className="text-slate-600 text-[10px]">01</span>
                </a>
                <a
                  href="#defis-solutions"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Défis & solutions</span>
                  <span className="text-slate-600 text-[10px]">02</span>
                </a>
                <a
                  href="#description"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Description & contexte</span>
                  <span className="text-slate-600 text-[10px]">03</span>
                </a>
                <a
                  href="#avant-apres"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Avant / Après</span>
                  <span className="text-slate-600 text-[10px]">04</span>
                </a>
                <a
                  href="#resultats"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Résultats & preuves</span>
                  <span className="text-slate-600 text-[10px]">05</span>
                </a>
                <a
                  href="#fonctionnalites"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Fonctionnalités clés</span>
                  <span className="text-slate-600 text-[10px]">06</span>
                </a>
                <a
                  href="#processus"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Processus KOSMONDE</span>
                  <span className="text-slate-600 text-[10px]">07</span>
                </a>
                <a
                  href="#cta-kosmonde"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-900/80"
                >
                  <span>Parler de ton projet</span>
                  <span className="text-slate-600 text-[10px]">08</span>
                </a>
              </nav>
            </div>

            {/* Bloc bénéfices synthétiques */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 px-4 py-4 text-xs text-slate-300 shadow-[0_12px_30px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 mb-2">
                Ce type de projet t’apporte
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                  <span>Une image plus professionnelle et cohérente.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                  <span>Un site plus clair pour tes visiteurs.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                  <span>Un parcours plus fluide jusqu’au contact.</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* CONTENU PRINCIPAL */}
          <div className="space-y-12">
            {/* OBJECTIFS DU CLIENT */}
            <section
              id="objectifs-client"
              className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-950/95 to-slate-950/80 p-6 sm:p-7 shadow-[0_20px_60px_rgba(15,23,42,0.8)]"
            >
              <h2 className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-300">
                Objectifs du client
              </h2>

              {hasClientObjectives ? (
                <div className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/80 px-5 py-4">
                  <ol className="space-y-3 text-sm text-slate-200">
                    {clientObjectives.map((obj, index) => (
                      <li
                        key={obj}
                        className="flex items-baseline gap-3 pb-2 last:pb-0 border-b border-slate-800/60 last:border-none"
                      >
                        <div className="flex items-center gap-2 min-w-[4.5rem]">
                          <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.25)]" />
                          <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-200">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-200">
                          {obj}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-300">
                  Objectifs centrés sur la clarté du message, l’image
                  professionnelle et la facilité de prise de contact.
                </p>
              )}
            </section>

            {/* DÉFIS & SOLUTIONS */}
            <section
              id="defis-solutions"
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.7)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400">
                  Défis du projet & réponses apportées
                </h2>
              </div>
              {hasChallengesSolutions ? (
                <div className="grid gap-6 lg:grid-cols-2 text-sm">
                  <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
                    <h3 className="text-xs font-semibold text-rose-100 uppercase tracking-[0.16em] mb-3">
                      Défis
                    </h3>
                    <ul className="space-y-2 text-slate-100/90">
                      {challenges.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                    <h3 className="text-xs font-semibold text-emerald-100 uppercase tracking-[0.16em] mb-3">
                      Solutions
                    </h3>
                    <ul className="space-y-2 text-slate-100/90">
                      {solutions.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-300">
                  Le projet a consisté à clarifier la structure, aligner le
                  design avec l’image de la marque et rendre le parcours plus
                  fluide pour les visiteurs.
                </p>
              )}
            </section>

            {/* DESCRIPTION & CONTEXTE + APPROCHE + POINTS CLÉS */}
            <section
              id="description"
              className="rounded-3xl border border-slate-800/80 bg-slate-950/85 px-6 py-7 shadow-[0_18px_50px_rgba(15,23,42,0.85)]"
            >
              <h2 className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-300 mb-5">
                Description du projet & contexte
              </h2>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-start">
                {/* COLONNE GAUCHE : description + contexte + points clés */}
                <div className="space-y-6 text-sm text-slate-300">
                  {/* Description */}
                  <p>{project.desc}</p>

                  {/* Contexte */}
                  {context && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-400">
                        Contexte
                      </p>
                      <p>{context}</p>
                    </div>
                  )}

                  {/* Points clés du contexte (remplit le vide) */}
                  {(hasClientObjectives || hasResults) && (
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-400">
                        Points clés à retenir
                      </p>
                      <ul className="space-y-1.5 text-[13px] text-slate-200">
                        {(hasClientObjectives ? clientObjectives : results)
                          .slice(0, 3)
                          .map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* COLONNE DROITE : approche + "En bref" */}
                <div className="flex flex-col gap-4">
                  <aside className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-950/90 px-4 py-4 sm:px-5 sm:py-5">
                    <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-300">
                      Approche & stack technique
                    </p>

                    <p className="mt-3 text-[13px] leading-relaxed text-slate-200">
                      {techStack}
                    </p>

                    {techBadges.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[11px] text-slate-500 mb-2">
                          Outils principaux
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {techBadges.map((badge) => (
                            <span
                              key={badge}
                              className="rounded-full border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-[11px] text-slate-100"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </aside>

                  {hasResults && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 px-4 py-4 sm:px-5">
                      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-300 mb-2">
                        En bref, ce que le site change
                      </p>
                      <ul className="space-y-2 text-[12px] text-slate-300">
                        {results.slice(0, 3).map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* AVANT / APRÈS */}
            {hasBeforeAfter && (
              <section
                id="avant-apres"
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.7)]"
              >
                <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400 mb-4">
                  Avant / Après
                </h2>
                <div className="grid gap-6 md:grid-cols-2 text-sm text-slate-300">
                  <div className="rounded-xl border border-slate-800/80 bg-slate-950/95 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.16em] mb-2">
                      Avant
                    </p>
                    <p>{beforeState}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                    <p className="text-xs font-semibold text-emerald-200 uppercase tracking-[0.16em] mb-2">
                      Après
                    </p>
                    <p>{afterState}</p>
                  </div>
                </div>
              </section>
            )}

            {/* RÉSULTATS / CHIFFRES / AVIS / RÔLE */}
            {(hasResults || hasMetrics || hasTestimonial || hasRoles) && (
              <section
                id="resultats"
                className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900/85 to-slate-950 px-6 py-7 sm:px-7 sm:py-8 shadow-[0_22px_70px_rgba(15,23,42,0.95)] space-y-6"
              >
                <h2 className="text-[11px] font-semibold tracking-[0.32em] uppercase text-center text-slate-300">
                  Résultats · chiffres · avis · rôle de KOSMONDE
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  {hasResults && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 p-5">
                      <h3 className="text-sm font-semibold text-slate-50">
                        Résultats qualitatifs
                      </h3>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        {results.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {hasMetrics && (
                    <div className="relative rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/12 to-slate-950/95 p-5 overflow-hidden">
                      <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.35),transparent_55%)] opacity-80" />
                      <div className="relative">
                        <h3 className="text-sm font-semibold text-emerald-100">
                          Résultats chiffrés
                        </h3>
                        <ul className="mt-3 space-y-2 text-xs text-emerald-50">
                          {metrics.map((m) => (
                            <li key={m} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {hasTestimonial && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-50">
                          Témoignage client
                        </h3>
                        <p className="mt-3 text-xs text-slate-200 italic leading-relaxed">
                          “{testimonial}”
                        </p>
                      </div>

                      <p className="mt-3 text-[11px] text-slate-400">
                        {testimonialName}
                        {testimonialRole && <> · {testimonialRole}</>}
                      </p>
                    </div>
                  )}

                  {hasRoles && (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/95 p-5">
                      <h3 className="text-sm font-semibold text-slate-50">
                        Rôle de KOSMONDE
                      </h3>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        {kosmondeRoles.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400/90" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* FONCTIONNALITÉS CLÉS */}
            <section
              id="fonctionnalites"
              className="rounded-3xl border border-slate-800/80 bg-slate-950/85 px-6 py-7"
            >
              <h2 className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-300">
                Fonctionnalités clés
              </h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {project.features.map((f) => (
                  <div
                    key={f}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/90 px-4 py-2 text-[12px] text-slate-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* PROCESSUS KOSMONDE */}
            <section
              id="processus"
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6"
            >
              <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400">
                Processus de réalisation KOSMONDE
              </h2>

              <div className="mt-5">
                {hasProcess ? (
                  <div className="grid gap-4 md:grid-cols-3 text-[11px] text-slate-300">
                    {processSteps.map((step, index) => (
                      <div
                        key={step}
                        className="relative rounded-xl border border-slate-800/80 bg-slate-950/95 px-3.5 py-3 flex flex-col gap-1"
                      >
                        <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          Étape {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-slate-100">{step}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-300">
                    Le projet suit un processus clair : échanges, structure,
                    design, développement, tests puis mise en ligne avec
                    accompagnement.
                  </p>
                )}
              </div>
            </section>

            {/* CTA + navigation projets */}
            <section
              id="cta-kosmonde"
              className="pt-4 border-t border-slate-900/70"
            >
              <div className="max-w-3xl mx-auto text-center rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-8 space-y-4 shadow-[0_20px_60px_rgba(15,23,42,0.8)]">
                <h3 className="text-sm font-semibold text-slate-50">
                  Tu veux un site dans l’esprit de ce projet ?
                </h3>
                <p className="text-xs text-slate-400 max-w-xl mx-auto">
                  On discute de ton activité, de tes objectifs et on voit
                  comment KOSMONDE peut t’aider à passer un cap en ligne avec un
                  site clair, pro et efficace.
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
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-8">
                  {prevProject ? (
                    <Link
                      href={`/projets/${prevProject.slug}`}
                      className="group flex items-center gap-2 hover:text-sky-300"
                    >
                      <span className="text-slate-500 group-hover:text-sky-300">
                        ←
                      </span>
                      <span>{prevProject.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}

                  {nextProject && (
                    <Link
                      href={`/projets/${nextProject.slug}`}
                      className="group flex items-center gap-2 hover:text-sky-300"
                    >
                      <span>{nextProject.title}</span>
                      <span className="text-slate-500 group-hover:text-sky-300">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
