import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Github,
  Linkedin
} from "lucide-react";
import Button from "@/components/ui/Button";
import Terminal from "@/components/ui/Terminal";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";
export default function Hero() {
  return (
    <Container
      as="section"
      id="hero"
      className="hero-section relative pb-6 pt-28 md:pb-8 md:pt-32"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative z-10">
          {site.availabilityStatus && (
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-2 text-xs text-accent">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
              {site.availabilityStatus}
            </p>
          )}
          <p className="mb-5 flex flex-wrap items-center gap-2 text-lg font-medium text-foreground">
            {site.name}{" "}
            <span aria-hidden className="text-accent">
              /
            </span>
            <span className="font-mono text-xs text-muted">
              Full Stack Developer
            </span>
          </p>
          <h1 className="text-[clamp(2.3rem,4.8vw,4rem)] font-semibold leading-[1.04] tracking-[-0.06em]">
            Full-stack apps.
            <br />
            <span className="gradient-text">Real-time systems.</span>
            <br />
            Thoughtful code.
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-muted">
            I’m a Full Stack Developer building web and mobile applications with
            React, Node.js, PostgreSQL, Redis, and Docker — from the interface
            to the infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects" arrow className="primary-cta">
              Explore my work
            </Button>
            <Button href="/resume" variant="secondary">
              View résumé <ArrowUpRight size={15} />
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {site.location}
            </span>
            <span aria-hidden className="h-3 w-px bg-border" />
            <a
              href={site.links.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border transition-colors hover:text-accent"
            >
              <Github size={16} />
            </a>
            <a
              href={site.links.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border transition-colors hover:text-accent"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
        <Terminal />
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6 md:mt-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Curiosity is the starting point. Shipping is the goal.
        </p>
        <a
          href="#projects"
          className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
        >
          Scroll to explore <ArrowDown size={14} />
        </a>
      </div>
    </Container>
  );
}
