import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import LazyContactForm from "@/components/ui/LazyContactForm";
import CopyEmail from "@/components/ui/CopyEmail";
import { site } from "@/data/site";
export default function Contact() {
  return (
    <Container
      as="section"
      id="contact"
      aria-labelledby="contact-heading"
      className="section-space"
    >
      <SectionHeading
        id="contact"
        kicker="Contact"
        title="Let’s build something useful."
      />
      <div className="contact-banner mt-10 grid gap-10 overflow-hidden rounded-2xl border border-accent/20 p-5 sm:p-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:py-6">
          <p className="max-w-md text-base leading-8 text-muted">
            Looking for a developer who enjoys working across the stack? I’m
            open to developer roles and conversations about web and mobile
            products.
          </p>
          <div className="mt-7">
            <Button href={`mailto:${site.links.email}`} arrow>
              Email me directly
            </Button>
          </div>
          <div className="mt-5">
            <CopyEmail email={site.links.email} />
          </div>
          <p className="my-6 text-xs leading-6 text-muted">
            Chennai, India · Open to remote opportunities
          </p>
          <SocialLinks />
        </div>
        <LazyContactForm />
      </div>
    </Container>
  );
}
