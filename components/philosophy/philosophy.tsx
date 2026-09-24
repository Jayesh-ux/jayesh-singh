"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { Reveal } from "@/components/ui/section";

const LAYERS = [
  { name: "FRONTEND", note: "React · Next.js · TypeScript" },
  { name: "BACKEND", note: "Node.js · Django · Spring Boot" },
  { name: "DATABASE", note: "PostgreSQL · PostGIS · Supabase" },
  { name: "AI", note: "Llama 3.3 · Ollama · n8n" },
  { name: "INFRASTRUCTURE", note: "AWS · 96TB storage · GPU compute" },
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      ref.current?.querySelectorAll<HTMLElement>(".philosophy-row").forEach((r) => {
        r.style.opacity = "1";
      });
      return;
    }
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".philosophy-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );
      if (ghostRef.current) {
        gsap.fromTo(
          ghostRef.current,
          { yPercent: -10, opacity: 0.03 },
          {
            yPercent: 10,
            opacity: 0.06,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-line/50 py-28 md:py-44" aria-label="Engineering philosophy">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.18] mask-fade-b" />
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-24 font-display text-[clamp(14rem,38vw,42rem)] font-semibold leading-none tracking-[-0.06em] text-ghost select-none"
      >
        STACK
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal as="p" y={20} className="mono-label accent mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-accent/60" />
          THE ONION
        </Reveal>

        <Reveal as="h2" y={40} className="text-section max-w-5xl text-fg">
          I DON&apos;T JUST BUILD INTERFACES.
          <br />
          <span className="text-fg-soft">I BUILD THE SYSTEMS</span>
          <br />
          <span className="accent">BEHIND THEM.</span>
        </Reveal>

        <div className="mt-20 grid gap-0 md:mt-28">
          <div className="border-t border-line">
            {LAYERS.map((layer, i) => (
              <div
                key={layer.name}
                className="philosophy-row group flex flex-col gap-2 border-b border-line py-6 opacity-0 md:grid md:grid-cols-[160px_1fr_auto] md:items-center md:gap-8 md:py-7"
              >
                <span className="mono-label text-mute">0{i + 1}</span>
                <div className="flex items-baseline gap-4 md:gap-8">
                  <h3 className="font-display text-3xl tracking-tight text-fg transition-colors duration-300 group-hover:text-accent md:text-5xl">
                    {layer.name}
                  </h3>
                </div>
                <span className="mono-label text-mute md:text-right">{layer.note}</span>
              </div>
            ))}
          </div>

          <Reveal as="p" y={30} className="mt-12 max-w-3xl text-lg font-light leading-relaxed text-fg-soft md:mt-16 md:text-xl">
            Every product ships through the whole stack. I operate across the
            onion — from pixel to packet — so the interface, the API, the data
            and the infrastructure agree with each other.
          </Reveal>
        </div>
      </div>
    </section>
  );
}