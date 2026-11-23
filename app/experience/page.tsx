import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { LogoMark } from "@/components/logo-mark";
import { PageHeader } from "@/components/page-header";
import { roles } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "James Dolan's career timeline, from EE retail through BT ThreatCo to SOAR engineering in PwC UK's Managed Cyber Defence team.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        kicker="Experience"
        title="experience.log"
        lede="SOAR engineering at PwC, playbook engineering at BT ThreatCo, and the CAPSLOCK route in from retail."
      />

      <ol className="mt-10 border-t border-line">
        {roles.map((role) => (
          <li key={role.id} className="grid gap-4 border-b border-line py-6 md:grid-cols-[12rem_minmax(0,1fr)]">
            <div className="font-mono text-xs leading-relaxed">
              <p className="text-muted">{role.dates}</p>
              <p className="mt-2">
                <span className={role.current ? "tag tag-live" : "tag"}>{role.current ? "open" : "closed"}</span>
              </p>
            </div>
            <article>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-mono text-2xl leading-tight text-ink">{role.title}</h2>
                  <p className="mt-2 text-muted">
                    {role.organisationUrl ? (
                      <ExternalLink href={role.organisationUrl}>{role.organisation}</ExternalLink>
                    ) : (
                      role.organisation
                    )}
                  </p>
                </div>
                {role.logo ? <LogoMark src={role.logo.src} width={role.logo.width} height={role.logo.height} /> : null}
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">{role.summary}</p>
              {role.note ? <p className="mt-3 font-medium text-accent">{role.note}</p> : null}
              {role.highlights.length > 0 ? (
                <ul className="mt-4 space-y-2 font-mono text-sm text-muted">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="grid grid-cols-[1.25rem_1fr] gap-2">
                      <span className="text-accent" aria-hidden="true">
                        &gt;
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Container>
  );
}
