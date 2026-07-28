import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { EventsExplorer } from "@/components/sections/EventsExplorer";
import { SemesterRoadmap } from "@/components/sections/SemesterRoadmap";
import { JoinCta } from "@/components/sections/JoinCta";
import { events } from "@/data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The full Kryptonex calendar — workshops, guest sessions, hackathons, competitions, meetups and industry visits across all five domain tracks.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="The full calendar"
        description={`${events.length} sessions across the community's history and the season ahead — filterable by time, type and keyword.`}
      />

      <Section>
        <EventsExplorer />
      </Section>

      <SemesterRoadmap />
      <JoinCta />
    </>
  );
}
