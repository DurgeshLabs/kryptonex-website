import type { Metadata } from "next";
import { PageHeader, Section, SectionHeader } from "@/components/ui/Section";
import { MissionVision } from "@/components/sections/MissionVision";
import { LearningPath } from "@/components/sections/LearningPath";
import { CommunityNumbers } from "@/components/sections/CommunityNumbers";
import { JoinCta } from "@/components/sections/JoinCta";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `How Kryptonex started, what it became, and how the five domain tracks work at the ${site.parent}, ${site.universityShort}.`,
};

const HISTORY = [
  {
    period: "The beginning",
    title: "STR's first Tech & Innovation Club",
    body: "Kryptonex started as the first official technical club at the School of Technology and Research — running GitSetGo on Git and GitHub, Codeforces vs LeetCode, Tech Rush, and industry visits to FABLAB and COEP. That period built the foundation: coding, problem-solving and the habit of shipping.",
  },
  {
    period: "The turn",
    title: "From a general club to a structured community",
    body: "A club that covers everything ends up teaching nothing in depth. We reorganised around five domains — cybersecurity, AI, development, entrepreneurship and design — each with its own track, its own leads and its own session cycle, so members progress rather than merely attend.",
  },
  {
    period: "Now",
    title: "A pipeline, not a calendar",
    body: "Today Kryptonex runs a sequenced learning path from a member's first session through projects, competitions, leadership and industry placement. Every part of it is documented publicly, which is why this site exists.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="College teaches subjects. We build careers."
        description={`Kryptonex is the student innovation community at the ${site.parent}, ${site.universityShort} — five domain tracks, a sequenced learning path, and consistent contact with people already doing the work.`}
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/join" size="md">
            Join Kryptonex
          </LinkButton>
          <LinkButton href="/team" variant="secondary" size="md">
            Meet the council
          </LinkButton>
        </div>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="Our story"
          title="How we got here"
          description="Three phases, one direction of travel."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-[var(--border)] lg:grid-cols-3">
          {HISTORY.map((entry) => (
            <div key={entry.period} className="bg-bg p-7 sm:p-8">
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                {entry.period}
              </p>
              <h3 className="mt-5 text-[17px] leading-snug font-medium tracking-[-0.022em] text-fg">
                {entry.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-fg-muted">{entry.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <MissionVision />
      <LearningPath />
      <CommunityNumbers />
      <JoinCta />
    </>
  );
}
