"use client";

import { motion } from "framer-motion";
import {
  Github,
  Handshake,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
} from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/lib/site";

const CHANNELS = [
  {
    icon: Mail,
    title: "Reach out",
    body: "Questions about the club, the tracks or an event? Talk to the council.",
    action: { label: site.email, href: `mailto:${site.email}` },
  },
  {
    icon: Handshake,
    title: "Sponsor us",
    body: "Back Digital Fortress or the wider calendar. The sponsorship team handles partnerships.",
    action: {
      label: "Start a conversation",
      href: `mailto:${site.email}?subject=Sponsorship%20—%20Kryptonex`,
    },
  },
  {
    icon: Mic,
    title: "Speak at a session",
    body: "Working in security? Our members want to hear how the field actually works.",
    action: {
      label: "Propose a talk",
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

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title={
          <>
            Talk to the <span className="gradient-text">council.</span>
          </>
        }
        description="Whether you want to join, sponsor, speak, or bring a team to Digital Fortress — this is where to start."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {CHANNELS.map((channel, i) => (
          <Reveal key={channel.title} delay={i * 0.08}>
            <Card className="flex h-full flex-col p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg text-neon">
                <channel.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-[17px] font-medium tracking-[-0.02em] text-fg">
                {channel.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-fg-muted">
                {channel.body}
              </p>
              <a
                href={channel.action.href}
                data-cursor="hover"
                className="group mt-6 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-neon"
              >
                {channel.action.label}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12} className="mt-6">
        <div className="panel relative overflow-hidden rounded-2xl p-8 sm:p-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_85%_0%,color-mix(in_oklab,var(--violet)_12%,transparent),transparent_60%)]"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                <MapPin className="h-3 w-3" />
                Where to find us
              </p>
              <h3 className="mt-4 text-[19px] leading-snug font-semibold tracking-[-0.025em] text-fg">
                {site.parent}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-fg-muted">
                {site.university} · {site.society}
              </p>
              <p className="mt-0.5 text-[14.5px] text-fg-subtle">{site.city}</p>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <div className="flex flex-wrap items-center gap-2">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    data-cursor="hover"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 380, damping: 20 }}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-neon"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </motion.a>
                ))}
              </div>
              <LinkButton href={site.links.recruitment} size="lg">
                Apply to join
              </LinkButton>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
