"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { team, teamNames } from "@/data";
import { TEAM_HUE } from "./LeadershipTeam";
import { cn, initials } from "@/lib/utils";
import type { TeamName } from "@/types";

export function TeamDirectory() {
  const [filter, setFilter] = useState<"All" | TeamName>("All");
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
      const matchesQuery = !q || `${m.name} ${m.role} ${m.team}`.toLowerCase().includes(q);
      return matchesTeam && matchesQuery;
    });
  }, [filter, query]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...teamNames] as ("All" | TeamName)[]).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              aria-pressed={filter === name}
              data-cursor="hover"
              className={cn(
                "rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                filter === name
                  ? "border-fg bg-fg text-bg"
                  : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {name}
              <span className={cn("ml-1.5 font-mono text-[10.5px]", filter === name ? "opacity-60" : "opacity-45")}>
                {counts[name]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-64">
          <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the council…"
            aria-label="Search council members"
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

      <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((member, i) => {
            const hue = TEAM_HUE[member.team];
            return (
              <motion.article
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.14 } }}
                transition={{ duration: 0.38, delay: Math.min(i * 0.015, 0.2), ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-lg border border-line bg-surface p-5 transition-colors duration-300 hover:border-line-strong"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md border font-mono text-[12.5px] font-medium"
                    style={{
                      borderColor: `hsl(${hue} 70% 55% / 0.28)`,
                      background: `hsl(${hue} 70% 50% / 0.09)`,
                      color: `hsl(${hue} 80% 68%)`,
                    }}
                  >
                    {initials(member.name)}
                  </span>
                  {member.seniority !== "core" && (
                    <span className="font-mono text-[9px] tracking-[0.14em] text-fg-subtle uppercase">
                      {member.seniority === "faculty" ? "Faculty" : "Lead"}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-[14px] leading-snug font-medium tracking-[-0.015em] text-fg">
                  {member.name}
                </h3>
                <p className="mt-1 text-[12.5px] text-fg-muted">{member.role}</p>
                <p className="mt-3 font-mono text-[9.5px] tracking-[0.14em] text-fg-subtle uppercase">
                  {member.team}
                </p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-[14px] text-fg-subtle">
          No council member matches “{query}”.
        </p>
      )}
    </>
  );
}
