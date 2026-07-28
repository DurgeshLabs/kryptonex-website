"use client";

import { ArrowRight } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { GalleryGrid } from "./GalleryGrid";

export function GallerySection({ index }: { index?: string } = {}) {
  return (
    <Section id="gallery" bordered>
      <SectionHeader
        index={index}
        eyebrow="Past events"
        title="Life at Kryptonex"
        description="A photographer is assigned to every workshop, talk and competition. Until each season's photos land, these plates hold their place."
        action={
          <LinkButton href="/gallery" variant="secondary" size="md">
            Full gallery
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />
      <Reveal className="mt-12">
        <GalleryGrid showFilters={false} />
      </Reveal>
    </Section>
  );
}
