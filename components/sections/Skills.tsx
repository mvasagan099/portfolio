import SectionHeading from "@/components/ui/SectionHeading";
import SkillCategory from "@/components/sections/SkillCategory";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading
        id="skills"
        kicker="Skills"
        title="Technologies I work with."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <SkillCategory key={cat.title} category={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
