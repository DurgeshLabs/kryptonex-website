"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { team, teamNames } from "@/data";
import { cn, initials } from "@/lib/utils";
import type { TeamName } from "@/types";

const TEAM_HUE: Record<TeamName, number> = {
  Leadership: 214,
  Technical: 258,
  Events: 145,
  Marketing: 38,
  Sponsorship: 356,
  Documentation: 190,
};

type Filter = "All" | TeamName;

export function Team() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: team.length };
    for (const name of teamNames) map[name] = team.filter((m) => m.team === name).length;
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return team.filter((m) => {
      const matchesTeam = filter === "All" || m.team === filter;
      const matchesQuery =
        !q || `${m.name} ${m.role} ${m.team}`.toLowerCase().includes(q);
      return matchesTeam && matchesQuery;
    });
  }, [filter, query]);

  return (
    <Section id="team">
      <SectionHeader
        eyebrow="Our team"
        title={
          <>
            A council of {team.length}{" "}
            <span className="text-fg-subtle">across six teams.</span>
          </>
        }
        description="Leadership, technical, events, marketing, sponsorship and documentation — led by President Durgesh Wankhede with Faculty Advisor Prof. Poonam Raskar."
      />

      {/* Controls */}
      <Reveal className="mt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...teamNames] as Filter[]).map((name) => {
              const isActive = filter === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFilter(name)}
                  aria-pressed={isActive}
                  data-cursor="hover"
                  className={cn(
                    "relative rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                    isActive
                      ? "border-transparent text-bg"
                      : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="team-filter"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-fg"
                    />
                  )}
                  {name}
                  <span className={cn("ml-1.5 font-mono text-[10.5px]", isActive ? "opacity-60" : "opacity-45")}>
                    {counts[name]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-64">
            <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the council…"
              aria-label="Search council members"
              className="h-10 w-full rounded-full border border-line bg-surface pr-9 pl-10 text-[13.5px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-[color-mix(in_oklab,var(--neon)_45%,transparent)]"
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
      </Reveal>

      {/* Grid */}
      <motion.div
        layout
        className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((member, i) => {
            const hue = TEAM_HUE[member.team];
            return (
              <motion.article
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ duration: 0.42, delay: Math.min(i * 0.018, 0.25), ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-xl border border-line bg-surface p-5 transition-all duration-300 hover:border-line-strong hover:bg-surface-2"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
                  style={{ background: `hsl(${hue} 85% 55%)` }}
                />

                <div className="relative flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border font-mono text-[13px] font-medium transition-transform duration-300 group-hover:scale-105"
                    style={{
                      borderColor: `hsl(${hue} 70% 55% / 0.32)`,
                      background: `hsl(${hue} 70% 50% / 0.12)`,
                      color: `hsl(${hue} 85% 72%)`,
                    }}
                  >
                    {initials(member.name)}
                  </span>
                  {member.seniority !== "core" && (
                    <span
                      className="ml-auto font-mono text-[9.5px] tracking-[0.16em] uppercase"
                      style={{ color: `hsl(${hue} 80% 68%)` }}
                    >
                      {member.seniority === "faculty" ? "Faculty" : "Lead"}
                    </span>
                  )}
                </div>

                <h3 className="relative mt-4 text-[14.5px] leading-snug font-medium tracking-[-0.015em] text-fg">
                  {member.name}
                </h3>
                <p className="relative mt-1 text-[12.5px] text-fg-muted">{member.role}</p>
                <p className="relative mt-3 font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                  {member.team}
                </p>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, hsl(${hue} 85% 60%), transparent)` }}
                />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-fg-subtle">
          No council member matches “{query}”.
        </p>
      )}

      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">
            Showing {filtered.length} of {team.length}
          </Badge>
          <Badge tone="neon">Recruitment open</Badge>
        </div>
      </Reveal>
    </Section>
  );
}
