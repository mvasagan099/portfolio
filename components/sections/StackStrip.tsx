const stack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Python"];
export default function StackStrip() {
  return <div className="border-y border-border/60 bg-surface/50"><div className="mx-auto max-w-content px-6 py-7"><p className="mb-5 text-center font-mono text-[9px] uppercase tracking-[.24em] text-muted">Tools I turn to, from client to cloud</p><ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:justify-between">{stack.map((s,i)=><li key={s} className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-foreground/70"><span aria-hidden className={`h-1 w-1 rounded-full ${i%2?'bg-violet-300/60':'bg-accent/60'}`} />{s}</li>)}</ul></div></div>;
}
