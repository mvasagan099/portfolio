"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button, Terminal } from "@/components";
import { hero, site, technicalHighlights } from "@/data/site";
import { isProfileUrl } from "@/lib/links";

export default function Hero() {
  const reduce = useReducedMotion();
  const hasGithub = isProfileUrl(site.links.github.url);
  const hasLinkedin = isProfileUrl(site.links.linkedin.url);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="hero" className="relative">
      <div className="mx-auto grid max-w-content gap-12 px-6 pb-24 pt-32 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:pt-40">
        {/* Left column */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.div variants={item} className="mb-6">
            {site.availabilityStatus && (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
                {site.availabilityStatus}
              </span>
            )}
          </motion.div>

          <motion.p
            variants={item}
            className="font-mono text-sm uppercase tracking-[0.25em] text-muted"
          >
            {site.name}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 max-w-xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            I build{" "}
            <span className="text-accent">scalable</span>{" "}
            software systems<span className="text-accent">.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg text-muted">
            Full-stack development · Real-time systems · Backend architecture ·
            Machine learning
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" arrow>
              Explore Projects
            </Button>
            <Button href="#contact" variant="secondary">
              Get in Touch
            </Button>
          </motion.div>

          {(hasGithub || hasLinkedin) && (
            <motion.div variants={item} className="mt-10 flex items-center gap-5">
              {hasGithub && (
                <a
                  href={site.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              )}
              {hasGithub && hasLinkedin && (
                <span aria-hidden className="h-4 w-px bg-border" />
              )}
              {hasLinkedin && (
                <a
                  href={site.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              )}
            </motion.div>
          )}

          {/* Factual, non-numeric technical highlights (Phase 20) */}
          <motion.div variants={item} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {technicalHighlights.map((h) => (
              <div
                key={h}
                className="rounded-lg border border-border/60 bg-surface/40 px-3 py-2 text-center"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {h}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column: terminal */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
