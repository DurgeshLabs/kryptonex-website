"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { derived, leadership } from "@/data";
import { initials } from "@/lib/utils";
import { toneChip, type ToneIndex } from "@/lib/palette";
import type { TeamName } from "@/types";

/** Each team gets a step on the brand ramp — red through gold, nothing outside it. */
export const TEAM_TONE: Record<TeamName, ToneIndex> = {
  Leadership: 1,
  Technical: 2,
  Events: 3,
  Marketing: 4,
  Sponsorship: 5,
  Documentation: 6,
};

const SOCIALS = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "GitHub", icon: Github },
  { label: "Instagram", icon: Instagram },
];

export function LeadershipTeam({ index }: { index?: string } = {}) {
  return (
    <Section id="team" bordered>
      <SectionHeader
        index={index}
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
          const tone = TEAM_TONE[member.team];
          return (
            <motion.article
              key={member.id}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-md border font-mono text-[13px] font-medium"
                  style={toneChip(tone)}
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
