import { Github, ArrowUpRight, GitBranch, TerminalSquare } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { githubSection, hero, technicalHighlights } from "@/data/site";
import { isConfiguredGithub, isProfileUrl } from "@/lib/links";
export default function GitHub() {
  const configured =
    isConfiguredGithub(githubSection.username) &&
    isProfileUrl(githubSection.url);
  return (
    <Container
      as="section"
      id="github"
      aria-labelledby="github-heading"
      className="section-space"
    >
      <SectionHeading
        id="github"
        kicker="Code & focus"
        title="The code, and the thinking behind it."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/40 p-6">
          <div className="flex items-center gap-3">
            <Github size={24} aria-hidden className="text-accent" />
            <h3 className="font-mono text-sm">{githubSection.username}</h3>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">
            Public repositories live on GitHub. Some product work is private;
            the case studies explain its architecture and engineering decisions.
          </p>
          <ul className="mt-6 space-y-4">
            {githubSection.repos
              .filter((r) => isProfileUrl(r.url))
              .map((repo) => (
                <li key={repo.url}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-border p-4 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center justify-between gap-3 font-mono text-sm">
                      <span className="flex items-center gap-2">
                        <GitBranch size={15} aria-hidden />
                        {repo.name}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-accent"
                        aria-hidden
                      />
                    </span>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {repo.description}
                    </p>
                    <span className="mt-3 block text-xs text-accent">
                      {repo.language}
                    </span>
                  </a>
                </li>
              ))}
          </ul>
          {!githubSection.repos.length && (
            <p className="mt-5 text-sm text-muted">
              Browse the profile for available public work.
            </p>
          )}
          {configured && (
            <div className="mt-6">
              <Button
                href={githubSection.url}
                external
                variant="secondary"
                arrow
              >
                Explore GitHub
              </Button>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-6">
          <TerminalSquare size={24} aria-hidden className="text-accent" />
          <h3 className="mt-5 font-medium">Technical focus</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            {hero.focus.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden className="text-accent">
                  →
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2">
            {technicalHighlights.map((h) => (
              <Badge key={h}>{h}</Badge>
            ))}
          </div>
          <p className="mt-7 border-t border-border pt-5 font-mono text-xs leading-6 text-muted">
            $ status
            <br />
            <span className="text-accent">{hero.status}</span>
          </p>
        </div>
      </div>
    </Container>
  );
}
