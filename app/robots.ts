import type { MetadataRoute } from "next";
import { CORE_META } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${CORE_META.siteUrl}/sitemap.xml`,
    host: CORE_META.siteUrl,
  };
}
export const dynamic = "force-static";
