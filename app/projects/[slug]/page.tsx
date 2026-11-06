import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import StructuredData from "@/components/ui/StructuredData";
import { siteUrl } from "@/lib/site-url";
import { site } from "@/data/site";
import CaseStudy from "@/components/sections/CaseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.shortDescription,
      url: `/projects/${project.slug}/`,
      images: [
        {
          url: "/social-card.png",
          width: 1200,
          height: 630,
          alt: `${project.title} — engineering case study`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: ["/social-card.png"]
    },
    description: project.shortDescription
  };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.oneLiner,
          url: `${siteUrl}/projects/${project.slug}/`,
          creator: {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: site.name
          },
          keywords: project.technologies.join(", ")
        }}
      />
      <CaseStudy project={project} />
    </>
  );
}
