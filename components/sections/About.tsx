"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { engineeringPrinciples, timeline } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading
        id="about"
        kicker="About"
        title="Curious by nature. Practical by approach."
      />

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        {/* Left: professional story */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">About Me</h3>
          <p className="leading-relaxed text-muted">
            I’m a Full Stack Developer based in Chennai, working at Lords and
            Kings Enterprises Private Limited. My work takes me from React
            interfaces to Node.js services, databases, and deployment.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            I enjoy the parts where systems meet real life: a player reconnecting
            mid-match, an attendance record reaching HR, or a mobile app returning
            from the camera. I’m also exploring machine learning with Python,
            with a focus on careful evaluation.
          </p>
        </div>

        {/* Right: timeline progression */}
        <div>
          <h3 className="mb-6 text-lg font-semibold text-foreground">Path</h3>
          <TimelineProgression />
        </div>
      </div>

      {/* Engineering principles (Phase 9) */}
      <div className="mt-20">
        <h3 className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-muted">
          How I Build
        </h3>
        <EngineeringPrinciples />
      </div>
    </section>
  );
}

function TimelineProgression() {
  const reduce = useReducedMotion();

  return (
    <ol className="relative space-y-0">
      {/* Animated connecting line */}

      {timeline.map((item, i) => (
        <TimelineRow key={item.label} label={item.label} description={item.description} index={i} reduce={!!reduce} />
      ))}
    </ol>
  );
}

function TimelineRow({
  label,
  description,
  index,
  reduce,
}: {
  label: string;
  description: string;
  index: number;
  reduce: boolean;
}) {
  return (
    <li className="relative flex items-start gap-4 py-4">
      <span
        aria-hidden
        className="relative z-10 mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center"
      >
        <span className="h-3.5 w-3.5 rounded-full border border-accent/60 bg-background" />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent"
            initial={{ scale: 0, opacity: 0.6 }}
            whileInView={{ scale: 1, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        )}
      </span>
      <div>
        <p className="font-medium text-foreground">{label}</p><p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      </div>
    </li>
  );
}

function EngineeringPrinciples() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {engineeringPrinciples.map((p, i) => (
        <Reveal key={p.number} delay={i * 0.05}>
          <div className="h-full rounded-xl border border-border/60 bg-surface/40 p-5 transition-colors hover:border-accent/30">
            <span className="font-mono text-2xl font-semibold text-accent">{p.number}</span>
            <h4 className="mt-3 font-medium text-foreground">{p.title}</h4>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
