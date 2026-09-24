"use client";

import { Reveal, SectionHeading } from "@/components/ui/section";

const TOPICS = [
  { id: "llama-deployment", title: "Deploying Llama 3.3 70B in production", status: "IN PROGRESS", min: "4 min" },
  { id: "postgis-caching", title: "PostGIS caching as a maps-API substitute", status: "DRAFT", min: "6 min" },
  { id: "multi-tenant-architecture", title: "Thoughts on multi-company data isolation", status: "DRAFT", min: "5 min" },
  { id: "on-prem-gpu", title: "On-prem GPU compute economics vs the cloud", status: "IDEA", min: "—" },
];

export function Insights() {
  return (
    <section id="insights" className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44">
      <SectionHeading
        kicker="INSIGHTS"
        title={
          <>
            THINGS I&apos;M
            <br />
            <span className="accent">THINKING ABOUT</span><span className="text-mute">.</span>
          </>
        }
      />

      <Reveal as="p" y={20} className="max-w-xl font-light leading-relaxed text-fg-soft">
        Engineering notes, architecture breakdowns and AI experiments — written
        down as they ship. Essays are in progress; this section will populate over time.
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {TOPICS.map((t, i) => (
          <Reveal as="article" key={t.id} y={30} delay={i * 0.06} className="group border border-line p-7 transition-colors duration-300 hover:border-accent/40">
            <div className="flex items-center justify-between">
              <span className={`mono-label text-[10px] ${t.status === "IN PROGRESS" ? "accent" : "text-mute"}`}>
                {t.status}
              </span>
              <span className="mono-label text-[10px] text-mute">{t.min}</span>
            </div>
            <h3 className="mt-5 font-display text-xl tracking-tight text-fg transition-colors duration-300 group-hover:text-accent md:text-2xl">
              {t.title}
            </h3>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-mute">
              {t.status === "DRAFT" || t.status === "IN PROGRESS" ? "COMING SOON" : "NOTED FOR RESEARCH"}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}