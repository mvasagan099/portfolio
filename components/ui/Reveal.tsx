"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article";
};
let sharedObserver: IntersectionObserver | undefined;
function observer() {
  return (sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-waiting");
          sharedObserver?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
  ));
}
export default function Reveal({
  children,
  delay = 0,
  y = 12,
  className = "",
  as: Tag = "div"
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      node.getBoundingClientRect().top < window.innerHeight
    )
      return;
    node.classList.add("reveal-waiting");
    const obs = observer();
    obs.observe(node);
    return () => obs.unobserve(node);
  }, []);
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={`reveal ${className}`}
      style={
        {
          "--reveal-y": `${Math.min(y, 16)}px`,
          "--reveal-delay": `${Math.min(delay, 0.15)}s`
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
export type { RevealProps };
