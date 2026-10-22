/**
 * Static technical background: a fine grid plus a soft radial fade.
 * Deliberately almost invisible and fully static (no animation) so it never
 * competes with content or costs performance.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid mask-fade-b" />
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[40vw] rounded-full bg-accent/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-10vw] h-[50vh] w-[40vw] rounded-full bg-accent/[0.03] blur-3xl" />
    </div>
  );
}