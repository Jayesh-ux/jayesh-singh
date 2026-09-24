"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/data/site";
import { Reveal } from "@/components/ui/section";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "GitHub", href: SITE.github, external: true },
  { label: "LinkedIn", href: SITE.linkedin, external: true },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ghostRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ghostRef.current,
        { yPercent: -8, opacity: 0.04 },
        {
          yPercent: 8,
          opacity: 0.07,
          ease: "none",
          scrollTrigger: { trigger: ghostRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.15] mask-fade-b" />
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-10 font-display text-[clamp(10rem,30vw,34rem)] font-semibold leading-none tracking-[-0.06em] text-ghost select-none"
      >
        SHIPPING
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 pb-10 pt-28 md:px-10 md:pt-40">
        {/* Final CTA */}
        <Reveal as="p" y={18} className="mono-label accent mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-accent/60" />
          FINAL CALL
        </Reveal>
        <Reveal as="h2" y={40} className="text-section text-fg">
          LET&apos;S BUILD
          <br />
          <span className="brush-accent">WHAT&apos;S NEXT.</span>
        </Reveal>
        <Reveal y={20} delay={0.1} className="mt-6 max-w-md font-light leading-relaxed text-fg-soft">
          Available for engineering opportunities, product development and
          technical collaborations.
        </Reveal>
        <Reveal y={20} delay={0.15} className="mt-10">
          <MagneticButton
            as="a"
            href="#contact"
            className="group flex w-fit items-center gap-4 border border-accent bg-accent px-9 py-5 font-display text-xl text-accent-ink"
          >
            LET&apos;S TALK
            <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </Reveal>

        {/* Footer body */}
        <div className="mt-24 border-t border-line pt-10 md:mt-32">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <a href="#top" className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center border border-line bg-ink-card font-mono text-[11px] accent">JS</span>
                <span className="brand-block font-display text-lg tracking-[0.1em] text-fg">JAYESH SINGH</span>
              </a>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
                Full Stack Engineer
                <br />
                AI Systems / Product Engineering
              </p>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-soft transition-colors duration-300 hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-line/70 pt-6 md:flex-row md:items-center md:justify-between">
            <span className="mono-label text-mute">
              © {new Date().getFullYear()} JAYESH SINGH — SYSTEMS IN PRODUCTION
            </span>
            <a href={`mailto:${SITE.email}`} className="mono-label text-mute transition-colors hover:text-accent">
              {SITE.email}
            </a>
            <span className="mono-label text-mute">
              KALYAN (W) · MUMBAI · INDIA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}