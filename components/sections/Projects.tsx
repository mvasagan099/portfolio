import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ProjectFilter from "@/components/ui/ProjectFilter";
import { projects } from "@/data/projects";
export default function Projects() {
  const selected = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
  return (
    <Container
      as="section"
      id="projects"
      aria-labelledby="projects-heading"
      className="section-space"
    >
      <SectionHeading
        id="projects"
        kicker="Selected work"
        title="Selected engineering work."
      />
      <p className="mt-5 max-w-xl leading-7 text-muted">
        Explore the problem each project addresses, how the pieces fit together,
        and what I learned while building it.
      </p>
      <ProjectFilter
        items={selected.map((p) => ({
          slug: p.slug,
          category: p.category,
          content: <FeaturedProject project={p} />
        }))}
      />
    </Container>
  );
}
