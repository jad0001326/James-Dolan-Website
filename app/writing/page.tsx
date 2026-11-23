import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaybookDemo } from "@/components/phase2/playbook-demo";
import { WritingSearch } from "@/components/writing-search";
import { getWritingPosts } from "@/lib/content/writing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing",
  description: "Notes from James Dolan on SOAR playbooks and security automation. The writing section is ready for its first post.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getWritingPosts();
  const documents = posts.map((post) => ({
    href: `/writing/${post.slug}`,
    title: post.title,
    summary: post.summary,
    kind: "writing" as const,
  }));

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        kicker="Writing"
        title="Notes, when they are ready."
        lede="Longer writing on playbook design, integrations, and incident-response automation will be published here. The pipeline is already in place: add an MDX file, and the page, the post route, the sitemap, and the RSS feed pick it up."
      />
      <p className="mt-6 text-sm text-muted">
        Feed:{" "}
        <a className="text-link underline decoration-brass/70 underline-offset-4" href="/writing/feed.xml">
          /writing/feed.xml
        </a>
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 max-w-2xl rounded-3xl border border-dashed border-line bg-bg-elev p-6 text-muted">
          No posts yet. New notes go in <code className="font-mono text-sm text-ink">content/writing</code> as MDX, with a title, summary, and <code className="font-mono text-sm text-ink">publishedAt</code> date.
        </p>
      ) : (
        <WritingSearch documents={documents} />
      )}

      <PlaybookDemo />
    </Container>
  );
}
