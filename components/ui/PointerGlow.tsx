"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Very subtle accent glow that follows the pointer.
 * Desktop only, disabled on touch devices, respects reduced motion,
 * and positioned with `fixed` (no layout shift). Uses transform-only
 * updates to stay cheap on the main thread.
 */
export default function PointerGlow() {
  const reduce = useReducedMotion();
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return; // touch devices — disabled
    }

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCoords({ x: e.clientX, y: e.clientY }));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (reduce || !coords) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[30rem] w-[30rem] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(110,231,183,0.07), transparent 60%)",
      }}
      animate={{ x: coords.x - 240, y: coords.y - 240 }}
      transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
    />
  );
}