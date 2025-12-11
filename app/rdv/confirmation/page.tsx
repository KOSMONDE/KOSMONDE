"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendMessage } from "../../actions/sendMessage";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

const SERVICE_STYLES: Record<string, { glow: string; gradientClass: string; accent: string }> = {
  vitrine: {
    glow: "shadow-[0_35px_120px_rgba(14,165,233,0.45)] border-sky-500/40",
    gradientClass: "bg-gradient-to-br from-slate-950 via-sky-950/20 to-slate-950",
    accent: "text-sky-300",
  },
  refonte: {
    glow: "shadow-[0_35px_120px_rgba(139,92,246,0.35)] border-violet-500/40",
    gradientClass: "bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950",
    accent: "text-violet-300",
  },
  default: {
    glow: "shadow-[0_35px_120px_rgba(59,130,246,0.25)] border-slate-800/70",
    gradientClass: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
    accent: "text-slate-300",
  },
};

function sanitizeDisplayText(value: string, maxLength = 120) {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, maxLength);
}

function isValidISODate(value: string) {
  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) return false;
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function escapeICSText(value: string, fallback: string) {
  const trimmed = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 200);
  const safe = trimmed || fallback;
  return safe
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function sanitizeICSIdentifier(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function sanitizeFileNameSegment(value: string) {
  const normalized = sanitizeICSIdentifier(value);
  return normalized || "session";
}

function useConfirmationParams() {
  const params = useSearchParams();
  const rawServiceId = params.get("serviceId")?.trim() ?? "";
  const serviceId = rawServiceId in SERVICE_STYLES ? rawServiceId : "";
  const service = sanitizeDisplayText(params.get("service")?.trim() ?? "");
  const dateParam = params.get("date")?.trim() ?? "";
  const timeParam = params.get("time")?.trim() ?? "";
  const dateISO = isValidISODate(dateParam) ? dateParam : "";
  const time = TIME_PATTERN.test(timeParam) ? timeParam : "";
  const name = sanitizeDisplayText(params.get("name")?.trim() ?? "", 120);
  const email = sanitizeDisplayText(params.get("email")?.trim() ?? "", 180);
  const phone = sanitizeDisplayText(params.get("phone")?.trim() ?? "", 80);

  const formattedDate = useMemo(() => {
    if (!dateISO) return "";
    const [y, m, d] = dateISO.split("-").map(Number);
    if (!y || !m || !d) return "";
    return dateFormatter.format(new Date(y, m - 1, d, 12));
  }, [dateISO]);

  const hasSlot = Boolean(dateISO && time && formattedDate);
  const isComplete = Boolean(service && hasSlot && email && name);

  return { serviceId, service, dateISO, time, formattedDate, hasSlot, isComplete, name, email, phone };
}

function useICS(service: string, dateISO: string, time: string) {
  return useMemo(() => {
    if (!service || !dateISO || !time) return "";
    if (!isValidISODate(dateISO) || !TIME_PATTERN.test(time)) return "";
    const [yearStr, monthStr, dayStr] = dateISO.split("-");
    const y = Number(yearStr);
    const m = Number(monthStr);
    const d = Number(dayStr);
    const [hour = 9, minute = 0] = time.split(":").map(Number);
    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return "";

    const start = new Date(Date.UTC(y, m - 1, d, hour, minute));
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
    const summary = escapeICSText(service, "Session Kosmonde");
    const uidService = sanitizeICSIdentifier(service) || "session";
    const uidDate = dateISO.replace(/-/g, "");
    const uidTime = time.replace(":", "");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Kosmonde//FR",
      "BEGIN:VEVENT",
      `UID:${uidService}-${uidDate}${uidTime}@kosmonde`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${summary}`,
      "DESCRIPTION:Session Kosmonde",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [service, dateISO, time]);
}

function ConfirmationPageContent() {
  const { serviceId, service, dateISO, time, formattedDate, hasSlot, isComplete, name, email, phone } = useConfirmationParams();
  const style = SERVICE_STYLES[serviceId] ?? SERVICE_STYLES.default;
  const icsHref = useICS(service, dateISO, time);
  const icsFileName = `kosmonde-${sanitizeFileNameSegment(service || "session")}.ics`;
  const mailService = service || "—";
  const mailDate = formattedDate || "—";
  const mailTime = time || "—";
  const mailName = name || "—";
  const mailPhone = phone || "—";

  const mailtoHref = `mailto:contact@kosmonde.ch?subject=${encodeURIComponent("Confirmation rendez-vous Kosmonde")}&body=${encodeURIComponent(
    `Service : ${mailService}\nDate : ${mailDate}\nHeure : ${mailTime}\nNom : ${mailName}\nEmail : ${email || "—"}\nTéléphone : ${mailPhone}`
  )}`;

  const router = useRouter();
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSend() {
    if (!isComplete) {
      router.push("/rdv");
      return;
    }
    setSendStatus("sending");
    setSendError(null);

    const formData = new FormData();
    formData.append("name", mailName);
    formData.append("email", email);
    formData.append("phone", phone || "");
    formData.append(
      "message",
      `Demande de rendez-vous Kosmonde\nService : ${mailService}\nDate : ${mailDate}\nHeure : ${mailTime}\nTéléphone : ${mailPhone}`
    );
    formData.append("project-type", service || "Rendez-vous");

    try {
      const result = await sendMessage(formData);
      if (result.success) {
        setSendStatus("success");
        setSendError(null);
        return;
      }
      setSendStatus("error");
      setSendError(result.error ?? "Une erreur est survenue.");
    } catch (e) {
      setSendStatus("error");
      setSendError("Impossible d’envoyer la confirmation. Merci de réessayer.");
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <section className="container-kosmonde py-10">
        <div className="mx-auto max-w-4xl space-y-6 rounded-[2.5rem] border border-slate-800/70 bg-slate-950/90 p-6 shadow-[0_35px_120px_rgba(14,165,233,0.18)]">
          <header className="space-y-2 text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sky-400">Confirmation Kosmonde</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Récapitulatif de votre rendez-vous</h1>
            <p className="text-sm text-slate-400 sm:text-base">
              Vérifiez service, créneau et coordonnées. Nous bloquons le créneau 48 h dès l’envoi de la demande.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-1 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1">
                <span className={`h-2 w-2 rounded-full ${isComplete ? "bg-emerald-400" : "bg-amber-400"}`} aria-hidden />{" "}
                {isComplete ? "Prêt à confirmer" : "Informations manquantes"}
              </span>
              <Link href="/rdv" className="inline-flex items-center gap-1 rounded-full border border-slate-800 px-3 py-1 text-slate-200 hover:border-sky-400 hover:text-sky-100">
                ← Modifier le créneau
              </Link>
            </div>
          </header>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5 overflow-x-auto">
            <ol className="inline-flex min-w-full items-center justify-center gap-3 text-xs sm:text-sm whitespace-nowrap">
              {[
                { id: 1, label: "Service" },
                { id: 2, label: "Créneau" },
                { id: 3, label: "Confirmation" },
              ].map((step, index) => {
                const isLast = index === 2;
                const done = isComplete || (step.id === 1 && Boolean(service)) || (step.id === 2 && hasSlot);
                const current = !done && ((step.id === 1 && !service) || (step.id === 2 && service && !hasSlot) || step.id === 3);
                const baseCircle = "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition";
                const [circleClass, labelClass, barClass] =
                  done
                    ? [`${baseCircle} border-emerald-400 bg-emerald-500/15 text-emerald-100`, "text-emerald-100", "bg-emerald-400/70"]
                    : current
                      ? [`${baseCircle} border-sky-400 bg-sky-500/20 text-sky-100`, "text-sky-100", "bg-sky-400/70"]
                      : [`${baseCircle} border-slate-700 bg-slate-900 text-slate-500`, "text-slate-500", "bg-slate-800"];

                return (
                  <li key={step.id} className="flex flex-1 items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className={circleClass}>{step.id}</div>
                      <span className={labelClass}>{step.label}</span>
                    </div>
                    {!isLast && <div className={`hidden h-[2px] flex-1 rounded-full sm:block ${barClass}`} />}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-[0_25px_80px_rgba(14,165,233,0.15)]">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Service choisi</p>
                <h2 className={["text-2xl font-semibold", style.accent].join(" ")}>{service || "Aucun service"}</h2>
                {!service && <p className="text-sm text-slate-500">Retournez sur /rdv pour sélectionner votre accompagnement.</p>}
              </div>
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Créneau</p>
                {hasSlot ? (
                  <>
                    <p className="text-xl font-semibold text-slate-50">{formattedDate}</p>
                    <span className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-100">
                      {time}
                    </span>
                    <p className="text-sm text-slate-500">Votre session sera confirmée par e-mail sous 24 h.</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">Aucun créneau reçu. Choisissez une semaine et un horaire disponibles avant de revenir ici.</p>
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Coordonnées</p>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li><span className="text-slate-500">Nom :</span> {name || "—"}</li>
                  <li><span className="text-slate-500">Email :</span> {email || "—"}</li>
                  <li><span className="text-slate-500">Téléphone :</span> {phone || "—"}</li>
                </ul>
              </div>
              <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Pack d’envoi</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• E-mail personnalisé avec lien visio.</li>
                  <li>• Invitation calendrier .ics.</li>
                  <li>• Questionnaire et checklist contenus.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {isComplete ? (
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sendStatus === "sending"}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                    sendStatus === "sending"
                      ? "bg-slate-800 text-slate-500"
                      : "bg-sky-500/90 text-slate-950 shadow-[0_20px_45px_rgba(14,165,233,0.4)] hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                  ].join(" ")}
                >
                  {sendStatus === "sending" ? "Envoi en cours…" : sendStatus === "success" ? "Demande envoyée" : "Envoyer ma demande"}
                </button>
              ) : (
                <Link
                  href="/rdv"
                  className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition bg-slate-800 text-slate-500 hover:text-slate-400"
                >
                  Retourner à la sélection
                </Link>
              )}

              {isComplete && icsHref && (
                <Link
                  href={icsHref}
                  download={icsFileName}
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
                >
                  Télécharger .ics
                </Link>
              )}
            </div>

            {sendError && <p className="mt-2 text-sm text-rose-300">{sendError}</p>}
            {sendStatus === "success" && (
              <p className="mt-2 text-sm text-emerald-300">
                Merci, votre demande est envoyée. Vous recevez un e-mail de confirmation sous peu.
              </p>
            )}

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/rdv"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
                >
                  Modifier
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
                >
                  Voir les services
                </Link>
              </div>
              <p className="text-xs text-slate-500">Votre créneau reste bloqué 48 h en attente de validation.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.7s ease both; }
        .animate-fadeInDelay { animation: fadeIn 0.9s ease both; }
        .animate-fadeInSlow { animation: fadeIn 1.1s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">Chargement…</div>}>
      <ConfirmationPageContent />
    </Suspense>
  );
}
