import Link from "next/link";
import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-sm text-accent">$ exit 0</p>
          <p className="mt-2 text-sm text-muted">
            © {site.copyrightYear} {site.name}. {site.location}.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-wide">
          <li>
            <Link href="/cv" className="text-ink no-underline">
              cv
            </Link>
          </li>
          <li>
            <ExternalLink href={site.linkedin} className="font-mono text-xs text-ink no-underline">
              linkedin
            </ExternalLink>
          </li>
          <li>
            <Link href="/contact" className="text-ink no-underline">
              contact
            </Link>
          </li>
          <li>
            <Link href="/writing/feed.xml" className="text-ink no-underline">
              rss
            </Link>
          </li>
        </ul>
      </Container>
      <Container className="pb-8">
        <p className="max-w-2xl font-mono text-xs leading-relaxed text-muted">
          telemetry: Vercel Web Analytics when hosted on Vercel. no advertising cookies.
        </p>
      </Container>
    </footer>
  );
}
