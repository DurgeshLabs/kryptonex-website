"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { ListCard } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { announcements } from "@/data";
import type { AnnouncementTone } from "@/types";

const TONE_VAR: Record<AnnouncementTone, string> = {
  accent: "var(--accent)",
  violet: "var(--violet)",
  gold: "var(--gold)",
  emerald: "var(--emerald)",
  neutral: "var(--fg-subtle)",
};

export function LiveAnnouncements() {
  return (
    <Section id="announcements" bordered>
      <SectionHeader
        index="01"
        eyebrow="Latest updates"
        title="What's live right now"
        description="Recruitment windows, registrations and sessions currently open. Everything here is actionable today."
        action={
          <LinkButton href="/announcements" variant="secondary" size="md">
            All announcements
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {announcements.slice(0, 4).map((item) => (
          <motion.div key={item.id} variants={staggerItem}>
            <ListCard accent={TONE_VAR[item.tone]} className="flex h-full flex-col p-6">
              <p
                className="font-mono text-[10px] tracking-[0.16em] uppercase"
                style={{ color: TONE_VAR[item.tone] }}
              >
                {item.kicker}
              </p>
              <h3 className="mt-3 text-[16.5px] leading-snug font-medium tracking-[-0.02em] text-fg">
                {item.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.6] text-fg-muted">{item.body}</p>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="font-mono text-[11px] text-fg-subtle">{item.meta}</span>
                {item.cta && (
                  <Link
                    href={item.cta.href}
                    data-cursor="hover"
                    className="group/cta inline-flex items-center gap-1 text-[12.5px] font-medium text-accent"
                  >
                    {item.cta.label}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/cta:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </ListCard>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
