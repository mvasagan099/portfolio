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
        Social links will appear here once configured in{" "}
        <code>data/site.ts</code>.
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-accent"
        >
          <Github aria-hidden className="h-5 w-5" />
        </a>
      )}
      {hasLinkedin && (
        <a
          href={site.links.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-accent"
        >
          <Linkedin aria-hidden className="h-5 w-5" />
        </a>
      )}
      {hasMail && (
        <a
          href={`mailto:${site.links.email}`}
          aria-label="Email"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-accent"
        >
          <Mail aria-hidden className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
