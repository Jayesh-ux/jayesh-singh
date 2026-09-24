"use client";

import { PROCESS } from "@/lib/data/content";
import { Reveal, SectionHeading } from "@/components/ui/section";

export function Process() {
  return (
    <section id="process" className="border-t border-line py-28 md:py-40" aria-label="Engineering process">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHeading
          kicker="HOW I BUILD"
          title={
            <>
              FROM BRIEF
              <br />
              <span className="text-fg-soft">TO</span> PRODUCTION<span className="text-mute">.</span>
            </>
          }
        />
      </div>

      <div className="mx-auto max-w-[1600px] overflow-x-auto px-6 md:px-10">
        <ol className="flex min-w-[1080px] gap-0">
          {PROCESS.map((step, i) => (
            <li
              key={step.index}
              className="group relative flex-1 border-t-2 border-line/60 pt-6 transition-colors duration-300 hover:border-accent"
            >
              <Reveal as="div" y={30} delay={i * 0.05}>
                <span className="mono-label accent">{step.index}</span>
                <p className="mt-3 font-display text-3xl tracking-tight text-fg transition-colors duration-300 group-hover:text-accent">
                  {step.title}
                </p>
                <p className="mt-3 max-w-[220px] font-mono text-[11px] uppercase tracking-wider leading-relaxed text-mute">
                  {step.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}