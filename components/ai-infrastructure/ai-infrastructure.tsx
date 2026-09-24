"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AI_STACK } from "@/lib/data/content";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { Reveal, SectionHeading } from "@/components/ui/section";

const ACCENT = "#00a0b8";
const MUTE = "#a8a394";
const LINE = "#383830";
const FG = "#f2f2ed";
const NODE = "#ffffff";

function AiArchitecture() {
  const W = 800;
  const H = 420;
  const nodes = ["USER", "API", "ORCHESTRATION", "LLM", "GPU", "STORAGE", "RESPONSE"];
  const gap = W / (nodes.length - 1);
  const y = H / 2;

  const path = nodes.map((_, i) => `${i === 0 ? "M" : "L"} ${i * gap} ${y}`).join(" ");
  const reverse = nodes.map((_, i) => `${i === 0 ? "M" : "L"} ${(nodes.length - 1 - i) * gap} ${y}`).join(" ");

  return (
    <div className="relative overflow-hidden border border-line bg-ink-card/60">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="AI inference architecture" className="relative h-full w-full">
        <text x={18} y={28} fontSize={11} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
          SYS://INFERENCE
        </text>
        <path d={path} fill="none" stroke={LINE} strokeDasharray="4 6" />

        <g className="system-anim">
          <circle r={4.5} fill={ACCENT}>
            <animateMotion dur="4s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r={11} fill={ACCENT} opacity={0.14}>
            <animateMotion dur="4s" repeatCount="indefinite" path={path} />
          </circle>
        </g>
        <g className="system-anim">
          <circle r={4} fill={MUTE}>
            <animateMotion dur="4s" begin="1.3s" repeatCount="indefinite" path={path} />
          </circle>
        </g>
        <g className="system-anim">
          <circle r={4.5} fill={ACCENT}>
            <animateMotion dur="4s" begin="2.2s" repeatCount="indefinite" path={reverse} />
          </circle>
        </g>

        {nodes.map((n, i) => {
          const isLLM = n === "LLM";
          const isGPU = n === "GPU";
          const isStorage = n === "STORAGE";
          const active = isLLM || isGPU || isStorage;
          return (
            <g key={n}>
              {active && (
                <rect x={i * gap - 62} y={y - 40} width={124} height={80} fill="#122b31" stroke={ACCENT} strokeWidth={1} />
              )}
              {!active && (
                <rect x={i * gap - 52} y={y - 30} width={104} height={60} fill={NODE} stroke={LINE} />
              )}
              {isGPU && (
                <circle cx={i * gap} cy={y - 8} r={4} fill={ACCENT} className="system-anim">
                  <animate attributeName="opacity" values="1;0.15;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
              )}
              {isStorage && (
                <circle cx={i * gap} cy={y - 8} r={4} fill={ACCENT} className="system-anim">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              {isLLM && (
                <g className="system-anim">
                  <rect x={i * gap - 60} y={y - 38} width={120} height={76} fill="none" stroke={ACCENT} strokeWidth={1} strokeDasharray="6 5">
                    <animate attributeName="stroke-dashoffset" values="0;-22" dur="1s" repeatCount="indefinite" />
                  </rect>
                </g>
              )}
              <text x={i * gap} y={y + 5} textAnchor="middle" fontSize={isLLM ? 16 : 13} letterSpacing={2} fill={active ? ACCENT : FG} style={{ fontFamily: "var(--font-mono)" }}>
                {n}
              </text>
              {isLLM && (
                <text x={i * gap} y={y + 24} textAnchor="middle" fontSize={10} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
                  {"LLAMA 3.3 70B"}
                </text>
              )}
              {isGPU && (
                <text x={i * gap} y={y + 24} textAnchor="middle" fontSize={10} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
                  {"RTX 3090"}
                </text>
              )}
              {isStorage && (
                <text x={i * gap} y={y + 24} textAnchor="middle" fontSize={10} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
                  {"96TB ARRAY"}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function StorageArray() {
  const W = 800;
  const H = 420;
  const disks = [24, 24, 24, 24];
  return (
    <div className="relative overflow-hidden border border-line bg-ink-card/60">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
      <svg viewBox="0 0 800 420" role="img" aria-label="Ninety six terabyte enterprise storage array" className="relative h-full w-full">
        <text x={18} y={28} fontSize={11} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
          SYS://STORAGE · 96TB
        </text>

        {/* array frame */}
        {disks.map((d, i) => {
          const x = 150;
          const y = 80 + i * 46;
          return (
            <g key={i}>
              <rect x={x + 40} y={y} width={430} height={30} fill="#2e2e2a" stroke={LINE} />
              {/* individual disks */}
              {Array.from({ length: 8 }).map((_, j) => (
                <g key={j}>
                  <rect x={x + 50 + j * 50} y={y + 6} width={38} height={18} fill="#ffffff" stroke={LINE} className="system-anim">
                    <animate attributeName="fill" values="#ffffff;#245a66;#ffffff" dur={`${2 + i * 0.3}s`} begin={`${j * 0.12}s`} repeatCount="indefinite" />
                  </rect>
                  <circle cx={x + 50 + j * 50 + 19} cy={y + 15} r={2} fill={ACCENT} opacity={0.5} />
                </g>
              ))}
              <text x={x + 8} y={y + 20} fontSize={11} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
                {`RAID::${d}TB`}
              </text>
            </g>
          );
        })}

        {/* flowing packet into array */}
        <g className="system-anim">
          <path d="M 640 120 L 640 300" stroke={LINE} strokeDasharray="4 6" fill="none" />
          <circle r={4} fill={ACCENT}>
            <animateMotion dur="3s" repeatCount="indefinite" path="M 640 120 L 640 300" />
          </circle>
        </g>
        <g className="system-anim">
          <path d="M 690 120 L 690 300" stroke={LINE} strokeDasharray="4 6" fill="none" />
          <circle r={4} fill={ACCENT} opacity={0.7}>
            <animateMotion dur="3.6s" begin="0.8s" repeatCount="indefinite" path="M 690 120 L 690 300" />
          </circle>
        </g>
        <text x={640} y={104} fontSize={11} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
          INGEST →
        </text>

        {/* total */}
        <rect x={150} y={310} width={330} height={54} fill="#122b31" stroke={ACCENT} />
        <text x={160} y={343} fontSize={22} letterSpacing={2} fill={ACCENT} style={{ fontFamily: "var(--font-mono)" }}>
          96TB ENTERPRISE ARRAY
        </text>
        <text x={510} y={343} fontSize={11} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
          {"AWS EC2 + on-premise"}
        </text>

        <text x={18} y={H - 16} fontSize={11} fill={MUTE} style={{ fontFamily: "var(--font-mono)" }}>
          CONTRIBUTED TO ENTERPRISE INFRASTRUCTURE DURING DEPLOYMENT WORK
        </text>
      </svg>
    </div>
  );
}

export function AiInfrastructure() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ai-visual",
        { opacity: 0, y: 70, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="ai" className="relative overflow-hidden border-t border-line py-28 md:py-44">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-accent/5 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHeading
          kicker="AI + INFRASTRUCTURE"
          title={
            <>
              WHERE SOFTWARE
              <br />
              <span className="text-fg-soft">MEETS</span> INFRASTRUCTURE<span className="text-mute">.</span>
            </>
          }
        />

        <div className="ai-visual mb-10">
          <AiArchitecture />
        </div>

        <div className="ai-visual mb-14 md:mb-20">
          <StorageArray />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal as="p" y={20} className="mb-6 mono-label text-mute">
              DEPLOYED · FINE-TUNED · OPERATED
            </Reveal>
            <Reveal as="p" y={24} className="max-w-2xl text-lg font-light leading-relaxed text-fg-soft">
              Deployed and fine-tuned Llama 3.3 70B for international clients,
              contributed to a 96TB enterprise storage build, and stood up custom
              RTX 3090 compute nodes running at roughly $60/month for global AI
              inference. n8n automated the Ollama pipelines. Gemma Vision and
              Index TTS2 were fine-tuned in-house. None of it is theoretical —
              it is running infrastructure.
            </Reveal>
          </div>
          <Reveal y={24} className="flex flex-wrap content-start gap-2">
            {AI_STACK.map((s) => (
              <span key={s} className="border border-accent/25 bg-accent/5 px-4 py-2 font-mono text-[12px] tracking-wider text-accent">
                {s}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}