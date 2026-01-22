import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://vercel.com/fuad-abdallas-projects/soulmate-quotes/3Urwoi5N1P8ZqtJtE3mrsmAWQphC";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
