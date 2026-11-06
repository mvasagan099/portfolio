"use client";

import Link from "next/link";
import type { Project } from "@/types";
import ProjectArchitecture from "@/components/ui/ProjectArchitecture";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { isProfileUrl } from "@/lib/links";

/**
 * Case study detail page content. Every field renders from prop data only —
 * nothing invented here.
 */
export default function CaseStudy({ project }: { project: Project }) {
  return (
    <main id="main" className="mx-auto max-w-content px-6 py-24">
      <Link
        href="/#projects"
        className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        ← All projects
      </Link>

      <header className="mt-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Project
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.oneLiner}</p>
        {project.status && (
          <span className="mt-5 inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent">
            Status: {project.status}
          </span>
        )}
      </header>

      <Section title="Overview" body={project.longDescription} />
      <Section title="The problem" body={project.problem} />
      <Section title="My approach" body={project.approach} />

      {project.architecture?.enabled && (
        <div className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Architecture
          </h2>
          <div className="mt-6">
            <ProjectArchitecture project={project} />
          </div>
        </div>
      )}

      <Section title="Technology">
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border/60 bg-surfaceAlt/50 px-3 py-1.5 text-sm text-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {project.challenges && project.challenges.length > 0 && (
        <div className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Engineering Challenges
          </h2>
          <div className="mt-6 space-y-4">
            {project.challenges.map((c, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="grid gap-4 rounded-xl border border-border/60 bg-surface/40 p-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Challenge
                    </h3>
                    <p className="mt-2 text-sm text-foreground">{c.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Solution
                    </h3>
                    <p className="mt-2 text-sm text-foreground">{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {project.learned && project.learned.length > 0 && (
        <div className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            What I Learned
          </h2>
          <ul className="mt-6 space-y-3">
            {project.learned.map((l, i) => (
              <Reveal key={i} delay={i * 0.05} as="li">
                <span className="flex items-start gap-3 text-muted">
                  <span className="mt-1 text-accent" aria-hidden>
                    ▸
                  </span>
                  {l}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      {project.status && (
        <div className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Current Status
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{project.status}</p>
        </div>
      )}

      {project.futureImprovements && project.futureImprovements.length > 0 && (
        <div className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Future Improvements
          </h2>
          <ul className="mt-6 space-y-3">
            {project.futureImprovements.map((f, i) => (
              <Reveal key={i} delay={i * 0.05} as="li">
                <span className="flex items-start gap-3 text-muted">
                  <span className="mt-1 text-accent" aria-hidden>
                    ▸
                  </span>
                  {f}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-20 flex flex-wrap gap-3">
        {project.githubUrl && isProfileUrl(project.githubUrl) && (
          <Button href={project.githubUrl} external arrow>
            GitHub
          </Button>
        )}
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="secondary" external arrow>
            Live Demo
          </Button>
        )}
        {!project.githubUrl && !project.liveUrl && (
          <p className="text-sm text-muted">
            This case study describes the engineering work. Source code and live access are not publicly listed.
          </p>
        )}
      </div>
      <div className="mt-16 border-t border-border pt-8"><Button href="/#contact" variant="secondary" arrow>Talk about this project</Button></div>
    </main>
  );
}

function Section({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  if (!body && !children) return null;
  return (
    <div className="mt-16">
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{body}</p>
      ) : (
        children
      )}
    </div>
  );
}