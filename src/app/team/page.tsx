import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { TeamDirectory } from "@/components/sections/TeamDirectory";
import { LeadershipTeam } from "@/components/sections/LeadershipTeam";
import { JoinCta } from "@/components/sections/JoinCta";
import { derived } from "@/data";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The Kryptonex council — leadership, technical, events, marketing, sponsorship and documentation teams.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="The council"
        description={`${derived.councilSize} members across ${derived.teams} teams, led by President Durgesh Wankhede with Faculty Advisor Prof. Poonam Raskar. Every team recruits each season.`}
      />

      <LeadershipTeam />

      <Section bordered>
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold tracking-[-0.032em] text-fg">
          Full roster
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-fg-muted">
          Filter by team or search by name and role.
        </p>
        <div className="mt-10">
          <TeamDirectory />
        </div>
      </Section>

      <JoinCta />
    </>
  );
}
