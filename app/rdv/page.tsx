"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SERVICE_CARD_DATA, SITE_SERVICE_IDS } from "../../components/ServicesSection";

type CalendarDay = { date: Date; iso: string };
type DayStatus = "out" | "unavailable" | "available";

type ServiceCard = {
  id: string;
  title: string;
  badge: string;
  icon: string;
  bullets: { text: string; hint?: string }[];
  highlight: string;
  group: string;
  timeline?: string;
  featured?: boolean;
};

type SlotAvailability = {
  date: string;
  slots: string[];
};

type SelectedSlot = { dateISO: string; time: string };

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const SERVICE_CARDS: ServiceCard[] = SERVICE_CARD_DATA.map((service) => ({
  ...service,
  // Conserve le texte et l'indice d'aide éventuel pour afficher les "?" comme dans la section Services.
  bullets: service.bullets.map((b) =>
    typeof b === "string" ? { text: b } : { text: b.text, hint: b.hint }
  ),
  group: SITE_SERVICE_IDS.has(service.id) ? "Création de sites" : "Autres accompagnements",
  icon: service.icon ?? "•",
  featured: service.featured ?? false,
}));

const TABS = [
  { id: "sites", label: "Création de sites", description: "" },
  { id: "accompagnements", label: "Autres accompagnements", description: "" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const INITIAL_SITE_SERVICE =
  SERVICE_CARD_DATA.find((card) => card.id === "vitrine")?.id ??
  SERVICE_CARD_DATA.find((card) => SITE_SERVICE_IDS.has(card.id))?.id ??
  SERVICE_CARD_DATA[0]?.id ??
  "";

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

function generateAvailabilities(minWeekStart: Date, lastWeekStart: Date): SlotAvailability[] {
  const slots: SlotAvailability[] = [];
  let weekStartCursor = minWeekStart;
  let weekIndex = 0;
  while (weekStartCursor.getTime() <= lastWeekStart.getTime()) {
    // Choisir deux jours dans la semaine (lundi-vendredi) de façon déterministe
    const dayIdx1 = (weekIndex * 2) % 5; // 0-4 -> Lun-Ven
    const dayIdx2 = (weekIndex * 2 + 2) % 5; // diffère du premier

    [dayIdx1, dayIdx2].forEach((dayIdx) => {
      const date = addDays(weekStartCursor, dayIdx);
      const iso = toISO(date);
      slots.push({ date: iso, slots: ["12:00", "18:00"] });
    });

    weekStartCursor = addDays(weekStartCursor, 7);
    weekIndex += 1;
  }
  return slots;
}

function buildAvailabilityMap(minWeekStart: Date, lastWeekStart: Date) {
  const availabilities = generateAvailabilities(minWeekStart, lastWeekStart);
  return availabilities.reduce<Map<string, string[]>>((acc, slot) => {
    acc.set(slot.date, slot.slots);
    return acc;
  }, new Map());
}

function getDayStatus(day: CalendarDay, minDate: Date, maxDate: Date, availabilityMap: Map<string, string[]>) {
  if (day.date < minDate || day.date > maxDate) return { status: "out" as DayStatus, slots: [] };
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

export default function BookingPage() {
  const now = useMemo(() => new Date(), []);
  const yearStart = now.getFullYear();
  const yearEnd = yearStart + 1;
  const minDate = useMemo(() => {
    const date = new Date(yearStart, 0, 1);
    date.setHours(12, 0, 0, 0);
    return date;
  }, [yearStart]);
  const maxDate = useMemo(() => {
    const date = new Date(yearEnd, 11, 31);
    date.setHours(12, 0, 0, 0);
    return date;
  }, [yearEnd]);
  const minWeekStart = useMemo(() => alignToMonday(minDate), [minDate]);
  const lastWeekStart = useMemo(() => alignToMonday(maxDate), [maxDate]);
  const availabilityMap = useMemo(
    () => buildAvailabilityMap(minWeekStart, lastWeekStart),
    [minWeekStart, lastWeekStart]
  );

  const [activeTab, setActiveTab] = useState<TabId>("sites");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(INITIAL_SITE_SERVICE);
  const [weekStart, setWeekStart] = useState<Date>(minWeekStart);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const router = useRouter();
  const todayISO = toISO(now);

  const weekDays = useMemo<CalendarDay[]>(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(weekStart, index);
      return { date, iso: toISO(date) };
    });
  }, [weekStart]);

  const activeServices = useMemo(
    () =>
      SERVICE_CARDS.filter((service) =>
        activeTab === "sites" ? SITE_SERVICE_IDS.has(service.id) : !SITE_SERVICE_IDS.has(service.id)
      ),
    [activeTab]
  );
  const fallbackServiceId = useMemo(() => {
    if (!activeServices.length) return "";
    const preferredId =
      activeTab === "sites"
        ? activeServices.find((s) => s.id === "vitrine")?.id
        : activeServices.find((s) => s.id === "cartes-visite")?.id;
    return preferredId || activeServices[0]?.id || "";
  }, [activeServices, activeTab]);
  const effectiveSelectedServiceId =
    activeServices.some((s) => s.id === selectedServiceId) && selectedServiceId
      ? selectedServiceId
      : fallbackServiceId;
  const selectedService =
    SERVICE_CARDS.find((service) => service.id === effectiveSelectedServiceId) ?? null;

  const canGoPrev = weekStart.getTime() > minWeekStart.getTime();
  const canGoNext = weekStart.getTime() < lastWeekStart.getTime();
  const selectedSlotDate = selectedSlot ? slotDateFromISO(selectedSlot.dateISO) : null;
  const selectedSlotLabel = selectedSlotDate ? recapDateFormatter.format(selectedSlotDate) : null;
  const isCurrentWeek =
    weekDays.some((day) => day.iso === todayISO) &&
    weekStart.getTime() === alignToMonday(now).getTime();

  const hasService = Boolean(selectedService);
  const hasSlot = Boolean(selectedSlot && selectedSlotLabel);
  const canConfirm = hasService && hasSlot;

  function stepStatus(stepId: number) {
    const prerequisitesMissing =
      (stepId === 2 && !hasService && currentStep >= 2) || (stepId === 3 && (!hasService || !hasSlot) && currentStep >= 3);
    if (prerequisitesMissing) return "disabled";
    if (stepId < currentStep) return "done";
    if (stepId === currentStep) return "current";
    return "todo";
  }

  function goNext() {
    if (currentStep === 1 && !hasService) {
      setFormError("Choisissez un service pour continuer.");
      return;
    }
    if (currentStep === 2 && !hasSlot) {
      setFormError("Choisissez un créneau pour continuer.");
      return;
    }
    setFormError(null);
    setCurrentStep((prev) => Math.min(3, prev + 1));
  }

  function goPrev() {
    setFormError(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }

  function handleConfirm() {
    if (!selectedService || !selectedSlot) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactName.trim()) {
      setFormError("Indiquez votre nom pour confirmer.");
      return;
    }
    if (!contactEmail.trim() || !emailRegex.test(contactEmail.trim())) {
      setFormError("Email requis pour confirmer.");
      return;
    }
    setFormError(null);

    const params = new URLSearchParams({
      service: selectedService.title,
      serviceId: selectedService.id,
      date: selectedSlot.dateISO,
      time: selectedSlot.time,
      name: contactName.trim(),
      email: contactEmail.trim(),
      phone: contactPhone.trim(),
    });

    router.push(`/rdv/confirmation?${params.toString()}`);
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <section className="container-kosmonde py-10">
        <div className="mx-auto max-w-7xl space-y-6 rounded-[2.5rem] border border-slate-800/70 bg-slate-950/90 p-6 lg:p-8 shadow-[0_35px_120px_rgba(14,165,233,0.18)]">
          <header className="space-y-2 text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sky-400">Rendez-vous Kosmonde</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">En 3 étapes claires</h1>
            <p className="text-sm text-slate-400 sm:text-base whitespace-nowrap sm:whitespace-normal">
              Choisissez un service, un créneau, et confirmez.
            </p>
          </header>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5">
            {/* Mobile steps */}
            <ol className="flex items-center justify-between gap-2 text-[11px] sm:hidden">
              {STEPS.map((step) => {
                const status = stepStatus(step.id);
                const baseCircle = "flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-semibold transition";
                const circleClass =
                  status === "done"
                    ? `${baseCircle} border-emerald-400 bg-emerald-500/15 text-emerald-100`
                    : status === "current"
                      ? `${baseCircle} border-sky-400 bg-sky-500/20 text-sky-100`
                      : `${baseCircle} border-slate-700 bg-slate-900 text-slate-500`;
                const labelClass =
                  status === "done"
                    ? "text-emerald-100"
                    : status === "current"
                      ? "text-sky-100"
                      : "text-slate-500";

                return (
                  <li key={step.id} className="flex flex-1 flex-col items-center gap-1">
                    <div className={circleClass}>{step.id}</div>
                    <span className={`${labelClass} whitespace-nowrap text-[10px] leading-none`}>{step.label}</span>
                  </li>
                );
              })}
            </ol>

            {/* Desktop/tablette steps */}
            <ol className="hidden sm:inline-flex min-w-full items-center justify-center gap-3 text-xs sm:text-sm whitespace-nowrap">
              {STEPS.map((step, index) => {
                const status = stepStatus(step.id);
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
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-[0_25px_80px_rgba(14,165,233,0.15)]">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Étape 1 · Service</p>
                  <h2 className="text-xl font-semibold text-slate-50">Choisissez le format</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center w-full">
                  {TABS.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={[
                          "w-full sm:w-auto flex-1 rounded-2xl border px-4 py-3 text-center transition duration-300 sm:max-w-[260px] min-w-[0]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                          isActive
                            ? "border-sky-400/60 bg-sky-500/10 text-sky-50 shadow-[0_15px_45px_rgba(14,165,233,0.25)]"
                            : "border-slate-800/80 text-slate-400 hover:text-slate-100 hover:bg-slate-900/40",
                        ].join(" ")}
                      >
                        <span className="block text-sm font-semibold tracking-wide">{tab.label}</span>
                        <span className={["mt-1 block text-xs", isActive ? "text-sky-200" : "text-slate-500"].join(" ")}>
                          {tab.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {activeServices.map((service, idx) => {
                    const active = service.id === effectiveSelectedServiceId;
                    const isSite = SITE_SERVICE_IDS.has(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        style={{ animationDelay: `${idx * 60}ms` }}
                        className={[
                          "relative flex h-full w-full min-w-0 flex-col gap-4 rounded-[1.4rem] border px-5 pb-6 text-left transition-all duration-300 animate-fade hover:-translate-y-1",
                          "pt-8",
                          "md:min-w-[320px]",
                          active
                            ? "border-sky-400/80 bg-slate-950/95 shadow-[0_30px_90px_rgba(14,165,233,0.28)]"
                            : isSite
                              ? "border-slate-800 bg-slate-950/85 hover:border-sky-400/50 hover:shadow-[0_22px_65px_rgba(14,165,233,0.25)]"
                              : "border-slate-800 bg-slate-950/85 hover:border-violet-400/50 hover:shadow-[0_22px_65px_rgba(124,58,237,0.25)]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "absolute inset-0 pointer-events-none rounded-[1.6rem]",
                            active ? "shadow-[0_0_0_1px_rgba(56,189,248,0.5),0_25px_80px_rgba(56,189,248,0.2)]" : "",
                          ].join(" ")}
                          aria-hidden
                        />

                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70"
                          >
                            <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
                          </span>
                          <div className="flex flex-col">
                            <p className="text-xl font-semibold text-slate-50 whitespace-nowrap">{service.title}</p>
                          </div>
                        </div>

                        <ul className="space-y-2 text-sm text-slate-200">
                          {service.bullets.map((bullet, bIdx) => (
                            <li
                              key={`${service.id}-bullet-${bIdx}`}
                              className="flex items-start gap-2 md:items-center"
                            >
                              <span className="mt-1.5 md:mt-1 h-2 w-2 rounded-full bg-sky-400 flex-shrink-0" aria-hidden="true" />
                              <span className="flex-1 whitespace-nowrap text-xs sm:text-sm">{bullet.text}</span>
                              {bullet.hint && (
                              <div className="relative group">
                                <span
                                  aria-label={bullet.hint}
                                  className="hidden sm:flex h-4 w-4 items-center justify-center rounded-full border border-slate-700/70 text-[10px] text-slate-200/80 transition hover:text-sky-300 hover:border-sky-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                                  tabIndex={0}
                                >
                                  ?
                                </span>
                                <span
                                  role="tooltip"
                                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden w-[220px] rounded border border-slate-800 bg-slate-950/95 px-3 py-2 text-[10px] text-slate-200 opacity-0 transition sm:block group-hover:opacity-100 group-focus-within:opacity-100 z-30 pointer-events-none"
                                >
                                  {bullet.hint}
                                </span>
                              </div>
                              )}
                            </li>
                          ))}
                        </ul>

                        <p className="mt-2 border-t border-slate-800/70 pt-3 text-[11px] sm:text-sm text-slate-400 whitespace-nowrap">
                          {service.highlight}
                        </p>

                        {service.timeline && (
                          <div className="mt-3 w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-center text-sm font-semibold text-slate-100 whitespace-nowrap">
                            {service.timeline}
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Étape 2 · Créneau</p>
                    <h3 className="text-xl font-semibold text-slate-50">Choisissez votre semaine</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={!canGoPrev}
                      onClick={() => canGoPrev && setWeekStart((prev) => addDays(prev, -7))}
                      className={[
                        "rounded-full border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                        canGoPrev ? "border-slate-700 text-slate-100 hover:border-slate-500" : "cursor-not-allowed border-slate-800 text-slate-600",
                      ].join(" ")}
                    >
                      ← Semaine
                    </button>
                    <button
                      type="button"
                      disabled={!canGoNext}
                      onClick={() => canGoNext && setWeekStart((prev) => addDays(prev, 7))}
                      className={[
                        "rounded-full border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                        canGoNext ? "border-slate-700 text-slate-100 hover:border-slate-500" : "cursor-not-allowed border-slate-800 text-slate-600",
                      ].join(" ")}
                    >
                      Semaine →
                    </button>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Semaine</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-lg font-semibold text-slate-50">
                      {rangeFormatter.format(weekStart)} – {rangeFormatter.format(addDays(weekStart, 6))}
                    </p>
                    {isCurrentWeek && (
                      <span className="inline-flex items-center rounded-full border border-emerald-400/70 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                        Cette semaine
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {selectedSlotLabel ? `Jour choisi : ${selectedSlotLabel}` : "Sélectionnez un jour puis un créneau."}
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:gap-4">
                  {weekDays.map((day, index) => {
                    const { status, slots } = getDayStatus(day, minDate, maxDate, availabilityMap);
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
                                  aria-pressed={isSelected}
                                  className={[
                                    "rounded-full border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
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
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Étape 3 · Confirmation</p>
                  <h3 className="text-xl font-semibold text-slate-50">Vérifiez et validez</h3>
                  <p className="hidden text-sm text-slate-400 sm:block">Service, créneau, puis vos coordonnées pour l’invitation.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
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
                      <p className="mt-2 text-sm text-slate-400">Aucun créneau sélectionné.</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-100">Nom *</label>
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none transition hover:border-slate-600 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/80"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-100">Email *</label>
                    <input
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      type="email"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none transition hover:border-slate-600 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/80"
                      placeholder="contact@email.ch"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-100">Téléphone (optionnel)</label>
                    <input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      type="tel"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none transition hover:border-slate-600 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/80"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {formError && (
            <p className="text-sm text-rose-300" role="alert">
              {formError}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentStep === 1}
              className={[
                "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                currentStep === 1 ? "cursor-not-allowed border-slate-800 text-slate-600" : "border-slate-700 text-slate-100 hover:border-slate-500",
              ].join(" ")}
            >
              ← Retour
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_15px_35px_rgba(14,165,233,0.35)] transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Continuer
              </button>
            ) : (
              <button
                type="button"
                disabled={!canConfirm}
                onClick={handleConfirm}
                className={[
                  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                  canConfirm
                    ? "bg-emerald-400 text-slate-950 shadow-[0_20px_45px_rgba(16,185,129,0.35)] hover:bg-emerald-300"
                    : "cursor-not-allowed bg-slate-800 text-slate-500",
                ].join(" ")}
              >
                Valider le rendez-vous
              </button>
            )}
          </div>

        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            ← Retour au site
          </Link>
        </div>
      </section>

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
