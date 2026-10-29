import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }, { url: `${siteUrl}/resume/`, changeFrequency: "monthly", priority: 0.7 }, ...projects.map(p=>({ url: `${siteUrl}/projects/${p.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
