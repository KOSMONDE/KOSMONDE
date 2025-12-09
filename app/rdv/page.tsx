"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CalendarDay = { date: Date; iso: string };
type DayStatus = "out" | "unavailable" | "available";

type ServiceCard = {
  id: string;
  title: string;
  badge: string;
  icon: string;
  bullets: string[];
  highlight: string;
  group: string;
};

type SlotAvailability = {
  date: string;
  slots: string[];
};

type SelectedSlot = { dateISO: string; time: string };

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const YEAR_START = 2026;
const YEAR_END = 2027;

const SERVICE_TABS = [
  {
    id: "creation",
    title: "Création de sites",
    description: "One-page, vitrine ou sur-mesure pour poser une présence claire.",
    services: [
      {
        id: "onepage",
        title: "Site One-page",
        badge: "Idéal pour démarrer",
        icon: "📄",
        bullets: [
          "Une page claire et structurée",
          "Parfait pour présenter une offre",
          "Rapide à mettre en place",
        ],
        highlight: "Pour tester une idée ou poser une présence claire en ligne.",
      },
      {
        id: "vitrine",
        title: "Site vitrine",
        badge: "Format complet",
        icon: "🗂️",
        bullets: ["Pages dédiées", "Image pro", "Évolutif"],
        highlight: "Pour installer une image professionnelle et rassurer vos visiteurs.",
      },
      {
        id: "surmesure",
        title: "Site sur mesure",
        badge: "Besoins particuliers",
        icon: "🛠️",
        bullets: [
          "Fonctionnalités spécifiques",
          "Architecture dédiée",
          "Projet ambitieux",
        ],
        highlight: "Pour un besoin précis ou un projet à fort potentiel.",
      },
    ],
  },
  {
    id: "autres",
    title: "Autres accompagnements",
    description: "Optimiser, clarifier ou faire évoluer vos supports.",
    services: [
      {
        id: "refonte",
        title: "Refonte de site",
        badge: "Améliorer l’existant",
        icon: "🧱",
        bullets: ["Modernisation", "Clarté", "Nouveau design"],
        highlight: "Pour rendre votre site plus clair et actuel.",
      },
      {
        id: "maj",
        title: "Petites mises à jour",
        badge: "Ajustements",
        icon: "🩺",
        bullets: ["Ajouts simples", "Corrections visuelles", "Ajustements ciblés"],
        highlight: "Pour garder un site cohérent et propre.",
      },
      {
        id: "contenu",
        title: "Contenu & structure",
        badge: "Clarifier",
        icon: "✏️",
        bullets: ["Message simplifié", "Navigation fluide", "Parcours cohérent"],
        highlight: "Pour rendre votre site compréhensible et rassurant.",
      },
      {
        id: "logo",
        title: "Création de logo",
        badge: "Identité visuelle",
        icon: "🎨",
        bullets: ["Logo modern", "Formats multiples", "Déclinable"],
        highlight: "Pour poser une base visuelle cohérente.",
      },
      {
        id: "cartes",
        title: "Cartes de visite",
        badge: "Supports pro",
        icon: "💳",
        bullets: ["Recto/verso", "Aligné avec votre site", "Prêt à imprimer"],
        highlight: "Pour présenter votre activité avec professionnalisme.",
      },
      {
        id: "maintenance",
        title: "Maintenance & support",
        badge: "Suivi continu",
        icon: "🛡️",
        bullets: ["Correctifs", "Mises à jour", "Support"],
        highlight: "Pour une présence stable et durable.",
      },
    ],
  },
];

const SERVICE_CARDS: ServiceCard[] = SERVICE_TABS.flatMap((tab) =>
  tab.services.map((service) => ({ ...service, group: tab.title }))
);

const AVAILABILITIES: SlotAvailability[] = [
  { date: "2026-01-15", slots: ["09:00", "14:00"] },
  { date: "2026-02-03", slots: ["10:30"] },
  { date: "2026-03-12", slots: ["11:00", "16:00"] },
  { date: "2026-04-18", slots: ["09:30"] },
  { date: "2026-06-06", slots: ["10:00", "15:30"] },
  { date: "2026-08-27", slots: ["09:00"] },
  { date: "2026-10-09", slots: ["13:00", "17:00"] },
  { date: "2026-12-02", slots: ["11:30"] },
  { date: "2027-01-11", slots: ["09:00", "14:30"] },
  { date: "2027-02-22", slots: ["10:00"] },
  { date: "2027-04-04", slots: ["09:30", "13:30"] },
  { date: "2027-05-19", slots: ["11:00"] },
  { date: "2027-07-08", slots: ["09:00", "15:00"] },
  { date: "2027-09-14", slots: ["10:30"] },
  { date: "2027-11-25", slots: ["09:30", "14:00"] },
];

const availabilityMap = AVAILABILITIES.reduce<Map<string, string[]>>((acc, slot) => {
  acc.set(slot.date, slot.slots);
  return acc;
}, new Map());

const rangeFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });
const cellFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
const recapDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function alignToMonday(date: Date) {
  const aligned = new Date(date);
  const diff = (aligned.getDay() + 6) % 7;
  aligned.setDate(aligned.getDate() - diff);
  aligned.setHours(12, 0, 0, 0);
  return aligned;
}

const MIN_DATE = new Date(YEAR_START, 0, 1);
MIN_DATE.setHours(12, 0, 0, 0);
const MAX_DATE = new Date(YEAR_END, 11, 31);
MAX_DATE.setHours(12, 0, 0, 0);

const MIN_WEEK_START = alignToMonday(MIN_DATE);
const LAST_WEEK_START = alignToMonday(MAX_DATE);

function getDayStatus(day: CalendarDay) {
  if (day.date < MIN_DATE || day.date > MAX_DATE) return { status: "out" as DayStatus, slots: [] };
  const slots = availabilityMap.get(day.iso) ?? [];
  if (!slots.length) return { status: "unavailable" as DayStatus, slots };
  return { status: "available" as DayStatus, slots };
}

function slotDateFromISO(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1, 12);
}

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Créneau" },
  { id: 3, label: "Confirmation" },
];

function getStepStatus(stepId: number, hasService: boolean, hasSlot: boolean) {
  if (stepId === 1) return hasService ? "done" : "current";
  if (stepId === 2) {
    if (!hasService) return "disabled";
    return hasSlot ? "done" : "current";
  }
  if (stepId === 3) return hasService && hasSlot ? "current" : "disabled";
  return "disabled";
}

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<string>(SERVICE_TABS[0]?.id ?? "creation");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICE_CARDS[0]?.id ?? "");
  const [weekStart, setWeekStart] = useState<Date>(MIN_WEEK_START);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  const router = useRouter();

  const selectedService = SERVICE_CARDS.find((service) => service.id === selectedServiceId) ?? null;

  const weekDays = useMemo<CalendarDay[]>(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(weekStart, index);
      return { date, iso: toISO(date) };
    });
  }, [weekStart]);

  const canGoPrev = weekStart.getTime() > MIN_WEEK_START.getTime();
  const canGoNext = weekStart.getTime() < LAST_WEEK_START.getTime();
  const selectedSlotDate = selectedSlot ? slotDateFromISO(selectedSlot.dateISO) : null;
  const selectedSlotLabel = selectedSlotDate ? recapDateFormatter.format(selectedSlotDate) : null;

  const hasService = Boolean(selectedService);
  const hasSlot = Boolean(selectedSlot && selectedSlotLabel);
  const canConfirm = hasService && hasSlot;

  function handleConfirm() {
    if (!selectedService || !selectedSlot) return;

    const params = new URLSearchParams({
      service: selectedService.title,
      serviceId: selectedService.id,
      date: selectedSlot.dateISO,
      time: selectedSlot.time,
    });

    router.push(`/rdv/confirmation?${params.toString()}`);
  }

  const activeServices = SERVICE_TABS.find((tab) => tab.id === activeTab)?.services ?? [];

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <header className="sticky top-0 z-20 border-b border-slate-900/70 bg-slate-950/85 backdrop-blur">
        <div className="container-kosmonde flex flex-wrap items-center justify-between gap-3 py-4 text-xs sm:text-sm">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold tracking-wide text-slate-100">Kosmonde Studio</p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Clarté · design · conversion</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label="Fil d’ariane" className="hidden text-[11px] text-slate-400 sm:block">
              <span className="text-slate-500">Accueil</span>
              <span className="mx-1 text-slate-600">›</span>
              <span className="text-slate-200">Rendez-vous</span>
            </nav>
            <Link
              href="/contact"
              className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-sky-400 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Besoin d’aide ?
            </Link>
          </div>
        </div>
      </header>

      <section className="container-kosmonde space-y-10 py-12">
        <section className="mx-auto max-w-5xl space-y-8 rounded-[2.5rem] border border-slate-800/70 bg-slate-950/85 p-8 text-center shadow-[0_40px_160px_rgba(15,23,42,0.85)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Rendez-vous Kosmonde</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Planifiez votre session premium : accompagnement, calendrier commun et confirmation claire.
            </h1>
            <p className="text-sm text-slate-400 sm:text-base">
              Je vous guide en trois étapes : format, créneau, validation. Réponse personnalisée en moins de 24&nbsp;h avec checklist et lien visio.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Réponse", value: "-24 h", detail: "Pack récap + .ics" },
              { label: "Session", value: "60 min", detail: "Visio ou Lausanne" },
              { label: "Formats", value: "3 offres", detail: "One-page, vitrine, refonte" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800/70 bg-slate-950/90 p-4 text-left text-sm text-slate-400"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-slate-50">{stat.value}</p>
                <p>{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/90 p-5 text-left">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Process express</p>
            <div className="mt-4 flex flex-col gap-6 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
              {[
                { title: "Sélection", detail: "Service adapté" },
                { title: "Calendrier", detail: "Créneau commun" },
                { title: "Validation", detail: "Checklist + .ics" },
              ].map((step, index) => (
                <div key={step.title} className="flex flex-1 items-center gap-3">
                  <div className="relative flex items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-500/50 bg-sky-500/10 text-[11px] font-semibold text-sky-100">
                      {index + 1}
                    </span>
                    {index < 2 && (
                      <span className="ml-6 hidden h-px w-16 rounded-full bg-gradient-to-r from-sky-500 to-transparent md:block" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50">{step.title}</p>
                    <p className="text-xs text-slate-400">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-950/85 p-6">
          <ol className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            {STEPS.map((step, index) => {
              const status = getStepStatus(step.id, hasService, hasSlot);
              const isLast = index === STEPS.length - 1;
              const baseCircle = "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition";
              const [circleClass, labelClass, barClass] =
                status === "done"
                  ? [
                      `${baseCircle} border-emerald-400 bg-emerald-500/15 text-emerald-100`,
                      "text-emerald-100",
                      "bg-emerald-400/70",
                    ]
                  : status === "current"
                    ? [
                        `${baseCircle} border-sky-400 bg-sky-500/20 text-sky-100`,
                        "text-sky-100",
                        "bg-sky-400/70",
                      ]
                    : [
                        `${baseCircle} border-slate-700 bg-slate-900 text-slate-500`,
                        "text-slate-500",
                        "bg-slate-800",
                      ];

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
        </section>

        <section className="rounded-[2.5rem] border border-slate-800 bg-slate-950/90 p-6 shadow-[0_35px_120px_rgba(14,165,233,0.18)]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,_2.2fr)_minmax(320px,_1fr)]">
            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Étape 1 · Service</p>
                <h2 className="text-xl font-semibold text-slate-50">Votre accompagnement Kosmonde</h2>
                <p className="text-sm text-slate-400">
                  Un clic sur une carte enregistre votre choix. Les onglets séparent les créations et les autres prestations.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {SERVICE_TABS.map((tab) => {
                  const active = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={[
                        "rounded-3xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                        active
                          ? "border-sky-400/60 bg-sky-500/15 text-sky-50 shadow-[0_20px_60px_rgba(14,165,233,0.25)]"
                          : "border-slate-800 bg-slate-950 text-slate-300 hover:text-slate-50",
                      ].join(" ")}
                    >
                      <p className="text-sm font-semibold text-slate-50">{tab.title}</p>
                      <p className="text-xs text-slate-400">{tab.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {activeServices.map((service, idx) => {
                  const active = service.id === selectedServiceId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      style={{ animationDelay: `${idx * 60}ms` }}
                      className={[
                        "flex h-full flex-col gap-3 rounded-2xl border p-5 text-left transition-all duration-300 animate-fade",
                        active
                          ? "border-sky-400/80 bg-sky-500/10 text-sky-50 shadow-[0_35px_100px_rgba(14,165,233,0.3)] -translate-y-1"
                          : "border-slate-800 bg-slate-950 text-slate-300 hover:border-sky-400/40 hover:shadow-[0_20px_60px_rgba(14,165,233,0.2)]",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-2xl" aria-hidden>
                          {service.icon}
                        </span>
                        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300">
                          {service.badge}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-slate-50">{service.title}</p>
                      <ul className="space-y-1 text-xs text-slate-400">
                        {service.bullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{service.highlight}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 text-sm text-slate-300 lg:sticky lg:top-28">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Sélection active</p>
              {selectedService ? (
                <>
                  <p className="mt-3 text-base font-semibold text-sky-200">{selectedService.title}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{selectedService.group}</p>
                  <p className="mt-2 text-slate-400">{selectedService.highlight}</p>
                </>
              ) : (
                <p className="mt-2 text-slate-500">Choisissez un accompagnement pour débloquer le calendrier.</p>
              )}
              <div className="mt-4 space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-xs text-slate-400">
                <p>Vous recevrez :</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Récap complet + checklist contenus.</li>
                  <li>Invitation calendrier .ics.</li>
                  <li>Accès au questionnaire projet.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,_2.5fr)_minmax(320px,_1fr)]">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Étape 2 · Créneau</p>
                <h3 className="text-xl font-semibold">Calendrier hebdomadaire 2026-2027</h3>
                <p className="text-sm text-slate-400">Vert = créneau libre · Gris = complet · Navigation semaine par semaine.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={!canGoPrev}
                  onClick={() => canGoPrev && setWeekStart((prev) => addDays(prev, -7))}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                    canGoPrev ? "border-slate-700 text-slate-100 hover:border-slate-500" : "cursor-not-allowed border-slate-800 text-slate-600",
                  ].join(" ")}
                >
                  Semaine précédente
                </button>
                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={() => canGoNext && setWeekStart((prev) => addDays(prev, 7))}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                    canGoNext ? "border-slate-700 text-slate-100 hover:border-slate-500" : "cursor-not-allowed border-slate-800 text-slate-600",
                  ].join(" ")}
                >
                  Semaine suivante
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 animate-fade">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Semaine en cours</p>
                <p className="text-lg font-semibold text-slate-50">
                  {rangeFormatter.format(weekStart)} – {rangeFormatter.format(addDays(weekStart, 6))}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:gap-4">
                {weekDays.map((day, index) => {
                  const { status, slots } = getDayStatus(day);
                  const isAvailable = status === "available";
                  const isOutOfRange = status === "out";

                  return (
                    <div
                      key={day.iso}
                      className={[
                        "flex flex-col rounded-2xl border px-3 py-3 text-center text-sm transition-all sm:py-4",
                        isOutOfRange
                          ? "border-slate-900 text-slate-600"
                          : isAvailable
                            ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                            : "border-slate-800 bg-slate-950/70 text-slate-500",
                      ].join(" ")}
                    >
                      <p className="text-[11px] tracking-[0.2em] text-slate-500">{WEEKDAYS[index]}</p>
                      <p className="mt-1 text-lg font-semibold">{isOutOfRange ? "—" : cellFormatter.format(day.date)}</p>

                      {isAvailable && (
                        <div className="mt-3 flex flex-col gap-2">
                          {slots.map((slot) => {
                            const isSelected = selectedSlot?.dateISO === day.iso && selectedSlot?.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot({ dateISO: day.iso, time: slot })}
                                aria-label={`Sélectionner le créneau ${slot} le ${recapDateFormatter.format(day.date)}`}
                                className={[
                                  "rounded-full border px-2 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                                  isSelected
                                    ? "border-emerald-200 bg-emerald-400/30 text-emerald-50"
                                    : "border-emerald-300/40 text-emerald-100 hover:border-emerald-200",
                                ].join(" ")}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {!isAvailable && !isOutOfRange && (
                        <p className="mt-3 text-[11px] text-slate-500">Complet</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 text-sm text-slate-300 lg:sticky lg:top-28">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Créneau choisi</p>
            {selectedSlot && selectedSlotLabel ? (
              <>
                <p className="mt-3 text-lg font-semibold text-slate-50">{selectedSlotLabel}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Heure {selectedSlot.time}</p>
              </>
            ) : (
              <p className="mt-2 text-slate-500">Choisissez un slot pour afficher le récapitulatif.</p>
            )}
            <div className="mt-4 space-y-2 text-xs text-slate-400">
              <p>Conseils :</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Prévoyez 60 minutes sans interruption.</li>
                <li>Réunissez accès, exemples, contenus.</li>
                <li>Le créneau reste bloqué 48 h en attente de confirmation.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="rounded-[2.5rem] border border-slate-800 bg-slate-950/85 p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Étape 3 · Récapitulatif</p>
          <h4 className="mt-1 text-lg font-semibold text-slate-50">Vérifiez avant de valider</h4>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 shadow-[0_10px_40px_rgba(2,6,23,0.45)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Service</p>
              <p className="mt-2 text-base font-semibold text-slate-50">{selectedService?.title ?? "Aucun service choisi"}</p>
              <p className="text-sm text-slate-400">{selectedService?.group ?? "Sélectionnez un accompagnement pour continuer."}</p>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 shadow-[0_10px_40px_rgba(2,6,23,0.45)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Créneau</p>
              {selectedSlot && selectedSlotLabel ? (
                <>
                  <p className="mt-2 text-base font-semibold text-slate-50">{selectedSlotLabel}</p>
                  <p className="text-sm text-slate-400">Heure : {selectedSlot.time}</p>
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-400">Aucun créneau sélectionné. Choisissez un horaire disponible pour continuer.</p>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800/70 bg-slate-950/90 p-5 text-sm text-slate-400">
            <p>Une fois confirmé, vous serez redirigé vers la page de confirmation Kosmonde avec mail prérempli et téléchargement .ics.</p>
          </div>

          <button
            type="button"
            disabled={!canConfirm}
            onClick={handleConfirm}
            className={[
              "mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              canConfirm
                ? "bg-sky-500/90 text-slate-950 shadow-[0_20px_45px_rgba(14,165,233,0.45)] hover:bg-sky-400"
                : "cursor-not-allowed bg-slate-800 text-slate-500",
            ].join(" ")}
          >
            Valider mon créneau Kosmonde
          </button>
        </section>

        <section className="rounded-[2.5rem] border border-slate-800 bg-slate-950/80 p-6">
          <h3 className="text-xl font-semibold">Parcours Kosmonde</h3>
          <p className="mt-2 text-sm text-slate-400">
            Process premium, transparent, optimisé SEO : chaque étape est cadrée et documentée.
          </p>
          <div className="mt-6 grid gap-4 text-sm md:grid-cols-4">
            {[
              {
                title: "Brief express",
                detail: "Service + créneau retenu, blocage 48 h.",
              },
              {
                title: "Questionnaire",
                detail: "Objectifs, contenus, accès. Templates fournis.",
              },
              {
                title: "Validation",
                detail: "Livrables, devis et acompte pour confirmer.",
              },
              {
                title: "Session & suivi",
                detail: "Visio 60 min + plan d’action, fichiers et .ics sous 24 h.",
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-800/60 bg-slate-950/70 p-4">
                <p className="font-semibold text-sky-200">{step.title}</p>
                <p className="mt-1 text-slate-300">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Checklist et lien visio envoyés 48 h avant la session.</p>
            <Link
              href="mailto:bonjour@kosmonde.studio"
              className="inline-flex items-center justify-center rounded-full border border-sky-400/40 px-6 py-2 font-semibold text-sky-200 transition hover:bg-sky-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              bonjour@kosmonde.studio
            </Link>
          </div>
        </section>

        <p className="mx-auto max-w-3xl text-center text-sm text-slate-500">“On prépare votre session comme un lancement de mission.” – Yanis, Kosmonde Studio</p>
      </section>

      {canConfirm && (
        <div className="sticky bottom-4 z-30 flex justify-center px-4">
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_45px_rgba(14,165,233,0.45)] transition hover:scale-[1.01]"
          >
            Valider mon créneau Kosmonde
          </button>
        </div>
      )}

      <style>{`
        .animate-fade {
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
