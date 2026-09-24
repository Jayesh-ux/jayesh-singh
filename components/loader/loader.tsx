"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/data/site";
import { prefersReducedMotion } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const CIRCLES = ["bg-c-cyan", "bg-c-green", "bg-c-yellow", "bg-c-teal"] as const;

const LOADING_PHASES = [
  "INITIALIZING SYSTEMS",
  "BUILDING INTERFACES",
  "CONNECTING NODES",
  "COMPILING ASSETS",
  "DEPLOYING NOW",
  "SYSTEMS LIVE",
] as const;

const TARGETS = [1, 0, 0]; // "100"

/**
 * AHY-style loader:
 * – 4 coloured circles (pink / lime / yellow / teal) orbit a "JS" monogram
 * – Slot-machine rolling digits (000 → 100)
 * – 4-colour gradient progress bar
 * – Dynamic phase label
 * – Exit: circles collapse → monogram pop → the preloader slides up
 *
 * The orbit + digit reels run as INDEPENDENT infinite tweens (never inside
 * the master timeline, which must be finite so its onComplete fires).
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced || prefersReducedMotion()) {
      setDone(true);
      window.dispatchEvent(new Event("site:ready"));
      return;
    }

    const root = rootRef.current;
    const digits = digitsRef.current;
    const barFill = barFillRef.current;
    const phase = phaseRef.current;
    const monogram = monogramRef.current;
    const circles = circleRefs.current;
    if (!root || !digits || !barFill || !phase || !monogram || circles.length < CIRCLES.length) return;

    /* ── Setup ──────────────────────────────────────────────── */
    gsap.set(monogram, { scale: 0, opacity: 0 });
    gsap.set(circles, { scale: 0, opacity: 0 });
    gsap.set(phase, { opacity: 0 });
    gsap.set(barFill, { scaleX: 0, transformOrigin: "left" });

    const angleStep = (Math.PI * 2) / CIRCLES.length;
    const orbitRadius = typeof window !== "undefined" && window.innerWidth < 640 ? 34 : 50;
    const placeOrbit = (p: number) => {
      circles.forEach((c, i) => {
        const angle = p * Math.PI * 2 + angleStep * i;
        gsap.set(c, { x: Math.cos(angle) * orbitRadius, y: Math.sin(angle) * orbitRadius });
      });
    };

    const digitEls = digits.querySelectorAll<HTMLElement>("[data-digit]");

    /* ── Independent infinite tween: orbiting circles ───────── */
    const orbit = gsap.to(circles, {
      duration: 1.6,
      ease: "none",
      repeat: -1,
      paused: true,
      onUpdate: function () {
        placeOrbit(this.progress());
      },
    });

    /* ── Independent infinite tweens: rolling digits ────────── */
    const reels: gsap.core.Tween[] = [];
    const stoppers: gsap.core.Tween[] = [];
    digitEls.forEach((el, col) => {
      const target = TARGETS[col];
      const delay = 0.35 + col * 0.35;
      const reel = gsap.to(el, {
        y: -36,
        duration: 0.09,
        ease: "none",
        repeat: -1,
        delay,
        onRepeat: () => {
          const current = parseInt(el.textContent || "0", 10);
          el.textContent = String((current + 1) % 10);
        },
      });
      reels.push(reel);
      stoppers.push(
        gsap.delayedCall(delay + 1.5, () => {
          reel.kill();
          el.textContent = String(target);
          gsap.to(el, { y: 0, duration: 0.08, ease: "power2.out" });
        })
      );
    });

    /* ── Finite master timeline (this one completes) ────────── */
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // phase 1: circles bloom + monogram + start orbit
    circles.forEach((c, i) => {
      tl.to(c, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, 0.05 * i);
    });
    tl.to(monogram, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, 0.25)
      .add(() => orbit.play(), 0.4);

    // phase 2: gradient bar
    tl.to(barFill, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 0.3);

    // phase 3: dynamic labels
    LOADING_PHASES.forEach((text, i) => {
      const start = 0.3 + 1 * (i / (LOADING_PHASES.length - 1));
      tl.to(phase, { opacity: 0, duration: 0.12, onComplete: () => { phase.textContent = text; } }, start);
      tl.to(phase, { opacity: 1, duration: 0.12 }, start + 0.12);
    });

    // phase 4: circles collapse + monogram pop
    const collapseStart = 1.45;
    tl.add(() => orbit.kill(), collapseStart - 0.02);
    circles.forEach((c, i) => {
      tl.to(c, {
        x: Math.cos(angleStep * i) * 12,
        y: Math.sin(angleStep * i) * 12,
        scale: 0.4,
        duration: 0.3,
        ease: "power3.in",
        overwrite: true,
      }, collapseStart);
    });
    tl.to(circles, { opacity: 0, duration: 0.2 }, collapseStart + 0.2);
    tl.to(monogram, { scale: 1.18, duration: 0.22, ease: "power2.in" }, collapseStart)
      .to(monogram, { scale: 1, duration: 0.2, ease: "back.out(1.5)" }, collapseStart + 0.24);

    // phase 5: slide the whole preloader up
    tl.to(barFill, { opacity: 0, duration: 0.15 }, collapseStart + 0.35);
    tl.to((phase.parentElement as HTMLElement | null) ?? phase, { opacity: 0, duration: 0.15 }, collapseStart + 0.35);

    tl.to(root, {
      yPercent: -100,
      duration: 0.7,
      ease: "expo.inOut",
      onStart: () => window.dispatchEvent(new Event("site:ready")),
      onComplete: () => {
        window.dispatchEvent(new Event("site:revealed"));
        setDone(true);
      },
    });

    return () => {
      tl.kill();
      orbit.kill();
      reels.forEach((r) => r.kill());
      stoppers.forEach((s) => s.kill());
    };
  }, [reduced]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      {/* faint grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.2] mask-fade-b" />

      <div className="relative flex flex-col items-center gap-8">
        {/* ── Monogram + orbiting circles ──── */}
        <div className="relative h-32 w-32 sm:h-36 sm:w-36">
          {CIRCLES.map((bg, i) => (
            <div
              key={bg}
              ref={(el) => { if (el) circleRefs.current[i] = el; }}
              className={`absolute left-1/2 top-1/2 h-5 w-5 -ml-2.5 -mt-2.5 rounded-full ${bg} shadow-lg`}
            />
          ))}
          <div ref={monogramRef} className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-bold tracking-tighter text-fg">
              JS
            </span>
          </div>
        </div>

        {/* ── Slot-machine digits ──────── */}
        <div ref={digitsRef} className="flex items-baseline overflow-hidden">
          {[0, 0, 0].map((d, i) => (
            <span
              key={i}
              data-digit={i}
              className="inline-block font-display text-[clamp(3rem,10vw,8rem)] leading-none font-medium tracking-tighter text-fg"
            >
              {d}
            </span>
          ))}
          <span className="ml-1 font-display text-[clamp(1.2rem,3vw,2rem)] text-mute">%</span>
        </div>

        {/* ── Phase label ──────────── */}
        <span ref={phaseRef} className="mono-label text-fg-soft tracking-[0.25em]">
          {LOADING_PHASES[0]}
        </span>

        {/* ── 4-colour gradient bar ── */}
        <div className="h-[3px] w-48 overflow-hidden rounded-full bg-line sm:w-64">
          <div ref={barFillRef} className="h-full w-full origin-left ahy-gradient rounded-full" />
        </div>

        {/* ── Bottom text ─────── */}
        <div className="mt-2 flex items-center gap-3 text-[10px] mono-label text-mute tracking-[0.2em]">
          <span>JAYESH SINGH</span>
          <span>·</span>
          <span>{SITE.version}</span>
        </div>
      </div>
    </div>
  );
}