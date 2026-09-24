"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/lib/data/content";
import { SITE } from "@/lib/data/site";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_SLUGS = ["fairpay", "averlon", "qyuki"] as const;
const CAROUSEL_INTERVAL = 3000;

function FwItem({
  project,
  role,
  id,
}: {
  project: Project;
  role: "video" | "card1" | "card2";
  id: string;
}) {
  const gallery = project.gallery ?? [];
  const [current, setCurrent] = useState(0);
  const href = project.liveUrl ?? SITE.github;
  const isVideo = role === "video";
  const smallId = isVideo ? "videoSmallContent" : role === "card1" ? "card1SmallContent" : "card2SmallContent";
  const overlayId = isVideo ? "videoOverlay" : role === "card1" ? "card1Overlay" : "card2Overlay";
  const textCls = isVideo ? "video-text" : role === "card1" ? "card1-text" : "card2-text";
  const items = [project.title, project.title, project.title, project.title];
  const counterId = isVideo ? "videoCounter" : role === "card1" ? "card1Counter" : "card2Counter";

  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % gallery.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [gallery.length]);

  return (
    <a
      className={`fw-item ${isVideo ? "item-video" : "item-card"}`}
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.title}
    >
      <div className="fw-carousel">
        {gallery.map((src, i) => (
          <img
            key={src}
            src={src}
            className={`fw-media ${i === current ? "fw-media-active" : ""}`}
            alt={`${project.title} — success story ${i + 1}`}
            loading="eager"
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
          />
        ))}
      </div>
      {gallery.length > 1 && (
        <div className="fw-counter" id={counterId}>
          {String(current + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
        </div>
      )}
      <div className="fw-cardContent" id={smallId}>
        <div className="fw-title card-title">{project.title}</div>
        <div className="opacity-80">{project.category}</div>
      </div>
      <div className="fw-overlay" id={overlayId}>
        <div className="featuredWork-marquee">
          <div className="marquee-inner">
            {items.map((t, i) => (
              <div key={i} className={`marquee-text ${textCls}`}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="fw-schema" />
      </div>
    </a>
  );
}

function SectionHeading() {
  return (
    <div className="featuredWork-title">
      <p className="mono-label accent mb-2 flex items-center gap-3">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        SELECTED SYSTEMS
      </p>
      <h2 className="font-display text-3xl font-medium tracking-tight text-fg md:text-5xl">
        WORK THAT SHIPS<span className="accent">.</span>
      </h2>
    </div>
  );
}

function ReducedCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0c0e]">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${title} — success story ${i + 1}`}
          className={`absolute inset-0 m-auto block h-full w-full object-contain transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.55))" }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2.5 py-1 font-mono text-[0.65rem] tracking-widest text-white/70 backdrop-blur-sm">
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) return;

    const ctx = gsap.context(() => {
      // split marquee text into characters
      section.querySelectorAll<HTMLElement>(".marquee-text").forEach((node) => {
        const text = node.textContent ?? "";
        node.innerHTML = text
          .split("")
          .map((letter) => `<span class="fw-char">${letter === " " ? "&nbsp;" : letter}</span>`)
          .join("");
      });

      // infinite marquee scroll
      gsap.to(section.querySelectorAll(".marquee-inner"), {
        x: "-25%",
        duration: 5,
        repeat: -1,
        ease: "none",
      });

      gsap.matchMedia().add(
        { isDesktop: "(min-width: 769px)", isMobile: "(max-width: 768px)" },
        (ctx) => {
          const { isDesktop, isMobile } = ctx.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };
          if (!isDesktop && !isMobile) return;
          const layout = isDesktop
            ? {
                MAIN: { left: "0%", top: "0%", width: "65%", height: "100%" },
                SIDE_TOP: { left: "70%", top: "0%", width: "30%", height: "48%" },
                SIDE_BOT: { left: "70%", top: "52%", width: "30%", height: "48%" },
              }
            : {
                MAIN: { left: "0%", top: "0%", width: "100%", height: "60%" },
                SIDE_TOP: { left: "0%", top: "62%", width: "49%", height: "38%" },
                SIDE_BOT: { left: "51%", top: "62%", width: "49%", height: "38%" },
              };

          const $ = (id: string) => document.getElementById(id);
          const video = $("fwVideo");
          const videoSmall = $("videoSmallContent");
          const videoOverlay = $("videoOverlay");
          const card1 = $("fwCard1");
          const c1Small = $("card1SmallContent");
          const c1Overlay = $("card1Overlay");
          const card2 = $("fwCard2");
          const c2Small = $("card2SmallContent");
          const c2Overlay = $("card2Overlay");
          if (!video || !card1 || !card2 || !videoOverlay) return;

          const videoChars = video.querySelectorAll(".video-text .fw-char");
          const card1Chars = card1.querySelectorAll(".card1-text .fw-char");
          const card2Chars = card2.querySelectorAll(".card2-text .fw-char");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top-=75",
                end: "bottom bottom",
                scrub: 0.4,
                pin: ".featuredWork-container",
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(video, { width: "100%", height: "100%", left: "0%", top: "0%", duration: 0.4, ease: "power2.inOut" })
            .to(videoSmall, { opacity: 0, duration: 0.15 }, "<")
            .to(videoOverlay, { opacity: 1, duration: 0.15 }, "<0.25")
            .to(videoChars, { y: "0%", opacity: 1, duration: 0.4, stagger: 0.02, ease: "power3.out" }, "<0.1")
            .to(video, { ...layout.MAIN, borderRadius: "24px", duration: 0.6, ease: "power2.inOut" }, "+=0.15")
            .set(card1, { ...layout.SIDE_TOP })
            .set(card2, { ...layout.SIDE_BOT })
            .to([card1, card2], { opacity: 1, duration: 0.4, stagger: 0.08 }, "<0.2")

            // Swap 1 — card1 becomes MAIN
            .addLabel("swap1")
            .to(card1, { ...layout.MAIN, zIndex: 20, duration: 0.7, ease: "power2.inOut" }, "+=0.15")
            .to(video, { ...layout.SIDE_TOP, zIndex: 5, duration: 0.7, ease: "power2.inOut" }, "<")
            .to(card2, { ...layout.SIDE_BOT, zIndex: 6, duration: 0.7, ease: "power2.inOut" }, "<")
            .to(videoOverlay, { opacity: 0, duration: 0.2 }, "swap1+=0.35")
            .to(videoSmall, { opacity: 1, duration: 0.2 }, "swap1+=0.35")
            .to(c1Small, { opacity: 0, duration: 0.15 }, "swap1")
            .to(c1Overlay, { opacity: 1, duration: 0.2 }, "swap1+=0.35")
            .to(card1Chars, { y: "0%", opacity: 1, duration: 0.4, stagger: 0.02, ease: "power3.out" }, "swap1+=0.45")

            // Swap 2 — card2 becomes MAIN
            .addLabel("swap2")
            .to(card2, { ...layout.MAIN, zIndex: 30, duration: 0.7, ease: "power2.inOut" }, "+=0.15")
            .to(video, { ...layout.SIDE_BOT, zIndex: 5, duration: 0.7, ease: "power2.inOut" }, "<")
            .to(card1, { ...layout.SIDE_TOP, zIndex: 6, duration: 0.7, ease: "power2.inOut" }, "<")
            .to(c1Overlay, { opacity: 0, duration: 0.2 }, "swap2")
            .to(c1Small, { opacity: 1, duration: 0.2 }, "swap2+=0.35")
            .to(c2Small, { opacity: 0, duration: 0.15 }, "swap2")
            .to(c2Overlay, { opacity: 1, duration: 0.2 }, "swap2+=0.35")
            .to(card2Chars, { y: "0%", opacity: 1, duration: 0.4, stagger: 0.02, ease: "power3.out" }, "swap2+=0.45");
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section ref={sectionRef} id="work" className="mx-auto max-w-[1600px] px-6 py-28 md:px-10">
        <SectionHeading />
        <div className="mt-10 flex flex-col gap-10">
          {FEATURED_SLUGS.map((slug) => {
            const project = PROJECTS.find((p) => p.slug === slug);
            if (!project) return null;
            const images = project.gallery ?? [];
            const href = project.liveUrl ?? SITE.github;
            return (
              <a
                key={slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl surface"
              >
                <ReducedCarousel images={images} title={project.title} />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 p-6">
                  <p className="fw-title text-lg">{project.title}</p>
                  <p className="mt-1 text-sm opacity-75">{project.category}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="work" className="featuredWork-section" aria-label="Selected systems">
      <div className="featuredWork-container">
        <SectionHeading />
        <div className="featuredWork-mainWrapper">
          {PROJECTS.filter((p) => p.slug === "fairpay").map((p) => (
            <FwItem key={p.slug} project={p} role="video" id="fwVideo" />
          ))}
          {PROJECTS.filter((p) => p.slug === "averlon").map((p) => (
            <FwItem key={p.slug} project={p} role="card1" id="fwCard1" />
          ))}
          {PROJECTS.filter((p) => p.slug === "qyuki").map((p) => (
            <FwItem key={p.slug} project={p} role="card2" id="fwCard2" />
          ))}
        </div>
      </div>
    </section>
  );
}