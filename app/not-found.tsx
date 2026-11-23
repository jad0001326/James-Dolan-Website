import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <p className="font-mono text-sm text-brass">404 not found</p>
      <h1 className="mt-3 font-mono text-4xl text-ink">$ cd /</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">The address does not match a page on this site.</p>
      <Link href="/" className="btn btn-primary mt-8">
        ./home
      </Link>
    </Container>
  );
}
