"use client";

import Reveal from "@/components/ui/Reveal";

export const sectionOrder = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "github", label: "OPEN SOURCE" },
  { id: "contact", label: "CONTACT" },
] as const;

/** Number an arbitrary section id according to the canonical order. */
export function sectionIndex(id: string): string {
  const idx = sectionOrder.findIndex((s) => s.id === id);
  if (idx === -1) return "";
  return String(idx + 1).padStart(2, "0");
}

type SectionHeadingProps = {
  id: string;
  title: string;
  kicker?: string;
  className?: string;
};

export default function SectionHeading({ id, title, kicker, className }: SectionHeadingProps) {
  const num = sectionIndex(id);
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3">
        {num && <span className="font-mono text-sm text-accent">{num} /</span>}
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
          {kicker ?? title}
        </span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
      {title && (
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      )}
    </Reveal>
  );
}