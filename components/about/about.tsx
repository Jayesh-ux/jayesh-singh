"use client";

import { SITE } from "@/lib/data/site";
import { Reveal, SectionHeading } from "@/components/ui/section";
import { MagneticButton } from "@/components/ui/magnetic-button";

const FOCUS = ["software", "ai", "cloud", "automation", "geospatial", "fintech", "recruitment", "logistics"];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44">
      <SectionHeading
        kicker="ABOUT"
        title={
          <>
            THE ENGINEER
            <br />
            <span className="text-fg-soft">BEHIND</span> THE SYSTEMS<span className="text-mute">.</span>
          </>
        }
      />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal y={24}>
          <p className="text-xl font-light leading-relaxed text-fg-soft md:text-2xl">
            <span className="font-display text-fg">Jayesh Singh</span> is a full-stack
            engineer focused on production-grade systems across software, AI, cloud,
            automation, geospatial technology, fintech, recruitment and logistics.
          </p>
          <p className="mt-6 max-w-2xl font-light leading-relaxed text-mute">
            Based in Mumbai, currently building FairPay Solution — a live debt
            advisory platform serving 700+ clients. Previously ran the full stack
            across recruitment and logistics SaaS at Averlon Technologies and
            deployed AI infrastructure with DeepSoch AI. 27+ public repositories —
            everything is shipped, nothing sits in a drafts folder.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {FOCUS.map((f) => (
              <span key={f} className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-soft">
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal y={24} delay={0.1} className="flex flex-col justify-between gap-10">
          <div className="border border-line bg-ink-card/60 p-8">
            <p className="mono-label mb-6 text-mute">IDENTITY</p>
            <dl className="space-y-4">
              {[
                ["LOCATION", SITE.location],
                ["BASE", "MUMBAI · INDIA (UTC+5:30)"],
                ["FOCUS", "SYSTEMS THAT SHIP"],
                ["EDUCATION", "B.E. I.T. — UNIVERSITY OF MUMBAI"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 border-b border-line/60 pb-3 last:border-0">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-mute">{k}</dt>
                  <dd className="font-mono text-[12px] uppercase tracking-wider text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <MagneticButton
            as="a"
            href="#contact"
            className="group flex items-center justify-between border border-accent bg-accent px-7 py-6 font-display text-2xl text-accent-ink transition-transform duration-300"
          >
            BUILD WITH ME
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}