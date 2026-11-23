import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { PageHeader } from "@/components/page-header";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Send James Dolan a message about SOAR engineering, security automation, or a conversation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
        <div>
          <PageHeader
            kicker="Contact"
            title="Send a note."
            lede="For SOAR engineering, security automation, or a straightforward conversation. James is based in the Falkirk area, Scotland."
          />
          <p className="mt-6 text-muted">
            LinkedIn: <ExternalLink href={site.linkedin}>james-dolan-3686A869</ExternalLink>
          </p>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}
