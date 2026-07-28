import Image from "next/image";
import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { AnimatedLink } from "@/components/ui/AnimatedText";
import { site } from "@/lib/site";
import { asset } from "@/lib/utils";

const columns = [
  {
    title: "Community",
    links: [
      { label: "About", href: "#about" },
      { label: "Mission", href: "#mission" },
      { label: "Why join", href: "#why-join" },
      { label: "The council", href: "#team" },
    ],
  },
  {
    title: "Programme",
    links: [
      { label: "Learning roadmap", href: "#roadmap" },
      { label: "Events calendar", href: "#events" },
      { label: "CTF journey", href: "#ctf-journey" },
      { label: "Digital Fortress", href: "#digital-fortress" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Recruitment", href: "#recruitment" },
      { label: "Sponsor us", href: "#contact" },
      { label: "Speak at a session", href: "#contact" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: site.links.linkedin, icon: Linkedin },
  { label: "Instagram", href: site.links.instagram, icon: Instagram },
  { label: "Discord", href: site.links.discord, icon: MessageCircle },
  { label: "GitHub", href: site.links.github, icon: Github },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line no-print">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-6">
            <Logo size={40} />
            <p className="max-w-xs text-[14.5px] leading-relaxed text-fg-muted">
              {site.tagline} The cybersecurity and Capture-the-Flag community at the School of
              Technology and Research, {site.universityShort}.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  data-cursor="hover"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-neon"
                >
                  <Icon className="h-[15px] w-[15px]" strokeWidth={1.75} />
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                data-cursor="hover"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-neon"
              >
                <Mail className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="space-y-4">
              <h3 className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <AnimatedLink href={link.href} className="text-[14px]">
                      {link.label}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8">
          {/* Brand guidelines: the DPGU lockup sits on white, never on a low-contrast field. */}
          <div className="w-fit rounded-xl bg-white px-4 py-3 ring-1 ring-black/5">
            <Image
              src={asset("/brand/dpgu-str-lockup.jpg")}
              alt={`${site.university} — ${site.parent}`}
              width={1600}
              height={360}
              className="h-8 w-auto object-contain sm:h-10"
            />
          </div>
          <div className="flex flex-col gap-3 text-[12.5px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name} · {site.parent}, {site.universityShort}
            </p>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase">
              Break it · Understand it · Defend it
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
