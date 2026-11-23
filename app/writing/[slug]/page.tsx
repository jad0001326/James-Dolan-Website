import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx-content";
import { getWritingPost, getWritingPosts } from "@/lib/content/writing";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getWritingPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) return {};
  const url = new URL(`/writing/${post.slug}`, site.url).toString();
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.summary, url, type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

export default async function WritingPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({ source: post.body, components: mdxComponents });

  return (
    <Container className="py-12 sm:py-16">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">
        <Link href="/writing" className="text-brass no-underline">
          Writing
        </Link>
        {" · "}
        <time dateTime={post.publishedAt}>{post.publishedAt}</time>
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">{post.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{post.summary}</p>
      <div className="mt-6 max-w-3xl">{content}</div>
    </Container>
  );
}
