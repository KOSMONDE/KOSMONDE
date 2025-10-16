"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function MentionsLegalesPage() {
  // Renseigne ces constantes ou alimente-les via env/DB si besoin
  const SOCIETE = {
    nom: "KOSMONDE",
    forme: "SAS",
    capital: "1 000 €",
    rcs: "RCS Paris 000 000 000",
    tva: "FR00 000000000",
    adresse: "10 Rue Exemple, 75000 Paris, France",
    email: "contact@kosmonde.fr",
    tel: "+33 6 86 11 43 97",
    directeur: "Nom du directeur de la publication",
  }

  const HEBERGEUR = {
    nom: "Vercel Inc.",
    adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, USA",
    site: "https://vercel.com",
  }

  const MAJ = "16/10/2025"

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1740] via-[#3c1670] to-[#0f1226]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-white">
          <h1 className="text-[34px] md:text-6xl font-extrabold">
            Mentions légales
          </h1>
          <p className="mt-4 text-white/80">
            Informations légales et conditions d’utilisation du site. Dernière mise à jour : {MAJ}.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-12 bg-[#f7f8fb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Éditeur du site */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Éditeur du site</h2>
            <div className="mt-4 text-slate-700 leading-relaxed">
              <p><strong>Dénomination :</strong> {SOCIETE.nom} ({SOCIETE.forme})</p>
              <p><strong>Capital social :</strong> {SOCIETE.capital}</p>
              <p><strong>Immatriculation :</strong> {SOCIETE.rcs}</p>
              <p><strong>N° TVA intracommunautaire :</strong> {SOCIETE.tva}</p>
              <p><strong>Siège social :</strong> {SOCIETE.adresse}</p>
              <p><strong>Contact :</strong> {SOCIETE.email} · {SOCIETE.tel}</p>
              <p><strong>Directeur de la publication :</strong> {SOCIETE.directeur}</p>
            </div>
          </article>

          {/* Hébergeur */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Hébergement</h2>
            <div className="mt-4 text-slate-700 leading-relaxed">
              <p><strong>Hébergeur :</strong> {HEBERGEUR.nom}</p>
              <p><strong>Adresse :</strong> {HEBERGEUR.adresse}</p>
              <p>
                <strong>Site :</strong>{" "}
                <a href={HEBERGEUR.site} className="text-violet-600 underline" target="_blank" rel="noreferrer">
                  {HEBERGEUR.site}
                </a>
              </p>
            </div>
          </article>

          {/* Propriété intellectuelle */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Propriété intellectuelle</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              L’ensemble des contenus du site ({SOCIETE.nom}) — textes, visuels, logos, vidéos, design et code —
              est protégé par le droit d’auteur et les lois en vigueur. Toute reproduction, représentation,
              modification ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite.
            </p>
          </article>

          {/* Données personnelles */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Données personnelles</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les données transmises via le formulaire de contact sont traitées pour répondre à votre demande
              et ne sont pas revendues. Base légale : intérêt légitime et exécution précontractuelle.
              Vous disposez de droits d’accès, de rectification, d’effacement, d’opposition et de portabilité.
              Pour les exercer, contactez-nous à {SOCIETE.email}.
            </p>
          </article>

          {/* Cookies */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Cookies</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le site peut utiliser des cookies techniques pour le bon fonctionnement et des cookies de mesure
              d’audience. Vous pouvez gérer vos préférences depuis les paramètres de votre navigateur ou via
              le bandeau de consentement lorsqu’il est affiché.
            </p>
          </article>

          {/* Responsabilité */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Responsabilité</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              {SOCIETE.nom} met tout en œuvre pour assurer l’exactitude des informations présentées.
              La responsabilité de l’éditeur ne saurait être engagée en cas d’erreurs ponctuelles,
              d’indisponibilités ou de dommages indirects liés à l’utilisation du site.
            </p>
          </article>

          {/* Droit applicable */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Droit applicable</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              et à défaut d’accord amiable, les tribunaux compétents du siège de {SOCIETE.nom} seront seuls compétents.
            </p>
          </article>

          {/* Contact */}
          <article className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Contact</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Pour toute question relative au site ou à ces mentions légales : {SOCIETE.email} · {SOCIETE.tel}
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
