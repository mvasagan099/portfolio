import type { ReactNode } from "react";
export default function Badge({
  children,
  accent = false,
  className = ""
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] leading-5 ${accent ? "border-accent/25 bg-accent/5 text-accent" : "border-border bg-surface text-muted"} ${className}`}
    >
      {children}
    </span>
  );
}
