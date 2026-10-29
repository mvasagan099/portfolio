import type { Metadata } from "next";
import Link from "next/link";
import { site, experience, timeline } from "@/data/site";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import PrintResume from "@/components/ui/PrintResume";
export const metadata: Metadata = { title: "Résumé", description: "Professional experience, selected projects, and technical skills of Manivasagan A., Full Stack Developer.", alternates: { canonical: "/resume/" } };
export default function Resume() {
  return <main id="main" className="resume-page mx-auto max-w-3xl px-6 py-12">
    <div className="no-print mb-12 flex items-center justify-between gap-4"><Link href="/" className="text-sm text-muted hover:text-accent">← Back to portfolio</Link><PrintResume /></div>
    <header className="border-b border-border pb-8"><p className="font-mono text-xs uppercase tracking-widest text-accent">Résumé</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">{site.name}</h1><p className="mt-2 text-lg text-muted">{site.title} · {site.location}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a className="text-accent" href={`mailto:${site.links.email}`}>{site.links.email}</a><a className="text-accent" href={site.links.github.url}>GitHub</a><a className="text-accent" href={site.links.linkedin.url}>LinkedIn</a></div></header>
    <section className="mt-8"><h2 className="text-lg font-semibold">Profile</h2><p className="mt-3 leading-7 text-muted">Full Stack Developer working with React, Node.js, PostgreSQL, Redis, and Docker. Hands-on work across attendance workflows, real-time applications, mobile development, and deployment. Exploring applied machine learning with Python and careful model evaluation.</p></section>
    <section className="mt-8"><h2 className="text-lg font-semibold">Experience</h2>{experience.map(job=><article key={job.company} className="mt-4"><div className="flex flex-wrap justify-between gap-2"><h3 className="font-medium">{job.role}</h3><p className="text-sm text-muted">{job.date}</p></div><p className="mt-1 text-sm text-accent">{job.company}</p><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">{job.contributions.map(c=><li key={c}>{c}</li>)}</ul></article>)}</section>
    <section className="mt-8"><h2 className="text-lg font-semibold">Technical skills</h2><dl className="mt-3 space-y-2 text-sm leading-6">{skillCategories.map(c=><div key={c.title}><dt className="inline font-medium">{c.title}: </dt><dd className="inline text-muted">{c.skills.map(s=>s.name).join(", ")}</dd></div>)}<div><dt className="inline font-medium">Mobile: </dt><dd className="inline text-muted">Flutter, Dart, Capacitor, Android</dd></div></dl></section>
    <section className="mt-8"><h2 className="text-lg font-semibold">Selected projects</h2><div className="mt-4 space-y-5">{projects.map(p=><article key={p.slug} className="break-inside-avoid"><h3 className="font-medium"><Link href={`/projects/${p.slug}/`}>{p.title}</Link></h3><p className="mt-1 text-sm leading-6 text-muted">{p.oneLiner}</p><p className="mt-1 font-mono text-[11px] text-accent">{p.technologies.join(" · ")}</p></article>)}</div></section>
    <section className="mt-8 border-t border-border pt-6"><h2 className="text-lg font-semibold">Education</h2><p className="mt-3 text-sm leading-6 text-muted">{timeline[0].description}</p></section>
  </main>;
}
