import { Braces, GitBranch } from "lucide-react";
import { hero } from "@/data/site";

export default function Terminal() {
  return <div className="relative min-w-0">
    <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-accent/[0.04] blur-3xl" />
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-4"><span className="flex items-center gap-2 font-mono text-xs text-muted"><Braces size={15} className="text-accent" /> developer.ts</span><span className="flex gap-1.5" aria-hidden>{[1,2,3].map(i=><span key={i} className="h-2 w-2 rounded-full bg-border" />)}</span></div>
      <div className="overflow-x-auto p-6 font-mono text-[12px] leading-7 sm:p-8 sm:text-[13px]">
        <p><span className="text-violet-300">const</span> developer <span className="text-muted">= &#123;</span></p>
        <p className="pl-5"><span className="text-muted">name:</span> <span className="text-accent">&quot;{hero.whoami}&quot;</span>,</p>
        <p className="pl-5"><span className="text-muted">role:</span> <span className="text-accent">&quot;Full Stack Developer&quot;</span>,</p>
        <p className="pl-5 text-muted">stack: [</p>
        {hero.stack.map((t,i)=><p key={t} className="pl-10 text-amber-200/90">&quot;{t}&quot;{i<hero.stack.length-1?',':''}</p>)}
        <p className="pl-5 text-muted">],</p>
        <p className="pl-5"><span className="text-muted">mindset:</span> <span className="text-accent">&quot;Keep building.&quot;</span></p>
        <p className="text-muted">&#125;;</p>
        <p className="mt-6 text-muted"><span className="text-accent">❯</span> {hero.status}<span aria-hidden className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-accent align-middle" /></p>
      </div>
      <div className="flex items-center justify-between border-t border-border bg-surfaceAlt/50 px-5 py-3 font-mono text-[10px] text-muted"><span className="flex items-center gap-1.5"><GitBranch size={12} /> main</span><span>Always a work in progress</span></div>
    </div>
  </div>;
}
