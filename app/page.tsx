import type { Metadata } from "next";
import { CORE_META } from "@/lib/data/site";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/ui/marquee";
import { Philosophy } from "@/components/philosophy/philosophy";
import { Capabilities } from "@/components/capabilities/capabilities";
import { FeaturedWork } from "@/components/work/featured-work";
import { MoreSystems } from "@/components/work/more-systems";
import { AiInfrastructure } from "@/components/ai-infrastructure/ai-infrastructure";
import { Numbers } from "@/components/metrics/numbers";
import { TechnologyEcosystem } from "@/components/technology/technology-ecosystem";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { Process } from "@/components/process/process";
import { ReposBanner } from "@/components/repos/repos-banner";
import { About } from "@/components/about/about";
import { Insights } from "@/components/insights/insights";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Jayesh Singh — Full Stack Engineer & AI Systems Builder",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Philosophy />
      <Capabilities />
      <FeaturedWork />
      <MoreSystems />
      <AiInfrastructure />
      <Numbers />
      <TechnologyEcosystem />
      <ExperienceTimeline />
      <Process />
      <ReposBanner />
      <About />
      <Insights />
      <Contact />
      <Footer />
    </>
  );
}