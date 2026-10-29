import type { MetadataRoute } from "next";
import { business, contentUpdated, services, towns } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = contentUpdated;

  const staticPages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/areas", priority: 0.9 },
    { path: "/book", priority: 0.9 },
    { path: "/fleet", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/about", priority: 0.6 },
  ];

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${business.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((s) => ({
      url: `${business.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...towns.map((t) => ({
      url: `${business.url}/areas/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
