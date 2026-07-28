import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { JoinCta } from "@/components/sections/JoinCta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Kryptonex workshops, hackathons, industry visits, meetups and community nights.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Life at Kryptonex"
        description="A photographer is assigned to every session. Until each event's photos are processed, generated plates hold their place in the grid."
      />

      <Section>
        <GalleryGrid />
      </Section>

      <JoinCta />
    </>
  );
}
