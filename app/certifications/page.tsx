import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { LogoMark } from "@/components/logo-mark";
import { PageHeader } from "@/components/page-header";
import { certifications } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Certifications",
  description:
    "Certifications held by James Dolan, including PCSAE, SSCP, BCS CISMP, CAPSLOCK Ce-CSP, CCSK, and ISO 27001 Foundation.",
  path: "/certifications",
});

function CertList({ status }: { status: "held" | "in-progress" }) {
  const items = certifications.filter((item) => item.status === status);
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.id}>
          <article className="flex h-full gap-4 rounded-3xl border border-line bg-bg-elev p-5">
            <LogoMark src={item.logo.src} width={item.logo.width} height={item.logo.height} />
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-brass uppercase">
                {item.status === "held" ? item.issued : "In progress"}
              </p>
              <h3 className="mt-1 font-serif text-2xl leading-tight text-ink">{item.name}</h3>
              <p className="mt-1 text-sm text-muted">{item.issuer}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
              <p className="mt-3">
                <ExternalLink href={item.url}>{item.linkLabel}</ExternalLink>
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function CertificationsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        kicker="Certifications"
        title="Credentials, with the dates."
        lede="Held certifications are listed with the month they were awarded. Anything still in progress is labelled as such."
      />
      <section aria-labelledby="held-certs" className="mt-12">
        <h2 id="held-certs" className="font-serif text-3xl text-ink">
          Held
        </h2>
        <CertList status="held" />
      </section>
      <section aria-labelledby="progress-certs" className="mt-12">
        <h2 id="progress-certs" className="font-serif text-3xl text-ink">
          In progress
        </h2>
        <CertList status="in-progress" />
      </section>
    </Container>
  );
}
