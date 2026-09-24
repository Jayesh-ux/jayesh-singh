"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Fade-up reveal for any element; respects reduced motion. */
export function useReveal<T extends HTMLElement>(opts?: {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: opts?.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: opts?.duration ?? 1.1,
          delay: opts?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: opts?.start ?? "top 85%",
            toggleActions: opts?.once === false ? "play none none reverse" : "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [opts?.y, opts?.duration, opts?.delay, opts?.start, opts?.once]);

  return ref;
}

/** Parallax translate based on scroll progress of the trigger. */
export function useParallax<T extends HTMLElement>(amount = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [amount]);

  return ref;
}

/** Animated number counter. */
export function useCounter<T extends HTMLElement>(to: number, opts?: { duration?: number; decimals?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = opts?.decimals ? to.toFixed(opts.decimals) : String(to);
      return;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration: opts?.duration ?? 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = opts?.decimals
            ? counter.value.toFixed(opts.decimals)
            : Math.round(counter.value).toString();
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, opts?.duration, opts?.decimals]);

  return ref;
}

/**
 * Registration utility for Lenis + ScrollTrigger sync.
 * Returns a cleanup function.
 */
export function syncLenisWithScrollTrigger(lenis: { raf: (t: number) => void } | null) {
  const update = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);
  return () => gsap.ticker.remove(update);
}