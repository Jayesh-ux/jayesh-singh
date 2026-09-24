"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  speed = 14,
  reveal = true,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  reveal?: boolean;
  eager?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();
  const shouldClip = reveal && !reduced;

  useEffect(() => {
    const el = wrap.current;
    const pic = img.current;
    if (!el || !pic) return;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pic,
        { yPercent: -speed, scale: 1.16 },
        {
          yPercent: speed,
          scale: 1.16,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      if (reveal) {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 6% 18% 6%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, speed, reveal]);

  return (
    <div
      ref={wrap}
      className={cn("relative overflow-hidden surface", className)}
      data-cursor="view"
      style={shouldClip ? { clipPath: "inset(14% 6% 18% 6%)" } : undefined}
    >
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-full w-full object-cover",
          imgClassName
        )}
        style={reduced ? undefined : { willChange: "transform", transform: "scale(1.16)" }}
      />
      <div className="pointer-events-none absolute inset-0 border border-fg/10" aria-hidden="true" />
    </div>
  );
}