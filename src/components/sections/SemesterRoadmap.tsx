"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { semesterRoadmap } from "@/data";
import { cn } from "@/lib/utils";

export function SemesterRoadmap({ index }: { index?: string } = {}) {
  return (
    <Section id="semester" bordered>
      <SectionHeader
        index={index}
        eyebrow="This semester"
        title="What's coming, month by month"
        description="The season is planned end to end so members can commit to a track knowing what lands when."
      />

      <div className="relative mt-14">
        <div aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-line lg:left-[calc(9rem+7px)]" />

        <ol className="space-y-4">
          {semesterRoadmap.map((month, i) => (
            <motion.li
              key={month.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-5 lg:gap-8"
            >
              <div className="hidden w-36 shrink-0 pt-5 text-right lg:block">
                <span className="font-mono text-[12.5px] text-fg-subtle">{month.month}</span>
              </div>

              <span className="relative z-10 mt-6 h-3.5 w-3.5 shrink-0">
                <span
                  className={cn(
                    "block h-3.5 w-3.5 rounded-full border-2 bg-bg",
                    month.status === "current" ? "border-accent" : "border-line-strong",
                  )}
                />
              </span>

              <div
                className={cn(
                  "flex-1 rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7",
                  month.status === "current" &&
                    "border-[color-mix(in_oklab,var(--accent)_30%,transparent)]",
                )}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase lg:hidden">
                    {month.month}
                  </span>
                  {month.status === "current" && (
                    <Badge tone="brand" dot>
                      Now
                    </Badge>
                  )}
                </div>

                <h3 className="mt-3 text-[17px] font-medium tracking-[-0.022em] text-fg">
                  {month.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-[1.65] text-fg-muted">
                  {month.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {month.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded border border-line px-2 py-1 font-mono text-[10.5px] text-fg-subtle"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
