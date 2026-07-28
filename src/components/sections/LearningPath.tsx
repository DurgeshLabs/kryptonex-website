"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { learningPath } from "@/data";
import { cn } from "@/lib/utils";

export function LearningPath() {
  const [active, setActive] = useState(0);
  const step = learningPath[active];

  return (
    <Section id="learning-path" bordered>
      <SectionHeader
        index="05"
        eyebrow="Learning journey"
        title="From your first session to your first company."
        description="Eight stages. Most members move through the first four in a year — the rest depends on how far you want to take it."
      />

      {/* Horizontal rail */}
      <Reveal className="mt-14">
        <div className="relative">
          <div aria-hidden className="absolute top-4 right-0 left-0 h-px bg-line" />
          <motion.div
            aria-hidden
            className="absolute top-4 left-0 h-px bg-accent"
            animate={{ width: `${((active + 1) / learningPath.length) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
          <ol className="relative grid grid-cols-4 gap-x-2 gap-y-6 md:grid-cols-8">
            {learningPath.map((s, i) => {
              const done = i < active;
              const current = i === active;
              return (
                <li key={s.id} className="flex flex-col items-center gap-3 text-center">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={current}
                    aria-label={`Stage ${s.step}: ${s.title}`}
                    data-cursor="hover"
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full border font-mono text-[11px] transition-all duration-300",
                      current
                        ? "border-accent bg-accent text-white"
                        : done
                          ? "border-accent/45 bg-bg text-accent"
                          : "border-line bg-bg text-fg-subtle hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {s.step}
                  </button>
                  <span
                    className={cn(
                      "text-[12px] leading-tight font-medium transition-colors",
                      current ? "text-fg" : "text-fg-subtle",
                    )}
                  >
                    {s.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="panel rounded-lg p-8 sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
              <div className="max-w-2xl">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                  Stage {step.step} · {step.phase}
                </p>
                <h3 className="mt-4 text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold tracking-[-0.032em] text-fg">
                  {step.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-fg-muted">{step.summary}</p>
              </div>

              <div className="flex gap-2 sm:shrink-0">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="rounded-md border border-line px-3.5 py-2 text-[13px] text-fg-muted transition-colors hover:text-fg disabled:pointer-events-none disabled:opacity-35"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.min(learningPath.length - 1, a + 1))}
                  disabled={active === learningPath.length - 1}
                  className="rounded-md border border-line px-3.5 py-2 text-[13px] text-fg-muted transition-colors hover:text-fg disabled:pointer-events-none disabled:opacity-35"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}
