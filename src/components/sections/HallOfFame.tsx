"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { ListCard } from "@/components/ui/Card";
import { DomainIcon } from "@/components/ui/DomainIcon";
import { LinkButton } from "@/components/ui/LinkButton";
import { hallOfFame } from "@/data";
import { toneChip, toTone } from "@/lib/palette";

export function HallOfFame() {
  return (
    <Section id="hall-of-fame" bordered>
      <SectionHeader
        index="09"
        eyebrow="Hall of Fame"
        title="Celebrating builders"
        description="Six categories of recognition, awarded on evidence rather than attendance. Names are added as each season's results are confirmed."
        action={
          <LinkButton href="/hall-of-fame" variant="secondary" size="md">
            See the criteria
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hallOfFame.map((category) => (
          <motion.div key={category.id} variants={staggerItem}>
            <ListCard
              accent={`var(--tone-${toTone(category.tone)})`}
              className="flex h-full flex-col p-7"
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-md border"
                style={toneChip(toTone(category.tone))}
              >
                <DomainIcon name={category.icon} className="h-[17px] w-[17px]" />
              </span>

              <h3 className="mt-6 text-[16.5px] font-medium tracking-[-0.022em] text-fg">
                {category.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.65] text-fg-muted">
                {category.summary}
              </p>

              <p className="mt-6 border-t border-line pt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-fg-subtle">
                {category.criteria}
              </p>
            </ListCard>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
