import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { asset } from "@/lib/utils";

const columns = [
  {
    title: "Community",
    links: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Announcements", href: "/announcements" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Resources", href: "/resources" },
      { label: "Hall of Fame", href: "/hall-of-fame" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Join Kryptonex", href: "/join" },
      { label: "Leadership team", href: "/team" },
      { label: "Contact", href: "/contact" },
      { label: "Sponsor us", href: "/contact" },
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
    <footer className="relative border-t border-line no-print">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-8">
          <div className="max-w-xs space-y-5">
            <Logo size={34} />
            <p className="text-[14px] leading-[1.6] text-fg-muted">
              The student innovation community at the {site.parent}, {site.universityShort}.
              Cybersecurity, AI, development, entrepreneurship and design.
            </p>
            <div className="flex items-center gap-1.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  data-cursor="hover"
                  className="grid h-8 w-8 place-items-center rounded-md border border-line text-fg-subtle transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Icon className="h-[14px] w-[14px]" strokeWidth={1.75} />
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                data-cursor="hover"
                className="grid h-8 w-8 place-items-center rounded-md border border-line text-fg-subtle transition-colors hover:border-line-strong hover:text-fg"
              >
                <Mail className="h-[14px] w-[14px]" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      data-cursor="hover"
                      className="text-[13.5px] text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand guidelines: the DPGU lockup sits on white, never on a low-contrast field. */}
          <div className="w-fit rounded-md bg-white px-3.5 py-2.5 ring-1 ring-black/5">
            <Image
              src={asset("/brand/dpgu-str-lockup.jpg")}
              alt={`${site.university} — ${site.parent}`}
              width={1600}
              height={360}
              className="h-7 w-auto object-contain sm:h-8"
            />
          </div>
          <div className="space-y-1 text-[12.5px] text-fg-subtle sm:text-right">
            <p>
              © {new Date().getFullYear()} {site.name} · {site.parent}, {site.universityShort}
            </p>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase">{site.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
