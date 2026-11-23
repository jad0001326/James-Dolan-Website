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

const session = [
  { level: "INFO", text: "sample console. not a live client feed." },
  { level: "TASK", text: "design a multi-tenant incident-response playbook" },
  { level: "TASK", text: "connect SIEM, EDR, and threat intelligence" },
  { level: "OK", text: "document the workflow and hand it over" },
];

export default function HomePage() {
  const current = roles.find((role) => role.current);
  const studies = getCaseStudies().slice(0, 3);

  return (
    <Container className="py-10 sm:py-14">
      <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="term">
          <div className="term-bar">
            <span>
              <span className="text-cyan">james@soc</span>
              <span className="text-accent">:</span>~
            </span>
            <span className="inline-flex items-center gap-2 text-accent">
              <span className="live-dot" aria-hidden="true" />
              live
            </span>
          </div>
          <div className="term-body">
            <p className="log-line">
              <span className="prompt">$ </span>whoami
            </p>
            <h1 className="log-line mt-1 font-mono text-3xl leading-tight text-ink sm:text-4xl" style={{ animationDelay: "80ms" }}>
              {site.name}
              <span className="mt-1 block font-sans text-base font-normal text-muted">{site.role}</span>
            </h1>
            <p className="log-line mt-4" style={{ animationDelay: "160ms" }}>
              <span className="prompt">$ </span>cat profile.txt
            </p>
            <p className="log-line mt-1 max-w-2xl text-muted" style={{ animationDelay: "240ms" }}>
              {site.description}
            </p>
            <p className="log-line mt-4" style={{ animationDelay: "320ms" }}>
              <span className="prompt">$ </span>cat tenure.txt
            </p>
            <p className="log-line mt-1 max-w-2xl text-muted" style={{ animationDelay: "400ms" }}>
              {site.support}
            </p>
            <p className="log-line mt-4 text-ink" style={{ animationDelay: "480ms" }}>
              <span className="prompt">$ </span>
              <span className="caret" aria-hidden="true" />
              <span className="sr-only">Command prompt</span>
            </p>
          </div>
        </div>
        <figure className="border border-line bg-black p-2">
          <Image
            src="/images/james-dolan.jpg"
            alt="James Dolan, smiling, photographed indoors near a window."
            width={960}
            height={960}
            priority
            className="aspect-square w-full object-cover"
            sizes="(min-width: 1024px) 256px, 70vw"
          />
          <figcaption className="mt-2 px-1 font-mono text-[0.68rem] tracking-wide text-muted uppercase">
            img // james-dolan.jpg
            <span className="mt-1 block text-brass">{site.location}</span>
          </figcaption>
        </figure>
      </section>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/experience" className="btn btn-primary">
          ./experience
        </Link>
        <Link href="/contact" className="btn">
          ./contact
        </Link>
        <Link href="/cv" className="btn">
          ./cv
        </Link>
      </div>

      <section aria-label="Sample session" className="panel mt-8 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-mono text-sm text-ink">session.log</h2>
          <span className="tag tag-info">sample</span>
        </div>
        <ol className="mt-4 space-y-2 font-mono text-sm">
          {session.map((line, index) => (
            <li key={line.text} className="log-line grid grid-cols-[4.5rem_1fr] gap-3 sm:grid-cols-[4.5rem_4.5rem_1fr]" style={{ animationDelay: `${120 * index}ms` }}>
              <span className="text-muted">00:0{index}</span>
              <span className={line.level === "OK" ? "text-accent" : line.level === "INFO" ? "text-cyan" : "text-brass"}>{line.level}</span>
              <span className="col-span-2 text-muted sm:col-span-1">{line.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {current ? (
        <section aria-labelledby="current-role" className="panel mt-8 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag tag-live">open</span>
            <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">current role</p>
          </div>
          <h2 id="current-role" className="mt-3 font-mono text-2xl text-ink sm:text-3xl">
            {current.title}
          </h2>
          <p className="mt-2 text-muted">
            {current.organisation} · {current.dates}
          </p>
          <p className="mt-4 max-w-3xl text-muted">{current.summary}</p>
          {current.note ? <p className="mt-3 font-medium text-accent">{current.note}</p> : null}
          <Link href="/experience" className="mt-5 inline-flex font-mono text-sm text-link">
            $ less experience.log
          </Link>
        </section>
      ) : null}

      <section aria-labelledby="selected-work" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="selected-work" className="font-mono text-sm text-cyan">
            <span className="text-muted">$ </span>ls playbooks/
          </h2>
          <Link href="/projects" className="font-mono text-sm text-link">
            ./projects
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {studies.map((study, index) => (
            <li key={study.slug}>
              <article className="scan-card panel flex h-full flex-col p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <span className={study.placeholder ? "tag tag-warn" : "tag tag-ok"}>{study.placeholder ? "placeholder" : "filed"}</span>
                </div>
                <h3 className="mt-3 font-mono text-lg leading-snug text-ink">
                  <Link href={`/projects/${study.slug}`} className="text-ink no-underline">
                    {study.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{study.summary}</p>
                <p className="mt-4 font-mono text-xs text-cyan">{study.platform}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-he-works" className="mt-12">
        <h2 id="how-he-works" className="font-mono text-sm text-cyan">
          <span className="text-muted">$ </span>skills --brief
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {skills.slice(0, 4).map((skill) => (
            <li key={skill.title} className="panel p-4">
              <h3 className="font-mono text-base text-ink">{skill.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{skill.description}</p>
            </li>
          ))}
        </ul>
        <Link href="/about" className="mt-4 inline-flex font-mono text-sm text-link">
          $ cat ./about
        </Link>
      </section>
    </Container>
  );
}
