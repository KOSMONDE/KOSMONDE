"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CGVPage() {
  const SOCIETE = {
    nom: "KOSMONDE",
    forme: "SAS",
    rcs: "RCS Paris 000 000 000",
    adresse: "10 Rue Exemple, 75000 Paris, France",
    email: "contact@kosmonde.fr",
    tel: "+33 6 86 11 43 97",
    site: "https://kosmonde.fr",
  }

  const MAJ = "16/10/2025"

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-white">
          <h1 className="text-[34px] md:text-6xl font-extrabold">
            Conditions Générales de Vente (CGV)
          </h1>
          <p className="mt-4 text-white/80">
            Applicables aux prestations proposées par {SOCIETE.nom}. Dernière mise à jour : {MAJ}.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-12 bg-[#f7f8fb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">

          {/* 1. Objet */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">1. Objet</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les présentes CGV régissent les ventes et prestations de services réalisées par {SOCIETE.nom} ({SOCIETE.forme}), 
              immatriculée {SOCIETE.rcs}, depuis {SOCIETE.site}, auprès de clients professionnels et particuliers.
            </p>
          </article>

          {/* 2. Devis et commande */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">2. Devis, commande et acceptation</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Toute intervention fait l’objet d’un devis précisant périmètre, délais indicatifs et prix. 
              La commande est ferme à réception de l’accord écrit (signature, e-mail ou validation en ligne) 
              et, le cas échéant, de l’acompte prévu. Les devis sont valables 30 jours sauf mention contraire.
            </p>
          </article>

          {/* 3. Prix et paiement */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">3. Prix, facturation et modalités de paiement</h2>
            <ul className="mt-4 list-disc list-inside text-slate-700 leading-relaxed space-y-2">
              <li>Les prix sont indiqués en CHF ou EUR, hors taxes sauf mention contraire.</li>
              <li>Conditions usuelles : acompte 30–50% à la commande, solde à la livraison ou échéancier indiqué.</li>
              <li>Paiements acceptés : virement bancaire, carte (Stripe) ou tout autre moyen indiqué au devis.</li>
              <li>Tout retard entraîne, sans mise en demeure, des pénalités au taux légal majoré et une indemnité forfaitaire de recouvrement.</li>
            </ul>
          </article>

          {/* 4. Délais et collaboration client */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">4. Délais, livrables et obligations du client</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les délais sont indicatifs. Ils supposent la fourniture par le client des contenus, accès et validations 
              dans les temps. Tout retard ou modification substantielle peut décaler la livraison et générer un devis 
              complémentaire après accord.
            </p>
          </article>

          {/* 5. Évolutions et hors périmètre */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">5. Évolutions, changements et hors périmètre</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les demandes additionnelles non prévues au devis initial donnent lieu à chiffrage et planification dédiés. 
              Sont notamment hors périmètre : refontes majeures, contenus supplémentaires, fonctionnalités non listées, 
              achats de licences tierces, frais d’hébergement et de noms de domaine.
            </p>
          </article>

          {/* 6. Garantie et maintenance */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">6. Garantie et maintenance</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les anomalies bloquantes imputables à {SOCIETE.nom} constatées dans les 30 jours suivant la livraison 
              sont corrigées sans frais. Les mises à jour, sauvegardes, sécurité et évolutions relèvent d’un contrat de 
              maintenance séparé, si souscrit.
            </p>
          </article>

          {/* 7. Propriété intellectuelle */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">7. Propriété intellectuelle</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Sauf mention contraire, les droits de propriété intellectuelle sur les livrables restent la propriété de {SOCIETE.nom} 
              jusqu’au paiement intégral. Après complet paiement, les droits d’utilisation définis au devis sont cédés au client. 
              Les éléments tiers (polices, images, plugins) restent soumis à leurs licences respectives.
            </p>
          </article>

          {/* 8. Références et portfolio */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">8. Références</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le client autorise {SOCIETE.nom} à citer son nom, logo et visuels des réalisations à titre de référence commerciale 
              et dans le portfolio, sauf opposition écrite préalable.
            </p>
          </article>

          {/* 9. Responsabilité */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">9. Responsabilité</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              La responsabilité de {SOCIETE.nom} est limitée au montant HT payé par le client au titre de la prestation concernée. 
              Aucune responsabilité pour pertes de données, manque à gagner, dommages indirects ou consécutifs.
            </p>
          </article>

          {/* 10. Données personnelles */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">10. Données personnelles</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le traitement des données est décrit dans notre{" "}
              <a href="/politique-de-confidentialite" className="text-violet-600 underline">
                Politique de confidentialité
              </a>. {SOCIETE.nom} agit en qualité de responsable pour les données transmises via le site. 
              Pour l’exercice de vos droits, contactez {SOCIETE.email}.
            </p>
          </article>

          {/* 11. Rétractation (si consommateur) */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">11. Droit de rétractation</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Si le client est un consommateur, il dispose d’un droit de rétractation de 14 jours pour les contrats conclus à distance, 
              sauf exécution commencée avec son accord exprès avant la fin du délai. Les prestations numériques démarrées 
              pendant ce délai ne sont pas annulables après accord.
            </p>
          </article>

          {/* 12. Force majeure */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">12. Force majeure</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              La responsabilité de {SOCIETE.nom} ne peut être engagée en cas d’événement imprévisible et irrésistible 
              empêchant l’exécution des obligations (panne massive, attaque, catastrophe, décision administrative, etc.).
            </p>
          </article>

          {/* 13. Résiliation */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">13. Résiliation</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              En cas de manquement grave non réparé sous 15 jours après notification écrite, chaque partie peut résilier le contrat. 
              Les sommes dues au prorata du travail réalisé restent exigibles.
            </p>
          </article>

          {/* 14. Droit applicable et litiges */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">14. Droit applicable et juridiction</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les présentes CGV sont régies par le droit français. À défaut d’accord amiable, les tribunaux du ressort du siège de {SOCIETE.nom} 
              seront compétents.
            </p>
          </article>

          {/* 15. Contact */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">15. Contact</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              {SOCIETE.nom} · {SOCIETE.adresse} · {SOCIETE.email} · {SOCIETE.tel}
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
