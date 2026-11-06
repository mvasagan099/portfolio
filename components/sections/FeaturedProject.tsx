import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProjectArchitecture from "@/components/ui/ProjectArchitecture";
import ProjectArtwork from "@/components/ui/ProjectArtwork";
export default function FeaturedProject({ project }: { project: Project }) {
  if (project.slug === "gaming-hub")
    return (
      <article className="group overflow-hidden rounded-2xl border border-accent/25 bg-surface/70 md:col-span-2">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.18em] text-accent">
              Flagship project · real-time engineering
            </p>
            <h3 className="mt-5 text-4xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              {project.oneLiner}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
              <li>Server-managed readiness and synchronized match starts.</li>
              <li>Reconnect handling and a predictable match lifecycle.</li>
              <li>
                Separate coordination state from durable application records.
              </li>
            </ul>
            <div className="my-6 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <Button href={`/projects/${project.slug}/`} arrow>
              Explore the architecture
            </Button>
          </div>
          <ProjectArchitecture project={project} />
        </div>
      </article>
    );
  return (
    <article className="project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors hover:border-accent/40">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden border-b border-border"
      >
        <ProjectArtwork slug={project.slug} />
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
          {project.category}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          <Link
            className="transition-colors hover:text-accent"
            href={`/projects/${project.slug}`}
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          {project.shortDescription}
        </p>
        <div className="my-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm transition-colors hover:text-accent"
        >
          Explore project{" "}
          <ArrowUpRight
            size={18}
            className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
