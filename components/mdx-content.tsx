import type { MDXComponents } from "mdx/types";
import { ExternalLink } from "@/components/external-link";
import { Placeholder } from "@/components/placeholder-note";

function MarkdownLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return <ExternalLink href={href}>{props.children}</ExternalLink>;
  }
  return <a {...props} className="text-link underline decoration-brass/70 underline-offset-4" />;
}

export const mdxComponents = {
  h2: (props) => <h2 className="mt-10 font-serif text-3xl leading-tight text-ink" {...props} />,
  h3: (props) => <h3 className="mt-8 font-serif text-2xl text-ink" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-muted" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted" {...props} />,
  li: (props) => <li className="leading-relaxed marker:text-brass" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => <blockquote className="mt-4 border-l-2 border-brass pl-4 text-muted" {...props} />,
  a: MarkdownLink,
  Placeholder,
} satisfies MDXComponents;
