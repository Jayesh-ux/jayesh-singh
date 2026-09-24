export interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Capability {
  index: string;
  title: string;
  description: string;
  stack: string[];
  flow: string[];
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  metrics?: string[];
  visualType: "system-flow" | "geotrack" | "multi-tenant" | "grid" | "recruit";
  liveUrl?: string;
  sections?: string[];
  gallery?: string[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  summary: string;
  items: string[];
}

/* Gemma Vision and TTS2 noted as fine-tuned models; keep labels faithful. */
export const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Full-Stack Development",
    description:
      "Complete product surfaces — frontend, API, database and auth — architected and shipped as one coherent system.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    flow: ["UI", "API", "DATABASE", "AUTH", "CLOUD"],
  },
  {
    index: "02",
    title: "AI & Automation",
    description:
      "Local LLM deployment, model fine-tuning and automated orchestration pipelines that remove manual work.",
    stack: ["Llama 3.3 70B", "Ollama", "LangChain", "n8n", "Gemma Vision", "TTS2"],
    flow: ["API", "ORCHESTRATION", "LLM", "GPU", "RESPONSE"],
  },
  {
    index: "03",
    title: "System Architecture",
    description:
      "From single-tenant to multi-company platforms — isolation, RBAC and scalable data under a shared core.",
    stack: ["Spring Boot", "Django", "PostgreSQL", "RBAC", "Microservices"],
    flow: ["COMPANY A", "COMPANY B", "SHARED CORE", "ISOLATION"],
  },
  {
    index: "04",
    title: "Cloud & DevOps",
    description:
      "EC2, Route 53, Lambda, S3 and Vercel — environments provisioned, deployed and monitored end to end.",
    stack: ["AWS", "EC2", "Lambda", "S3", "Vercel", "CI/CD", "Docker"],
    flow: ["BUILD", "TEST", "DEPLOY", "SERVE", "MONITOR"],
  },
  {
    index: "05",
    title: "Geospatial Systems",
    description:
      "Real-time tracking and proximity verification with PostGIS — spatial indexes doing the heavy lifting.",
    stack: ["PostGIS", "PostgreSQL", "Node.js", "AWS"],
    flow: ["GPS", "POSTGIS", "CACHE", "VERIFICATION"],
  },
  {
    index: "06",
    title: "Product Engineering",
    description:
      "Ownership across fintech, recruitment, logistics and infrastructure — building systems that actually ship.",
    stack: ["FairPay", "GeoTrack", "Hire2Onboard", "Career Grid", "TrustLayer"],
    flow: ["DISCOVER", "ARCHITECT", "BUILD", "LAUNCH", "OPERATE"],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "fairpay",
    index: "01",
    title: "FairPay Solution",
    category: "FINTECH / DEBT ADVISORY",
    description:
      "Production debt advisory platform serving 700+ clients across India. Architected end to end — frontend, backend, database and cloud deployment.",
    technologies: ["Next.js", "React", "Supabase", "PostgreSQL", "Razorpay", "Vercel"],
    features: [
      "Razorpay payment gateway",
      "Google OAuth",
      "RBAC + admin dashboard",
      "Client management",
      "SMS automation",
      "Email automation",
      "Follow-up workflows",
    ],
    metrics: ["700+ CLIENTS"],
    visualType: "system-flow",
    liveUrl: "https://www.fairpaysolution.com",
    sections: ["CLIENT", "AUTHENTICATION", "APPLICATION", "DATABASE", "PAYMENT", "AUTOMATION", "ADMIN"],
    gallery: [
      "/images/projects/fairpay/01.webp",
      "/images/projects/fairpay/02.webp",
      "/images/projects/fairpay/03.webp",
    ],
  },
  {
    slug: "averlon",
    index: "02",
    title: "Averlon Technologies",
    category: "SAAS / LOGISTICS / RECRUITMENT",
    description:
      "Coordinated and shipped a portfolio of production SaaS products under Rajlaxmi Solutions / Averlon Technologies — logistics tracking, hire-to-onboard pipelines, verification and recruitment systems — owning architecture and AWS deployment across the board.",
    technologies: ["Node.js", "TypeScript", "Django", "React", "PostgreSQL", "PostGIS", "AWS"],
    features: [
      "Multi-product coordination",
      "Real-time logistics tracking",
      "Multi-tenant SaaS platforms",
      "AWS deployment + DNS",
      "Production ownership",
    ],
    metrics: ["MULTI-PRODUCT"],
    visualType: "system-flow",
    sections: ["LOGISTICS", "RECRUITMENT", "VERIFICATION", "CLOUD"],
    gallery: [
      "/images/projects/averlon/01.webp",
      "/images/projects/averlon/02.webp",
      "/images/projects/averlon/03.webp",
      "/images/projects/averlon/04.webp",
      "/images/projects/averlon/05.webp",
      "/images/projects/averlon/06.webp",
    ],
  },
  {
    slug: "geotrack",
    index: "03",
    title: "GeoTrack",
    category: "LOGISTICS / GIS",
    description:
      "GPS-enabled logistics tracking and proximity verification platform. PostGIS spatial caching cut external map API dependency by ~40%.",
    technologies: ["Node.js", "PostgreSQL", "PostGIS", "AWS"],
    features: [
      "Real-time location tracking",
      "Geofencing",
      "Spatial queries",
      "Proximity verification",
      "PostGIS caching",
    ],
    metrics: ["~40% REDUCTION IN EXTERNAL MAP API COSTS"],
    visualType: "geotrack",
    sections: ["GPS", "POSTGIS", "CACHE", "VERIFICATION"],
  },
  {
    slug: "hire2onboard",
    index: "04",
    title: "Hire2Onboard",
    category: "RECRUITMENT / SAAS",
    description:
      "Multi-tenant hire-to-onboard pipeline migrating from a single-company architecture to a scalable multi-company platform.",
    technologies: ["TypeScript", "Python", "Django", "React", "PostgreSQL", "AWS"],
    features: [
      "Company isolation",
      "RBAC across pipeline stages",
      "Kanban round progression",
      "Multi-portal candidate fetching",
      "Deduplication + centralized tracking",
    ],
    metrics: ["HIRE2ONBOARD.COM"],
    visualType: "multi-tenant",
    liveUrl: "https://hire2onboard.com",
    sections: ["COMPANY A", "COMPANY B", "COMPANY C", "MULTI-COMPANY PLATFORM"],
    gallery: [
      "/images/projects/hire2onboard/01.webp",
      "/images/projects/hire2onboard/02.webp",
      "/images/projects/hire2onboard/03.webp",
      "/images/projects/hire2onboard/04.webp",
      "/images/projects/hire2onboard/05.webp",
      "/images/projects/hire2onboard/06.webp",
      "/images/projects/hire2onboard/07.webp",
      "/images/projects/hire2onboard/08.webp",
    ],
  },
  {
    slug: "career-grid",
    index: "05",
    title: "Career Grid",
    category: "JOB PLATFORM",
    description:
      "Full-stack job posting and analytics platform with a Spring Boot microservices backend and Next.js frontend.",
    technologies: ["TypeScript", "Java", "Spring Boot", "PostgreSQL", "AWS", "Next.js"],
    features: ["OTP login", "2FA authentication", "REST APIs", "Microservices backend", "Analytics"],
    metrics: ["EC2 + ROUTE 53"],
    visualType: "grid",
    sections: ["POST", "AUTH", "API", "ANALYTICS"],
  },
  {
    slug: "trustlayer",
    index: "06",
    title: "TrustLayer",
    category: "RECRUITMENT / VERIFICATION",
    description:
      "Verification and trust platform for recruitment workflows — candidate state moved through a trustworthy pipeline.",
    technologies: ["TypeScript", "React", "PostgreSQL", "AWS"],
    features: ["Verification flow", "Candidate state tracking", "Trust-state workflow", "Cloud-deployed backend"],
    metrics: ["RECRUITMENT-SAFE"],
    visualType: "recruit",
    sections: ["CANDIDATE", "VERIFY", "TRUST STATE", "WORKFLOW"],
  },
  {
    slug: "qyuki",
    index: "07",
    title: "DeepSoch AI / Qyuki",
    category: "AI INFRASTRUCTURE",
    description:
      "Deployed and fine-tuned Llama 3.3 70B for international clients under Qyuki Digital Media / DeepSoch AI — contributed to 96TB enterprise storage and built a custom RTX 3090 GPU compute node running at ~$60/month.",
    technologies: ["Llama 3.3 70B", "Ollama", "n8n", "Docker", "RTX 3090", "96TB Storage"],
    features: [
      "Local LLM deployment",
      "Model fine-tuning",
      "Custom GPU compute node",
      "REST API integrations",
      "n8n automation pipelines",
      "Enterprise storage infrastructure",
    ],
    metrics: ["96TB STORAGE", "LLAMA 3.3 70B"],
    visualType: "system-flow",
    sections: ["LLM", "GPU", "STORAGE", "ORCHESTRATION"],
    gallery: [
      "/images/projects/qyuki/01.webp",
      "/images/projects/qyuki/02.webp",
      "/images/projects/qyuki/03.webp",
      "/images/projects/qyuki/04.webp",
      "/images/projects/qyuki/05.webp",
      "/images/projects/qyuki/06.webp",
      "/images/projects/qyuki/07.webp",
      "/images/projects/qyuki/08.webp",
      "/images/projects/qyuki/09.webp",
    ],
  },
  {
    slug: "recruitment-suite",
    index: "08",
    title: "Recruitment Platform Suite",
    category: "SYSTEM",
    description:
      "Recruit, TrustLayer and Hire2Onboard operating as interconnected systems sharing authentication, data and workflow layers.",
    technologies: ["TypeScript", "Django", "React", "PostgreSQL", "AWS"],
    features: [
      "Shared authentication layer",
      "Unified candidate data",
      "Reusable workflow layers",
      "Isolated tenant surfaces",
    ],
    metrics: ["SHARED CORE"],
    visualType: "recruit",
    sections: ["RECRUIT", "TRUSTLAYER", "OFFERGHOST", "HIRE2ONBOARD"],
  },
];

export const SECONDARY_PROJECTS = [
  "KindaReady — Android logistics application (Kotlin)",
  "Ambulance Dispatch & Rescue — emergency response PoC",
  "E-Commerce platforms — React / Sanity CMS",
  "GST Billing — invoicing with auth + cloud deployment",
];

export const METRICS: Metric[] = [
  { value: 700, suffix: "+", label: "clients served by FairPay" },
  { value: 27, suffix: "+", label: "public repositories" },
  { value: 96, suffix: "TB", label: "enterprise storage infrastructure" },
  { value: 40, prefix: "~", suffix: "%", label: "external map API cost reduction" },
  { value: 100, suffix: "%", label: "SEO score on production applications" },
];

export const EXPERIENCE: Experience[] = [
  {
    period: "2026",
    role: "Full Stack Developer & Technical Coordination",
    company: "Rajlaxmi Solutions / Averlon Technologies",
    summary:
      "Built and coordinated SaaS products across logistics, recruitment and verification while owning architecture and AWS deployment.",
    items: [
      "GeoTrack — real-time GPS tracking with PostGIS caching",
      "Hire2Onboard — multi-tenant hire-to-onboard pipeline",
      "TrustLayer — verification and trust platform",
      "OfferGhost — recruitment operating system",
      "GST Billing Management System",
      "Android logistics application (Kotlin)",
    ],
  },
  {
    period: "2025–Present",
    role: "Full Stack Developer",
    company: "FairPay Solution",
    summary:
      "Built and operate a live debt advisory platform serving 700+ clients across India.",
    items: [
      "End-to-end architecture — frontend, backend, database, cloud",
      "Razorpay gateway + Google OAuth + RBAC",
      "SMS/email automation and follow-up workflows",
    ],
  },
  {
    period: "2025",
    role: "Full Stack Engineer Intern",
    company: "Qyuki Digital Media / DeepSoch AI",
    summary:
      "Deployed AI infrastructure and built full-stack applications under DeepSoch AI's engineering team.",
    items: [
      "Deployed and fine-tuned Llama 3.3 70B for international clients",
      "Contributed to 96TB on-premise enterprise storage infrastructure",
      "Custom RTX 3090 GPU compute node at ~$60/month",
      "REST API integrations with secure auth",
      "n8n automation for Ollama deployment pipelines",
      "Fine-tuned Gemma Vision and Index TTS2 models",
    ],
  },
  ];

export const PROCESS = [
  { index: "01", title: "Understand", detail: "Clarify the problem, the constraints and the people it serves before a line of code." },
  { index: "02", title: "Architect", detail: "Design the topology — data flow, boundaries, failure points — before choosing tools." },
  { index: "03", title: "Build", detail: "Implement in clean layers. Interfaces first, then system, then polish." },
  { index: "04", title: "Integrate", detail: "Wire auth, payments, APIs and automation into one working whole." },
  { index: "05", title: "Deploy", detail: "Provision infrastructure, ship to production, configure DNS and CDN." },
  { index: "06", title: "Optimize", detail: "Measure, profile, reduce cost and latency. Then repeat." },
];

export const TECH_CORE = "JAYESH";

export const TECH_GRAPH: Record<string, string[]> = {
  "Next.js": ["FairPay", "Career Grid"],
  React: ["FairPay", "Career Grid", "TrustLayer"],
  TypeScript: ["Hire2Onboard", "Career Grid", "TrustLayer"],
  "Node.js": ["GeoTrack", "TrustLayer", "Ambulance Dispatch"],
  Python: ["Hire2Onboard", "DeepSoch AI"],
  Java: ["Career Grid", "E-Commerce"],
  Kotlin: ["KindaReady"],
  PostgreSQL: ["GeoTrack", "FairPay", "Hire2Onboard"],
  PostGIS: ["GeoTrack"],
  AWS: ["GeoTrack", "Career Grid", "TrustLayer"],
  Docker: ["DeepSoch AI"],
  Ollama: ["Llama 3.3 70B"],
  Llama: ["Llama 3.3 70B"],
  n8n: ["DeepSoch AI"],
  Supabase: ["FairPay"],
};

export const AI_STACK = [
  "Llama 3.3 70B",
  "96TB storage",
  "RTX 3090 GPU compute",
  "Ollama",
  "n8n",
  "Gemma Vision",
  "TTS2",
];

export const TECH_LIST = Object.keys(TECH_GRAPH);

export const PROJECT_LINKS = [
  { label: "GitHub", url: "https://github.com/Jayesh-ux" },
  { label: "LinkedIn", url: "https://linkedin.com/in/jayesh-dev" },
];