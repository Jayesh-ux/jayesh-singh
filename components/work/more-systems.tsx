"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, SECONDARY_PROJECTS } from "@/lib/data/content";
import { SITE } from "@/lib/data/site";
import { Reveal, SectionHeading } from "@/components/ui/section";
import { ParallaxImage } from "@/components/ui/parallax-image";

const IMAGES: Record<string, string> = {
  geotrack: "/images/geotrack.svg",
  "hire2onboard": "/images/hire2onboard.svg",
  "career-grid": "/images/career-grid.svg",
  trustlayer: "/images/trustlayer.svg",
  "recruitment-suite": "/images/suite.svg",
};

const MORE_SLUGS = ["geotrack", "hire2onboard", "career-grid", "trustlayer", "recruitment-suite"];
const CAROUSEL_INTERVAL = 3000;

function GalleryCarousel({ images, title, eager }: { images: string[]; title: string; eager?: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0c0e]">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${title} — success story ${i + 1}`}
          loading={eager && i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 m-auto h-full w-full object-contain transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.55))" }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 font-mono text-[0.65rem] tracking-widest text-white/80 backdrop-blur-sm">
          {images.map((_, i) => (
            <span key={i} className={`h-1 w-1 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-white/30"}`} />
          ))}
          <span className="ml-1 text-white/70">
            {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}

export function MoreSystems() {
  const more = MORE_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);

  return (
    <section id="work-more" className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-36" aria-label="Further systems">
      <SectionHeading
        kicker="FURTHER SYSTEMS"
        title={
          <>
            DEEPER IN
            <br />
            THE SYSTEM<span className="text-mute">.</span>
          </>
        }
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {more.map((project, i) => {
          const img = IMAGES[project.slug];
          return (
            <Reveal key={project.slug} y={40} delay={(i % 3) * 0.06} className="group flex flex-col overflow-hidden rounded-2xl surface">
              <div
                className={`relative w-full overflow-hidden ${
                  project.gallery && project.gallery.length > 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                {project.gallery && project.gallery.length > 0 ? (
                  <GalleryCarousel images={project.gallery} title={project.title} eager={i < 3} />
                ) : img ? (
                  <ParallaxImage
                    src={img}
                    alt={`${project.title} system visual`}
                    className="h-full w-full"
                    imgClassName="object-cover"
                    reveal={false}
                    speed={8}
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="mono-label absolute left-4 top-4 text-xs text-white/90">
                  {project.index} — {project.category}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="font-display text-2xl tracking-tight text-fg md:text-3xl">{project.title}</h3>
                <p className="mt-3 flex-1 font-light leading-relaxed text-fg-soft">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-wider text-fg-soft">
                      {t}
                    </span>
                  ))}
                </div>
                {project.metrics &&
                  project.metrics.map((m) => (
                    <p key={m} className="mono-label accent mt-5">
                      ◈ {m}
                    </p>
                  ))}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent"
                  >
                    VISIT LIVE SYSTEM
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}

        {/* secondary systems card */}
        <Reveal y={40} delay={0.18} className="flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-line p-6 md:p-7">
          <div>
            <p className="mono-label mb-4 text-mute">FURTHER WORK</p>
            <ul className="flex flex-col gap-3">
              {SECONDARY_PROJECTS.map((p) => (
                <li key={p} className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-soft">
                  <span className="accent mt-[2px]">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-8 inline-flex items-center gap-3 border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            EXPLORE ALL 27+ REPOSITORIES
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}