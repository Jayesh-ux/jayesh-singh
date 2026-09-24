"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { Reveal, SectionHeading } from "@/components/ui/section";
import { MagneticButton } from "@/components/ui/magnetic-button";

type Status = "idle" | "loading" | "success" | "error";

// Web3Forms — free email relay for static hosting (GitHub Pages has no API
// route). Submissions are delivered to the inbox tied to the access key.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "5e763c7a-88c4-4961-92a1-97ff59facd4b";

const inputCls =
  "w-full border border-line bg-ink-card/60 px-4 py-3.5 font-mono text-sm text-fg placeholder:text-mute/70 outline-none transition-colors duration-300 focus:border-accent/70";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
    website: "",
  });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setError("Name, email and message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const payload = new FormData();
      payload.append("access_key", ACCESS_KEY);
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      if (form.company) payload.append("company", form.company);
      if (form.projectType) payload.append("project_type", form.projectType);
      if (form.website) payload.append("website", form.website); // honeypot
      payload.append("subject", `[jayesh-singh] ${form.projectType || "Project"} — ${form.name}`);
      payload.append("from_name", form.name);
      payload.append("replyto", form.email);

      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: payload });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", projectType: "", message: "", website: "" });
      } else {
        setStatus("error");
        setError("The message could not be delivered. Please email me directly.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email me directly at " + SITE.email);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line scroll-mt-24 py-28 md:py-44">
      <div className="pointer-events-none absolute -right-32 top-20 h-[480px] w-[480px] rounded-full bg-accent/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHeading
          kicker="CONTACT"
          title={
            <>
              HAVE A SYSTEM
              <br />
              <span className="accent">WORTH BUILDING</span>?<span className="text-mute">.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <Reveal as="p" y={20} className="max-w-md text-lg font-light leading-relaxed text-fg-soft">
              Available for engineering opportunities, product development and
              technical collaborations. If it involves architecture, AI,
              automation or infrastructure — it is on the table.
            </Reveal>

            <Reveal y={20} delay={0.08} className="mt-10 space-y-3">
              <a href={`mailto:${SITE.email}`} className="group flex items-center justify-between border-b border-line py-4 transition-colors hover:border-accent">
                <span className="flex items-center gap-3 font-mono text-sm tracking-wider text-fg-soft">
                  <Mail size={14} className="accent" />
                  {SITE.email}
                </span>
                <ArrowUpRight size={15} className="text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
              <a href={`tel:${SITE.phoneHref}`} className="group flex items-center justify-between border-b border-line py-4 transition-colors hover:border-accent">
                <span className="flex items-center gap-3 font-mono text-sm tracking-wider text-fg-soft">
                  <span className="accent font-display">⌗</span>
                  {SITE.phone}
                </span>
                <ArrowUpRight size={15} className="text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-line py-4 transition-colors hover:border-accent">
                <span className="flex items-center gap-3 font-mono text-sm tracking-wider text-fg-soft">
                  <span className="accent font-display">in</span>
                  {SITE.linkedinLabel}
                </span>
                <ArrowUpRight size={15} className="text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-line py-4 transition-colors hover:border-accent">
                <span className="flex items-center gap-3 font-mono text-sm tracking-wider text-fg-soft">
                  <span className="accent font-display">⌘</span>
                  {SITE.githubLabel}
                </span>
                <ArrowUpRight size={15} className="text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
            </Reveal>
          </div>

          <Reveal y={30} delay={0.1}>
            <form onSubmit={handleSubmit} className="border border-line bg-ink-card/40 p-6 md:p-10" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mono-label mb-2 block text-mute">
                    NAME <span className="accent">*</span>
                  </label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={update("name")} className={inputCls} placeholder="Your name" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="mono-label mb-2 block text-mute">
                    EMAIL <span className="accent">*</span>
                  </label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={update("email")} className={inputCls} placeholder="you@company.com" autoComplete="email" />
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="mono-label mb-2 block text-mute">
                    COMPANY <span className="text-[10px] text-mute/60">(OPTIONAL)</span>
                  </label>
                  <input id="company" name="company" type="text" value={form.company} onChange={update("company")} className={inputCls} placeholder="Acme Inc." autoComplete="organization" />
                </div>
                <div>
                  <label htmlFor="projectType" className="mono-label mb-2 block text-mute">
                    PROJECT TYPE
                  </label>
                  <select id="projectType" name="projectType" value={form.projectType} onChange={update("projectType")} className={inputCls}>
                    <option value="">Select…</option>
                    <option>Full-stack product</option>
                    <option>AI model / automation</option>
                    <option>Infrastructure / cloud</option>
                    <option>Geospatial / logistics</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mono-label mb-2 block text-mute">
                  MESSAGE <span className="accent">*</span>
                </label>
                <textarea id="message" name="message" rows={6} required value={form.message} onChange={update("message")} className={`${inputCls} resize-none`} placeholder="What system are we building?" />
              </div>

              {/* honeypot — hidden from humans */}
              <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
              </div>

              {status === "error" && (
                <p role="alert" className="mt-4 border border-red-500/30 bg-red-500/5 px-4 py-3 font-mono text-[12px] text-red-400">
                  ✕ {error}
                </p>
              )}
              {status === "success" && (
                <p role="status" className="mt-4 flex items-center gap-2 border border-accent/25 bg-accent/5 px-4 py-3 font-mono text-[12px] accent">
                  <Check size={14} /> Transmission received. I&apos;ll reply within 24–48 hours.
                </p>
              )}

              <div className="mt-7">
                <MagneticButton
                  as="button"
                  type="submit"
                  strength={0.25}
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-between bg-accent px-7 py-5 font-display text-lg text-accent-ink transition-opacity disabled:opacity-60 sm:w-auto sm:min-w-[340px]"
                >
                  {status === "loading" ? (
                    <>
                      TRANSMITTING <Loader2 size={18} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      START A CONVERSATION <ArrowUpRight size={18} />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}