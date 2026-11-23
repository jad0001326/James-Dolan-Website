import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getCaseStudies } from "@/lib/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Anonymised SOAR automation case studies from James Dolan's work, written as problem, approach, and outcome.",
  path: "/projects",
});

export default function ProjectsPage() {
  const studies = getCaseStudies();

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        kicker="Projects"
        title="Case studies, anonymised."
        lede="Each study is problem, approach, and outcome. They are drawn from published role descriptions. Client names are not included. Where a measured result is missing, the page says Placeholder."
      />

      <ul className="mt-10 space-y-4">
        {studies.map((study) => (
          <li key={study.slug}>
            <article className="rounded-3xl border border-line bg-bg-elev p-6">
              <p className="font-mono text-xs tracking-[0.14em] text-brass uppercase">
                {study.context} · {study.period}
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
                <Link href={`/projects/${study.slug}`} className="text-ink no-underline">
                  {study.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{study.summary}</p>
              <p className="mt-3 text-sm text-muted">{study.platform}</p>
              {study.placeholder ? (
                <p className="mt-3 font-mono text-xs tracking-[0.12em] text-brass uppercase">Contains a placeholder outcome</p>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </Container>
  );
}
