"use client";

import { useState } from "react";
import { TECH_GRAPH, TECH_LIST } from "@/lib/data/content";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Reveal, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function TechnologyEcosystem() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [active, setActive] = useState<string | null>(null);
  const techs = TECH_LIST;

  const related = active ? TECH_GRAPH[active] : [];
  const R = 42; // percentage-based radius

  return (
    <section id="technology" className="relative overflow-hidden border-t border-line py-28 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHeading
          kicker="TECHNOLOGY ECOSYSTEM"
          title={
            <>
              ONE ENGINEER.
              <br />
              <span className="text-fg-soft">MANY</span> SYSTEMS<span className="text-mute">.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          {/* Radial graph */}
          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            {/* orbit rings */}
            <div className="pointer-events-none absolute inset-[12%] rounded-full border border-line/70" />
            <div className="pointer-events-none absolute inset-[26%] rounded-full border border-line/40" />
            <div className="pointer-events-none absolute inset-[38%] rounded-full border border-line/30" />
            <div className="grid-bg pointer-events-none absolute inset-0 rounded-full opacity-20" />

            {/* core */}
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/50 bg-ink-card font-display text-sm tracking-widest text-accent shadow-[0_0_60px_rgba(63,227,154,0.25)]"
              aria-label="Jayesh — clear selection"
            >
              <span className="leading-none">JAYESH</span>
              <span className="mono-label text-[9px] text-mute">CORE</span>
            </button>

            {/* tech nodes */}
            {techs.map((tech, i) => {
              const angle = (i / techs.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + R * Math.cos(angle);
              const y = 50 + R * Math.sin(angle);
              const isActive = active === tech;
              const isDim = active && !isActive;
              return (
                <button
                  key={tech}
                  type="button"
                  onMouseEnter={() => setActive(tech)}
                  onFocus={() => setActive(tech)}
                  onClick={() => setActive(isActive ? null : tech)}
                  onMouseLeave={() => setActive((prev) => (prev === tech ? null : prev))}
                  aria-pressed={isActive}
                  className={cn(
                    "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-wider transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-accent-ink shadow-[0_0_30px_rgba(236,25,101,0.35)]"
                      : isDim
                        ? "border-line bg-ink opacity-40"
                        : "border-line bg-ink-card text-fg-soft hover:border-accent/60 hover:text-accent"
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          {/* Related projects panel */}
          <Reveal y={30} className="min-h-[220px]">
            <p className="mono-label mb-6 text-mute">HOVER A TECHNOLOGY →</p>
            <div className="border border-line bg-ink-card/60 p-8">
              <p className="font-display text-2xl text-fg md:text-3xl">
                {active ?? "SELECT A NODE"}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                {active ? `CONNECTED TO ${related.length} SYSTEM${related.length === 1 ? "" : "S"}` : "THE ENGINEERING GRAPH"}
              </p>
              <div className="mt-6 flex min-h-[44px] flex-wrap gap-2">
                {active ? (
                  related.map((p) => (
                    <span key={p} className="border border-accent/30 bg-accent/5 px-3 py-2 font-mono text-[11px] tracking-wider text-accent">
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="font-light text-fg-soft">
                    React, Next.js, Node.js, Python, Java, PostgreSQL, PostGIS, AWS,
                    Docker, Ollama, Llama, n8n, Kotlin — each wired to a system that ships.
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}