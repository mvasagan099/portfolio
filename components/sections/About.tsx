import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/ui/Timeline";
import Reveal from "@/components/ui/Reveal";
import { engineeringPrinciples, timeline } from "@/data/site";
export default function About() {
  return (
    <Container
      as="section"
      id="about"
      aria-labelledby="about-heading"
      className="section-space"
    >
      <SectionHeading
        id="about"
        kicker="About"
        title="Following the problem across the whole stack."
      />
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-base leading-8 text-muted">
            I’m Mani, a Full Stack Developer based in Chennai, working at Lords
            and Kings Enterprises Private Limited. I build React interfaces,
            Node.js services, and the database and deployment layers that
            connect them.
          </p>
          <p className="mt-5 text-base leading-8 text-muted">
            I enjoy the details that show up in real use: a player reconnecting
            mid-match, an attendance record reaching HR, or a mobile app
            returning from the camera. Understanding those moments helps me make
            better engineering decisions.
          </p>
          <p className="mt-5 text-base leading-8 text-muted">
            I’m early in my career and learn by building, testing, and improving
            working applications. My Python and machine-learning research
            follows the same approach: measure carefully and be honest about the
            result.
          </p>
        </div>
        <Timeline items={timeline} />
      </div>
      <div className="mt-14">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[.2em] text-muted">
          How I approach the work
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringPrinciples.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.04}>
              <article className="h-full rounded-xl border border-border bg-surface/50 p-5">
                <span className="font-mono text-xl text-accent">
                  {step.number}
                </span>
                <h4 className="mt-3 font-medium">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
