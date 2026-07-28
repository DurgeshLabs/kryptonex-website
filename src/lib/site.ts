export const site = {
  name: "Kryptonex",
  shortName: "Kryptonex",
  tagline: "Break it. Understand it. Defend it.",
  parent: "School of Technology and Research",
  university: "Dnyaan Prasad Global University",
  universityShort: "DPGU",
  society: "Dr. D. Y. Patil Unitech Society",
  city: "Pune, India",
  email: "accounts@decloud.org",
  description:
    "Kryptonex is DPGU's dedicated cybersecurity & Capture-the-Flag community at the School of Technology and Research — turning curious students into capable, ethically-grounded security practitioners.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kryptonex.club",
  keywords: [
    "Kryptonex",
    "cybersecurity club",
    "CTF",
    "capture the flag",
    "DPGU",
    "School of Technology and Research",
    "Pune",
    "ethical hacking",
    "Digital Fortress CTF",
    "student security community",
  ],
  links: {
    // Swap in the live recruitment form URL (env or edit here); until then this
    // opens a pre-filled mail to the council rather than pointing at a dead link.
    recruitment:
      process.env.NEXT_PUBLIC_RECRUITMENT_URL ??
      "mailto:accounts@decloud.org?subject=Kryptonex%20recruitment%20—%20application&body=Name%3A%0ABranch%20%26%20year%3A%0AWhat%20I%27d%20love%20to%20learn%3A%0ATeam%20I%27d%20like%20to%20help%20run%3A",
    linkedin: "https://www.linkedin.com/company/kryptonex-dpgu",
    instagram: "https://www.instagram.com/kryptonex.dpgu",
    discord: "https://discord.gg/kryptonex",
    github: "https://github.com/kryptonex-dpgu",
  },
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#roadmap" },
  { label: "Events", href: "#events" },
  { label: "Digital Fortress", href: "#digital-fortress" },
  { label: "Team", href: "#team" },
  { label: "Join", href: "#recruitment" },
];

export const sectionIds = [
  "hero",
  "about",
  "mission",
  "why-join",
  "roadmap",
  "events",
  "digital-fortress",
  "ctf-journey",
  "stats",
  "gallery",
  "team",
  "testimonials",
  "faq",
  "recruitment",
  "contact",
] as const;
