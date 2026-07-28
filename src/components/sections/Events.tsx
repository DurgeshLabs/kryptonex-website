"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Flag, Users } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { events, eventTypes } from "@/data";
import { cn, formatDate } from "@/lib/utils";
import type { EventType } from "@/types";

const TYPE_TONE: Record<EventType, "neon" | "violet" | "gold" | "emerald" | "crimson"> = {
  Workshop: "neon",
  "Guest Talk": "violet",
  Competition: "gold",
  Social: "emerald",
  Meetup: "crimson",
};

type Filter = "All" | EventType;

export function Events() {
  const [filter, setFilter] = useState<Filter>("All");
  const [today, setToday] = useState<string | null>(null);

  // Resolved after mount so the static export and the hydrated DOM agree.
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: events.length };
    for (const type of eventTypes) map[type] = events.filter((e) => e.type === type).length;
    return map;
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.type === filter)),
    [filter],
  );

  const upcoming = today ? filtered.filter((e) => e.date >= today) : [];

  return (
    <Section id="events">
      <SectionHeader
        eyebrow="Events & activities"
        title={
          <>
            Security workshops, guest talks and CTFs{" "}
            <span className="text-fg-subtle">across the year.</span>
          </>
        }
        description={
          today
            ? `${events.length} sessions on the calendar${
                upcoming.length ? ` · ${upcoming.length} still ahead` : ""
              }. Flagship events are marked.`
            : `${events.length} sessions on the calendar. Flagship events are marked.`
        }
      />

      {/* Filters */}
      <Reveal className="mt-10">
        <div className="flex flex-wrap gap-2">
          {(["All", ...eventTypes] as Filter[]).map((type) => {
            const isActive = filter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                aria-pressed={isActive}
                data-cursor="hover"
                className={cn(
                  "relative rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "border-transparent text-bg"
                    : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="event-filter"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full bg-fg"
                  />
                )}
                {type}
                <span className={cn("ml-1.5 font-mono text-[11px]", isActive ? "opacity-60" : "opacity-45")}>
                  {counts[type]}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative mt-12">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-[7px] w-px bg-line sm:left-[calc(7.5rem+7px)]"
        />
        <motion.ol layout className="space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((event, i) => {
              const isPast = today ? event.date < today : false;
              return (
                <motion.li
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.025, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex gap-5 sm:gap-8"
                >
                  {/* Date rail */}
                  <div className="hidden w-30 shrink-0 pt-5 text-right sm:block">
                    <span className="font-mono text-[12px] whitespace-nowrap text-fg-subtle">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  {/* Node */}
                  <span className="relative z-10 mt-6 h-3.5 w-3.5 shrink-0">
                    <span
                      className={cn(
                        "block h-3.5 w-3.5 rounded-full border-2 bg-bg transition-colors duration-300",
                        event.flagship
                          ? "border-gold"
                          : isPast
                            ? "border-line-strong"
                            : "border-neon group-hover:border-violet",
                      )}
                    />
                    {event.flagship && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-gold opacity-40" />
                    )}
                  </span>

                  {/* Card */}
                  <div
                    className={cn(
                      "relative flex-1 overflow-hidden rounded-xl border border-line bg-surface p-5 transition-all duration-300 group-hover:border-line-strong sm:p-6",
                      event.flagship &&
                        "border-[color-mix(in_oklab,var(--gold)_28%,transparent)] bg-[linear-gradient(120deg,color-mix(in_oklab,var(--gold)_7%,transparent),transparent_55%)]",
                      isPast && !event.flagship && "opacity-65 hover:opacity-100",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={TYPE_TONE[event.type]}>{event.type}</Badge>
                      {event.flagship && (
                        <Badge tone="gold">
                          <Flag className="h-3 w-3" />
                          Flagship
                        </Badge>
                      )}
                      <Badge tone={isPast ? "neutral" : event.status === "Planning" ? "emerald" : "neutral"} dot>
                        {isPast ? "Held" : event.status}
                      </Badge>
                      <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle">
                        <Users className="h-3 w-3" />
                        {event.expectedAttendees}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-[16.5px] leading-snug font-medium tracking-[-0.02em] text-fg sm:text-[17.5px]">
                      {event.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-fg-muted">
                      {event.summary}
                    </p>

                    <span className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle sm:hidden">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(event.date)}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>
      </div>
    </Section>
  );
}
