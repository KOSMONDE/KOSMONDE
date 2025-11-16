export function TrustCarousel() {
  const brands = ["SEKOBA COIFFURE", "RR COIFFURE", "GBM AVOCATS"];
  const loopBrands = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-10 overflow-hidden border-y border-slate-900/40 bg-slate-950/50">
      <p className="text-center text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-4">
        Ils me font confiance
      </p>

      <div className="relative overflow-hidden">
        {/* Glow subtil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none" />

        <div className="flex gap-3 whitespace-nowrap [animation:trust-scroll_26s_linear_infinite] hover:[animation-play-state:paused]">
          {loopBrands.map((name, idx) => (
            <div
              key={idx}
              className="inline-flex items-center justify-center rounded-full border border-slate-800/50 bg-slate-900/70 px-4 py-1"
            >
              <span className="text-[10px] font-medium tracking-[0.12em] text-slate-200 uppercase">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
