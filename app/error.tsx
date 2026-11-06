"use client";
import Link from "next/link";
export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-content px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Page unavailable
      </p>
      <h1 className="mt-4 text-3xl font-semibold">
        Something didn’t load correctly.
      </h1>
      <p className="mt-4 max-w-lg leading-7 text-muted">
        Please try again. Your browser may need a fresh connection.
      </p>
      <div className="mt-7 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-md bg-accent px-5 text-sm font-medium text-background"
        >
          Try again
        </button>
        <Link
          className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm"
          href="/"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
