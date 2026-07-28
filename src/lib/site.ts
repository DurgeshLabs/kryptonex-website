export const site = {
  name: "Kryptonex",
  legalName: "Kryptonex Student Community",
  tagline: "Build. Learn. Innovate. Lead.",
  promise:
    "The student community where builders become founders, cybersecurity professionals, AI engineers and innovators.",
  parent: "School of Technology and Research",
  university: "Dnyaan Prasad Global University",
  universityShort: "DPGU",
  society: "Dr. D. Y. Patil Unitech Society",
  city: "Pune, India",
  email: "accounts@decloud.org",
  description:
    "Kryptonex is the student innovation community at the School of Technology and Research, DPGU — cybersecurity, AI, development, entrepreneurship and design. We bridge the gap between college and industry.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kryptonex.club",
  keywords: [
    "Kryptonex",
    "student community",
    "cybersecurity club",
    "CTF",
    "hackathon",
    "DPGU",
    "School of Technology and Research",
    "Pune",
    "AI club",
    "open source",
    "student innovation",
  ],
  links: {
    // Swap in the live recruitment form URL (env or edit here); until then this
    // opens a pre-filled mail to the council rather than pointing at a dead link.
    recruitment:
      process.env.NEXT_PUBLIC_RECRUITMENT_URL ??
      "mailto:accounts@decloud.org?subject=Kryptonex%20recruitment%20—%20application&body=Name%3A%0ABranch%20%26%20year%3A%0AWhat%20I%27d%20love%20to%20build%3A%0ATeam%20I%27d%20like%20to%20join%3A",
    linkedin: "https://www.linkedin.com/company/kryptonex-dpgu",
    instagram: "https://www.instagram.com/kryptonex.dpgu",
    discord: "https://discord.gg/kryptonex",
    github: "https://github.com/kryptonex-dpgu",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

/** Primary navigation. Groups with children render as a dropdown on desktop. */
export const navigation: NavGroup[] = [
  { label: "About", href: "/about" },
  {
    label: "Community",
    children: [
      { label: "Events", href: "/events", description: "Workshops, hackathons and meetups" },
      { label: "Announcements", href: "/announcements", description: "What's live right now" },
      { label: "Gallery", href: "/gallery", description: "Photos from every session" },
      { label: "Hall of Fame", href: "/hall-of-fame", description: "Members who shipped" },
    ],
  },
  {
    label: "Work",
    children: [
      { label: "Projects", href: "/projects", description: "What members have built" },
      { label: "Resources", href: "/resources", description: "Curated learning material" },
      { label: "Blog", href: "/blog", description: "Writeups and field notes" },
    ],
  },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/** Flat route list — used by the command palette and sitemap. */
export const routes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/events", label: "Events" },
  { path: "/announcements", label: "Announcements" },
  { path: "/gallery", label: "Gallery" },
  { path: "/resources", label: "Resources" },
  { path: "/projects", label: "Projects" },
  { path: "/hall-of-fame", label: "Hall of Fame" },
  { path: "/team", label: "Team" },
  { path: "/blog", label: "Blog" },
  { path: "/join", label: "Join" },
  { path: "/contact", label: "Contact" },
] as const;

/** Section anchors on the landing page, in document order. */
export const homeSections = [
  "hero",
  "community",
  "announcements",
  "events",
  "why",
  "mission",
  "numbers",
  "gallery",
  "partners",
  "newsletter",
  "join",
] as const;
