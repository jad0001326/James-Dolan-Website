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
        title="The work, in the open."
        lede="SOAR engineering at PwC, playbook engineering at BT ThreatCo, and the CAPSLOCK route in from retail."
      />

      <ol className="mt-12 space-y-8 border-l border-line pl-6 sm:pl-8">
        {roles.map((role) => (
          <li key={role.id} className="relative">
            <span className="absolute top-7 -left-[1.85rem] size-3 rounded-full border-2 border-bg bg-accent sm:-left-[2.35rem]" aria-hidden="true" />
            <article className="rounded-3xl border border-line bg-bg-elev p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  {role.current ? (
                    <p className="font-mono text-xs font-medium tracking-[0.14em] text-brass uppercase">Current</p>
                  ) : null}
                  <h2 className="mt-1 font-serif text-3xl leading-tight text-ink">{role.title}</h2>
                  <p className="mt-2 text-muted">
                    {role.organisationUrl ? (
                      <ExternalLink href={role.organisationUrl}>{role.organisation}</ExternalLink>
                    ) : (
                      role.organisation
                    )}
                    <span> · {role.dates}</span>
                  </p>
                </div>
                {role.logo ? (
                  <LogoMark src={role.logo.src} width={role.logo.width} height={role.logo.height} />
                ) : null}
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">{role.summary}</p>
              {role.note ? <p className="mt-3 font-semibold text-ink">{role.note}</p> : null}
              {role.highlights.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="leading-relaxed marker:text-brass">
                      {highlight}
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
