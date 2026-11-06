"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";
const NAV_ITEMS = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];
export default function Navigation() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id))
      .filter((s): s is HTMLElement => !!s)
      .sort((a, b) => a.offsetTop - b.offsetTop);
    const update = () => {
      setScrolled(window.scrollY > 12);
      let current = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.35)
          current = s.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      )
        current = "contact";
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const links = (mobile: boolean) =>
    NAV_ITEMS.map((item) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
          onClick={() => setOpen(false)}
          className={`${mobile ? "block min-h-11 py-3" : "inline-flex min-h-11 items-center px-3"} nav-link text-sm transition-colors ${active === item.id ? "text-accent" : "text-muted hover:text-foreground"}`}
        >
          {item.label}
        </a>
      </li>
    ));
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || open ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent bg-background/70"}`}
    >
      <Container>
        <nav
          aria-label="Primary"
          className="flex min-h-[72px] items-center justify-between"
        >
          <Link
            href="/#hero"
            aria-label="Mani — home"
            className="inline-flex min-h-11 items-center font-mono font-semibold"
          >
            {site.shortName}
            <span className="text-accent">.</span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">{links(false)}</ul>
          <button
            ref={toggle}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-border md:hidden"
          >
            {open ? (
              <X size={21} aria-hidden />
            ) : (
              <Menu size={21} aria-hidden />
            )}
          </button>
        </nav>
        <ul
          id="mobile-menu"
          hidden={!open}
          className="border-t border-border pb-4 md:hidden"
        >
          {links(true)}
        </ul>
      </Container>
    </header>
  );
}
