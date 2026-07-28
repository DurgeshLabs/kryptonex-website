"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { DomainIcon } from "@/components/ui/DomainIcon";
import { LinkButton } from "@/components/ui/LinkButton";
import { derived, resources } from "@/data";

export function ResourceLibrary({ index }: { index?: string } = {}) {
  return (
    <Section id="resources" bordered>
      <SectionHeader
        index={index}
        eyebrow="Resource library"
        title="Everything we teach, written down"
        description={`${derived.resourceCount} curated guides across seven categories — the same material members work through in sessions, kept in one place.`}
        action={
          <LinkButton href="/resources" variant="secondary" size="md">
            Browse the library
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((category) => (
          <motion.div key={category.id} variants={staggerItem}>
            <Card className="flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <span
                  className="grid h-10 w-10 place-items-center rounded-md border"
                  style={{
                    borderColor: `hsl(${category.hue} 70% 55% / 0.28)`,
                    background: `hsl(${category.hue} 70% 50% / 0.09)`,
                    color: `hsl(${category.hue} 80% 66%)`,
                  }}
                >
                  <DomainIcon name={category.icon} className="h-[17px] w-[17px]" />
                </span>
                <span className="font-mono text-[10.5px] text-fg-subtle">{category.count} files</span>
              </div>

              <h3 className="mt-6 text-[16.5px] font-medium tracking-[-0.022em] text-fg">
                {category.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-fg-muted">{category.summary}</p>

              <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13px] leading-snug text-fg-muted"
                  >
                    <FileDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-subtle" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
