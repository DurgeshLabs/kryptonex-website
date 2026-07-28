import { Hero } from "@/components/sections/Hero";
import { CommunityPhoto } from "@/components/sections/CommunityPhoto";
import { LiveAnnouncements } from "@/components/sections/LiveAnnouncements";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { WhyKryptonex } from "@/components/sections/WhyKryptonex";
import { MissionVision } from "@/components/sections/MissionVision";
import { CommunityNumbers } from "@/components/sections/CommunityNumbers";
import { GallerySection } from "@/components/sections/GallerySection";
import { Partners } from "@/components/sections/Partners";
import { Newsletter } from "@/components/sections/Newsletter";
import { JoinCta } from "@/components/sections/JoinCta";

export default function Home() {
  return (
    <>
      <Hero />
      <CommunityPhoto index="01" />
      <LiveAnnouncements index="02" />
      <UpcomingEvents index="03" />
      <WhyKryptonex index="04" />
      <MissionVision index="05" />
      <CommunityNumbers index="06" />
      <GallerySection index="07" />
      <Partners index="08" />
      <Newsletter index="09" />
      <JoinCta />
    </>
  );
}
