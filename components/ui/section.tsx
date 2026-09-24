"use client";

import { createElement, type ElementType, type ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { useReveal } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  y = 40,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useReveal<HTMLElement>({ y, delay });
  return createElement(
    as,
    { ref: ref as React.RefObject<HTMLElement>, className: cn("will-change-transform", className) },
    children
  );
}

export function SectionHeading({
  kicker,
  title,
  className,
}: {
  kicker: string;
  title: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reduced || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 40 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      <Reveal as="p" y={20} className="mono-label accent mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-accent/60" />
        {kicker}
      </Reveal>
      <h2
        ref={titleRef}
        className="text-section text-fg will-change-transform"
        style={reduced ? undefined : { clipPath: "inset(0 0 100% 0)" }}
      >
        {title}
      </h2>
    </div>
  );
}