"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrolled > 240);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Remonter en haut de page"
      className={[
        "fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[11000]",
        "inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-100",
        "shadow-[0_12px_30px_rgba(8,47,73,0.6)] backdrop-blur-sm",
        "transition-all duration-200 hover:border-sky-400 hover:text-white",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none",
        "h-11 w-11"
      ].join(" ")}
    >
      ↑
    </button>
  );
}
