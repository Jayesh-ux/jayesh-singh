"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, syncLenisWithScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const cleanupTicker = syncLenisWithScrollTrigger(lenis);

    const onClick = (e: Event) => {
      const target = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#top") {
        window.scrollTo({ top: 0 });
        return;
      }
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0 });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cleanupTicker();
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}