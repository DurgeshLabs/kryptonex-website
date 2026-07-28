"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { derived, leadership } from "@/data";
import { initials } from "@/lib/utils";
import type { TeamName } from "@/types";

export const TEAM_HUE: Record<TeamName, number> = {
  Leadership: 214,
  Technical: 262,
  Events: 158,
  Marketing: 32,
  Sponsorship: 340,
  Documentation: 190,
};

const SOCIALS = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "GitHub", icon: Github },
  { label: "Instagram", icon: Instagram },
];

export function LeadershipTeam() {
  return (
    <Section id="team" bordered>
      <SectionHeader
        index="13"
        eyebrow="Leadership"
        title="The people running it"
        description={`A council of ${derived.councilSize} across ${derived.teams} teams. These are the leads — the full roster is on the team page.`}
        action={
          <LinkButton href="/team" variant="secondary" size="md">
            Full council
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {leadership.map((member) => {
          const hue = TEAM_HUE[member.team];
          return (
            <motion.article
              key={member.id}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-md border font-mono text-[13px] font-medium"
                  style={{
                    borderColor: `hsl(${hue} 70% 55% / 0.28)`,
                    background: `hsl(${hue} 70% 50% / 0.09)`,
                    color: `hsl(${hue} 80% 68%)`,
                  }}
                >
                  {initials(member.name)}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-fg-subtle uppercase">
                  {member.seniority === "faculty" ? "Faculty" : "Lead"}
                </span>
              </div>

              <h3 className="mt-5 text-[15px] leading-snug font-medium tracking-[-0.018em] text-fg">
                {member.name}
              </h3>
              <p className="mt-1 text-[13px] text-fg-muted">{member.role}</p>
              <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                {member.team}
              </p>

              {/* Social row reveals on hover; links resolve once handles are added to the roster. */}
              <div className="mt-4 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {SOCIALS.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    title={`${label} — link pending`}
                    className="grid h-7 w-7 place-items-center rounded border border-line text-fg-subtle"
                  >
                    <Icon className="h-3 w-3" strokeWidth={1.75} />
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </Stagger>
    </Section>
  );
}
