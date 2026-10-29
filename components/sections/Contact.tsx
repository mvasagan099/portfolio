"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import { site } from "@/data/site";
import { isConfiguredEmail } from "@/lib/links";

/**
 * Final contact CTA (Phase 21). Professional tone. Uses a directly usable
 * mailto link (no backend) with copy-to-clipboard feedback.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const emailConfigured = isConfiguredEmail(site.links.email);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.links.email);
      setCopyError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading id="contact" kicker="Contact" title="" />

      <div className="mt-12 rounded-2xl border border-border/70 bg-surface/30 p-8 sm:p-12">
        <h2 className="max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s build something<span className="text-accent">.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Looking for a developer who enjoys working across the stack?
          I’m open to developer roles and conversations about thoughtful
          web and mobile products.
        </p>

        <div className="mt-10 space-y-6">
          {emailConfigured ? (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <Button href={`mailto:${site.links.email}`} arrow>
                  Get In Touch
                </Button>
                <button
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
                  aria-live="polite"
                >
                  {site.links.email}
                  <span className="text-xs text-accent">
                    {copied ? "copied ✓" : "copy"}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">
              Contact details will appear here once configured in{" "}
              <code>data/site.ts</code>.
            </p>
          )}

          {copyError && <p role="status" className="text-sm text-muted">Couldn’t copy automatically. Select the email address or use Get In Touch to open your email app.</p>}
          <p className="text-xs text-muted">Chennai, India · Open to remote opportunities</p>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}