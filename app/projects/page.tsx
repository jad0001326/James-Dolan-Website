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
        title="playbooks/"
        lede="Each study is problem, approach, and outcome. They are drawn from published role descriptions. Client names are not included. Where a measured result is missing, the page says Placeholder."
      />

      <ul className="mt-10 space-y-3">
        {studies.map((study, index) => (
          <li key={study.slug}>
            <article className="scan-card panel p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted">PB-{String(index + 1).padStart(2, "0")}</span>
                <span className={study.placeholder ? "tag tag-warn" : "tag tag-ok"}>{study.placeholder ? "placeholder" : "filed"}</span>
                <span className="tag tag-info">{study.platform}</span>
              </div>
              <h2 className="mt-3 font-mono text-2xl leading-tight text-ink">
                <Link href={`/projects/${study.slug}`} className="text-ink no-underline">
                  {study.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{study.summary}</p>
              <p className="mt-3 font-mono text-xs text-muted">
                {study.context} · {study.period}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Container>
  );
}
