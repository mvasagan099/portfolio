import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import StructuredData from "@/components/ui/StructuredData";
import { siteUrl } from "@/lib/site-url";
export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s | ${site.name}`
  },
  description: site.tagline,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.links.github.url }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${site.name} Portfolio`,
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Manivasagan A. — Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    images: ["/social-card.png"]
  },
  icons: { icon: "/icon.svg" }
};
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${siteUrl}/#person`,
                name: site.name,
                jobTitle: site.title,
                url: siteUrl,
                sameAs: [site.links.github.url, site.links.linkedin.url],
                knowsAbout: [
                  "React",
                  "Node.js",
                  "PostgreSQL",
                  "Redis",
                  "Docker",
                  "Full-stack development"
                ]
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: `${site.name} Portfolio`,
                url: siteUrl,
                publisher: { "@id": `${siteUrl}/#person` }
              }
            ]
          }}
        />
        {children}
      </body>
    </html>
  );
}
