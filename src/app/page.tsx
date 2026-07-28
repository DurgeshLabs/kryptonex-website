import { Hero } from "@/components/sections/Hero";
import { LiveAnnouncements } from "@/components/sections/LiveAnnouncements";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { WhyKryptonex } from "@/components/sections/WhyKryptonex";
import { MissionVision } from "@/components/sections/MissionVision";
import { LearningPath } from "@/components/sections/LearningPath";
import { SemesterRoadmap } from "@/components/sections/SemesterRoadmap";
import { CommunityNumbers } from "@/components/sections/CommunityNumbers";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HallOfFame } from "@/components/sections/HallOfFame";
import { GallerySection } from "@/components/sections/GallerySection";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import { Partners } from "@/components/sections/Partners";
import { LeadershipTeam } from "@/components/sections/LeadershipTeam";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { JoinCta } from "@/components/sections/JoinCta";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveAnnouncements />
      <UpcomingEvents />
      <WhyKryptonex />
      <MissionVision />
      <LearningPath />
      <SemesterRoadmap />
      <CommunityNumbers />
      <FeaturedProjects />
      <HallOfFame />
      <GallerySection />
      <ResourceLibrary />
      <Partners />
      <LeadershipTeam />
      <Testimonials />
      <Newsletter />
      <JoinCta />
    </>
  );
}
