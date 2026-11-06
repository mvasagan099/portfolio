import { ArrowDown, Network } from "lucide-react";
import type { Project } from "@/types";

/** Data-driven schematic, not a product screenshot or a deployment claim. */
export default function ProjectArchitecture({ project }: { project: Project }) {
  return <figure className="rounded-xl border border-border bg-background/60 p-5 sm:p-6">
    <figcaption className="mb-6 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-muted"><span className="flex items-center gap-2"><Network size={13} />{project.architecture?.type}</span><span className="text-accent">0{project.order}</span></figcaption>
    <ol className="space-y-2">{project.architecture?.layers.map((layer,i)=><li key={i}>
      {i>0&&<ArrowDown aria-hidden className="mx-auto mb-2 h-4 w-4 text-accent/50" />}
      <div className={`grid gap-2 ${layer.length>1?'grid-cols-2':''}`}>{layer.map(label=><div key={label} className={`flex min-h-14 items-center justify-center rounded-lg border px-2 py-3 text-center font-mono text-[11px] leading-5 ${i===0?'border-accent/30 bg-accent/5 text-accent':'border-border bg-surface text-muted'}`}>{label}</div>)}</div>
    </li>)}</ol>
  </figure>;
}
