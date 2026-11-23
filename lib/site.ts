export const site = {
  name: "James Dolan",
  role: "SOAR Engineer",
  url: "https://jamesdolan.info",
  locale: "en_GB",
  language: "en-GB",
  location: "Falkirk area, Scotland",
  copyrightYear: 2026,
  description:
    "SOAR Engineer focused on automation-first incident response, triage acceleration, and reduced analyst workload through robust playbook design.",
  support:
    "4+ years designing and implementing SOAR workflows across enterprise SOC environments at BT and PwC.",
  linkedin: "https://www.linkedin.com/in/james-dolan-3686A869",
  emailNote:
    "Your message is emailed to James so he can reply. It is not added to a mailing list.",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;
