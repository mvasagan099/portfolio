"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";

/**
 * Interactive architecture diagram for the flagship project.
 * Uses a flowing connection "pulse" along the edges. Subtle, and
 * fully static under reduced motion.
 */
export default function ProjectArchitecture({ project }: { project: Project }) {
  const reduce = useReducedMotion() === true;

  return (
    <div className="rounded-xl border border-border bg-surface/40 p-6">
      <div className="mb-6 flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          {project.architecture?.type ?? "Architecture"}
        </span>
        <span className="font-mono text-xs text-accent">{project.title}</span>
      </div>

      <div
        className="grid items-center gap-4"
        style={{ gridTemplateColumns: "1fr" }}
      >
        <ArchNode label="CLIENT" sub="browser / device" />
        <FlowLines reduce={reduce} />
        <ArchNode label="NGINX" sub="reverse proxy · TLS" accent />
        <FlowLines reduce={reduce} split />
        <div className="grid grid-cols-2 gap-4">
          <ArchNode label="API" sub="REST" accent />
          <ArchNode label="SOCKET.IO" sub="real-time" accent />
        </div>
        <FlowLines reduce={reduce} join />
        <ArchNode label="REDIS" sub="in-memory · pub/sub" />
        <FlowLines reduce={reduce} />
        <ArchNode label="POSTGRESQL" sub="durable storage" accent />
      </div>
    </div>
  );
}

function ArchNode({
  label,
  sub,
  accent,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-center transition-colors ${
        accent
          ? "border-accent/40 bg-accent/5"
          : "border-border/70 bg-surfaceAlt/60"
      }`}
    >
      <span className="block font-mono text-sm font-medium text-foreground">
        {label}
      </span>
      {sub && <span className="block text-[11px] text-muted">{sub}</span>}
    </div>
  );
}

function FlowLines({
  reduce,
  split,
  join,
  length = 4,
}: {
  reduce: boolean;
  split?: boolean;
  join?: boolean;
  length?: number;
}) {
  // A single vertical connector segment with a subtle moving pulse.
  return (
    <div className="relative flex justify-center" aria-hidden>
      <motion.div
        className="w-px bg-border"
        style={{ height: `${length * 1}rem` }}
      >
        <motion.span
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
          animate={reduce ? undefined : { y: [0, length * 16 - 8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      {split && (
        <span className="absolute left-1/2 top-1/2 h-[1.5rem] w-8 -translate-x-1/2 border-b border-l border-r border-border/60" />
      )}
      {join && (
        <span className="absolute left-1/2 top-1/2 h-[1.5rem] w-32 -translate-x-1/2 border-l border-r border-t border-border/60" />
      )}
    </div>
  );
}
