import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer2/generated";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = [
    "",
    "/about",
    "/products",
    "/services",
    "/contact",
    "/blog",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = allPosts.map((post) => ({
    url: `${base}${post.url}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
