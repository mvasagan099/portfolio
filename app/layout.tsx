import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.title}`, template: `%s | ${site.name}` },
  description: site.tagline,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.links.github.url }],
  openGraph: { type: "website", locale: "en_IN", siteName: `${site.name} Portfolio`, title: `${site.name} — ${site.title}`, description: site.tagline, images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Manivasagan A. — Full Stack Developer" }] },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.title}`, description: site.tagline, images: ["/social-card.png"] },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body className="font-sans"><a href="#main" className="skip-link">Skip to content</a><MotionConfig reducedMotion="user">{children}</MotionConfig></body></html>;
}
