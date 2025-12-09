export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-50">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">KOSMONDE</p>
        <h1 className="text-3xl font-semibold">Mise à jour en cours...</h1>
        <p className="max-w-md text-sm text-slate-400">
          Nous améliorons actuellement l'expérience.<br />
          Revenez très vite ou contactez-nous à{" "}
          <a href="mailto:contact@kosmonde.ch" className="text-sky-300 hover:text-sky-100">
            contact@kosmonde.ch
          </a>.
        </p>
      </div>
    </main>
  );
}
