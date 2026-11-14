import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-27");
  const pages: MetadataRoute.Sitemap = nav.map(({ href }) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    lastModified,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : href === "/contact" ? 0.9 : 0.8,
  }));

  const articles: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.url}${post.href}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...articles];
}
