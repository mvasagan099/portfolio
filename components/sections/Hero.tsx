import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Terminal from "@/components/ui/Terminal";
import { site } from "@/data/site";

export default function Hero() {
  return <section id="hero" className="relative mx-auto max-w-content px-6 pb-14 pt-36 md:pb-20 md:pt-44">
    <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-2 text-xs text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{site.availabilityStatus}</p>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">Hello, I’m Manivasagan</p>
        <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1.06] tracking-[-0.055em]">From an idea<br />to a working<br /><span className="text-accent">product.</span></h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">Full Stack Developer connecting thoughtful interfaces, reliable APIs, and real-time experiences.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button href="#projects" arrow>Explore my work</Button><Button href="/resume" variant="secondary">View résumé <ArrowUpRight size={15} /></Button></div>
        <p className="mt-8 flex items-center gap-2 text-xs text-muted"><MapPin size={13} /> {site.location}<span className="mx-2 text-border">/</span> React · Node.js · PostgreSQL</p>
      </div>
      <Terminal />
    </div>
    <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6 md:mt-20"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">From interface to infrastructure</p><a href="#projects" className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent">Selected work <ArrowDown size={14} /></a></div>
  </section>;
}
