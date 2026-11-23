import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { roles, skills } from "@/content/profile";
import { getCaseStudies } from "@/lib/content/case-studies";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} · ${site.role}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const current = roles.find((role) => role.current);
  const studies = getCaseStudies().slice(0, 3);

  return (
    <Container className="py-12 sm:py-16">
      <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">
            {site.role} · {site.location}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl">{site.name}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink">{site.description}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{site.support}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/experience" className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-accent-ink no-underline">
              View experience
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-semibold text-ink no-underline">
              Get in touch
            </Link>
            <Link href="/cv" className="inline-flex min-h-11 items-center px-2 font-semibold text-link no-underline">
              View CV
            </Link>
          </div>
        </div>
        <figure className="mx-auto w-44 sm:w-56 md:w-full">
          <Image
            src="/images/james-dolan.jpg"
            alt="James Dolan, smiling, photographed indoors near a window."
            width={960}
            height={960}
            priority
            className="aspect-square w-full rounded-full object-cover"
            sizes="(min-width: 768px) 256px, 176px"
          />
          <figcaption className="mt-3 text-center font-mono text-xs tracking-[0.12em] text-brass uppercase">
            {site.location}
          </figcaption>
        </figure>
      </section>

      {current ? (
        <section aria-labelledby="current-role" className="mt-14 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-brass uppercase">Current role</p>
          <h2 id="current-role" className="mt-3 font-serif text-3xl text-ink">
            {current.title}
          </h2>
          <p className="mt-2 text-muted">
            {current.organisation} · {current.dates}
          </p>
          <p className="mt-4 max-w-3xl text-muted">{current.summary}</p>
          {current.note ? <p className="mt-3 font-semibold text-ink">{current.note}</p> : null}
          <Link href="/experience" className="mt-5 inline-flex font-semibold text-link">
            Read the full timeline
          </Link>
        </section>
      ) : null}

      <section aria-labelledby="selected-work" className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="selected-work" className="font-serif text-3xl text-ink">
            Selected work
          </h2>
          <Link href="/projects" className="font-semibold text-link">
            All case studies
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {studies.map((study) => (
            <li key={study.slug}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-bg-elev p-5">
                <p className="font-mono text-xs tracking-[0.12em] text-brass uppercase">{study.platform}</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">
                  <Link href={`/projects/${study.slug}`} className="text-ink no-underline">
                    {study.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{study.summary}</p>
                <p className="mt-4 text-sm text-muted">{study.period}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-he-works" className="mt-14">
        <h2 id="how-he-works" className="font-serif text-3xl text-ink">
          How the work gets done
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {skills.slice(0, 4).map((skill) => (
            <li key={skill.title} className="rounded-3xl border border-line bg-bg-elev p-5">
              <h3 className="font-serif text-xl text-ink">{skill.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{skill.description}</p>
            </li>
          ))}
        </ul>
        <Link href="/about" className="mt-5 inline-flex font-semibold text-link">
          About, skills, and education
        </Link>
      </section>
    </Container>
  );
}
