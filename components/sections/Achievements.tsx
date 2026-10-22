import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { certifications, achievements } from "@/data/site";

/**
 * Certifications and achievements (Phase 17). Renders only real entries from
 * data — the component is trivial to populate by adding to data/site.ts.
 */
export default function Achievements() {
  const hasCerts = certifications.length > 0;
  const hasAchievements = achievements.length > 0;

  if (!hasCerts && !hasAchievements) {
    return (
      <section id="achievements" className="mx-auto max-w-content px-6 py-24">
        <SectionHeading id="achievements" kicker="Achievements" title="Certifications & achievements." />
        <p className="mt-6 text-muted">
          Certifications and achievements will appear here once added to{" "}
          <code>data/site.ts</code>.
        </p>
      </section>
    );
  }

  return (
    <section id="achievements" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading id="achievements" kicker="Achievements" title="Certifications & achievements." />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={`cert-${i}`} delay={i * 0.05}>
            <article className="flex h-full flex-col rounded-xl border border-border/60 bg-surface/40 p-6 transition-colors hover:border-accent/30">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                Certification
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{cert.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {cert.issuer}
                {cert.date ? ` · ${cert.date}` : ""}
              </p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm text-accent underline-offset-4 hover:underline"
                >
                  View →
                </a>
              )}
            </article>
          </Reveal>
        ))}

        {achievements.map((a, i) => (
          <Reveal key={`ach-${i}`} delay={i * 0.05}>
            <article className="flex h-full flex-col rounded-xl border border-border/60 bg-surface/40 p-6 transition-colors hover:border-accent/30">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                Achievement
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
              {a.date && <p className="mt-2 font-mono text-xs text-muted">{a.date}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}