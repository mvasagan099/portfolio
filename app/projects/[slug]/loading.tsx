export default function Loading() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto max-w-content px-6 py-28"
      aria-busy="true"
    >
      <p role="status" className="font-mono text-sm text-muted">
        Loading the page…
      </p>
      <div aria-hidden className="mt-7 h-1 w-24 rounded bg-accent/40" />
    </main>
  );
}
