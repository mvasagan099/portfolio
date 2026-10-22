import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FeaturedProject from "@/components/sections/FeaturedProject";
import { projects } from "@/data/projects";

export default function Projects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  if (featured.length === 0) {
    return (
      <section id="projects" className="mx-auto max-w-content px-6 py-24">
        <SectionHeading
          id="projects"
          kicker="Projects"
          title="Selected work."
        />
        <p className="mt-6 text-muted">
          Project data has not been added yet.
        </p>
      </section>
    );
  }

  return (
    <section id="projects" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading
        id="projects"
        kicker="Projects"
        title="Selected work."
      />
      <div className="mt-12 space-y-8">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.1}>
            <FeaturedProject project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
