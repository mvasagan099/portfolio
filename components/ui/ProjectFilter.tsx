"use client";
import { useState, type ReactNode } from "react";
type Item = { slug: string; category: string; content: ReactNode };
export default function ProjectFilter({ items }: { items: Item[] }) {
  const [category, setCategory] = useState("All work");
  const categories = ["All work", ...new Set(items.map((p) => p.category))];
  const visible = items.filter(
    (p) => category === "All work" || p.category === category
  );
  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="mb-8 mt-8 flex flex-wrap gap-2"
      >
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`min-h-11 rounded-full border px-4 py-2 text-xs transition-colors ${category === c ? "border-accent/40 bg-accent/10 text-accent" : "border-border text-muted hover:border-accent/40 hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {visible.length} projects shown
      </p>
      <div className="grid gap-7 md:grid-cols-2">
        {visible.map((item) => (
          <div
            key={item.slug}
            className={item.slug === "gaming-hub" ? "md:col-span-2" : ""}
          >
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}
