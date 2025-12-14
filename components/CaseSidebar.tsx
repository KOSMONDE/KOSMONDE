"use client";

import { useEffect, useState } from "react";

type SectionLink = {
  id: string;
  label: string;
  number: string;
};

export function CaseSidebar({ sections }: { sections: SectionLink[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.7)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 mb-2">
        Parcours de l’étude de cas
      </p>

      <nav className="space-y-1.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center justify-between rounded-lg px-2 py-1.5 transition ${
                isActive ? "bg-slate-900 text-slate-50" : "hover:bg-slate-900/80"
              }`}
            >
              <span>{section.label}</span>
              <span className="text-slate-600 text-[10px]">{section.number}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
