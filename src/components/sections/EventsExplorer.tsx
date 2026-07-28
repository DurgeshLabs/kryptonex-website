"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Search, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { events, eventTypes, groupEventsByMonth } from "@/data";
import { cn, formatShortDate, todayISO } from "@/lib/utils";
import type { EventType } from "@/types";

type Tone = "neutral" | "accent" | "violet" | "gold" | "emerald" | "crimson" | "amber";

const TYPE_TONE: Record<EventType, Tone> = {
  Workshop: "accent",
  "Guest Talk": "violet",
  Competition: "amber",
  Hackathon: "gold",
  Social: "emerald",
  Meetup: "crimson",
  Visit: "neutral",
};

type When = "Upcoming" | "Past" | "All";

/** Full calendar with time, type and text filters. */
export function EventsExplorer() {
  const [when, setWhen] = useState<When>("Upcoming");
  const [type, setType] = useState<"All" | EventType>("All");
  const [query, setQuery] = useState("");
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => setToday(todayISO()), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = events;

    if (today) {
      if (when === "Upcoming") list = list.filter((e) => e.date >= today);
      else if (when === "Past") list = list.filter((e) => e.date < today).slice().reverse();
    }
    if (type !== "All") list = list.filter((e) => e.type === type);
    if (q) {
      list = list.filter((e) =>
        `${e.name} ${e.summary} ${e.domain} ${e.venue} ${e.type}`.toLowerCase().includes(q),
      );
    }
    return list;
  }, [when, type, query, today]);

  const groups = groupEventsByMonth(filtered);

  const counts = useMemo(() => {
    if (!today) return { Upcoming: 0, Past: 0, All: events.length };
    return {
      Upcoming: events.filter((e) => e.date >= today).length,
      Past: events.filter((e) => e.date < today).length,
      All: events.length,
    };
  }, [today]);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-md border border-line p-0.5">
            {(["Upcoming", "Past", "All"] as When[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWhen(w)}
                aria-pressed={when === w}
                data-cursor="hover"
                className={cn(
                  "rounded px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                  when === w ? "bg-fg text-bg" : "text-fg-muted hover:text-fg",
                )}
              >
                {w}
                <span className="ml-1.5 font-mono text-[10.5px] opacity-55">{counts[w]}</span>
              </button>
            ))}
          </div>

          <div className="hidden h-5 w-px bg-line sm:block" />

          <div className="flex flex-wrap gap-1.5">
            {(["All", ...eventTypes] as ("All" | EventType)[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                data-cursor="hover"
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-[12px] transition-colors",
                  type === t
                    ? "border-fg-subtle text-fg"
                    : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-64">
          <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events…"
            aria-label="Search events"
            className="h-10 w-full rounded-md border border-line bg-surface pr-9 pl-10 text-[13.5px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-fg-subtle hover:text-fg"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-10 space-y-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map(([month, items]) => (
            <motion.div
              key={month}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-5 lg:grid-cols-[160px_1fr] lg:gap-10"
            >
              <div className="lg:pt-1">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
                  {month}
                </h2>
                <p className="mt-1.5 text-[13px] text-fg-subtle">
                  {items.length} {items.length === 1 ? "event" : "events"}
                </p>
              </div>

              <ul className="border-t border-line">
                {items.map((event) => {
                  const isPast = today ? event.date < today : false;
                  return (
                    <li key={event.id} className="group border-b border-line">
                      <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-8">
                        <span className="w-16 shrink-0 font-mono text-[12.5px] text-fg-subtle sm:pt-0.5">
                          {formatShortDate(event.date)}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone={TYPE_TONE[event.type]}>{event.type}</Badge>
                            {event.flagship && <Badge tone="gold">Flagship</Badge>}
                            <Badge tone="neutral" dot>
                              {isPast ? "Held" : event.status}
                            </Badge>
                            <span className="font-mono text-[10.5px] tracking-[0.1em] text-fg-subtle uppercase">
                              {event.domain}
                            </span>
                          </div>
                          <h3 className="mt-2.5 text-[16px] leading-snug font-medium tracking-[-0.018em] text-fg transition-colors group-hover:text-accent">
                            {event.name}
                          </h3>
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
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>

        {groups.length === 0 && (
          <p className="py-16 text-center text-[14px] text-fg-subtle">
            No events match these filters.
          </p>
        )}
      </div>
    </>
  );
}
