export type Skill = {
  title: string;
  description: string;
};

export type Role = {
  id: string;
  title: string;
  organisation: string;
  organisationUrl?: string;
  dates: string;
  summary: string;
  highlights: string[];
  current?: boolean;
  note?: string;
  logo?: { src: string; width: number; height: number };
};

export type EducationItem = {
  qualification: string;
  school: string;
  dates: string;
  url: string;
  linkLabel: string;
  logo: { src: string; width: number; height: number };
};

export type Certification = {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  issued?: string;
  status: "held" | "in-progress";
  summary: string;
  url: string;
  linkLabel: string;
  logo: { src: string; width: number; height: number };
};

export const skills: Skill[] = [
  {
    title: "SOAR and playbook development",
    description:
      "Design, build, and optimise automated workflows across D3 Security (D3 Smart SOAR) and Palo Alto Cortex XSOAR to improve consistency and response quality.",
  },
  {
    title: "Security automation",
    description:
      "Build scalable automation that reduces manual SOC effort and supports faster, repeatable response actions.",
  },
  {
    title: "SIEM, EDR, and XDR integration",
    description:
      "Integrate SIEM, EDR, XDR, and threat intelligence tools into unified workflows for end-to-end incident response.",
  },
  {
    title: "Threat-intel enrichment",
    description:
      "Support investigations through enrichment, log analysis, and data correlation so analysts can triage incidents faster.",
  },
  {
    title: "Scripting and APIs",
    description:
      "Use Python, JavaScript, PowerShell, REST APIs, JSON, and GitHub to automate security operations and orchestrate tooling at scale.",
  },
  {
    title: "Stakeholder collaboration",
    description:
      "Work across SOC, threat intelligence, and engineering teams to deliver practical automation aligned to operations.",
  },
];

export const roles: Role[] = [
  {
    id: "pwc",
    title: "SOAR Engineer",
    organisation: "PwC UK, Managed Cyber Defence",
    organisationUrl: "https://www.pwc.co.uk/",
    dates: "July 2025 – present",
    current: true,
    note: "Named Key Talent in October 2026.",
    summary:
      "SOAR Engineer in Managed Cyber Defence at PwC, delivering multi-tenant automation and cross-tool integrations.",
    logo: { src: "/images/employers/pwc.svg", width: 360, height: 200 },
    highlights: [
      "Deliver automation and orchestration solutions across multiple client environments, improving SOC efficiency and scalability.",
      "Design and implement multi-tenant SOAR playbooks to standardise incident response across diverse environments.",
      "Integrate SIEM, EDR, threat intelligence, and case management tooling into unified automation workflows.",
      "Collaborate with SOC, threat intelligence, and detection engineering teams to streamline triage and investigations.",
      "Support migration from Palo Alto Cortex XSOAR to D3 Security across multiple clients.",
      "Produce documentation and deliver knowledge-transfer sessions on automation-driven incident response.",
    ],
  },
  {
    id: "bt-playbook",
    title: "DevSecOps Incident Response Playbook Engineer",
    organisation: "BT, ThreatCo DevSecOps team",
    organisationUrl: "https://www.bt.com/",
    dates: "July 2022 – July 2025",
    summary:
      "Playbook Engineer in the ThreatCo DevSecOps team, developing and optimising response workflows across SOAR, SIEM, and EDR platforms.",
    logo: { src: "/images/employers/bt.png", width: 225, height: 225 },
    highlights: [
      "Developed and optimised playbooks across SOAR, SIEM, and EDR platforms to enhance detection and response.",
      "Automated key SOC processes, reducing manual workload and improving operational efficiency.",
      "Analysed large-scale security data to identify trends, improve detection logic, and drive automation improvements.",
      "Supported security tool integrations to improve interoperability and streamline workflows.",
      "Maintained structured playbook documentation for knowledge sharing and operational continuity.",
      "Collaborated cross-functionally to align automation delivery with business and security objectives.",
    ],
  },
  {
    id: "bt-trainee",
    title: "Cyber Security Trainee",
    organisation: "BT, CAPSLOCK",
    organisationUrl: "https://capslock.ac/",
    dates: "March 2022 – July 2022",
    summary:
      "Completed the CAPSLOCK boot camp with a focus on incident response and security automation.",
    logo: { src: "/images/employers/capslock.jpg", width: 310, height: 163 },
    highlights: [
      "Completed CAPSLOCK boot camp with a focus on incident response and security automation.",
      "Assisted in the development of foundational security playbooks and automation scripts.",
      "Gained hands-on experience with security tooling and best practices in threat detection.",
    ],
  },
  {
    id: "ee",
    title: "Retail, sales and management",
    organisation: "EE",
    organisationUrl: "https://ee.co.uk/",
    dates: "About nine years, before March 2022",
    summary:
      "Came into cyber security through BT's CAPSLOCK reskilling programme after about nine years in EE retail, sales and management.",
    highlights: [],
  },
];

export const education: EducationItem[] = [
  {
    qualification: "Diploma of Higher Education (DipHE), Cyber Security",
    school: "Edinburgh Napier University",
    dates: "September 2023 – September 2025",
    url: "https://www.napier.ac.uk/study-with-us/apprenticeships/beng-hons-cybersecurity-ga",
    linkLabel: "Edinburgh Napier cyber security programmes",
    logo: { src: "/images/education/napier.png", width: 423, height: 119 },
  },
  {
    qualification: "Arts and Humanities Access Course",
    school: "Newbattle Abbey College",
    dates: "2011 – 2012",
    url: "https://www.nac.ac.uk/",
    linkLabel: "Newbattle Abbey College",
    logo: { src: "/images/education/newbattle.jpg", width: 225, height: 225 },
  },
  {
    qualification: "High School Standard Grades",
    school: "Lasswade High School",
    dates: "2000 – 2004",
    url: "https://lasswadehsc.mgfl.net/",
    linkLabel: "Lasswade High School Centre",
    logo: { src: "/images/education/lasswade.jpg", width: 275, height: 183 },
  },
];

export const certifications: Certification[] = [
  {
    id: "pcsae",
    shortName: "PCSAE",
    name: "Palo Alto Networks Certified Security Automation Engineer",
    issuer: "Palo Alto Networks",
    issued: "January 2024",
    status: "held",
    summary:
      "Validates playbook development and administration of Cortex XSOAR, including automations, integrations, and threat-intel management. Awarded January 2024. Palo Alto Networks has since retired the PCSAE exam.",
    url: "https://www.paloaltonetworks.com/services/education/certification",
    linkLabel: "Palo Alto Networks certification portfolio",
    logo: { src: "/images/certs/pcsae.png", width: 225, height: 225 },
  },
  {
    id: "sscp",
    shortName: "SSCP",
    name: "Systems Security Certified Practitioner",
    issuer: "(ISC)²",
    issued: "April 2023",
    status: "held",
    summary:
      "Covers IT administration with a focus on implementing and managing security practices.",
    url: "https://www.isc2.org/Certifications/SSCP",
    linkLabel: "(ISC)² SSCP",
    logo: { src: "/images/certs/sscp.png", width: 376, height: 130 },
  },
  {
    id: "cismp",
    shortName: "CISMP",
    name: "BCS Foundation Certificate in Information Security Management Principles",
    issuer: "BCS, The Chartered Institute for IT",
    issued: "July 2022",
    status: "held",
    summary:
      "Provides foundational knowledge in information security management principles.",
    url: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/information-security-and-data-protection-certifications/bcs-foundation-certificate-in-information-security-management-principles/",
    linkLabel: "BCS CISMP",
    logo: { src: "/images/certs/cismp.jpg", width: 160, height: 160 },
  },
  {
    id: "ce-csp",
    shortName: "Ce-CSP",
    name: "CAPSLOCK Certified Cyber Security Practitioner",
    issuer: "CAPSLOCK",
    issued: "July 2022",
    status: "held",
    summary:
      "CAPSLOCK's Certified Cyber Security Practitioner qualification, from the boot camp focused on incident response and security automation.",
    url: "https://capslock.ac/courses/cyber-security/ce-csp",
    linkLabel: "CAPSLOCK Ce-CSP",
    logo: { src: "/images/certs/ce-csp.png", width: 246, height: 204 },
  },
  {
    id: "ccsk",
    shortName: "CCSK",
    name: "Certificate of Cloud Security Knowledge",
    issuer: "Cloud Security Alliance",
    issued: "June 2022",
    status: "held",
    summary:
      "Validates knowledge of cloud security, including best practices and CSA guidance.",
    url: "https://cloudsecurityalliance.org/education/ccsk/",
    linkLabel: "Cloud Security Alliance CCSK",
    logo: { src: "/images/certs/ccsk.png", width: 281, height: 179 },
  },
  {
    id: "iso-27001",
    shortName: "ISO 27001 Foundation",
    name: "ISO/IEC 27001 Foundation",
    issuer: "ISO/IEC 27001",
    issued: "June 2022",
    status: "held",
    summary:
      "Foundation-level knowledge of ISO/IEC 27001, the international standard for information security management systems.",
    url: "https://www.iso.org/standard/27001",
    linkLabel: "ISO/IEC 27001",
    logo: { src: "/images/certs/iso27001.jpg", width: 300, height: 168 },
  },
  {
    id: "cissp",
    shortName: "CISSP",
    name: "Certified Information Systems Security Professional",
    issuer: "(ISC)²",
    status: "in-progress",
    summary:
      "Working towards the (ISC)² certification covering security architecture, engineering, and management.",
    url: "https://www.isc2.org/Certifications/CISSP",
    linkLabel: "(ISC)² CISSP",
    logo: { src: "/images/certs/cissp.png", width: 225, height: 225 },
  },
  {
    id: "pcap",
    shortName: "PCAP",
    name: "Python Institute Certified Associate in Python Programming",
    issuer: "Python Institute",
    status: "in-progress",
    summary:
      "Working towards the associate-level Python certification covering object-oriented programming and practical development.",
    url: "https://pythoninstitute.org/pcap",
    linkLabel: "Python Institute PCAP",
    logo: { src: "/images/certs/pcap.png", width: 225, height: 225 },
  },
];

export const platforms = [
  { name: "D3 Smart SOAR", url: "https://d3security.com/" },
  { name: "Cortex XSOAR", url: "https://www.paloaltonetworks.com/cortex/cortex-xsoar" },
] as const;

export const outsideWork = {
  title: "Running",
  body: [
    "James has taken up running as a way to challenge himself, both physically and mentally. What started as a casual hobby became a longer project, and he completed a first 10K.",
    "He later entered the Strathcarron Hospice 10K, a community race that raises money for the hospice. Strathcarron Hospice provides palliative care, including in-patient care, day services, community nursing, and bereavement support for families.",
  ],
  hospiceUrl: "https://www.strathcarronhospice.net/",
  hospiceLabel: "Strathcarron Hospice",
};
