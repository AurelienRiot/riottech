import type { MetadataRoute } from "next";

const baseUrl = "https://riottech.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard-user/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
