"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "article") for valid semantic HTML. */
  as?: "div" | "li" | "article";
};

const motionElements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
};

const plainElements = {
  div: "div",
  li: "li",
  article: "article",
} as const;

export type { RevealProps };

/**
 * Scroll-reveal wrapper. Subtle opacity + translate on enter.
 * Renders a plain element under reduced motion so reduced-motion users
 * never see content stuck at opacity 0 (useReducedMotion is null on the
 * server, so we render exactly what the user will receive after hydration).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = plainElements[as];
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motionElements[as];
  return (
    <MotionTag
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}