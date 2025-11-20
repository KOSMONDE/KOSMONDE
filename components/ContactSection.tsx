"use client";

import { FormEvent, useState } from "react";
import { sendMessage } from "../app/actions/sendMessage";

type Status = "idle" | "success" | "error";
type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");
    setErrorMessage(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // VALIDATIONS

    if (!name) {
      const msg = "Le nom est obligatoire.";
      setIsSending(false);
      setStatus("error");
      setErrorMessage(msg);
      setFieldErrors({ name: msg });
      return;
    }

    if (!email) {
      const msg = "L’email est obligatoire.";
      setIsSending(false);
      setStatus("error");
      setErrorMessage(msg);
      setFieldErrors({ email: msg });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = "L’email n’est pas valide.";
      setIsSending(false);
      setStatus("error");
      setErrorMessage(msg);
      setFieldErrors({ email: msg });
      return;
    }

    if (!message) {
      const msg = "Le message est obligatoire.";
      setIsSending(false);
      setStatus("error");
      setErrorMessage(msg);
      setFieldErrors({ message: msg });
      return;
    }

    // ENVOI DU MESSAGE

    try {
      const result = await sendMessage(formData);

      if (result.success) {
        setStatus("success");
        form.reset();
        setFieldErrors({});
        setErrorMessage(null);

        // Retour à l’état neutre après quelques secondes
        setTimeout(() => {
          setStatus("idle");
        }, 4000);
      } else {
        setStatus("error");
        const msg = result.error ?? "Une erreur est survenue.";
        setErrorMessage(msg);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Une erreur inattendue est survenue. Merci de réessayer.");
    } finally {
      setIsSending(false);
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      const next = { ...prev, [field]: undefined };
      return next;
    });

    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden bg-slate-950 border-b border-slate-900/40"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_65%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.32),transparent_55%)]" />

      <div className="container-kosmonde relative space-y-14 py-16">
        {/* HEADER CENTRÉ */}
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Parlons de votre projet
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Expliquez votre besoin en quelques mots, je vous indique la meilleure suite.
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Premier échange · Sans engagement
          </p>
        </div>

        {/* BLOCS 50/50 AU-DESSUS DU FORMULAIRE */}
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* Bloc 1 — Message direct */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/85 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.85)]">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-sm">
                  💬
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    Premier contact
                  </p>
                  <h3 className="text-sm font-semibold text-slate-50">
                    M’écrire en quelques lignes
                  </h3>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                1 / 2
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Décrivez votre activité et votre besoin en 3–4 phrases. Je vous réponds avec une direction claire, adaptée à votre situation.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="rounded-full border border-slate-700/70 px-2 py-1">
                Refaire un site
              </span>
              <span className="rounded-full border border-slate-700/70 px-2 py-1">
                Créer un premier site
              </span>
              <span className="rounded-full border border-slate-700/70 px-2 py-1">
                Avis rapide sur une idée
              </span>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              On pose votre contexte, puis je vous indique la meilleure suite pour votre projet.
            </p>
          </div>

          {/* Bloc 2 — Coordonnées */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/85 p-6 text-xs shadow-[0_16px_45px_rgba(15,23,42,0.85)]">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-sm">
                  ✉️
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    Coordonnées
                  </p>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Contact direct avec le studio
                  </h3>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                2 / 2
              </span>
            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-300">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Email direct
              </span>

              <div className="inline-flex w-full max-w-full flex-wrap items-center gap-2 rounded-full border border-sky-400/60 bg-slate-950/90 px-3 py-1.5 text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <a
                  href="mailto:contact@kosmonde.ch"
                  className="truncate text-sky-300 hover:text-sky-200"
                >
                  contact@kosmonde.ch
                </a>
                <span className="whitespace-nowrap text-slate-500">
                  · Réponse sous 24–48h
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Un interlocuteur unique pour vous accompagner du premier message à la mise en ligne.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-[10px] text-slate-500">
              <span className="rounded-full border border-slate-700/70 px-2 py-1">
                Pas de newsletter
              </span>
              <span className="rounded-full border border-slate-700/70 px-2 py-1">
                Échange confidentiel
              </span>
            </div>
          </div>
        </div>

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="relative space-y-4 rounded-2xl border border-slate-800/70 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.9)] sm:p-7"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_70%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />

          {status === "success" && (
            <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
              Merci, votre message a bien été envoyé. Je vous réponds dès que possible.
            </p>
          )}

          {status === "error" && errorMessage && (
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
                aria-invalid={fieldErrors.name ? "true" : "false"}
                className={`w-full rounded-xl border bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:ring-1 ${
                  fieldErrors.name
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/60"
                    : "border-slate-700 focus:border-sky-400 focus:ring-sky-400/60"
                }`}
                placeholder="Votre nom ou celui de votre structure"
                onChange={() => clearFieldError("name")}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-[11px] text-rose-300">
                  {fieldErrors.name}
                </p>
              )}
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
                aria-invalid={fieldErrors.email ? "true" : "false"}
                className={`w-full rounded-xl border bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:ring-1 ${
                  fieldErrors.email
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/60"
                    : "border-slate-700 focus:border-sky-400 focus:ring-sky-400/60"
                }`}
                placeholder="adresse@email.ch"
                onChange={() => clearFieldError("email")}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-rose-300">
                  {fieldErrors.email}
                </p>
              )}
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
              aria-invalid={fieldErrors.message ? "true" : "false"}
              className={`w-full rounded-xl border bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:ring-1 ${
                fieldErrors.message
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/60"
                  : "border-slate-700 focus:border-sky-400 focus:ring-sky-400/60"
              }`}
              placeholder="Dites-moi où vous en êtes, ce que vous souhaitez obtenir et votre délai idéal."
              onChange={() => clearFieldError("message")}
            />
            {fieldErrors.message && (
              <p className="mt-1 text-[11px] text-rose-300">
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* BOUTON */}
          <button
            type="submit"
            disabled={isSending}
            className={`mt-2 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-slate-950 transition ${
              isSending
                ? "cursor-not-allowed bg-sky-400/60"
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
            Vous envoyez un message, je reviens vers vous par email. Rien d’automatique, pas de newsletter.
          </p>
        </form>
      </div>
    </section>
  );
}
