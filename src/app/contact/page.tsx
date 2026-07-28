import type { Metadata } from "next";
import { Github, Handshake, Instagram, Linkedin, Mail, MapPin, MessageCircle, Mic } from "lucide-react";
import { PageHeader, Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { Newsletter } from "@/components/sections/Newsletter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach the Kryptonex council at the ${site.parent}, ${site.universityShort} — membership, sponsorship, guest sessions and partnerships.`,
};

const CHANNELS = [
  {
    icon: Mail,
    title: "General enquiries",
    body: "Questions about the club, the tracks, or an event you'd like to attend.",
    action: { label: site.email, href: `mailto:${site.email}` },
  },
  {
    icon: Handshake,
    title: "Sponsorship",
    body: "Back the hackathon or the wider calendar. The sponsorship team handles partnerships end to end.",
    action: {
      label: "Start a conversation",
      href: `mailto:${site.email}?subject=Sponsorship%20—%20Kryptonex`,
    },
  },
  {
    icon: Mic,
    title: "Speak at a session",
    body: "Working in security, AI, engineering or as a founder? Our members want to hear how the work actually goes.",
    action: {
      label: "Propose a session",
      href: `mailto:${site.email}?subject=Guest%20session%20—%20Kryptonex`,
    },
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: site.links.linkedin, icon: Linkedin },
  { label: "Instagram", href: site.links.instagram, icon: Instagram },
  { label: "Discord", href: site.links.discord, icon: MessageCircle },
  { label: "GitHub", href: site.links.github, icon: Github },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the council"
        description="Whether you want to join, sponsor, speak, or bring a team to one of our competitions — this is where to start."
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {CHANNELS.map((channel) => (
            <Card key={channel.title} className="flex h-full flex-col p-7 sm:p-8">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-line bg-bg text-accent">
                <channel.icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
              </span>
              <h2 className="mt-6 text-[17px] font-medium tracking-[-0.022em] text-fg">
                {channel.title}
              </h2>
              <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-fg-muted">
                {channel.body}
              </p>
              <a
                href={channel.action.href}
                data-cursor="hover"
                className="group mt-6 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-accent"
              >
                {channel.action.label}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </Card>
          ))}
        </div>

        <div className="panel mt-4 rounded-lg p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                <MapPin className="h-3 w-3" />
                Where to find us
              </p>
              <h2 className="mt-4 text-[19px] leading-snug font-medium tracking-[-0.024em] text-fg">
                {site.parent}
              </h2>
              <p className="mt-1.5 text-[14.5px] text-fg-muted">
                {site.university} · {site.society}
              </p>
              <p className="mt-0.5 text-[14.5px] text-fg-subtle">{site.city}</p>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <div className="flex flex-wrap items-center gap-2">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    data-cursor="hover"
                    className="grid h-10 w-10 place-items-center rounded-md border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
              <LinkButton href="/join" size="lg">
                Apply to join
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <Newsletter />
    </>
  );
}
