import type { Metadata } from "next";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "NetPath Academy";
const APP_URL  = process.env.NEXT_PUBLIC_APP_URL  ?? "https://netpath.academy";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default:  APP_NAME,
    template: `%s — ${APP_NAME}`,
  },
  description:
    "เว็บเรียนรู้เส้นทางสู่ Network Engineer และ Senior Network Engineer พร้อม Roadmap, Labs, Quiz, AI Tutor และ Portfolio",
  keywords: [
    "Network Engineer", "CCNA", "CCNP", "Networking", "VLAN", "OSPF",
    "BGP", "Firewall", "Network Lab", "เรียน Network", "Cisco", "Routing",
    "Switching", "Subnetting", "NetPath Academy",
  ],
  authors:  [{ name: APP_NAME }],
  creator:  APP_NAME,
  openGraph: {
    type:        "website",
    locale:      "th_TH",
    url:         APP_URL,
    siteName:    APP_NAME,
    title:       APP_NAME,
    description: "เว็บเรียนรู้เส้นทางสู่ Network Engineer แบบครบวงจร — Roadmap · Labs · Quiz · AI Tutor · Portfolio",
  },
  twitter: {
    card:        "summary_large_image",
    title:       APP_NAME,
    description: "เว็บเรียนรู้เส้นทางสู่ Network Engineer แบบครบวงจร",
  },
  robots: {
    index:            true,
    follow:           true,
    googleBot: {
      index:          true,
      follow:         true,
      "max-image-preview": "large",
    },
  },
};

/** Build page-level metadata */
export function buildMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description ?? defaultMetadata.description,
    openGraph: {
      ...(defaultMetadata.openGraph as object),
      title: `${title} — ${APP_NAME}`,
      description: description ?? String(defaultMetadata.description),
    },
  };
}
