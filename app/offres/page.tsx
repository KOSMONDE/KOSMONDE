import Link from "next/link";

/* --------------------------------------------------------- */
/* --------------------- HEADER KOSMONDE ------------------- */
/* --------------------------------------------------------- */

function HeaderKosmonde() {
  return (
    <header className="border-b border-slate-900/50 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75 sticky top-0 z-50">
      <div className="container-kosmonde flex items-center justify-between py-4">
        {/* Logo / Nom */}
        <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-slate-50">
          KOSMONDE
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-xs">
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
            className="rounded-full bg-sky-400/90 px-3 py-1.5 text-slate-950 font-semibold text-[11px] hover:brightness-110 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------------------------------- */
/* ---------------------- FOOTER KOSMONDE ------------------ */
/* --------------------------------------------------------- */

function FooterKosmonde() {
  return (
    <footer className="border-t border-slate-900/60 bg-slate-950 py-12 mt-20">
      <div className="container-kosmonde grid gap-8 sm:grid-cols-3 text-sm text-slate-400">
        <div className="space-y-2">
          <p className="text-slate-200 font-semibold text-sm">KOSMONDE</p>
          <p className="text-[12px] leading-relaxed">
            Création de sites web{" "}
            <span className="font-semibold text-slate-100">clairs, modernes et faciles à parcourir</span>. Idéal
            pour petites structures, indépendants et artistes.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-slate-200 font-semibold text-sm">Navigation</p>
          <div className="flex flex-col gap-1 text-[12px]">
            <Link href="/" className="hover:text-slate-200">
              Accueil
            </Link>
            <Link href="/offres" className="hover:text-slate-200">
              Offres
            </Link>
            <Link href="/#projets" className="hover:text-slate-200">
              Projets
            </Link>
            <Link href="/#contact" className="hover:text-slate-200">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-slate-200 font-semibold text-sm">Contact</p>
          <p className="text-[12px] leading-relaxed">
            <a
              href="mailto:contact@kosmonde.ch"
              className="text-sky-300 hover:text-sky-200"
            >
              contact@kosmonde.ch
            </a>
            <br />
            Réponse rapide · Sans engagement
          </p>
          <p className="text-[11px] text-slate-500">
            KOSMONDE, c’est Yanis, développeur web basé en Suisse, avec une
            approche simple et humaine.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-[11px] text-slate-600">
        © {new Date().getFullYear()} KOSMONDE — Tous droits réservés.
      </div>
    </footer>
  );
}

/* --------------------------------------------------------- */
/* --------------------- PAGE OFFRES ----------------------- */
/* --------------------------------------------------------- */

export default function OffresPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <HeaderKosmonde />

      {/* HERO OFFRES (CENTRÉ) */}
      <section className="border-b border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95">
        <div className="container-kosmonde py-16 sm:py-20 space-y-10">
          {/* Texte principal */}
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-sky-300/80">
              Offres & services KOSMONDE
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
              Création de site web
              <span className="block text-sky-300">
                et identité visuelle pour ton projet.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Tous les services sont réunis ici :{" "}
              <span className="font-semibold text-slate-100">
                création ou refonte de site vitrine
              </span>
              , accompagnement, mises à jour et identité visuelle simple. Tu
              choisis ce qui te parle, on clarifie le reste ensemble.
            </p>
            <p className="text-[12px] text-slate-400">
              Je me concentre sur les{" "}
              <span className="font-medium text-slate-100">
                sites clairs, faciles à utiliser et adaptés au mobile
              </span>{" "}
              — pas sur les gros e-commerces ultra techniques.
            </p>
          </div>

          {/* Badges résumé */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Sites vitrines & one-page
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Identité visuelle simple
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Explications claires, pas de jargon
            </span>
          </div>

          {/* Réassurance globale */}
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] text-slate-400">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Site adapté au mobile
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Accompagnement jusqu’à la mise en ligne
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              Contenus pensés pour tes visiteurs
            </div>
          </div>

          {/* Mini sommaire / navigation interne */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-[11px]">
            <a
              href="#creer-site"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200 transition"
            >
              <span aria-hidden>⚡</span> Créer un nouveau site
            </a>
            <a
              href="#ameliorer-site"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200 transition"
            >
              <span aria-hidden>🛠️</span> Améliorer un site existant
            </a>
            <a
              href="#identite-visuelle"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200 transition"
            >
              <span aria-hidden>🎨</span> Identité visuelle
            </a>
            <a
              href="#processus"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200 transition"
            >
              <span aria-hidden>📋</span> Comment ça se passe ?
            </a>
            <a
              href="#faq-offres"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200 transition"
            >
              <span aria-hidden>❓</span> Questions fréquentes
            </a>
          </div>

          {/* Pour qui ? + Mockup visuel simple */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3 text-sm text-slate-300">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                Pour qui est KOSMONDE ?
              </p>
              <p className="leading-relaxed">
                Tu es <span className="font-medium text-slate-100">indépendant·e, artiste, thérapeute, coach, petite structure ou association</span> et tu as besoin
                d’un site clair qui explique ce que tu fais en quelques secondes.
              </p>
              <p className="text-[12px] text-slate-400">
                Objectif : que tes visiteurs comprennent rapidement ton activité, aient confiance et sachent
                comment te contacter.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-slate-900/80 px-3 py-1 border border-slate-800">Coachs & thérapeutes</span>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 border border-slate-800">Artistes & créatifs</span>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 border border-slate-800">Petites entreprises</span>
              </div>
            </div>

            {/* Mockup placeholder */}
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/40 p-4">
              <div className="aspect-[4/3] rounded-xl border border-slate-700/80 bg-slate-950/80 overflow-hidden relative shadow-[0_20px_40px_rgba(8,47,73,0.7)]">
                <div className="absolute inset-x-6 top-5 h-4 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center gap-1 px-2 text-[9px] text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="ml-2">Aperçu de site KOSMONDE</span>
                </div>
                <div className="absolute inset-x-6 bottom-6 h-16 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between px-4 text-[10px] text-slate-300">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-100">
                      Site clair, moderne, lisible
                    </p>
                    <p className="text-slate-400">
                      Contenus structurés, identité cohérente, navigation simple.
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1 text-[9px]">
                    <span className="rounded-full bg-sky-500/90 text-slate-950 px-2 py-0.5 font-semibold shadow-[0_0_18px_rgba(56,189,248,0.8)]">
                      Responsive
                    </span>
                    <span className="text-slate-400">Adapté au mobile</span>
                  </div>
                </div>
              </div>
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
                Pour présenter ton activité en ligne avec un site{" "}
                <span className="font-semibold text-slate-100">
                  clair, moderne et facile à parcourir
                </span>, sans te perdre dans la technique.
              </p>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p>Site responsive · Design sur mesure · Explications simples</p>
              <p>En moyenne entre 3 et 6 semaines selon la taille du projet.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* One-page */}
            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.7)] transition hover:-translate-y-1 hover:border-sky-400/70 hover:bg-slate-900/90">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Essentiel
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Site one-page
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Une page unique pour présenter l’essentiel :{" "}
                <span className="font-medium text-slate-100">
                  qui tu es, ce que tu proposes et comment te contacter
                </span>.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Structure simple et efficace, déroulée de haut en bas</li>
                <li>• Idéal pour indépendants, projets créatifs, lancements</li>
                <li>• Parfait sur mobile, temps de chargement optimisé</li>
              </ul>
              <p className="mt-4 text-[11px] text-emerald-300">
                Objectif : avoir une présence claire en ligne, rapidement.
              </p>
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
              <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                Plusieurs pages pour détailler ton activité :{" "}
                <span className="font-medium text-slate-100">
                  accueil, services, à propos, portfolio, contact, etc.
                </span>
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-200">
                <li>• Architecture de contenu personnalisée (souvent 4 à 8 pages)</li>
                <li>• Design sur mesure, adapté à ton image et à ton ton de voix</li>
                <li>• SEO de base sur les pages principales (titres, descriptions)</li>
                <li>• Possibilité d’ajouter un blog ou des sections évolutives</li>
              </ul>
              <p className="mt-4 text-[11px] text-emerald-300">
                Idéal si tu veux une présence claire, professionnelle et prête à évoluer.
              </p>
            </article>

            {/* Projet sur mesure */}
            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/90">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Flexible
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Projet sur mesure
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Pour les besoins particuliers ou les structures qui sortent du
                cadre classique (pages spécifiques, fonctionnalités simples
                sur mesure, multi-langues, etc.).
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Analyse rapide de ton projet et de tes contraintes</li>
                <li>• Maquettes adaptées à tes objectifs et à ton budget</li>
                <li>• Évolution possible dans le temps, par étapes</li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-400">
                Si le projet est très technique ou demande un développement spécifique complexe,
                on regarde ensemble si je suis la bonne personne ou si je peux te rediriger.
              </p>
            </article>
          </div>

          {/* Bloc inclus dans toutes les offres */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-[12px] text-slate-300 space-y-3">
            <p className="font-semibold text-slate-100">
              Ce qui est inclus dans toutes les créations de site :
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <ul className="space-y-1 text-slate-300">
                <li>• Site adapté au mobile (responsive)</li>
                <li>• Design sobre, lisible et cohérent</li>
              </ul>
              <ul className="space-y-1 text-slate-300">
                <li>• Explications claires sur chaque étape</li>
                <li>• Prise en main simple une fois le site en ligne</li>
              </ul>
              <ul className="space-y-1 text-slate-300">
                <li>• Petits ajustements après la mise en ligne</li>
                <li>• Support par email pour les questions de base</li>
              </ul>
            </div>
          </div>

          {/* CTA section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm">
            <div className="space-y-1 text-slate-200">
              <p className="font-semibold">
                Tu hésites entre one-page, vitrine complète ou sur mesure ?
              </p>
              <p className="text-[12px] text-slate-400">
                Envoie simplement un message avec ton activité et ce que tu aimerais faire. On voit ensemble
                l’option la plus adaptée.
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
              <span aria-hidden>🛠️</span> Faire évoluer ton site
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Refonte, petites mises à jour & accompagnement
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tu as déjà un site mais il n’est plus à jour, pas clair, ou pas
              très moderne ? On peut{" "}
              <span className="font-semibold text-slate-100">
                l’améliorer sans forcément tout refaire
              </span>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Refonte */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/90">
              <h3 className="text-sm font-semibold text-slate-50">
                Refonte de site
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Moderniser un site existant : meilleure lisibilité, meilleure
                structure, design plus professionnel.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Audit rapide de ton site actuel (points forts / points faibles)</li>
                <li>• Propositions concrètes d’amélioration avec priorités</li>
              </ul>
              <p className="mt-4 text-[11px] text-emerald-300">
                Objectif : que ton site donne à nouveau confiance et envie de te contacter.
              </p>
            </article>

            {/* Petites mises à jour */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/90">
              <h3 className="text-sm font-semibold text-slate-50">
                Petites mises à jour
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Ajustements de contenu, ajout de sections ou de blocs, corrections
                visuelles, formulaires, texte, images, etc.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Ajout de blocs ou pages simples</li>
                <li>• Ajustements sur demande, expliqués clairement</li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-400">
                Très utile si ton site est globalement correct mais demande un bon rafraîchissement.
              </p>
            </article>

            {/* Contenu / structure */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/90">
              <h3 className="text-sm font-semibold text-slate-50">
                Aide au contenu & structure
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Clarifier ton message, tes pages et les informations importantes
                à placer sur ton site pour tes visiteurs.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Aide à formuler ton offre simplement</li>
                <li>• Structure pensée pour le parcours de ton visiteur</li>
              </ul>
              <p className="mt-4 text-[11px] text-emerald-300">
                Objectif : que ton site explique vraiment ce que tu fais et à qui tu t’adresses.
              </p>
            </article>
          </div>

          {/* CTA section */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm">
            <div className="space-y-1 text-slate-200">
              <p className="font-semibold">
                Tu as déjà un site et tu veux savoir ce qu’on peut améliorer ?
              </p>
              <p className="text-[12px] text-slate-400">
                Envoie-moi simplement le lien de ton site avec quelques mots sur ce qui te gêne
                (design, clarté, structure...). Je te réponds avec des pistes concrètes.
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
              <span aria-hidden>🎨</span> Compléter ton site
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Identité visuelle : logo & cartes de visite
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pour rester cohérent entre ton site, tes réseaux et tes supports
              imprimés, on peut créer une{" "}
              <span className="font-semibold text-slate-100">
                base visuelle simple et propre
              </span>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Logo */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/95">
              <h3 className="text-sm font-semibold text-slate-50">
                Création de logo
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Logo simple, lisible et moderne, adapté au web et à
                l’impression, avec une ou deux variantes utilisables partout.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                <li>• Logo principal + version simplifiée (icône ou monogramme)</li>
                <li>• Formats adaptés au web et à l’impression (PNG, SVG, PDF)</li>
              </ul>
              <p className="mt-4 text-[11px] text-emerald-300">
                Idéal si tu veux une base visuelle propre sans partir sur une grosse identité de marque.
              </p>
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
                <li>• Harmonisation avec ton identité en ligne et ton site</li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-400">
                Si tu n’as pas encore de logo, on peut d’abord créer une base simple puis l’adapter à tes cartes.
              </p>
            </article>
          </div>

          {/* CTA identité */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm">
            <div className="space-y-1 text-slate-200">
              <p className="font-semibold">
                Tu veux un site et une identité visuelle cohérente ?
              </p>
              <p className="text-[12px] text-slate-400">
                On peut combiner site + logo + cartes dans un même projet, pour que tout soit aligné dès le départ.
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

      {/* SECTION : COMMENT ÇA SE PASSE ? */}
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
              </span>, tout en restant précis et transparent sur chaque étape.
            </p>
            <p className="text-[12px] text-slate-400">
              KOSMONDE, c’est Yanis, développeur web basé en Suisse, qui t’accompagne
              du premier message jusqu’à la mise en ligne du site.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-[12px] text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-sky-300">01</p>
              <p className="mt-1 font-semibold">Échange & besoins</p>
              <p className="mt-2 text-slate-400">
                Tu m’expliques ton projet simplement. Je pose quelques
                questions, on clarifie les priorités et le type de site adapté.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-sky-300">02</p>
              <p className="mt-1 font-semibold">Structure & design</p>
              <p className="mt-2 text-slate-400">
                On définit la structure des pages, puis je prépare un design
                sobre et lisible, adapté à ton activité et à ta personnalité.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-sky-300">03</p>
              <p className="mt-1 font-semibold">Intégration & mise en ligne</p>
              <p className="mt-2 text-slate-400">
                Le site est développé, testé, puis mis en ligne. Tu sais
                toujours où on en est et ce qui est prévu ensuite.
              </p>
            </div>
          </div>

          {/* Mini preuve / lien projets */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-[12px]">
            <p className="text-slate-300">
              Besoin de voir des exemples ? Tu peux jeter un œil à quelques{" "}
              <Link
                href="/#projets"
                className="text-sky-300 hover:text-sky-200 font-medium"
              >
                projets réalisés
              </Link>{" "}
              pour te faire une idée du style.
            </p>
            <p className="text-slate-400">
              En moyenne, un projet avance par petites étapes validées ensemble.
            </p>
          </div>
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
              Tu te poses peut-être ces questions
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              L’idée est de lever les blocages avant même le premier message.
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
              <p className="font-semibold text-slate-100">
                Je ne comprends rien à la technique, c’est un problème ?
              </p>
              <p className="mt-2 text-slate-400">
                Justement, le but est de t’expliquer chaque étape simplement,
                sans jargon. Tu n’as pas besoin d’être “technique” pour avoir un bon site.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-semibold text-slate-100">
                Comment se passe le paiement ?
              </p>
              <p className="mt-2 text-slate-400">
                On définit ensemble un cadre simple (souvent en plusieurs étapes)
                en fonction de ton projet. Tu connais le fonctionnement avant de commencer.
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
              Tu n’as pas besoin d’avoir tout figé. Un message avec ton activité,
              ton besoin principal et éventuellement le lien de ton site actuel
              suffit pour commencer.
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

      <FooterKosmonde />
    </main>
  );
}
