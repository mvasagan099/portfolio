"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { isProfileUrl, isConfiguredEmail } from "@/lib/links";

/**
 * Social profile links. Each link renders only when a real URL is configured.
 */
export default function SocialLinks({ className }: { className?: string }) {
  const hasGithub = isProfileUrl(site.links.github.url);
  const hasLinkedin = isProfileUrl(site.links.linkedin.url);
  const hasMail = isConfiguredEmail(site.links.email);

  if (!hasGithub && !hasLinkedin && !hasMail) {
    return (
      <p className="text-sm text-muted">
        Social links will appear here once configured in <code>data/site.ts</code>.
      </p>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {hasGithub && (
        <a
          href={site.links.github.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="text-muted transition-colors hover:text-accent"
        >
          <Github className="h-5 w-5" />
        </a>
      )}
      {hasLinkedin && (
        <a
          href={site.links.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="text-muted transition-colors hover:text-accent"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      )}
      {hasMail && (
        <a
          href={`mailto:${site.links.email}`}
          aria-label="Email"
          className="text-muted transition-colors hover:text-accent"
        >
          <Mail className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}