import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/cs", "/sk", "/en"],
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: "https://phoenixcom.cz/sitemap.xml",
  };
}
