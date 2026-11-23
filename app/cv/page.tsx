import Link from "next/link";
import { Container } from "@/components/container";
import { PrintButton } from "@/components/print-button";
import { certifications, education, roles, skills } from "@/content/profile";
import { cvPdfAvailable, cvPdfHref } from "@/lib/cv";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "CV",
  description: "Printable CV for James Dolan, SOAR engineer in PwC UK's Managed Cyber Defence team.",
  path: "/cv",
});

export default function CvPage() {
  const held = certifications.filter((item) => item.status === "held");
  const inProgress = certifications.filter((item) => item.status === "in-progress");

  return (
    <Container className="py-12 sm:py-16">
      <div className="no-print mb-8 flex flex-wrap items-center gap-3">
        <PrintButton />
        {cvPdfAvailable ? (
          <a href={cvPdfHref} className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-semibold text-ink no-underline">
            Download PDF
          </a>
        ) : (
          <p className="text-sm text-muted">
            No separate PDF is published yet. Use Print or save as PDF. To add one, place it at <code className="font-mono">public/cv/james-dolan.pdf</code>.
          </p>
        )}
      </div>

      <article className="mx-auto max-w-3xl">
        <header>
          <h1 className="font-serif text-5xl leading-none text-ink">{site.name}</h1>
          <p className="mt-3 text-lg text-ink">{site.role}</p>
          <p className="mt-1 text-muted">
            {site.location} ·{" "}
            <Link href="/" className="text-link">
              {site.url.replace("https://", "")}
            </Link>{" "}
            ·{" "}
            <a href={site.linkedin} className="text-link">
              LinkedIn
            </a>
          </p>
        </header>

        <section aria-labelledby="cv-summary" className="mt-8">
          <h2 id="cv-summary" className="font-serif text-2xl text-ink">
            Summary
          </h2>
          <p className="mt-2 text-muted">{site.description}</p>
          <p className="mt-2 text-muted">{site.support}</p>
        </section>

        <section aria-labelledby="cv-experience" className="mt-8">
          <h2 id="cv-experience" className="font-serif text-2xl text-ink">
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {roles.map((role) => (
              <section key={role.id} aria-labelledby={`cv-${role.id}`}>
                <h3 id={`cv-${role.id}`} className="text-lg font-semibold text-ink">
                  {role.title}
                </h3>
                <p className="text-sm text-muted">
                  {role.organisation} · {role.dates}
                </p>
                {role.note ? <p className="mt-1 text-sm text-ink">{role.note}</p> : null}
                {role.highlights.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted">{role.summary}</p>
                )}
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="cv-skills" className="mt-8">
          <h2 id="cv-skills" className="font-serif text-2xl text-ink">
            Skills
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            {skills.map((skill) => (
              <li key={skill.title}>
                <span className="text-ink">{skill.title}.</span> {skill.description}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cv-certs" className="mt-8">
          <h2 id="cv-certs" className="font-serif text-2xl text-ink">
            Certifications
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {held.map((item) => (
              <li key={item.id}>
                {item.name} · {item.issuer}
                {item.issued ? ` · ${item.issued}` : ""}
              </li>
            ))}
            {inProgress.map((item) => (
              <li key={item.id}>
                {item.name} · in progress
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cv-education" className="mt-8">
          <h2 id="cv-education" className="font-serif text-2xl text-ink">
            Education
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {education.map((item) => (
              <li key={item.qualification}>
                {item.qualification} · {item.school} · {item.dates}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Container>
  );
}
