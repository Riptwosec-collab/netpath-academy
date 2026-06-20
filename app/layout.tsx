import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default:  "NetPath Academy",
    template: "%s | NetPath Academy",
  },
  description:
    "เว็บเรียนรู้เส้นทางสู่ Network Engineer และ Senior Network Engineer — Roadmap, Labs, AI Tutor, Quiz และ Portfolio",
  keywords: ["Network Engineer", "CCNA", "CCNP", "Networking", "IT", "Roadmap"],
  openGraph: {
    type:        "website",
    siteName:    "NetPath Academy",
    title:       "NetPath Academy",
    description: "เรียน Network แบบเป็นระบบ จาก Beginner ถึง Senior Engineer",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#050816] text-white antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
