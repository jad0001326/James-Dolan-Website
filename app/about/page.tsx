import Image from "next/image";
import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { LogoMark } from "@/components/logo-mark";
import { PageHeader } from "@/components/page-header";
import { education, outsideWork, platforms, skills } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "How James Dolan moved from EE retail into cyber security, and the SOAR engineering work he does now at PwC UK.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        kicker="About"
        title="From the shop floor to security automation."
        lede={`${site.description} Based in the ${site.location}.`}
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[16rem_minmax(0,1fr)] md:items-start">
        <Image
          src="/images/james-dolan.jpg"
          alt="James Dolan, smiling, photographed indoors near a window."
          width={960}
          height={960}
          className="aspect-square w-full max-w-64 rounded-full object-cover"
          sizes="256px"
        />
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            James Dolan is a SOAR Engineer in PwC UK&apos;s Managed Cyber Defence team. {site.support}
          </p>
          <p>
            The platforms are{" "}
            {platforms.map((platform, index) => (
              <span key={platform.name}>
                {index > 0 ? " and " : null}
                <ExternalLink href={platform.url}>{platform.name}</ExternalLink>
              </span>
            ))}
            , with SIEM, EDR and XDR integrations, threat-intel enrichment, and the Python, JavaScript, PowerShell, REST API, JSON, and GitHub work that holds the workflows together.
          </p>
          <p>
            He came into cyber security through BT&apos;s CAPSLOCK reskilling programme after about nine years in EE retail, sales and management. From March to July 2022 he was a cyber security trainee at BT and completed the CAPSLOCK boot camp with a focus on incident response and security automation.
          </p>
          <p>
            From July 2022 to July 2025 he was a DevSecOps Incident Response Playbook Engineer in BT&apos;s ThreatCo DevSecOps team. He joined PwC in July 2025. In October 2026 he was named Key Talent.
          </p>
        </div>
      </div>

      <section id="skills" aria-labelledby="skills-title" className="mt-16 scroll-mt-24">
        <h2 id="skills-title" className="font-serif text-3xl text-ink">
          Skills
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <li key={skill.title} className="rounded-3xl border border-line bg-bg-elev p-5">
              <h3 className="font-serif text-2xl text-ink">{skill.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{skill.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="education" aria-labelledby="education-title" className="mt-16 scroll-mt-24">
        <h2 id="education-title" className="font-serif text-3xl text-ink">
          Education
        </h2>
        <ul className="mt-6 space-y-4">
          {education.map((item) => (
            <li key={item.qualification} className="flex gap-4 rounded-3xl border border-line bg-bg-elev p-5">
              <LogoMark src={item.logo.src} width={item.logo.width} height={item.logo.height} />
              <div>
                <h3 className="font-serif text-2xl leading-tight text-ink">{item.qualification}</h3>
                <p className="mt-1 text-muted">
                  {item.school} · {item.dates}
                </p>
                <p className="mt-2">
                  <ExternalLink href={item.url}>{item.linkLabel}</ExternalLink>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="outside-work" aria-labelledby="outside-title" className="mt-16 scroll-mt-24">
        <h2 id="outside-title" className="font-serif text-3xl text-ink">
          Outside work
        </h2>
        <div className="mt-6 max-w-3xl rounded-3xl border border-line bg-bg-elev p-6">
          <h3 className="font-serif text-2xl text-ink">{outsideWork.title}</h3>
          {outsideWork.body.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          <p className="mt-3">
            <ExternalLink href={outsideWork.hospiceUrl}>{outsideWork.hospiceLabel}</ExternalLink>
          </p>
        </div>
      </section>
    </Container>
  );
}
