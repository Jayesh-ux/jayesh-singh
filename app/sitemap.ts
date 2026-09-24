import type { MetadataRoute } from "next";
import { CORE_META } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CORE_META.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
export const dynamic = "force-static";
