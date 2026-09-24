"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    document.body.classList.add("custom-cursor");

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    };
    gsap.ticker.add(tick);

    const setState = (label: "default" | "hover" | "view") => {
      const isView = label === "view";
      const isHover = label === "hover";
      cursor.dataset.state = label;
      cursor.style.width = isView ? "92px" : isHover ? "56px" : "40px";
      cursor.style.height = isView ? "92px" : isHover ? "56px" : "40px";
      cursor.style.backgroundColor = isView ? "var(--color-accent)" : "transparent";
      cursor.style.borderColor = isHover ? "var(--color-accent)" : isView ? "var(--color-accent)" : "color-mix(in srgb, var(--color-accent) 55%, transparent)";
    };

    const interactive = "a, button, [role='button'], input, textarea, select";
    const view = "[data-cursor='view']";

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(view)) setState("view");
      else if (t.closest(interactive)) setState("hover");
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(view) || t.closest(interactive)) setState("default");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);

    return () => {
      document.body.classList.remove("custom-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999] hidden lg:block">
      <div
        ref={cursorRef}
        data-state="default"
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 transition-[width,height,background-color,border-color] duration-300 ease-out"
      >
        <span className="cursor-view-label mono-label text-[10px] font-bold text-accent-ink opacity-0 transition-opacity duration-200">
          VIEW
        </span>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-accent" />
    </div>
  );
}