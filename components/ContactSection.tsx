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

    try {
      const result = await sendMessage(formData);

      if (result.success) {
        setStatus("success");
        form.reset();
        setFieldErrors({});
        setErrorMessage(null);

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
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

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
      {/* Glows de fond */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,rgba(15,118,110,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.32),transparent_55%)]" />

      <div className="container-kosmonde relative space-y-12 sm:space-y-14 py-12 sm:py-16">
        {/* HEADER */}
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Parlons de votre projet
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
            Expliquez votre besoin en quelques mots, je vous indique la meilleure suite.
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">
            Premier échange · Sans engagement
          </p>
        </div>

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto w-full max-w-xl space-y-4 rounded-2xl border border-slate-800/70 bg-slate-950/95 p-5 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.95)] md:max-w-none"
        >
          {/* BADGE KOSMONDE – même bleu que CTA header + glow subtil */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 -z-10 blur-xl bg-sky-400/60" />
              {/* Badge */}
              <div className="rounded-full bg-sky-400 px-6 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-slate-950 shadow-[0_0_26px_rgba(56,189,248,0.85)] ring-1 ring-sky-100/60">
                KOSMONDE
              </div>
            </div>
          </div>

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
              <label className="text-xs font-medium text-slate-100">
                Nom *
              </label>
              <input
                name="name"
                type="text"
                aria-invalid={fieldErrors.name ? "true" : "false"}
                className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none backdrop-blur-sm focus:ring-1 ${
                  fieldErrors.name
                    ? "border-rose-500 focus:ring-rose-500/70"
                    : "border-slate-700 focus:ring-sky-400/80"
                }`}
                placeholder="Votre nom ou structure"
                onChange={() => clearFieldError("name")}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-[11px] text-rose-300">{fieldErrors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-100">
                Email *
              </label>
              <input
                name="email"
                type="email"
                aria-invalid={fieldErrors.email ? "true" : "false"}
                className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none backdrop-blur-sm focus:ring-1 ${
                  fieldErrors.email
                    ? "border-rose-500 focus:ring-rose-500/70"
                    : "border-slate-700 focus:ring-sky-400/80"
                }`}
                placeholder="adresse@email.ch"
                onChange={() => clearFieldError("email")}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-rose-300">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* TYPE DE PROJET */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-100">
              Type de projet
            </label>
            <select
              name="project-type"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none backdrop-blur-sm focus:ring-1 focus:ring-sky-400/80"
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
            <label className="text-xs font-medium text-slate-100">
              Message *
            </label>
            <textarea
              name="message"
              rows={4}
              aria-invalid={fieldErrors.message ? "true" : "false"}
              className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none backdrop-blur-sm focus:ring-1 ${
                fieldErrors.message
                  ? "border-rose-500 focus:ring-rose-500/70"
                  : "border-slate-700 focus:ring-sky-400/80"
              }`}
              placeholder="Expliquez votre besoin en quelques phrases."
              onChange={() => clearFieldError("message")}
            />
            {fieldErrors.message && (
              <p className="mt-1 text-[11px] text-rose-300">{fieldErrors.message}</p>
            )}
          </div>

          {/* BOUTON – même bleu que CTA header */}
          <button
            type="submit"
            disabled={isSending}
            className={`mt-3 inline-flex w-full sm:w-auto items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-slate-950 transition ${
              isSending
                ? "cursor-not-allowed bg-sky-400/70"
                : "bg-sky-400 hover:bg-sky-300 shadow-[0_0_22px_rgba(56,189,248,0.6)]"
            }`}
          >
            {isSending
              ? "Envoi en cours..."
              : status === "success"
              ? "Message envoyé ✔"
              : "Envoyer le message"}
          </button>

          <p className="text-[11px] text-slate-300">
            Vous envoyez un message, je vous réponds personnellement. Aucun envoi automatique.
          </p>
        </form>

        {/* BLOCS D’INFOS */}
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* Bloc 1 — Message direct */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.9)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-sm">
                  💬
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">
                    Premier contact
                  </p>
                  <h3 className="text-sm font-semibold text-slate-50">
                    M’écrire en quelques lignes
                  </h3>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                1 / 2
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-200">
              Présentez votre activité et votre besoin en quelques phrases. Je vous réponds avec une orientation simple et directe.
            </p>

            <ul className="mt-3 space-y-1 text-[12px] leading-relaxed text-slate-200">
              <li>• Votre activité</li>
              <li>• Ce que vous souhaitez</li>
              <li>• Votre délai idéal</li>
            </ul>

            {/* BADGES PREMIUM – gamme bleue uniquement */}
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border border-sky-500/70 bg-sky-500/10 px-3 py-1 text-sky-100">
                Refaire un site
              </span>
              <span className="rounded-full border border-sky-400/70 bg-sky-400/10 px-3 py-1 text-sky-100">
                Premier site
              </span>
              <span className="rounded-full border border-cyan-300/70 bg-cyan-300/10 px-3 py-1 text-cyan-100">
                Avis rapide
              </span>
            </div>

            <p className="mt-4 text-[11px] text-slate-300">
              Vous obtenez une première direction adaptée à votre situation.
            </p>
          </div>

          {/* Bloc 2 — Coordonnées */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/90 p-6 text-xs shadow-[0_18px_55px_rgba(15,23,42,0.9)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-sm">
                  ✉️
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">
                    Coordonnées
                  </p>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Contact direct avec le studio
                  </h3>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                2 / 2
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-200">
              Vous échangez avec une seule personne, du premier message à la mise en ligne.
            </p>

            {/* Email + délai – bleu au lieu de vert */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-400/80 bg-slate-950/90 px-3 py-1.5 text-[11px] text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <a
                href="mailto:contact@kosmonde.ch"
                className="truncate text-sky-300 hover:text-sky-200"
              >
                contact@kosmonde.ch
              </a>
              <span className="text-slate-300">· Réponse sous 24–48h</span>
            </div>

            {/* BADGES DE CONFIANCE – bleus + gris */}
            <div className="mt-5 flex flex-wrap gap-2 text-[10px]">
              <span className="rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-1 text-slate-200">
                Pas de newsletter
              </span>
              <span className="rounded-full border border-cyan-300/70 bg-cyan-300/10 px-3 py-1 text-cyan-100">
                Données non revendues
              </span>
              <span className="rounded-full border border-sky-400/70 bg-sky-400/10 px-3 py-1 text-sky-200">
                Échange confidentiel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
