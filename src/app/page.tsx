import { Hero } from "@/components/sections/Hero";
import { LiveAnnouncements } from "@/components/sections/LiveAnnouncements";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { WhyKryptonex } from "@/components/sections/WhyKryptonex";
import { MissionVision } from "@/components/sections/MissionVision";
import { CommunityNumbers } from "@/components/sections/CommunityNumbers";
import { GallerySection } from "@/components/sections/GallerySection";
import { Partners } from "@/components/sections/Partners";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import { LeadershipTeam } from "@/components/sections/LeadershipTeam";
import { Newsletter } from "@/components/sections/Newsletter";
import { JoinCta } from "@/components/sections/JoinCta";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveAnnouncements />
      <UpcomingEvents />
      <WhyKryptonex />
      <MissionVision index="04" />
      <CommunityNumbers index="05" />
      <GallerySection index="06" />
      <Partners index="07" />
      <ResourceLibrary index="08" />
      <LeadershipTeam index="09" />
      <Newsletter index="10" />
      <JoinCta />
    </>
  );
}
