import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/data/site";

/**
 * Experience timeline (Phase 16). Each item renders from data only.
 * If the experience array is empty, a gentle placeholder explains how to add it.
 */
export default function Experience() {
  if (experience.length === 0) {
    return (
      <section id="experience" className="mx-auto max-w-content px-6 py-24">
        <SectionHeading id="experience" kicker="Experience" title="Where I've worked." />
        <p className="mt-6 text-muted">
          Experience entries will appear here once added to{" "}
          <code>data/site.ts</code>.
        </p>
      </section>
    );
  }

  return (
    <section id="experience" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading id="experience" kicker="Experience" title="Where I've worked." />
      <ol className="mt-12 space-y-6">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.05} as="li">
            <div className="rounded-xl border border-border/60 bg-surface/40 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
                {job.date && <span className="font-mono text-xs text-muted">{job.date}</span>}
              </div>
              <p className="mt-1 text-sm text-accent">{job.company}</p>
              <p className="mt-3 text-muted">{job.description}</p>

              {job.contributions && job.contributions.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {job.contributions.map((c, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1 text-accent" aria-hidden>▸</span>
                      {c}
                    </li>
                  ))}
                </ul>
              )}

              {job.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/60 bg-surfaceAlt/50 px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}