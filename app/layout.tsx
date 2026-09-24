import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CORE_META, SITE } from "@/lib/data/site";
import { Loader } from "@/components/loader/loader";
import { Navigation } from "@/components/navigation/navigation";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { AppProviders } from "@/components/providers/app-providers";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

const siteUrl = CORE_META.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: CORE_META.title,
    template: "%s — Jayesh Singh",
  },
  description: CORE_META.description,
  keywords: [
    "Full Stack Engineer",
    "AI Systems",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Llama",
    "Fintech",
    "Jayesh Singh",
  ],
  authors: [{ name: "Jayesh Singh", url: SITE.github }],
  creator: "Jayesh Singh",
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Jayesh Singh",
    title: CORE_META.title,
    description: CORE_META.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: CORE_META.title,
    description: CORE_META.description,
    creator: "@jayesh_ux",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jayesh Singh",
  jobTitle: "Full Stack Engineer",
  description: CORE_META.description,
  email: "mailto:" + SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kalyan",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [SITE.linkedin, SITE.github],
  knowsAbout: [
    "Full-stack development",
    "AI systems",
    "Machine learning deployment",
    "Cloud infrastructure",
    "PostgreSQL",
    "Geospatial systems",
    "Automation",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <AppProviders />
        <Loader />
        <CustomCursor />
        <ScrollProgress />
        <div className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.05]" aria-hidden="true" />
        <Navigation />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}