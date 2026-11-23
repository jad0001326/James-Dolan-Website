import Link from "next/link";
import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-xl text-ink">James Dolan</p>
          <p className="text-sm text-muted">
            © {site.copyrightYear} {site.name}. {site.location}.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <Link href="/cv" className="font-semibold text-ink no-underline">
              CV
            </Link>
          </li>
          <li>
            <ExternalLink href={site.linkedin} className="font-semibold text-ink no-underline">
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <Link href="/contact" className="font-semibold text-ink no-underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/writing/feed.xml" className="font-semibold text-ink no-underline">
              RSS
            </Link>
          </li>
        </ul>
      </Container>
      <Container className="pb-8">
        <p className="max-w-2xl text-sm text-muted">
          When this site is hosted on Vercel, page views are measured with Vercel Web Analytics. There are no advertising cookies.
        </p>
      </Container>
    </footer>
  );
}
