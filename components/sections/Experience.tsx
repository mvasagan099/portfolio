import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/ui/Timeline";
import Badge from "@/components/ui/Badge";
import { experience } from "@/data/site";
export default function Experience() {
  return (
    <Container
      as="section"
      id="experience"
      aria-labelledby="experience-heading"
      className="section-space"
    >
      <SectionHeading
        id="experience"
        kicker="Experience"
        title="Building software in a working business."
      />
      {experience.length ? (
        <div className="mt-10">
          <Timeline
            items={experience.map((job) => ({
              label: job.role,
              date: job.date,
              description: job.company,
              content: (
                <div className="mt-4 rounded-xl border border-border bg-surface/40 p-5 sm:p-6">
                  <p className="text-sm leading-7 text-muted">
                    {job.description}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
                    {job.contributions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.technologies.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              )
            }))}
          />
        </div>
      ) : (
        <p className="mt-6 text-muted">
          Professional experience is not listed yet.
        </p>
      )}
    </Container>
  );
}
