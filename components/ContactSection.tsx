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
  const [projectType, setProjectType] = useState("");

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
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,118,110,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.28),transparent_55%)]" />

      <div className="container-kosmonde relative py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,_4fr)_minmax(0,_6fr)] lg:items-start">
          {/* COLONNE INFO / CONTEXTE */}
          <div className="space-y-7">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-sky-100">
                Une question ?
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Parlons de votre prochain site vitrine
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Partagez votre activité et vos objectifs. Réponse en moins de 24&nbsp;h avec un plan clair.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-slate-200">
              {[
                "Un interlocuteur unique jusqu’à la mise en ligne.",
                "Plan axé conversion + SEO local.",
                "Visio 15 min dispo dès cette semaine.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-left whitespace-nowrap sm:whitespace-normal"
                >
                  <span className="self-center h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-[0_15px_45px_rgba(15,23,42,0.6)] ring-1 ring-slate-800/60">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.12),transparent_55%)]" />
              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Preuves rapides
              </p>
              <dl className="mt-4 grid gap-2 sm:gap-3 sm:grid-cols-3">
                <div className="text-center">
                  <dt className="text-2xl font-semibold text-slate-50 motion-safe:animate-[pulse_3s_ease-in-out_infinite]">20+</dt>
                  <dd className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Sites livrés
                  </dd>
                </div>
                <div className="text-center">
                  <dt className="text-2xl font-semibold text-slate-50 motion-safe:animate-[pulse_3s_ease-in-out_infinite]">24&nbsp;h</dt>
                  <dd className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Réponse max
                  </dd>
                </div>
                <div className="text-center">
                  <dt className="text-2xl font-semibold text-slate-50 motion-safe:animate-[pulse_3s_ease-in-out_infinite]">95%</dt>
                  <dd className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Satisf. clients
                  </dd>
                </div>
              </dl>
            </div>

          </div>

          {/* FORMULAIRE */}
          <form
            onSubmit={handleSubmit}
            className="relative isolate flex h-full w-full flex-col overflow-visible space-y-5 rounded-3xl border border-slate-800/70 bg-slate-950/90 backdrop-blur-sm p-5 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.95)] ring-1 ring-slate-800/60"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(52,211,153,0.1),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.1),transparent_60%)]" />
            {/* Champ anti-bot (honeypot) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Votre entreprise</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          {/* BADGE KOSMONDE – inspiré des CTA principaux, glow plus feutré */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 -z-10 blur-2xl bg-sky-300/30" aria-hidden="true" />
              <div className="rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-5 py-1 text-[10px] font-semibold tracking-[0.28em] text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.5)] ring-1 ring-slate-200/30 whitespace-nowrap">
                CONTACTEZ-NOUS
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
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-slate-100">
                Nom *
              </label>
              <input
                name="name"
                type="text"
                aria-invalid={fieldErrors.name ? "true" : "false"}
                className={`mt-1.5 w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none backdrop-blur-sm transition ${
                  fieldErrors.name
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500/70"
                    : "border-slate-700 hover:border-slate-500 focus:ring-1 focus:ring-sky-400/80"
                }`}
                placeholder="Votre nom ou structure"
                onChange={() => clearFieldError("name")}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-[11px] text-rose-300">{fieldErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-slate-100">
                Email *
              </label>
              <input
                name="email"
                type="email"
                aria-invalid={fieldErrors.email ? "true" : "false"}
                className={`mt-1.5 w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none backdrop-blur-sm transition ${
                  fieldErrors.email
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500/70"
                    : "border-slate-700 hover:border-slate-500 focus:ring-1 focus:ring-sky-400/80"
                }`}
                placeholder="adresse@email.ch"
                onChange={() => clearFieldError("email")}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-rose-300">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-100">
              Téléphone (optionnel)
            </label>
            <input
              name="phone"
              type="tel"
              className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none backdrop-blur-sm transition hover:border-slate-500 focus:ring-1 focus:ring-sky-400/80"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          {/* MESSAGE */}
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-100">
              Message *
            </label>
            <textarea
              name="message"
              rows={5}
              aria-invalid={fieldErrors.message ? "true" : "false"}
              className={`mt-2 w-full rounded-xl border bg-slate-950/70 px-3 py-3 text-sm text-slate-50 outline-none backdrop-blur-sm transition ${
                fieldErrors.message
                  ? "border-rose-500 focus:ring-1 focus:ring-rose-500/70"
                  : "border-slate-700 hover:border-slate-500 focus:ring-1 focus:ring-sky-400/80"
              }`}
              placeholder="Expliquez votre besoin en quelques phrases."
              onChange={() => clearFieldError("message")}
            />
            {fieldErrors.message && (
              <p className="mt-1 text-[11px] text-rose-300">{fieldErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`mt-3 inline-flex w-full sm:w-auto items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold tracking-[0.15em] text-slate-950 transition ${
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

        </form>
      </div>
    </div>
  </section>
  );
}
