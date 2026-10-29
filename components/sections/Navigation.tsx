"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const NAV_ITEMS = [
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking via IntersectionObserver.
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  // Close the mobile menu on navigation.

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center justify-between px-6 py-4"
      >
        <Link href="/#hero" aria-label="Mani — home"
          className="font-mono text-sm font-semibold text-foreground"
        >
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={isActive ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu toggle */}
        <button
          id="menu-toggle" aria-controls="mobile-menu" className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <div className="space-y-1.5 p-2">
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.ul id="mobile-menu"
          initial={reduce ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-md md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block w-full py-3 text-left text-base text-muted hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
