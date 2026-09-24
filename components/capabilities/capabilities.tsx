"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { CAPABILITIES } from "@/lib/data/content";
import { SectionHeading, Reveal } from "@/components/ui/section";

function CapabilityRow({ capability, active, onActive }: {
  capability: (typeof CAPABILITIES)[number];
  active: boolean;
  onActive: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const open = active || expanded;

  return (
    <div
      className={`group border-b border-line transition-colors duration-300 ${active ? "bg-accent/5" : ""}`}
      id={`cap-${capability.index}`}
    >
      <button
        type="button"
        onClick={() => onActive()}
        onFocus={() => onActive()}
        aria-expanded={open}
        className="flex w-full items-baseline justify-between gap-6 py-7 text-left outline-none md:py-9"
      >
        <div className="flex flex-1 items-baseline gap-5 md:gap-10">
          <span className="mono-label text-mute">{capability.index}</span>
          <span
            className={`font-display text-2xl leading-tight tracking-tight transition-all duration-500 md:text-5xl ${
              active ? "translate-x-4 accent" : "text-fg"
            }`}
          >
            {capability.title}
          </span>
        </div>
        <span
          className={`mono-label shrink-0 transition-all duration-500 ${active ? "text-accent" : "text-mute"}`}
        >
          {active ? "● LIVE" : "—"}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-out ${
          active ? "grid-rows-[1fr] pb-8 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="ml-0 md:ml-[4.5rem]">
            <p className="max-w-2xl font-light leading-relaxed text-fg-soft">{capability.description}</p>
            <div className="mt-6 flex flex-col gap-6 md:ml-0 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {capability.stack.map((tech) => (
                  <span key={tech} className="border border-line px-3 py-1.5 font-mono text-[11px] tracking-wider text-fg-soft">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {capability.flow.map((node, i) => (
                  <span key={node} className="flex items-center gap-2">
                    <span className="mono-label text-[10px] accent">{node}</span>
                    {i < capability.flow.length - 1 && (
                      <span className="h-px w-4 bg-accent/40" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-row",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="capabilities" className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44">
      <SectionHeading
        kicker="WHAT I BUILD"
        title={
          <>
            CAPABILITIES
            <span className="text-mute">.</span>
          </>
        }
      />

      <div>
        {CAPABILITIES.map((cap, i) => (
          <div key={cap.index} className="cap-row">
            <CapabilityRow capability={cap} active={active === i} onActive={() => setActive(i)} />
          </div>
        ))}
      </div>

      <Reveal as="p" y={24} className="mt-10 mono-label text-mute">
        SCOPE — FROM UI TO INFRASTRUCTURE, SHIPPED AS ONE SYSTEM
      </Reveal>
    </section>
  );
}