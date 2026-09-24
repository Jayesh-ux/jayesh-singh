"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  "FULL-STACK ENGINEERING",
  "AI SYSTEMS",
  "AUTOMATION",
  "INFRASTRUCTURE",
  "PRODUCT SHIPPING",
  "SYSTEM DESIGN",
];

/**
 * Ahy-style marquee reveal: a dark band with oversized white display text
 * clipped to zero width, then revealed with a scrub as it scrolls into view.
 * The two rows counter-scroll to opposite directions.
 */
export function Marquee({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 95%",
            end: "top 45%",
            scrub: true,
          },
        }
      );

      rowRefs.current.forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: i === 0 ? 0 : -25 },
          {
            xPercent: i === 0 ? -50 : 25,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const row = (items: string[], ariaHidden: boolean) => (
    <span className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item) => (
        <span key={`${item}-${ariaHidden}`} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-5xl font-bold uppercase tracking-tight text-c-black md:px-12 md:text-7xl">
            {item}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="shrink-0 text-c-black"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 0l2.3 7.7L20 10l-7.7 2.3L10 20l-2.3-7.7L0 10l7.7-2.3z" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={rootRef}
      className={cn("ahy-gradient relative overflow-hidden py-8 md:py-12", className)}
      role="presentation"
    >
      <div
        ref={(el) => { if (el) rowRefs.current[0] = el; }}
        className="flex w-max items-center"
      >
        {row(ITEMS, false)}
        {row(ITEMS, true)}
      </div>
      <div
        ref={(el) => { if (el) rowRefs.current[1] = el; }}
        className="flex w-max items-center"
      >
        {row(ITEMS, true)}
        {row(ITEMS, false)}
      </div>
    </div>
  );
}