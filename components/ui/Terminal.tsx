"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/data/site";

/**
 * Reusable, purely-visual developer terminal. Not a real shell.
 * Data-driven from site config, with typing/reveal animation and
 * full reduced-motion support (shows the complete terminal instantly).
 */
export default function Terminal() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(reduce ?? false);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, [reduce]);

  const blocks = [
    { cmd: "$ whoami", out: [hero.whoami] },
    { cmd: "$ focus", out: hero.focus },
    { cmd: "$ stack", out: hero.stack },
    { cmd: "$ status", out: [hero.status] },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface text-sm shadow-2xl">
      <TerminalChrome />
      <div className="min-h-[22rem] space-y-2 p-5 font-mono text-[13px] leading-relaxed">
        {reduce ? (
          blocks.map((b, i) => (
            <div key={i}>
              <div className="text-foreground">
                <span className="text-accent">❯</span> {b.cmd}
              </div>
              <div className="mb-2 mt-1 text-muted">
                {b.out.map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <>
            {visible && blocks.map((b, i) => <TypedBlock key={i} block={b} start={i * 850} />)}
          </>
        )}
        <div className="flex items-center text-accent">
          <span>❯</span>
          <Cursor />
        </div>
      </div>
    </div>
  );
}

function TerminalChrome() {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-surfaceAlt px-4 py-2.5">
      <span className="h-3 w-3 rounded-full bg-red-400/70" />
      <span className="h-3 w-3 rounded-full bg-amber-400/70" />
      <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
      <span className="ml-2 font-mono text-xs text-muted">~/developer</span>
    </div>
  );
}

function Cursor() {
  return (
    <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-accent" aria-hidden />
  );
}

function TypedBlock({
  block,
  start,
}: {
  block: { cmd: string; out: string[] };
  start: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), start);
    return () => clearTimeout(t);
  }, [start]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-foreground">
        <span className="text-accent">❯</span> {block.cmd}
      </div>
      <div className="mb-2 mt-1 text-muted">
        {block.out.map((line, j) => (
          <div key={j}>{line}</div>
        ))}
      </div>
    </motion.div>
  );
}
