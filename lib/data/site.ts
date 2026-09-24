export const SITE = {
  name: "Jayesh Singh",
  shortName: "JS",
  role: "Full Stack Engineer",
  subRoles: ["AI SYSTEMS BUILDER", "PRODUCT ENGINEER"],
  email: "hsinghjayesh@gmail.com",
  phone: "+91-78218-16193",
  phoneHref: "+917821816193",
  location: "Kalyan (W), Mumbai",
  version: "v3.0.0",
  linkedin: "https://linkedin.com/in/jayesh-dev",
  linkedinLabel: "linkedin.com/in/jayesh-dev",
  github: "https://github.com/Jayesh-ux",
  githubLabel: "github.com/Jayesh-ux",
  liveProducts: [
    { name: "fairpaysolution.com", url: "https://www.fairpaysolution.com" },
    { name: "hire2onboard.com", url: "https://hire2onboard.com" },
  ],
} as const;

export const CORE_META = {
  title: "Jayesh Singh — Full Stack Engineer & AI Systems Builder",
  description:
    "Full Stack Engineer building production-grade web applications, AI systems, automation, SaaS platforms and cloud infrastructure. From architecture to production.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://jayesh-singh.vercel.app",
  canonical: "/",
} as const;