# Jayesh Singh — Full Stack Engineer & AI Systems Builder

**"VISIBLE SYSTEMS."** A premium, single-page engineering website for Jayesh Singh that
treats the visitor like they are entering a living technical system — an **editorial
light theme** with scrubbed parallax imagery, a **pinned horizontal case-study tour**,
animated system diagrams, an interactive 3D System Core, cinematic loader, smooth
scroll choreography and a teal-accented-on-black art direction.

Built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP +
ScrollTrigger, Lenis, and React Three Fiber.

---

## Stack

| Concern        | Choice                                                        |
| -------------- | ------------------------------------------------------------- |
| Framework      | Next.js 15 (App Router, Server Components)                    |
| UI             | React 19 + TypeScript + Tailwind CSS v4                       |
| Motion         | GSAP, GSAP ScrollTrigger, Lenis (smooth scroll)               |
| 3D             | Three.js, React Three Fiber (lazy-loaded, DPR-capped)         |
| Icons          | lucide-react                                                  |
| Images         | Local sample SVGs in `public/images/` (swap with real photos) |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (labels) |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start          # http://localhost:3000
```

Helpers:

```bash
npm run typecheck  # tsc --noEmit (strict)
npm run lint       # next lint
```

---

## Environment variables

Copy `.env.example` → `.env.local` and fill in what you need.

| Variable                 | Purpose                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | Canonical URL used for SEO, `sitemap.xml` and `robots.txt` (default: local) |
| `CONTACT_EMAIL_FROM`     | Sender address used by the contact API                                      |
| `CONTACT_EMAIL_TO`       | Recipient for contact-form submissions (default: hsinghjayesh@gmail.com)    |
| `RESEND_API_KEY`         | When set, the `/api/contact` route delivers email via Resend                |

**Contact form behavior without a backend:** the site is honest — a submission
returns `configured: false` and the UI reports that the message was *not sent*,
directing the visitor to email/linkedin instead. No fake success states.

---

## Structure

```
app/
  layout.tsx            Fonts, metadata, JSON-LD, loader/cursor/nav mounts
  page.tsx              Single-page experience (section composition)
  globals.css           Tailwind v4 + "VISIBLE SYSTEMS" design tokens
  robots.ts  sitemap.ts  not-found.tsx
  api/contact/route.ts  Honest contact endpoint (Resend adapter + honeypot/validation)
components/
  loader/               Cinematic loader → hero transition
  navigation/           Sticky glass nav + mobile menu
  hero/                 Split-text reveal + lazy 3D System Core
  three/                React Three Fiber "System Core" (orbital layers + packets)
  philosophy/           Stack (frontend → infrastructure) reveal
  capabilities/         Editorial capability list with hover/tap expansion
  projects/             Selected Systems: case studies + animated SVG diagrams
  ai-infrastructure/    Inference pipeline + 96TB storage array visuals
  metrics/              Animated verified counters
  technology/           Interactive technology ecosystem graph
  experience/           Scroll-driven timeline
  process/              "How I build" progression
  repos/                GitHub banner (27+ public repositories)
  about/  insights/  contact/  footer/
lib/
  data/site.ts          Verified contact/profile constants
  data/content.ts       Structured data model (projects, capabilities, metrics)
  animations/gsap.ts    Reusable GSAP/ScrollTrigger helpers + hooks
  hooks/                use-lenis, use-reduced-motion, use-media-query, use-counter
  utils.ts              cn(), touch/reduced-motion detection
```

Content lives in `lib/data/content.ts` as structured objects — add a project by
extending `PROJECTS` and dropping a visual type into `ProjectVisual`.

---

## Experience / motion summary

- **Editorial light theme** — warm paper `#f3f0e8`, ink `#17160f`, electric blue
  `#3454ff`. The whole palette lives in `@theme` tokens in `app/globals.css`.
- **Loader** — JAYESH SINGH / `INITIALIZING SYSTEM` with a 000→100 counter and
  progress line that *becomes* the hero reveal (no hard cut).
- **Hero** — word-by-word rise, eyebrow → lines → description → CTAs → 3D core activates.
- **Marquee strip** — continuous `FULL-STACK ENGINEERING ◆ AI SYSTEMS ···` band
  right under the hero.
- **Work section = pinned horizontal tour** — on desktop the case studies scroll
  sideways (GSAP `pin` + scrubbed translate); each panel fades up as it enters
  using `containerAnimation`. Mobile falls back to a stacked layout.
- **Parallax imagery** — every case study shows a clipped, scroll-scrubbed
  parallax image (`components/ui/parallax-image.tsx`), plus drifting ghost
  type across Philosophy / Numbers / Footer.
- **Scroll choreography** — Lenis synced with GSAP ScrollTrigger; scrubbed
  clip-mask reveals for section titles and images.
- **System diagrams** — animated data packets over real architectures (FairPay
  pipeline, GeoTrack map + PostGIS cache story, Hire2Onboard multi-tenant
  isolation, recruitment suite).
- **AI + Infrastructure** — animated inference pipeline (USER → … → STORAGE →
  RESPONSE) and a 96TB array visual; disks pulse, packets flow.
- **Custom cursor** — desktop-only ring + dot, expands on interactive, shows
  `VIEW` on project visuals; fully disabled on touch and reduced-motion.
- **Magnetic buttons** — subtle pointer-follow with spring-back.

## Sample images

`public/images/*.svg` (fairpay, geotrack, hire2onboard, career-grid, trustlayer,
suite) are **designed placeholder assets** — on-brand system-visual SVGs that
hook straight into the parallax stages. Replace them with real photography later:
drop files in `public/images/` and update the `IMAGES` map in
`components/projects/work.tsx`. Any `next/image`-friendly asset works; the
loader is `<img>`-based so SVGs just work today.

## Accessibility & performance

- Semantic landmarks, skip link, keyboard focus rings, ARIA on interactive
  diagram controls and the form (`aria-expanded`, `aria-pressed`, `role=status`).
- `prefers-reduced-motion`: loader/cursor/smooth-scroll/parallax/3D motion and
  SMIL diagram packets are all suppressed; content stays fully visible.
- Three.js lazy-loaded with `dynamic(…, { ssr: false })`, DPR capped on mobile,
  particle counts reduced, pointer-events removed from the canvas.
- Transform/opacity-only animations; counters and split-text avoid layout thrash.
- `robots.txt`, `sitemap.xml`, canonical URL, Open Graph / Twitter cards and
  JSON-LD `Person` schema.

## Deployment

Works on any Next.js host (Vercel recommended):

1. Push the repo, import into Vercel (framework = Next.js).
2. Add `NEXT_PUBLIC_SITE_URL` to your domain in Project → Settings → Environment Variables.
3. To enable live contact delivery, add `RESEND_API_KEY` (+ optional `CONTACT_EMAIL_TO`).
4. Deploy. `npm install && npm run build && npm start` is the full build path.

## Notes on content integrity

All personal, project and metric claims come from Jayesh's verified resume —
700+ clients, 27+ public repositories, 96TB infrastructure, ~40% PostGIS API
cost reduction, 100% SEO score, Llama 3.3 70B deployment, and the employer
history shown. No testimonials, clients, revenue or other unverified claims are
fabricated. The Insights section is a tasteful future state until real essays exist.