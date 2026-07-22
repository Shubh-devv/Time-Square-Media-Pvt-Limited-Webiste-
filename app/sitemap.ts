import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { CITIES } from "@/lib/data";

const BASE_URL = "https://timesquaremedia.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/work`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/presence`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${BASE_URL}/presence/${c.city.toLowerCase()}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...cityRoutes];
}
