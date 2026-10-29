import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import ProjectArchitecture from "@/components/ui/ProjectArchitecture";
export default function FeaturedProject({ project }: { project: Project }) {
  return <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors hover:border-accent/40">
    <div className="border-b border-border bg-gradient-to-br from-accent/[0.035] to-transparent p-5 sm:p-7"><ProjectArchitecture project={project} /></div>
    <div className="flex flex-1 flex-col p-6 sm:p-7"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">{project.category}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight"><Link className="transition-colors hover:text-accent" href={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p className="mt-2 text-sm leading-6 text-muted">{project.shortDescription}</p>
      <div className="my-5 flex flex-wrap gap-2">{project.technologies.slice(0,5).map(t=><span key={t} className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted">{t}</span>)}</div>
      <Link href={`/projects/${project.slug}`} className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm transition-colors hover:text-accent">Read case study <ArrowUpRight size={18} className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
    </div>
  </article>;
}
