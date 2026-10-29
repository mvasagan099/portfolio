"use client";

import { Code2, Server, Database, Boxes, Smartphone, FlaskConical } from "lucide-react";
import type { SkillCategory } from "@/types";
import { Reveal } from "@/components";
import { SkillIcon } from "@/components/ui/SkillIcon";

/**
 * A group of technology cards inside a category. On hover: subtle border
 * highlight and icon shift. No percentage bars or star ratings.
 */
export default function SkillCategory({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = [Code2, Server, Database, Boxes, Smartphone, FlaskConical][index % 6];
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <section className="skill-panel h-full rounded-2xl border border-border bg-surface/40 p-6">
        <div className="mb-6"><Icon size={23} className="mb-5 text-accent/80" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {category.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{category.description}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {category.skills.map((skill) => (
            <li
              key={skill.name}
              className="group flex items-center gap-3 rounded-lg border border-border/60 bg-surfaceAlt/40 px-3 py-2.5 transition-colors duration-200 hover:border-accent/40 hover:bg-surfaceAlt"
            >
              <SkillIcon name={skill.icon ?? ""} className="h-4 w-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-accent" />
              <span className="text-sm text-muted group-hover:text-foreground">
                {skill.name}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
