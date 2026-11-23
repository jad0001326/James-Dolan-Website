import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content/case-studies";
import { getWritingPosts } from "@/lib/content/writing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-23T00:00:00.000Z");
  const paths = ["/", "/about", "/experience", "/projects", "/certifications", "/contact", "/writing", "/cv"];

  return [
    ...paths.map((path) => ({
      url: new URL(path, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...getCaseStudies().map((study) => ({
      url: new URL(`/projects/${study.slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getWritingPosts().map((post) => ({
      url: new URL(`/writing/${post.slug}`, site.url).toString(),
      lastModified: new Date(`${post.publishedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
