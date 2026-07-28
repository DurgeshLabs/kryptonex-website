"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Clock, Wrench } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { roadmap } from "@/data";
import { cn } from "@/lib/utils";

const STAGE_TONE = {
  Foundations: { color: "var(--neon)", badge: "neon" as const },
  Offense: { color: "var(--crimson)", badge: "crimson" as const },
  Defense: { color: "var(--emerald)", badge: "emerald" as const },
  Specialist: { color: "var(--gold)", badge: "gold" as const },
};

export function Roadmap() {
  const [activeId, setActiveId] = useState(roadmap[0].id);
  const active = roadmap.find((t) => t.id === activeId) ?? roadmap[0];
  const tone = STAGE_TONE[active.stage];

  return (
    <Section id="roadmap">
      <SectionHeader
        eyebrow="Learning roadmap"
        title={
          <>
            A {roadmap.length}-topic ladder.{" "}
            <span className="text-fg-subtle">Climbed in order.</span>
          </>
        }
        description="Each rung assumes the one below it. Start at the command line in your first week and finish the year writing a bug bounty report someone will pay for. Select any track to see what it covers."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-10">
        {/* Ladder */}
        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[19px] w-px bg-[linear-gradient(to_bottom,var(--neon),var(--crimson)_38%,var(--emerald)_72%,var(--gold))] opacity-30"
          />
          <ol className="relative space-y-0.5">
            {roadmap.map((topic) => {
              const isActive = topic.id === activeId;
              const stageColor = STAGE_TONE[topic.stage].color;
              return (
                <li key={topic.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(topic.id)}
                    aria-current={isActive}
                    data-cursor="hover"
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-xl py-2.5 pr-3 pl-0 text-left transition-colors",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-[12px] transition-all duration-300",
                        isActive
                          ? "scale-105 border-transparent text-bg"
                          : "border-line bg-bg group-hover:border-line-strong",
                      )}
                      style={
                        isActive
                          ? { backgroundColor: stageColor, color: "#050505" }
                          : undefined
                      }
                    >
                      {String(topic.index).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-medium tracking-[-0.015em]">
                        {topic.title}
                      </span>
                      <span className="font-mono text-[10.5px] tracking-[0.12em] text-fg-subtle uppercase">
                        {topic.stage}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-all duration-300",
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.08}>
          <div className="panel sticky top-24 overflow-hidden rounded-2xl">
            <div
              aria-hidden
              className="h-px w-full"
              style={{ background: `linear-gradient(90deg, ${tone.color}, transparent)` }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge tone={tone.badge}>{active.stage}</Badge>
                  <Badge>
                    <Clock className="h-3 w-3" />
                    {active.duration}
                  </Badge>
                  <span className="font-mono text-[11px] text-fg-subtle">
                    Track {String(active.index).padStart(2, "0")} / {roadmap.length}
                  </span>
                </div>

                <h3 className="mt-5 text-[clamp(1.45rem,2.8vw,1.95rem)] leading-tight font-semibold tracking-[-0.03em] text-fg">
                  {active.title}
                </h3>
                <p className="mt-3.5 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                  {active.summary}
                </p>

                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                      What you&apos;ll learn
                    </h4>
                    <ul className="mt-3.5 space-y-2.5">
                      {active.skills.map((skill, i) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                          className="flex items-start gap-2.5 text-[14px] text-fg-muted"
                        >
                          <span
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: tone.color }}
                          />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                      <Wrench className="h-3 w-3" />
                      Tooling
                    </h4>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {active.tools.map((tool, i) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                          className="rounded-lg border border-line bg-bg px-2.5 py-1.5 font-mono text-[11.5px] text-fg-muted"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress rail */}
                <div className="mt-9">
                  <div className="flex items-center justify-between font-mono text-[10.5px] text-fg-subtle">
                    <span>Ladder progress</span>
                    <span>{Math.round((active.index / roadmap.length) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tone.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(active.index / roadmap.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
