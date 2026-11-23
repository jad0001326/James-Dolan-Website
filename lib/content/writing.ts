import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Phase 2 writing posts live in content/writing/*.mdx.
 * Add a file, rebuild, and it appears on /writing, /writing/[slug], the sitemap,
 * and /writing/feed.xml. Search over the resulting list is searchDocuments().
 *
 * Frontmatter:
 * ---
 * title: A note on playbook design
 * summary: One or two sentences.
 * publishedAt: 2026-11-23
 * ---
 */
const directory = path.join(process.cwd(), "content", "writing");

const frontmatterSchema = z.object({
  title: z.string().trim().min(3),
  summary: z.string().trim().min(10),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type WritingPost = z.infer<typeof frontmatterSchema> & {
  slug: string;
  body: string;
};

export function getWritingPosts(): WritingPost[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const parsed = matter(fs.readFileSync(path.join(directory, filename), "utf8"));
      const frontmatter = frontmatterSchema.safeParse(parsed.data);
      if (!frontmatter.success) {
        const details = frontmatter.error.issues.map((issue) => issue.message).join("; ");
        throw new Error(`Invalid writing frontmatter in ${filename}: ${details}`);
      }
      return { slug, body: parsed.content.trim(), ...frontmatter.data };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getWritingPost(slug: string): WritingPost | undefined {
  return getWritingPosts().find((post) => post.slug === slug);
}
