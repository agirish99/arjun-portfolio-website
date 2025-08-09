import type { MetadataRoute } from "next";
import { loadProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.com";
  const now = new Date();
  const items: MetadataRoute.Sitemap = [
    { url: base, lastModified: now }, 
    { url: base + "/about", lastModified: now },
    { url: base + "/projects", lastModified: now },
    { url: base + "/experience", lastModified: now }
  ];
  for(const p of loadProjects()){
    items.push({ url: `${base}/projects/${p.slug}`, lastModified: now });
  }
  return items;
}
