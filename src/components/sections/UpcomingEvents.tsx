"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { events, groupEventsByMonth, upcomingEvents } from "@/data";
import { cn, formatShortDate, todayISO } from "@/lib/utils";
import type { EventType } from "@/types";

type Tone = "neutral" | 1 | 2 | 3 | 4 | 5 | 6;

const TYPE_TONE: Record<EventType, Tone> = {
  Workshop: 3,
  "Guest Talk": 2,
  Competition: 4,
  Hackathon: 5,
  Social: 6,
  Meetup: 1,
  Visit: "neutral",
};

export function UpcomingEvents({ index }: { index?: string } = {}) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayISO()), []);

  // Before hydration resolves the date, show the tail of the calendar so the
  // static HTML is never empty or wrong.
  const list = today ? upcomingEvents(today, 8) : events.slice(-8);
  const groups = groupEventsByMonth(list);

  return (
    <Section id="events" bordered>
      <SectionHeader
        index={index}
        eyebrow="Upcoming events"
        title="What's next on the calendar"
        description="Workshops, guest sessions, competitions and meetups across all five domain tracks."
        action={
          <LinkButton href="/events" variant="secondary" size="md">
            Full calendar
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />

      <div className="mt-12 space-y-10">
        {groups.map(([month, items], gi) => (
          <Reveal key={month} delay={gi * 0.05}>
            <div className="grid gap-6 lg:grid-cols-[160px_1fr] lg:gap-10">
              <div className="lg:pt-1">
                <h3 className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
                  {month}
                </h3>
                <p className="mt-1.5 text-[13px] text-fg-subtle">
                  {items.length} {items.length === 1 ? "event" : "events"}
                </p>
              </div>

              <ul className="border-t border-line">
                {items.map((event, i) => (
                  <motion.li
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="group border-b border-line"
                  >
                    <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-8">
                      <span className="w-16 shrink-0 font-mono text-[12.5px] text-fg-subtle sm:pt-0.5">
                        {formatShortDate(event.date)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={TYPE_TONE[event.type]}>{event.type}</Badge>
                          {event.flagship && <Badge tone="gold">Flagship</Badge>}
                          <span className="font-mono text-[10.5px] tracking-[0.1em] text-fg-subtle uppercase">
                            {event.domain}
                          </span>
                        </div>
                        <h4
                          className={cn(
                            "mt-2.5 text-[16px] leading-snug font-medium tracking-[-0.018em] text-fg transition-colors",
                            "group-hover:text-accent",
                          )}
                        >
                          {event.name}
                        </h4>
                        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-[1.6] text-fg-muted">
                          {event.summary}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4 font-mono text-[11px] text-fg-subtle sm:flex-col sm:items-end sm:gap-1.5 sm:pt-0.5">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3 w-3" />
                          {event.expectedAttendees}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
