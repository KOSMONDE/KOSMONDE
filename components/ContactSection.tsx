"use client";

import { FormEvent, useState } from "react";
import { sendMessage } from "../app/actions/sendMessage";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Validation
    if (!name) {
      setIsSending(false);
      setStatus("error");
      setErrorMessage("Le nom est obligatoire.");
      return;
    }

    if (!email) {
      setIsSending(false);
      setStatus("error");
      setErrorMessage("L’email est obligatoire.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsSending(false);
      setStatus("error");
      setErrorMessage("L’email n’est pas valide.");
      return;
    }

    if (!message) {
      setIsSending(false);
      setStatus("error");
      setErrorMessage("Le message est obligatoire.");
      return;
    }

    // Envoi
    const result = await sendMessage(formData);

    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "Une erreur est survenue.");
    }

    setIsSending(false);
  }

  return (
    <section
      id="contact"
      className="relative bg-slate-950 border-b border-slate-900/40 overflow-hidden"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.32),transparent_55%)]" />

      <div className="container-kosmonde py-16 space-y-14 relative">
        {/* HEADER CENTRÉ */}
        <div className="max-w-xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            Parlons de ton projet
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Quelques phrases suffisent pour commencer. Tu peux décrire ton
            activité, ton besoin, ton délai idéal ou simplement ton idée.
          </p>
          <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em]">
            Premier échange · Sans engagement
          </p>
        </div>

        {/* BLOCS 50/50 AU-DESSUS DU FORMULAIRE */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bloc 1 — Message direct */}
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/85 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.85)] space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Tu peux aussi simplement m’écrire un message direct avec quelques
              lignes sur ton projet. On clarifie ensemble ce qui est possible,
              sans pression.
            </p>

            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <p>• Tu as déjà un site et tu veux le refaire ?</p>
              <p>• Tu pars de zéro et tu ne sais pas par où commencer ?</p>
              <p>• Tu veux juste un avis sur ton idée ?</p>
              <p>
                Dans tous les cas, on pose les choses calmement et on décide de
                la suite ensuite.
              </p>
            </div>
          </div>

          {/* Bloc 2 — Coordonnées */}
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/85 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.85)] space-y-3 text-xs">
            <p className="font-medium text-slate-200 text-[11px] uppercase tracking-[0.18em]">
              Coordonnées
            </p>

            <p className="text-slate-300 text-sm">
              Email :{" "}
              <a
                href="mailto:contact@kosmonde.ch"
                className="text-sky-300 hover:text-sky-200"
              >
                contact@kosmonde.ch
              </a>
            </p>

            <p className="text-slate-400 leading-relaxed">
              Tu développes ton projet, KOSMONDE t’aide à lui donner une
              présence claire sur le web.
            </p>
          </div>
        </div>

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-slate-800/70 bg-slate-950/90 p-6 sm:p-7 shadow-[0_20px_60px_rgba(15,23,42,0.9)] space-y-4"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_70%)]" />

          {status === "success" && (
            <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
              Merci, ton message a bien été envoyé. Je te réponds dès que
              possible.
            </p>
          )}

          {status === "error" && (
            <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
              {errorMessage}
            </p>
          )}

          {/* NOM + EMAIL */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-200"
              >
                Nom *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/60"
                placeholder="Ton nom ou celui de ta structure"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-200"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/60"
                placeholder="adresse@email.ch"
              />
            </div>
          </div>

          {/* TYPE DE PROJET */}
          <div className="space-y-1.5">
            <label
              htmlFor="project-type"
              className="text-xs font-medium text-slate-200"
            >
              Type de projet
            </label>
            <select
              id="project-type"
              name="project-type"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/60"
              defaultValue=""
            >
              <option value="" disabled>
                Choisir une option
              </option>
              <option value="One-page">Site One-page</option>
              <option value="Vitrine">Site vitrine</option>
              <option value="Sur-mesure">Projet sur mesure</option>
              <option value="Autre">Je ne sais pas encore</option>
            </select>
          </div>

          {/* MESSAGE */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-xs font-medium text-slate-200"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/60"
              placeholder="Parle-moi de ton activité, de ce que tu veux que ton site fasse, de ton délai idéal..."
            />
          </div>

          {/* BOUTON */}
          <button
            type="submit"
            disabled={isSending}
            className={`mt-2 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-slate-950 transition ${
              isSending
                ? "bg-sky-400/60 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 hover:brightness-110"
            }`}
          >
            {isSending
              ? "Envoi en cours..."
              : status === "success"
              ? "Message envoyé ✔"
              : "Envoyer le message"}
          </button>

          <p className="text-[11px] text-slate-500">
            En cliquant sur envoyer, tu acceptes que je te contacte par email
            pour parler de ton projet. Aucune newsletter automatique.
          </p>
        </form>
      </div>
    </section>
  );
}
