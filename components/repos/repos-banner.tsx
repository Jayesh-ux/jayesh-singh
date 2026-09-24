"use client";

import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { Reveal } from "@/components/ui/section";
import { MagneticButton } from "@/components/ui/magnetic-button";

const REPO_MOTIFS = ["TYPE=SCRIPT", "SHIP=27", "STACK=TSX", "DEPLOY=AUTO", "OPEN=TRUE"];

export function ReposBanner() {
  return (
    <section className="border-t border-line" aria-label="GitHub repositories">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center md:px-10 md:py-28">
        <div>
          <Reveal as="p" y={16} className="mono-label accent mb-4 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            GITHUB // DOCUMENTED SHIPPING
          </Reveal>
          <Reveal as="h2" y={30} className="font-display text-4xl tracking-tight text-fg md:text-6xl">
            27+ PUBLIC
            <br />
            <span className="text-fg-soft">REPOSITORIES</span>
          </Reveal>
        </div>

        <div className="flex flex-col items-start gap-6 md:items-end">
          <div className="flex flex-wrap justify-end gap-2">
            {REPO_MOTIFS.map((m) => (
              <span key={m} className="border border-line px-3 py-1.5 font-mono text-[10px] tracking-widest text-mute">
                {m}
              </span>
            ))}
          </div>
          <MagneticButton
            as="a"
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-line px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            github.com/Jayesh-ux
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}