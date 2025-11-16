export function Footer() {
  return (
    <footer className="border-t border-slate-900/60 bg-slate-950">
      <div className="container-kosmonde flex flex-col items-start justify-between gap-4 py-6 text-[11px] text-slate-500 sm:flex-row sm:items-center">
        
        <div className="space-y-1">
          <p className="font-semibold tracking-[0.25em] text-slate-400">
            KOSMONDE
          </p>
          <p>Création de sites web clairs, modernes et efficaces.</p>
        </div>

        <div className="space-y-1 text-right">
          <p>© {new Date().getFullYear()} KOSMONDE. Tous droits réservés.</p>
          <p>Basé en Suisse, disponible à distance.</p>
        </div>

      </div>
    </footer>
  );
}
