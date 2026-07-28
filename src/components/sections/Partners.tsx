"use client";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Section";
import { partners } from "@/data";

export function Partners({ index }: { index?: string } = {}) {
  return (
    <Section id="partners" bordered>
      <Reveal className="flex flex-col gap-4">
        <Eyebrow index={index}>Partners & collaborators</Eyebrow>
        <p className="max-w-2xl text-[15.5px] leading-[1.65] text-fg-muted">
          Organisations and communities that have supported Kryptonex sessions, competitions and
          member programmes.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <div className="pause-on-hover mask-fade-x flex overflow-hidden border-y border-line py-8">
          <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.id}-${i}`} className="flex shrink-0 flex-col gap-1">
                <span className="text-[17px] font-medium tracking-[-0.025em] whitespace-nowrap text-fg-muted transition-colors">
                  {partner.name}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-fg-subtle uppercase">
                  {partner.kind}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
