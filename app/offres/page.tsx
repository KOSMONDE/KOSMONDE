import Link from "next/link";
import Footer from "../../components/Footer"; // chemin corrigé

/* --------------------------------------------------------- */
/* --------------------- HEADER KOSMONDE ------------------- */
/* --------------------------------------------------------- */

function HeaderKosmonde() {
  return (
    <header className="border-b border-slate-900/50 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75 sticky top-0 z-50">
      <div className="container-kosmonde flex items-center justify-between py-3 sm:py-4">
        {/* Logo / Nom */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.18em] text-slate-50"
        >
          KOSMONDE
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-5 text-[11px] sm:text-xs">
          <Link
            href="/#projets"
            className="text-slate-300 hover:text-slate-100 transition"
          >
            Projets
          </Link>
          <Link
            href="/offres"
            className="text-sky-300 font-medium hover:text-sky-200 transition"
          >
            Offres
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-sky-400/90 px-3 py-1.5 text-slate-950 font-semibold hover:brightness-110 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------------------------------- */
/* --------------------- PAGE OFFRES ----------------------- */
/* --------------------------------------------------------- */

export default function OffresPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <HeaderKosmonde />

      {/* HERO OFFRES – FOCUS CONVERSION */}
      <section className="border-b border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95">
        <div className="container-kosmonde py-14 sm:py-18 space-y-10">
          {/* Texte principal */}
          <div className="space-y-5 max-w-2xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-sky-300/80">
              Offres & tarifs KOSMONDE
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
              Création de sites web clairs
              <span className="block text-sky-300">
                pour indépendants et petites structures.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              One-page, site vitrine complet ou projet sur mesure. Tu comprends
              vite ce qui est possible, combien ça coûte et comment on peut
              avancer ensemble.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] hover:brightness-110 transition"
              >
                Parler de mon projet ↗
              </Link>
              <a
                href="#creer-site"
                className="text-[12px] text-slate-300 hover:text-sky-300"
              >
                Voir les offres et prix ↓
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-slate-400 pt-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Basé en Suisse · Réponse sous 24–48h ouvrables
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Sites adaptés au mobile · Pas de jargon technique
              </span>
            </div>
          </div>

          {/* Bande "Pour qui ?" compacte */}
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 sm:px-6 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-[12px] text-slate-300">
            <p className="leading-relaxed">
              Idéal si tu es{" "}
              <span className="font-medium text-slate-100">
                indépendant·e, thérapeute, coach, artiste, petite structure ou
                association
              </span>{" "}
              et que tu veux un site clair qui explique ce que tu fais en
              quelques secondes.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-slate-950/80 px-3 py-1 border border-slate-800">
                Thérapeutes & coachs
              </span>
              <span className="rounded-full bg-slate-950/80 px-3 py-1 border border-slate-800">
                Artistes & créatifs
              </span>
              <span className="rounded-full bg-slate-950/80 px-3 py-1 border border-slate-800">
                Petites entreprises
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION : CRÉER UN NOUVEAU SITE */}
      <section
        id="creer-site"
        className="border-b border-slate-900/60 bg-slate-950/90"
      >
        <div className="container-kosmonde py-12 sm:py-16 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2 max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 flex items-center gap-2">
                <span aria-hidden>⚡</span> Créer un nouveau site
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Création de site vitrine et one-page
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                On construit un site{" "}
                <span className="font-semibold text-slate-100">
                  clair, moderne et facile à parcourir
                </span>
                , pensé pour tes vrais visiteurs, sans te perdre dans la
                technique.
              </p>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p>Site responsive · Design sur mesure · Explications simples</p>
              <p>En moyenne entre 3 et 6 semaines selon la taille du projet.</p>
            </div>
          </div>

          {/* Cartes offres sites */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* One-page */}
            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/75 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.7)] transition hover:-translate-y-1 hover:border-sky-400/70 hover:bg-slate-900/95">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Essentiel
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Site one-page
              </h3>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                Pour lancer ou relancer un projet avec{" "}
                <span className="font-medium text-slate-100">
                  toutes les infos sur une seule page
                </span>
                .
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Structure simple déroulée de haut en bas</li>
                <li>• Idéal pour indépendants et projets créatifs</li>
                <li>• Optimisé pour mobile et temps de chargement</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 450 CHF
                </p>
                <p className="text-slate-400">
                  La plupart des projets one-page se situent entre{" "}
                  <span className="font-medium text-slate-100">
                    450 et 900 CHF
                  </span>
                  .
                </p>
              </div>
            </article>

            {/* Site vitrine complet (offre principale) */}
            <article className="relative flex flex-col rounded-2xl border border-sky-500/80 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_70px_rgba(8,47,73,0.9)]">
              <span className="absolute -top-3 left-4 rounded-full bg-sky-500/90 px-2 py-0.5 text-[10px] font-semibold text-slate-950 shadow-[0_6px_16px_rgba(8,47,73,0.9)]">
                Le plus choisi
              </span>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300 flex items-center gap-2">
                <span aria-hidden>⭐</span> Présence complète
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Site vitrine complet
              </h3>
              <p className="mt-3 text-xs text-slate-200 leading-relaxed">
                Pour détailler ton activité avec plusieurs pages :{" "}
                <span className="font-medium text-slate-100">
                  accueil, services, à propos, portfolio, contact…
                </span>
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-200">
                <li>• Architecture de contenu personnalisée</li>
                <li>• Design sur mesure, adapté à ton image</li>
                <li>• SEO de base sur les pages principales</li>
                <li>• Possibilité d’ajouter blog ou sections évolutives</li>
              </ul>
              <div className="mt-4 rounded-xl border border-sky-500/60 bg-slate-950/70 px-3 py-3 text-[11px] text-slate-50 space-y-1.5">
                <p className="font-semibold text-sky-100">
                  À partir de 900 CHF
                </p>
                <p className="text-slate-200">
                  Les sites vitrines complets se situent le plus souvent entre{" "}
                  <span className="font-medium text-slate-50">
                    900 et 2 000 CHF
                  </span>
                  .
                </p>
              </div>
            </article>

            {/* Projet sur mesure */}
            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Flexible
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Projet sur mesure
              </h3>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                Pour les projets qui sortent du cadre classique : multi-langues,
                pages spécifiques, fonctionnalités simples sur mesure.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Analyse rapide de ton besoin et de tes contraintes</li>
                <li>• Maquettes adaptées à tes objectifs</li>
                <li>• Possibilité de faire évoluer le site par étapes</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 1 400 CHF
                </p>
                <p className="text-slate-400">
                  La plupart des projets sur mesure se situent entre{" "}
                  <span className="font-medium text-slate-100">
                    1 400 et 3 000+ CHF
                  </span>
                  , selon la complexité.
                </p>
              </div>
            </article>
          </div>

          {/* Résumé budget rapide */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 text-[12px] text-slate-300">
            <p className="font-semibold text-slate-100">
              En résumé pour la création de site :
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  One-page
                </p>
                <p>Environ 450–900 CHF</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Vitrine complète
                </p>
                <p>Environ 900–2 000 CHF</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Sur mesure
                </p>
                <p>Environ 1 400–3 000+ CHF</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              On valide toujours un budget clair avant de démarrer. Pas de
              surprise en cours de route.
            </p>
          </div>

          {/* CTA section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/85 p-5 text-sm">
            <div className="space-y-1 text-slate-200">
              <p className="font-semibold">
                Tu n’es pas sûr·e entre one-page, vitrine ou sur mesure ?
              </p>
              <p className="text-[12px] text-slate-400">
                Envoie simplement un message avec ton activité et ce que tu
                aimerais faire. On voit ensemble l’option la plus adaptée.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-400/90 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:brightness-110 transition"
              >
                Parler de mon projet ↗
              </Link>
              <a
                href="mailto:contact@kosmonde.ch"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-[12px] font-medium text-slate-100 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/70 transition"
              >
                Écrire un email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION : FAIRE ÉVOLUER UN SITE EXISTANT */}
      <section
        id="ameliorer-site"
        className="border-b border-slate-900/60 bg-slate-950"
      >
        <div className="container-kosmonde py-12 sm:py-16 space-y-8">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 flex items-center gap-2">
              <span aria-hidden>🛠️</span> Améliorer un site existant
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Refonte, mises à jour et accompagnement
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tu as déjà un site mais il n’est plus à jour, pas clair, ou pas
              très moderne ? On peut{" "}
              <span className="font-semibold text-slate-100">
                l’améliorer sans forcément tout refaire
              </span>
              .
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Refonte */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <h3 className="text-sm font-semibold text-slate-50">
                Refonte de site
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Pour moderniser un site existant : meilleure lisibilité,
                structure plus claire, design plus professionnel.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Audit rapide de ton site actuel</li>
                <li>• Propositions concrètes avec priorités</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 650 CHF
                </p>
                <p className="text-slate-400">
                  La plupart des refontes se situent entre{" "}
                  <span className="font-medium text-slate-100">
                    650 et 1 500 CHF
                  </span>
                  .
                </p>
              </div>
            </article>

            {/* Petites mises à jour */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <h3 className="text-sm font-semibold text-slate-50">
                Petites mises à jour
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Pour ajuster un site globalement correct : contenu, sections
                supplémentaires, corrections visuelles.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Ajout de blocs ou pages simples</li>
                <li>• Ajustements expliqués clairement</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 180 CHF
                </p>
                <p className="text-slate-400">
                  Les petites mises à jour tournent souvent autour de{" "}
                  <span className="font-medium text-slate-100">
                    180–600 CHF
                  </span>
                  .
                </p>
              </div>
            </article>

            {/* Contenu / structure */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <h3 className="text-sm font-semibold text-slate-50">
                Aide au contenu & structure
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Pour clarifier ton message, tes pages et les informations
                importantes pour tes visiteurs.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Aide à formuler ton offre simplement</li>
                <li>• Structure pensée pour le parcours visiteur</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 250 CHF
                </p>
                <p className="text-slate-400">
                  Ce type d’accompagnement est souvent entre{" "}
                  <span className="font-medium text-slate-100">
                    250 et 900 CHF
                  </span>
                  .
                </p>
              </div>
            </article>
          </div>

          {/* CTA section */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/85 p-5 text-sm">
            <div className="space-y-1 text-slate-200">
              <p className="font-semibold">
                Tu as déjà un site et tu veux savoir ce qu’on peut améliorer ?
              </p>
              <p className="text-[12px] text-slate-400">
                Envoie-moi simplement le lien de ton site avec quelques mots sur
                ce qui te gêne (design, clarté, structure...). Je te réponds
                avec des pistes concrètes.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-400/90 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:brightness-110 transition"
            >
              Améliorer mon site ↗
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION : IDENTITÉ VISUELLE */}
      <section
        id="identite-visuelle"
        className="border-b border-slate-900/60 bg-slate-950/95"
      >
        <div className="container-kosmonde py-12 sm:py-16 space-y-8">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 flex items-center gap-2">
              <span aria-hidden>🎨</span> Identité visuelle
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Logo & cartes de visite pour compléter ton site
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pour rester cohérent entre ton site, tes réseaux et tes supports
              imprimés, on crée une{" "}
              <span className="font-semibold text-slate-100">
                base visuelle simple et propre
              </span>
              .
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Logo */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <h3 className="text-sm font-semibold text-slate-50">
                Création de logo
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Logo simple, lisible et moderne, adapté au web et à l’impression
                avec une ou deux variantes.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Logo principal + version simplifiée</li>
                <li>• Formats adaptés au web et à l’impression (PNG, SVG, PDF)</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 380 CHF
                </p>
                <p className="text-slate-400">
                  La plupart des créations de logo se situent entre{" "}
                  <span className="font-medium text-slate-100">
                    380 et 850 CHF
                  </span>
                  .
                </p>
              </div>
            </article>

            {/* Cartes de visite */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <h3 className="text-sm font-semibold text-slate-50">
                Cartes de visite
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Cartes de visite alignées avec ton site, prêtes à être envoyées
                à l’imprimeur avec les bons formats.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Format standard, recto ou recto-verso</li>
                <li>• Harmonisation avec ton identité en ligne</li>
              </ul>
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-100">
                  À partir de 180 CHF
                </p>
                <p className="text-slate-400">
                  Les projets de cartes tournent souvent autour de{" "}
                  <span className="font-medium text-slate-100">
                    180–450 CHF
                  </span>
                  .
                </p>
              </div>
            </article>
          </div>

          {/* CTA identité */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/85 p-5 text-sm">
            <div className="space-y-1 text-slate-200">
              <p className="font-semibold">
                Tu veux un site et une identité visuelle cohérente ?
              </p>
              <p className="text-[12px] text-slate-400">
                On peut combiner site + logo + cartes dans un même projet, pour
                que tout soit aligné dès le départ.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-400/90 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:brightness-110 transition"
            >
              Parler d’un pack complet ↗
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION : PROCESSUS SIMPLE */}
      <section
        id="processus"
        className="border-b border-slate-900/60 bg-slate-950"
      >
        <div className="container-kosmonde py-12 sm:py-16 space-y-8">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 flex items-center gap-2">
              <span aria-hidden>📋</span> Processus simple
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Comment se passe un projet avec KOSMONDE ?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              L’idée est de{" "}
              <span className="font-semibold text-slate-100">
                garder les choses simples
              </span>{" "}
              tout en étant clair sur chaque étape.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-[12px] text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-sky-300">01</p>
              <p className="mt-1 font-semibold">Échange & besoins</p>
              <p className="mt-2 text-slate-400">
                Tu m’expliques ton projet simplement. On clarifie les priorités
                et le type de site adapté.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-sky-300">02</p>
              <p className="mt-1 font-semibold">Structure & design</p>
              <p className="mt-2 text-slate-400">
                On définit la structure des pages, puis je prépare un design
                sobre et lisible, adapté à ton activité.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-sky-300">03</p>
              <p className="mt-1 font-semibold">Intégration & mise en ligne</p>
              <p className="mt-2 text-slate-400">
                Le site est développé, testé, puis mis en ligne. Tu sais
                toujours où on en est.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Tu as un seul interlocuteur (Yanis) du premier message à la mise en
            ligne, avec des étapes visibles et expliquées.
          </p>
        </div>
      </section>

      {/* SECTION : FAQ SIMPLE */}
      <section
        id="faq-offres"
        className="border-b border-slate-900/60 bg-slate-950/95"
      >
        <div className="container-kosmonde py-12 sm:py-16 space-y-8">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Questions fréquentes
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Avant d’envoyer ton message
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Quelques réponses rapides aux questions qui reviennent souvent.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-[12px] text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-semibold text-slate-100">
                Je n’ai pas encore tout mon contenu, c’est grave ?
              </p>
              <p className="mt-2 text-slate-400">
                Non. On peut commencer avec une structure claire et des textes
                provisoires. Je t’aide à les affiner au fur et à mesure.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-semibold text-slate-100 whitespace-nowrap">
                Je ne comprends rien à la technique, c’est un problème ?
              </p>
              <p className="mt-2 text-slate-400">
                Justement, le but est de t’expliquer chaque étape simplement,
                sans jargon. Tu n’as pas besoin d’être “technique” pour avoir un
                bon site.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-semibold text-slate-100">
                Comment se passe le paiement ?
              </p>
              <p className="mt-2 text-slate-400">
                On définit ensemble un cadre simple (souvent en plusieurs
                étapes) en fonction de ton projet. Tu connais le fonctionnement
                avant de commencer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL (CENTRÉ) */}
      <section id="contact-offres" className="bg-slate-950">
        <div className="container-kosmonde py-14 sm:py-16 space-y-6 text-center">
          <div className="max-w-xl space-y-3 mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Dis-moi simplement où tu en es, on verra ensemble pour la suite.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tu n’as pas besoin d’avoir tout figé. Un message avec ton
              activité, ton besoin principal et éventuellement le lien de ton
              site actuel suffit pour commencer.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.8)] hover:brightness-110 transition"
            >
              Parler de mon projet ↗
            </Link>

            <a
              href="mailto:contact@kosmonde.ch"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-100 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/70 transition"
            >
              Écrire un email
            </a>
          </div>

          <p className="text-[11px] text-slate-500 max-w-xl mx-auto">
            Un site clair, moderne et facile à parcourir. Chez KOSMONDE, chaque
            projet est pensé pour expliquer ton activité en quelques secondes,
            valoriser ce que tu fais et aider tes visiteurs à trouver rapidement
            les informations essentielles.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
