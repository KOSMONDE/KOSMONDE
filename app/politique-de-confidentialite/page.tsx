"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PolitiqueConfidentialitePage() {
  const SOCIETE = {
    nom: "KOSMONDE",
    email: "contact@kosmonde.fr",
    tel: "+33 6 86 11 43 97",
    adresse: "10 Rue Exemple, 75000 Paris, France",
  }

  const MAJ = "16/10/2025"

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-white">
          <h1 className="text-[34px] md:text-6xl font-extrabold">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-white/80">
            Cette page décrit la manière dont {SOCIETE.nom} collecte, utilise et protège vos données personnelles.
            Dernière mise à jour : {MAJ}.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-12 bg-[#f7f8fb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 1 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">1. Responsable du traitement</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le responsable du traitement des données personnelles est {SOCIETE.nom}, situé au {SOCIETE.adresse}.
              Vous pouvez nous contacter à {SOCIETE.email} ou au {SOCIETE.tel}.
            </p>
          </article>

          {/* 2 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">2. Données collectées</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Nous collectons uniquement les données nécessaires à la fourniture de nos services :
            </p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone (facultatif)</li>
              <li>Contenu des messages transmis via le formulaire de contact</li>
            </ul>
          </article>

          {/* 3 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">3. Finalité du traitement</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les informations collectées via notre site sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Répondre aux demandes envoyées via le formulaire de contact</li>
              <li>Établir des devis et propositions commerciales</li>
              <li>Assurer le suivi administratif et commercial de nos clients</li>
            </ul>
          </article>

          {/* 4 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">4. Base légale du traitement</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le traitement est fondé sur l’intérêt légitime de {SOCIETE.nom} à assurer la communication et la gestion
              de sa relation commerciale, ainsi que sur l’exécution de mesures précontractuelles à la demande de l’utilisateur.
            </p>
          </article>

          {/* 5 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">5. Conservation des données</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les données sont conservées pour une durée maximale de 3 ans à compter du dernier contact, sauf obligation
              légale imposant une durée différente.
            </p>
          </article>

          {/* 6 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">6. Partage des données</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              {SOCIETE.nom} ne revend, ne loue ni ne partage vos données personnelles à des tiers, sauf obligation
              légale ou sous-traitance nécessaire au bon fonctionnement du service (hébergement, envoi d’e-mails, etc.).
            </p>
          </article>

          {/* 7 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">7. Sécurité</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour assurer la sécurité
              et la confidentialité de vos données, notamment via l’utilisation du protocole HTTPS et de sauvegardes régulières.
            </p>
          </article>

          {/* 8 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">8. Vos droits</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Droit d’accès, de rectification et d’effacement</li>
              <li>Droit d’opposition et de limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d’introduire une réclamation auprès de la CNIL</li>
            </ul>
            <p className="mt-2 text-slate-700">
              Pour exercer vos droits, contactez : {SOCIETE.email}
            </p>
          </article>

          {/* 9 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">9. Cookies et mesure d’audience</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement et, le cas échéant,
              des cookies de mesure d’audience anonymisés. Vous pouvez gérer ou refuser ces cookies depuis votre navigateur.
            </p>
          </article>

          {/* 10 */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">10. Contact</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Pour toute question relative à cette politique de confidentialité ou à vos données :
              <br />
              <strong>{SOCIETE.nom}</strong> – {SOCIETE.email} – {SOCIETE.tel}
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
