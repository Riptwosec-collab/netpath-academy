import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://netpath.academy";

const PUBLIC_ROUTES = [
  { path: "",                 priority: 1.0, changeFrequency: "weekly"  },
  { path: "/dashboard",      priority: 0.9, changeFrequency: "weekly"  },
  { path: "/roadmap",        priority: 0.9, changeFrequency: "monthly" },
  { path: "/courses",        priority: 0.9, changeFrequency: "weekly"  },
  { path: "/labs",           priority: 0.8, changeFrequency: "weekly"  },
  { path: "/quiz",           priority: 0.8, changeFrequency: "weekly"  },
  { path: "/troubleshooting",priority: 0.8, changeFrequency: "weekly"  },
  { path: "/ai-tutor",       priority: 0.7, changeFrequency: "monthly" },
  { path: "/progress",       priority: 0.6, changeFrequency: "weekly"  },
  { path: "/portfolio",      priority: 0.7, changeFrequency: "weekly"  },
  { path: "/tools",          priority: 0.7, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url:            `${APP_URL}${path}`,
    lastModified,
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority,
  }));
}
