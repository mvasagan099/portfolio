import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="font-mono text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs text-muted">
          Designed &amp; built with care.
        </p>
      </div>
    </footer>
  );
}