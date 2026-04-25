import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const SITE = "https://amanullah.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${SITE}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
  return routes;
}
