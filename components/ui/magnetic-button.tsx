"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { isTouchDevice } from "@/lib/utils";

type MagneticButtonProps = {
  as?: ElementType;
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function MagneticButton({
  as = "button",
  children,
  strength = 0.35,
  className,
  href,
  target,
  rel,
  download,
  type,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduced || isTouchDevice()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 450);
  };

  const props = {
    ref: ref as React.RefObject<HTMLElement>,
    onPointerMove,
    onPointerLeave,
    className: cn("will-change-transform", className),
    ...(href !== undefined && { href }),
    ...(target !== undefined && { target }),
    ...(rel !== undefined && { rel }),
    ...(download !== undefined && { download }),
    ...(type !== undefined && { type }),
    ...(disabled !== undefined && { disabled }),
    ...(onClick !== undefined && { onClick }),
    ...(ariaLabel !== undefined && { "aria-label": ariaLabel }),
  };

  return createElement(as, props, children);
}