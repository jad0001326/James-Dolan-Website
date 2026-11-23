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
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">
        <Link href="/projects" className="text-brass no-underline">
          Projects
        </Link>
        {" · "}
        {study.context}
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">{study.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{study.summary}</p>
      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <div>
          <dt className="font-mono text-xs tracking-[0.12em] text-brass uppercase">Platform</dt>
          <dd className="text-ink">{study.platform}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-[0.12em] text-brass uppercase">When</dt>
          <dd className="text-ink">{study.period}</dd>
        </div>
      </dl>
      <div className="mt-4 max-w-3xl">{content}</div>
    </Container>
  );
}
