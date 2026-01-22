import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com"; // change after deploy

  const posts = getAllPostsMeta();

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.meta.date || Date.now()),
    })),
  ];
}
