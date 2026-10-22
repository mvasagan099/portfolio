"use client";

import type { Project } from "@/types";
import ProjectArchitecture from "@/components/ui/ProjectArchitecture";
import Button from "@/components/ui/Button";

/**
 * Large featured-project layout (Phase 11). Strongest visual treatment is
 * reserved for the flagship Gaming Hub project (real-time/backend).
 */
export default function FeaturedProject({ project }: { project: Project }) {
  const index = String(project.order).padStart(2, "0");

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/30 transition-colors duration-300 hover:border-accent/40">
      <div className="grid gap-8 p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* Left: copy */}
        <div>
          <span className="font-mono text-sm text-muted">{index}</span>
          <h3 className="mt-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:-translate-y-0.5">
            {project.title}
          </h3>
          <p className="mt-3 text-muted">{project.shortDescription}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/60 bg-surfaceAlt/50 px-2.5 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`/projects/${project.slug}`} variant="secondary" arrow>
              View Case Study
            </Button>
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                variant="ghost"
                external
              >
                GitHub
              </Button>
            )}
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative">
          {project.architecture?.enabled ? (
            <ProjectArchitecture project={project} />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted">
              Project visual coming soon
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
