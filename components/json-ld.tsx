import { certifications, education, skills } from "@/content/profile";
import { site } from "@/lib/site";

export function JsonLd() {
  const held = certifications.filter((item) => item.status === "held");
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Falkirk",
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
    worksFor: {
      "@type": "Organization",
      name: "PwC UK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education[0]?.school,
    },
    sameAs: [site.linkedin],
    knowsAbout: skills.map((skill) => skill.title),
    hasCredential: held.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      name: item.name,
      credentialCategory: "certification",
      recognizedBy: {
        "@type": "Organization",
        name: item.issuer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
