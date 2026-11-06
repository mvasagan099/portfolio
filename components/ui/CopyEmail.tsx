"use client";
import { useState } from "react";
export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  return (
    <div>
      <button
        type="button"
        className="min-h-11 break-all text-left font-mono text-sm text-muted hover:text-accent"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setStatus("Email copied.");
          } catch {
            setStatus("Select the address to copy it, or use the email link.");
          }
        }}
      >
        {email} <span className="text-xs text-accent">copy</span>
      </button>
      <p role="status" className="mt-1 text-xs leading-6 text-muted">
        {status}
      </p>
    </div>
  );
}
