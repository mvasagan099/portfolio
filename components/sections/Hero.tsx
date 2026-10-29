import { ArrowDown, ArrowUpRight, MapPin, Github, Linkedin } from "lucide-react";
import Button from "@/components/ui/Button";
import DeveloperOrbit from "@/components/ui/DeveloperOrbit";
import { site } from "@/data/site";
export default function Hero() {
  return <section id="hero" className="hero-section relative mx-auto max-w-content px-6 pb-12 pt-32 md:pb-16 md:pt-40">
    <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
      <div className="relative z-10">
        <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-2 text-xs text-accent"><span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />{site.availabilityStatus}</p>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-muted">Manivasagan A. <span className="text-accent">/</span> Full Stack Developer</p>
        <h1 className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.06em]">Good ideas.<br /><span className="gradient-text">Thoughtful code.</span><br />Real products.</h1>
        <p className="mt-7 max-w-md text-base leading-7 text-muted">I turn complex problems into useful digital experiences — from the first interaction to the systems behind it.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button href="#projects" arrow className="primary-cta">Explore my work</Button><Button href="/resume" variant="secondary">View résumé <ArrowUpRight size={15} /></Button></div>
        <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-muted"><span className="flex items-center gap-1.5"><MapPin size={13} />{site.location}</span><span aria-hidden className="h-3 w-px bg-border" /><a href={site.links.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="transition-colors hover:text-accent"><Github size={16} /></a><a href={site.links.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="transition-colors hover:text-accent"><Linkedin size={16} /></a></div>
      </div>
      <DeveloperOrbit />
    </div>
    <div className="mt-20 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6 md:mt-24"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Curiosity is the starting point. Shipping is the goal.</p><a href="#projects" className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent">Scroll to explore <ArrowDown size={14} /></a></div>
  </section>;
}
