"use client";

import { useEffect, useRef } from "react";

export function TrustCarousel() {
  const brands = ["SEKOBA COIFFURE", "RR COIFFURE", "GBM AVOCATS"];

  // Nombre de répétitions de la séquence
  const REPEAT = 5;
  const loopBrands = Array.from({ length: REPEAT }, () => brands).flat();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isPaused = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Accessibilité : prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion.current = event.matches;
      if (event.matches) {
        track.style.transform = "translateX(0)";
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    if (prefersReducedMotion.current) {
      track.style.transform = "translateX(0)";
      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
      };
    }

    let frameId: number;
    let lastTime = performance.now();
    let shift = 0;

    // largeur d’une séquence (1 répétition de [SEKOBA, RR, GBM])
    let singleWidth = track.scrollWidth / REPEAT;

    const handleResize = () => {
      singleWidth = track.scrollWidth / REPEAT;
    };

    window.addEventListener("resize", handleResize);

    // vitesse en px/s
    const speed = 40;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused.current && !prefersReducedMotion.current) {
        // on se déplace vers la gauche
        shift -= speed * delta;

        // quand on a défilé une séquence complète, on recale
        if (Math.abs(shift) >= singleWidth) {
          shift += singleWidth;
        }

        track.style.transform = `translateX(${shift}px)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <section
      aria-label="Clients accompagnés par KOSMONDE"
      className="relative py-10 overflow-hidden border-y border-slate-900/40 bg-slate-950/50"
    >
      <div className="container-kosmonde text-center space-y-2">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
          Ils me font confiance
        </p>
        <h3 className="text-sm sm:text-base font-medium text-slate-100">
          Quelques structures accompagnées avec KOSMONDE
        </h3>
        <p className="text-[11px] text-slate-500">
          Indépendants, petites équipes, métiers de service.
        </p>
      </div>

      <div className="mt-6 relative">
        {/* Glow subtil */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Masque pour fondre les bords */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div
            ref={containerRef}
            className="trust-marquee"
            onMouseEnter={() => {
              isPaused.current = true;
            }}
            onMouseLeave={() => {
              isPaused.current = false;
            }}
          >
            <div
              ref={trackRef}
              className="trust-track"
              aria-hidden="true"
            >
              {loopBrands.map((name, idx) => (
                <div
                  key={`${name}-${idx}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-800/50 bg-slate-900/80 px-4 py-1.5 shadow-[0_10px_25px_rgba(15,23,42,0.8)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-slate-100 uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Liste lisible pour les lecteurs d’écran */}
          <div className="sr-only" aria-hidden={false}>
            {brands.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
}
