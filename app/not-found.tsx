import Link from "next/link";
import { SITE } from "@/lib/data/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="mono-label accent mb-6">SYS://404</p>
      <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-medium leading-none tracking-[-0.03em] text-fg">
        PAGE NOT
        <br />
        FOUND
      </h1>
      <p className="mt-6 max-w-md font-light leading-relaxed text-fg-soft">
        The system does not recognise this route. The page may have been
        moved, archived, or never existed.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 border border-accent bg-accent px-7 py-4 font-display text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        RETURN TO CORE
      </Link>
      <p className="mt-10 font-mono text-[11px] tracking-wider text-mute">
        {SITE.email}
      </p>
    </section>
  );
}