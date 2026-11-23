import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const directory = path.join(process.cwd(), "content", "case-studies");

const frontmatterSchema = z.object({
  title: z.string().trim().min(3),
  summary: z.string().trim().min(10),
  platform: z.string().trim().min(2),
  context: z.string().trim().min(2),
  period: z.string().trim().min(2),
  order: z.number().int(),
  placeholder: z.boolean(),
});

export type CaseStudyFrontmatter = z.infer<typeof frontmatterSchema>;

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  body: string;
};

function readSource(filename: string): CaseStudy {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(directory, filename), "utf8");
  const parsed = matter(raw);
  const frontmatter = frontmatterSchema.safeParse(parsed.data);

  if (!frontmatter.success) {
    const details = frontmatter.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`Invalid case study frontmatter in ${filename}: ${details}`);
  }

  return {
    slug,
    body: parsed.content.trim(),
    ...frontmatter.data,
  };
}

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(directory)) return [];

  const studies = fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(readSource)
    .sort((a, b) => a.order - b.order);

  const slugs = new Set<string>();
  for (const study of studies) {
    if (slugs.has(study.slug)) {
      throw new Error(`Duplicate case study slug: ${study.slug}`);
    }
    slugs.add(study.slug);
  }

  return studies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}
