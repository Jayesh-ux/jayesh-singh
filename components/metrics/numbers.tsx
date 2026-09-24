"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { METRICS } from "@/lib/data/content";
import { useCounter } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { Reveal } from "@/components/ui/section";

function MetricItem({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useCounter<HTMLSpanElement>(value, { duration: 2 });
  return (
    <div className="group border-b border-line py-10 md:py-14">
      <p className="font-display text-[clamp(3.5rem,9vw,8.5rem)] font-medium leading-none tracking-[-0.03em] text-fg">
        <span className="accent">{prefix}</span>
        <span ref={ref}>0</span>
        <span className="accent">{suffix}</span>
      </p>
      <p className="mt-3 max-w-xs font-mono text-[11px] uppercase tracking-[0.2em] text-mute transition-colors duration-300 group-hover:text-fg-soft">
        {label}
      </p>
    </div>
  );
}

export function Numbers() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ghostRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ghostRef.current,
        { yPercent: -12, opacity: 0.04 },
        {
          yPercent: 12,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ghostRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36" aria-label="Engineering metrics">
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 font-display text-[clamp(12rem,34vw,38rem)] font-semibold leading-none tracking-[-0.06em] text-ghost select-none"
      >
        27+
      </div>
      <div className="relative mx-auto max-w-[1600px]">
        <Reveal as="p" y={18} className="mono-label accent mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-accent/60" />
          VERIFIED OUTPUT
        </Reveal>
        <div className="grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-5">
          {METRICS.map((m) => (
            <MetricItem key={m.label} value={m.value} prefix={m.prefix} suffix={m.suffix} label={m.label} />
          ))}
        </div>
      </div>
    </section>
  );
}