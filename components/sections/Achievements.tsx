import { Award, Milestone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, achievements } from "@/data/site";
import { isProfileUrl } from "@/lib/links";
export default function Achievements() {
  return (
    <Container
      as="section"
      id="achievements"
      aria-labelledby="achievements-heading"
      className="section-space"
    >
      <SectionHeading
        id="achievements"
        kicker="Professional development"
        title="Certifications & milestones."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/30 p-6">
          <Award aria-hidden size={22} className="mb-4 text-accent" />
          <h3 className="font-medium">Certifications</h3>
          {certifications.length ? (
            <ul className="mt-4 space-y-5">
              {certifications.map((c) => (
                <li key={`${c.title}-${c.issuer}`}>
                  <h4 className="font-medium">{c.title}</h4>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer}
                    {c.date ? ` · ${c.date}` : ""}
                  </p>
                  {c.url && isProfileUrl(c.url) && (
                    <a
                      className="mt-2 inline-block text-sm text-accent hover:underline"
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View credential →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-7 text-muted">
              No certifications listed yet. My current technical work is
              documented in the project case studies.
            </p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-surface/30 p-6">
          <Milestone aria-hidden size={22} className="mb-4 text-accent" />
          <h3 className="font-medium">Milestones</h3>
          {achievements.length ? (
            <ul className="mt-4 space-y-5">
              {achievements.map((a) => (
                <li key={a.title}>
                  <h4 className="font-medium">{a.title}</h4>
                  <p className="mt-1 text-sm leading-7 text-muted">
                    {a.description}
                  </p>
                  {a.date && (
                    <p className="mt-2 font-mono text-xs text-muted">
                      {a.date}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-7 text-muted">
              Additional milestones will be added as they’re documented. Explore
              the projects for the work and lessons behind them.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
