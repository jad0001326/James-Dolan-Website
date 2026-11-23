import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">404</p>
      <h1 className="mt-3 font-serif text-5xl text-ink">That page is not here.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">The address does not match a page on this site.</p>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-accent-ink no-underline">
        Back to the home page
      </Link>
    </Container>
  );
}
