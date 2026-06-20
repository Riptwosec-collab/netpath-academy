import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://netpath.academy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     ["/"],
        disallow:  ["/admin", "/api/", "/api"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
