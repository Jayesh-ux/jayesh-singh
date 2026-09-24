"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

const SystemCanvas = dynamic(
  () => import("@/components/three/system-canvas"),
  { ssr: false, loading: () => null }
);

function Word({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-top ${className}`}>
      <span className="hero-word inline-block will-change-transform">{children}</span>
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ready = () => {
      setShowCanvas(true);
    };
    window.addEventListener("site:ready", ready);
    return () => window.removeEventListener("site:ready", ready);
  }, []);

  useEffect(() => {
    if (reduced) {
      if (canvasWrapRef.current) canvasWrapRef.current.style.opacity = "1";
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = "1";
      if (descRef.current) descRef.current.style.opacity = "1";
      if (ctaRef.current) ctaRef.current.style.opacity = "1";
      return;
    }

    const words = contentRef.current?.querySelectorAll<HTMLElement>(".hero-word");
    if (!words?.length) return;

    // Hidden by default — loader covers the screen until the reveal begins.
    gsap.set(words, { yPercent: 110 });

    let fired = false;
    const onReady = () => {
      if (fired) return;
      fired = true;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.02)
        .to(words, { yPercent: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" }, 0.12)
        .to(descRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.55)
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.62)
        .fromTo(canvasWrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.4);
      window.removeEventListener("site:ready", onReady);
    };

    // Safety: never leave the hero blank.
    const safety = window.setTimeout(onReady, 1200);

    window.addEventListener("site:ready", onReady);
    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("site:ready", onReady);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(canvasWrapRef.current, {
        scale: 1.18,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D system */}
      <div
        ref={canvasWrapRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        aria-hidden="true"
      >
        {showCanvas ? (
          <div className="absolute inset-0 scale-[1.15]">
            <SystemCanvas />
          </div>
        ) : (
          <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" />
        )}
      </div>

      {/* Soft baseline light */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-accent/5 to-transparent" />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-10 pt-32 md:px-10 md:pb-14">
        <p
          ref={eyebrowRef}
          className="mono-label accent mb-6 flex translate-y-4 items-center gap-3 opacity-0"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          FULL STACK ENGINEER / AI SYSTEMS BUILDER
        </p>

        <h1 className="text-hero font-display text-fg">
          <span className="block">
            <Word>ENGINEERING</Word>
          </span>
          <span className="block">
            <Word>SYSTEMS</Word>
            <Word className="text-ghost"> THAT</Word>
          </span>
          <span className="block">
            <Word className="brush-accent">SHIP.</Word>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            ref={descRef}
            className="max-w-md translate-y-4 font-light leading-relaxed text-fg-soft opacity-0"
          >
            Full-stack engineering, AI systems, automation and infrastructure —
            built from architecture to production. 700+ clients served on a
            live debt advisory platform. Llama 3.3 70B deployed. 96TB storage
            stood up. Systems that actually ship.
          </p>

          <div ref={ctaRef} className="flex translate-y-4 flex-col items-start gap-4 opacity-0 sm:flex-row sm:items-center">
            <MagneticButton
              as="a"
              href="#work"
              className="group flex items-center justify-between gap-10 border border-accent bg-accent px-7 py-4 text-sm font-medium text-accent-ink transition-colors"
            >
              VIEW SELECTED WORK
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="group flex items-center gap-3 border border-fg/20 px-7 py-4 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              LET&apos;S TALK
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex items-center justify-between border-t border-line/70 pt-4">
          <span className="mono-label text-mute">SCROLL TO ENTER SYSTEM</span>
          <span className="mono-label flex items-center gap-2 text-mute">
            <span className="inline-block h-px w-16 overflow-hidden bg-line">
              <span className="block h-px w-8 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-accent" />
            </span>
            0.0 — 100.0
          </span>
        </div>
      </div>

      {/* Vertical side rail */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] tracking-[0.3em] text-mute [writing-mode:vertical-rl] lg:block">
        KALYAN (W) · MUMBAI — INDIA
      </div>
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.3em] text-mute [writing-mode:vertical-rl] lg:block">
        EST. 2024 — SYSTEMS IN PRODUCTION
      </div>

      <style jsx>{`
        @keyframes scrollcue {
          0% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(240%); }
        }
      `}</style>
    </section>
  );
}