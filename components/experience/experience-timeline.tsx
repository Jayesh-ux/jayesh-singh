"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EXPERIENCE } from "@/lib/data/content";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { Reveal, SectionHeading } from "@/components/ui/section";

export function ExperienceTimeline() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 60%", scrub: 0.6 },
        }
      );
      gsap.utils.toArray<HTMLElement>(".exp-node").forEach((node, i) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, scale: 0.5 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: node, start: "top 75%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 78%", once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="experience" className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44">
      <SectionHeading
        kicker="EXPERIENCE"
        title={
          <>
            WHERE I&apos;VE
            <br />
            <span className="text-fg-soft">BEEN</span> SYSTEMS<span className="text-mute">.</span>
          </>
        }
      />

      <div className="relative ml-3 border-l border-line pl-8 md:ml-6 md:pl-14">
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
          aria-hidden="true"
        />

        <ol className="flex flex-col gap-16 md:gap-24">
          {EXPERIENCE.map((exp) => (
            <li key={exp.company} className="relative">
              <span className="exp-node absolute -left-[41px] top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-ink md:-left-[61px]" />
              <div className="exp-card">
                <Reveal as="p" y={12} className="mono-label accent mb-3">
                  {exp.period}
                </Reveal>
                <h3 className="font-display text-2xl tracking-tight text-fg md:text-4xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.18em] text-fg-soft">
                  {exp.company}
                </p>
                <p className="mt-4 max-w-2xl font-light leading-relaxed text-fg-soft">{exp.summary}</p>
                <ul className="mt-5 grid max-w-3xl gap-x-8 gap-y-2 sm:grid-cols-2">
                  {exp.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-wider text-mute">
                      <span className="accent mt-[2px]">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}