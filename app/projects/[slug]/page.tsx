import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx-content";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const url = new URL(`/projects/${study.slug}`, site.url).toString();
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: { title: study.title, description: study.summary, url, type: "article" },
    twitter: { card: "summary_large_image", title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { content } = await compileMDX({
    source: study.body,
    components: mdxComponents,
  });

  return (
    <Container className="py-12 sm:py-16">
      <p className="font-mono text-sm text-cyan">
        <Link href="/projects" className="text-cyan no-underline">
          ../playbooks
        </Link>
        <span className="text-muted">/{study.slug}</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={study.placeholder ? "tag tag-warn" : "tag tag-ok"}>{study.placeholder ? "placeholder" : "filed"}</span>
        <span className="tag tag-info">{study.platform}</span>
      </div>
      <h1 className="mt-4 max-w-3xl font-mono text-3xl leading-tight text-ink sm:text-4xl">{study.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{study.summary}</p>
      <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4 border border-line p-4 font-mono text-sm">
        <div>
          <dt className="text-xs text-muted">context</dt>
          <dd className="text-ink">{study.context}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">window</dt>
          <dd className="text-ink">{study.period}</dd>
        </div>
      </dl>
      <div className="mdx mt-2 max-w-3xl">{content}</div>
    </Container>
  );
}
