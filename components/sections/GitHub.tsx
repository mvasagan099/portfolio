import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { githubSection } from "@/data/site";
import { isConfiguredGithub, isProfileUrl } from "@/lib/links";

/**
 * GitHub / open-source section (Phase 18).
 * Uses local data (not fabricated stats). A real GitHub API integration
 * can replace `repos` later without changing the layout.
 */
export default function GitHub() {
  const configured = isConfiguredGithub(githubSection.username);
  const hasRepos = githubSection.repos.length > 0;

  return (
    <section id="github" className="mx-auto max-w-content px-6 py-24">
      <SectionHeading id="github" kicker="Open Source" title="Code I've written." />

      {configured && (
        <div className="mt-8 flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-muted" />
          <a
            href={githubSection.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            github.com/{githubSection.username}
          </a>
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {hasRepos ? (
          githubSection.repos.map((repo, i) => {
            const linked = isProfileUrl(repo.url);
            return (
              <Reveal key={repo.name} delay={i * 0.05}>
                {linked ? (
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-xl border border-border/60 bg-surface/40 p-6 transition-colors hover:border-accent/40"
                  >
                    <RepoBody repo={repo} />
                  </a>
                ) : (
                  <div className="flex h-full flex-col rounded-xl border border-border/60 bg-surface/40 p-6">
                    <RepoBody repo={repo} />
                  </div>
                )}
              </Reveal>
            );
          })
        ) : (
          <p className="col-span-full text-muted">
            Repositories will appear here once configured in{" "}
            <code>data/site.ts</code>.
          </p>
        )}
      </div>

      {configured && (
        <div className="mt-10">
          <Button href={githubSection.url} variant="secondary" external arrow>
            View GitHub
          </Button>
        </div>
      )}
    </section>
  );
}

function RepoBody({ repo }: { repo: { name: string; description: string; language: string } }) {
  return (
    <>
      <h3 className="font-mono text-lg font-semibold text-foreground group-hover:text-accent">
        {repo.name}
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted">{repo.description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-accent" />
        {repo.language}
      </span>
    </>
  );
}