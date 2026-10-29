"use client";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedProject from "@/components/sections/FeaturedProject";
import { projects } from "@/data/projects";
const categories = ["All work", ...new Set(projects.map(p=>p.category))];
export default function Projects() {
  const [category,setCategory]=useState("All work");
  const visible=projects.filter(p=>category==="All work"||p.category===category).sort((a,b)=>a.order-b.order);
  return <section id="projects" className="mx-auto max-w-content px-6 py-20">
    <SectionHeading id="projects" kicker="Selected work" title="A few things I’ve put into the world." />
    <p className="mt-5 max-w-xl leading-7 text-muted">A closer look at the applications I’m building, the decisions behind them, and what I’m learning along the way.</p>
    <div role="group" aria-label="Filter projects" className="mb-8 mt-8 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={`rounded-full border px-4 py-2 text-xs transition-colors ${category===c?'border-accent/40 bg-accent/10 text-accent':'border-border text-muted hover:border-accent/40 hover:text-foreground'}`}>{c}</button>)}</div>
    <p className="sr-only" role="status">{visible.length} projects shown</p>
    <div className="grid gap-7 md:grid-cols-2">{visible.map(p=><FeaturedProject key={p.slug} project={p} />)}</div>
  </section>;
}
