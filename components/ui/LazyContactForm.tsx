"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ContactForm = lazy(() => import("./ContactForm"));
function FormPlaceholder() {
  return (
    <div className="rounded-2xl border border-border bg-background/30 p-6">
      <h3 className="text-lg font-medium">Send an enquiry</h3>
      <p className="mt-3 text-sm leading-7 text-muted">
        The form will appear here. You can also use the direct email link.
      </p>
    </div>
  );
}
export default function LazyContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          obs.disconnect();
        }
      },
      { rootMargin: "500px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="min-w-0">
      <Suspense fallback={<FormPlaceholder />}>
        {ready ? <ContactForm /> : <FormPlaceholder />}
      </Suspense>
    </div>
  );
}
