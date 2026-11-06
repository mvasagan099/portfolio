import type { ReactNode } from "react";
export type TimelineEntry = {
  label: string;
  description?: string;
  date?: string;
  content?: ReactNode;
};
export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="border-l border-border pl-6">
      {items.map((item, i) => (
        <li key={`${item.label}-${i}`} className="relative pb-8 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-accent/60 bg-background"
          />
          {item.date && (
            <p className="mb-2 font-mono text-xs text-accent">{item.date}</p>
          )}
          <h3 className="font-medium text-foreground">{item.label}</h3>
          {item.description && (
            <p className="mt-2 text-sm leading-7 text-muted">
              {item.description}
            </p>
          )}
          {item.content}
        </li>
      ))}
    </ol>
  );
}
