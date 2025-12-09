"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

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

  const formattedDate = useMemo(() => {
    if (!dateISO) return "";
    const [y, m, d] = dateISO.split("-").map(Number);
    if (!y || !m || !d) return "";
    return dateFormatter.format(new Date(y, m - 1, d, 12));
  }, [dateISO]);

  const hasSlot = Boolean(dateISO && time && formattedDate);
  const isComplete = Boolean(service && hasSlot);

  return { serviceId, service, dateISO, time, formattedDate, hasSlot, isComplete };
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
  const { serviceId, service, dateISO, time, formattedDate, hasSlot, isComplete } = useConfirmationParams();
  const style = SERVICE_STYLES[serviceId] ?? SERVICE_STYLES.default;
  const icsHref = useICS(service, dateISO, time);
  const icsFileName = `kosmonde-${sanitizeFileNameSegment(service || "session")}.ics`;
  const mailService = service || "—";
  const mailDate = formattedDate || "—";
  const mailTime = time || "—";

  const mailtoHref = `mailto:contact@kosmonde.ch?subject=${encodeURIComponent("Confirmation rendez-vous Kosmonde")}&body=${encodeURIComponent(
    `Service : ${mailService}\nDate : ${mailDate}\nHeure : ${mailTime}`
  )}`;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_50%)]" />

      <header className="sticky top-0 z-30 border-b border-slate-900/70 bg-slate-950/85 backdrop-blur">
        <div className="container-kosmonde flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-slate-400">
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-200">Accueil</Link>
            <span>/</span>
            <Link href="/rdv" className="hover:text-slate-200">Rendez-vous</Link>
            <span>/</span>
            <span className="text-slate-200">Confirmation</span>
          </nav>
          <span
            className={[
              "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
              isComplete
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                : "border-amber-400/40 bg-amber-500/10 text-amber-200",
            ].join(" ")}
            role="status"
            aria-live="polite"
          >
            {isComplete ? "Prêt à confirmer" : "Incomplet"}
          </span>
        </div>
      </header>

      <section className="container-kosmonde flex justify-center py-16">
        <div
          className={[
            "relative w-full max-w-4xl rounded-[2.5rem] border p-10 backdrop-blur-md",
            "bg-slate-950/90",
            style.glow,
          ].join(" ")}
        >
          <div className={["pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem]", style.gradientClass].join(" ")} />

          <div className="mb-12 space-y-3 text-center animate-fadeIn">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Kosmonde Studio</p>
            <h1 className="text-3xl font-semibold text-slate-50">Votre rendez-vous est presque prêt</h1>
            <p className="mx-auto max-w-xl text-sm text-slate-400">
              Vérifiez votre accompagnement et le créneau associé avant d’envoyer la demande. Vous pourrez aussi télécharger un rappel .ics.
            </p>
            <p className="mx-auto max-w-2xl text-xs text-slate-500 sm:text-sm">
              Après validation, vous recevez un e-mail personnalisé avec questionnaire, checklist contenus, lien visio et invitation calendrier optimisée SEO.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-2 animate-fadeIn">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Service choisi</p>
              <h2 className={["text-2xl font-semibold", style.accent].join(" ")}>
                {service || "Aucun service"}
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-slate-800 via-slate-700 to-transparent" />
              {!service && <p className="text-sm text-slate-500">Retournez sur /rdv pour sélectionner votre accompagnement.</p>}
            </div>

            <div className="space-y-2 animate-fadeInDelay">
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

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 animate-fadeInSlow">
            <Link
              href={isComplete ? mailtoHref : "/rdv"}
              className={[
                "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                isComplete
                  ? "bg-sky-500/90 text-slate-950 shadow-[0_20px_45px_rgba(14,165,233,0.4)] hover:bg-sky-400"
                  : "bg-slate-800 text-slate-500",
              ].join(" ")}
            >
              {isComplete ? "Envoyer ma demande" : "Retourner à la sélection"}
            </Link>

            {isComplete && icsHref && (
              <Link
                href={icsHref}
                download={icsFileName}
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
              >
                Télécharger .ics
              </Link>
            )}

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Link
                href="/rdv"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
              >
                Modifier
              </Link>
              <Link
                href="/#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
              >
                Voir les services
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 text-xs text-slate-400 sm:grid-cols-2">
            <p>
              Votre créneau reste bloqué 48&nbsp;h le temps de valider questionnaire, checklist et acompte si nécessaire.
            </p>
            <p>
              Besoin d’aide ? Écrivez à <Link href="mailto:contact@kosmonde.ch" className="text-sky-300 hover:text-sky-100">contact@kosmonde.ch</Link> ou découvrez les formats sur{" "}
              <Link href="/#services" className="text-sky-300 hover:text-sky-100">notre page services</Link>.
            </p>
          </div>

          <details className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300 animate-fadeInSlow">
            <summary className="cursor-pointer text-slate-200">Modalités Kosmonde</summary>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li>• Réponse sous 24 h ouvrées + envoi du questionnaire.</li>
              <li>• Possibilité d’acompte pour réserver le créneau.</li>
              <li>• Ajustement gratuit jusqu’à 48 h avant.</li>
              <li>• Support e-mail pour préparer contenus et accès.</li>
            </ul>
          </details>

          <p className="mt-6 text-center text-sm text-slate-500">“On prépare votre session comme un lancement de mission.” – Yanis, Kosmonde Studio</p>
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
