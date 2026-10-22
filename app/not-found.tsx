import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="text-2xl font-semibold text-foreground">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-muted">
        The page you&apos;re looking for may have moved or never existed.
      </p>
      <Link
        href="/"
        className="rounded-md border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent"
      >
        Back home
      </Link>
    </main>
  );
}