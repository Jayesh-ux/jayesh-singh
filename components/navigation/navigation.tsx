"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduced) {
      if (revealRef.current) revealRef.current.style.opacity = "1";
      return;
    }
    const onReady = () => {
      if (!revealRef.current) return;
      gsap.fromTo(revealRef.current, { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" });
    };
    window.addEventListener("site:ready", onReady);
    return () => window.removeEventListener("site:ready", onReady);
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        ref={barRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled ? "glass border-b border-line/70" : "border-b border-transparent"
        }`}
      >
        <div
          ref={revealRef}
          className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 opacity-0 md:px-10 md:py-5"
        >
          <a href="#top" className="group flex items-center gap-3" aria-label="Jayesh Singh — home">
            <span className="flex h-8 w-8 items-center justify-center border border-line bg-ink-card font-mono text-[11px] accent">
              JS
            </span>
            <span className="font-display text-sm tracking-[0.08em] text-fg">JAYESH SINGH</span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-fg-soft transition-colors duration-300 hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton
              as="a"
              href="#contact"
              className="hidden items-center gap-2 border border-accent/40 px-5 py-2.5 text-xs font-medium tracking-wide text-fg transition-colors duration-300 hover:bg-accent hover:text-accent-ink lg:flex"
            >
              LET&apos;S TALK
              <ArrowUpRight size={14} />
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border border-line text-fg lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-30 mask-fade-b" />
        <nav className="relative flex flex-col gap-2" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="border-b border-line py-4 font-display text-3xl tracking-tight text-fg transition-colors hover:text-accent"
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              <span className="mr-3 font-mono text-xs text-mute">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="mt-6 flex items-center justify-between border border-accent/40 bg-accent/5 px-5 py-4 font-display text-2xl accent"
          >
            LET&apos;S TALK
            <ArrowUpRight />
          </a>
        </nav>
        <div className="relative flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
          <span>{SITE.location}</span>
          <a href={`mailto:${SITE.email}`} className="hover:text-accent">
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  );
}