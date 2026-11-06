import { Braces, Database, Layers3, ArrowUpRight, Radio, TerminalSquare } from "lucide-react";
export default function DeveloperOrbit() {
  return <div className="developer-orbit relative mx-auto flex aspect-square w-full max-w-[490px] items-center justify-center" aria-label="Connecting interface, backend, and deployment">
    <div aria-hidden className="orbit-halo absolute inset-[8%] rounded-full" />
    <div aria-hidden className="orbit-ring absolute inset-[13%] rounded-full border border-accent/15" />
    <div aria-hidden className="absolute inset-[24%] rounded-full border border-dashed border-accent/20" />
    <div className="orbit-core relative flex h-[42%] w-[42%] flex-col items-center justify-center rounded-full border border-accent/30">
      <span className="font-mono text-[10px] uppercase tracking-[.22em] text-accent/70">The whole stack</span><span className="mt-2 text-6xl font-semibold tracking-[-.08em] text-foreground sm:text-7xl">M<span className="text-accent">.</span></span><span className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted"><span className="h-1 w-1 rounded-full bg-accent" /> built with curiosity</span>
    </div>
    <div className="orbit-card absolute left-0 top-[10%] -rotate-6"><span className="orbit-icon text-accent"><Braces size={21} /></span><div><p className="text-sm font-medium">The interface</p><p className="mt-1 font-mono text-[10px] text-muted">React / Next.js</p></div><ArrowUpRight size={14} className="ml-2 text-muted" /></div>
    <div className="orbit-card absolute right-0 top-[56%] rotate-6"><span className="orbit-icon text-violet-300"><Database size={21} /></span><div><p className="text-sm font-medium">The engine</p><p className="mt-1 font-mono text-[10px] text-muted">Node.js / PostgreSQL</p></div></div>
    <div className="orbit-card absolute bottom-[9%] left-[3%] -rotate-3"><span className="orbit-icon text-sky-300"><Layers3 size={21} /></span><div><p className="text-sm font-medium">The delivery</p><p className="mt-1 font-mono text-[10px] text-muted">Docker / Cloud</p></div></div>
    <div aria-hidden className="absolute right-[10%] top-[12%] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent"><Radio size={18} /></div>
    <div className="absolute -bottom-5 left-1/2 flex w-max max-w-full -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] text-muted"><TerminalSquare size={13} className="text-accent" /> idea → interface → working product</div>
  </div>;
}
