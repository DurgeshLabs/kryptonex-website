"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Flag,
  Home,
  Info,
  Laptop,
  Mail,
  MessageSquareQuote,
  Moon,
  Route,
  Search,
  ShieldQuestion,
  Sparkles,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { events, roadmap, team } from "@/data";
import { site } from "@/lib/site";
import { useLockBodyScroll, useScrollToId } from "@/lib/hooks";
import { cn, formatDate } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
  keywords?: string;
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollToId = useScrollToId();
  const { setTheme, resolvedTheme } = useTheme();

  useLockBodyScroll(open);

  const commands = useMemo<Command[]>(() => {
    const close = () => onOpenChange(false);
    const jump = (id: string) => () => {
      close();
      window.setTimeout(() => scrollToId(id), 60);
    };

    const nav: Command[] = [
      { id: "n-hero", label: "Home", group: "Navigate", icon: Home, run: jump("hero") },
      { id: "n-about", label: "About Kryptonex", group: "Navigate", icon: Info, run: jump("about") },
      { id: "n-why", label: "Why join", group: "Navigate", icon: Sparkles, run: jump("why-join") },
      { id: "n-roadmap", label: "Learning roadmap", group: "Navigate", icon: Route, run: jump("roadmap") },
      { id: "n-events", label: "Events calendar", group: "Navigate", icon: CalendarDays, run: jump("events") },
      { id: "n-fortress", label: "Digital Fortress", group: "Navigate", icon: Flag, run: jump("digital-fortress") },
      { id: "n-ctf", label: "CTF journey", group: "Navigate", icon: Trophy, run: jump("ctf-journey") },
      { id: "n-team", label: "The council", group: "Navigate", icon: Users, run: jump("team") },
      { id: "n-voices", label: "Voices", group: "Navigate", icon: MessageSquareQuote, run: jump("testimonials") },
      { id: "n-faq", label: "FAQ", group: "Navigate", icon: ShieldQuestion, run: jump("faq") },
      { id: "n-join", label: "Join Kryptonex", group: "Navigate", icon: ArrowRight, run: jump("recruitment") },
      { id: "n-contact", label: "Contact", group: "Navigate", icon: Mail, run: jump("contact") },
    ];

    const actions: Command[] = [
      {
        id: "a-theme-dark",
        label: "Switch to dark theme",
        group: "Actions",
        icon: Moon,
        run: () => {
          setTheme("dark");
          close();
        },
        keywords: "theme appearance night",
      },
      {
        id: "a-theme-light",
        label: "Switch to light theme",
        group: "Actions",
        icon: Sun,
        run: () => {
          setTheme("light");
          close();
        },
        keywords: "theme appearance day",
      },
      {
        id: "a-theme-system",
        label: "Use system theme",
        group: "Actions",
        icon: Laptop,
        run: () => {
          setTheme("system");
          close();
        },
        keywords: "theme auto",
      },
      {
        id: "a-email",
        label: `Email the council — ${site.email}`,
        group: "Actions",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${site.email}`;
          close();
        },
        keywords: "contact reach out mail",
      },
    ];

    const eventCmds: Command[] = events.map((e) => ({
      id: `e-${e.id}`,
      label: e.name,
      hint: `${e.type} · ${formatDate(e.date)}`,
      group: "Events",
      icon: e.flagship ? Flag : CalendarDays,
      run: jump("events"),
      keywords: `${e.type} ${e.status} ${e.summary}`,
    }));

    const trackCmds: Command[] = roadmap.map((t) => ({
      id: `t-${t.id}`,
      label: t.title,
      hint: `Track ${t.index} · ${t.stage}`,
      group: "Learning tracks",
      icon: Route,
      run: jump("roadmap"),
      keywords: `${t.skills.join(" ")} ${t.tools.join(" ")}`,
    }));

    const peopleCmds: Command[] = team.map((m) => ({
      id: `p-${m.id}`,
      label: m.name,
      hint: `${m.role} · ${m.team}`,
      group: "Council",
      icon: Users,
      run: jump("team"),
      keywords: `${m.role} ${m.team}`,
    }));

    return [...nav, ...actions, ...eventCmds, ...trackCmds, ...peopleCmds];
  }, [onOpenChange, scrollToId, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.filter((c) => c.group === "Navigate" || c.group === "Actions");
    return commands
      .filter((c) => `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase().includes(q))
      .slice(0, 40);
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of results) {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    }
    return [...map.entries()];
  }, [results]);

  const flat = grouped.flatMap(([, items]) => items);

  useEffect(() => setCursor(0), [query, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 40);
    else setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (flat.length ? (c + 1) % flat.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (flat.length ? (c - 1 + flat.length) % flat.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        flat[cursor]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, cursor, onOpenChange]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let index = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9000] no-print"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-[12vh] w-[min(94vw,620px)] overflow-hidden rounded-2xl border border-line-strong bg-bg-elevated shadow-[0_50px_140px_-30px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-fg-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, tracks, people, actions…"
                aria-label="Search"
                className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
              {grouped.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-fg-subtle">
                  No matches for “{query}”.
                </p>
              )}
              {grouped.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                    {group}
                  </p>
                  {items.map((cmd) => {
                    index += 1;
                    const i = index;
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        data-index={i}
                        onMouseEnter={() => setCursor(i)}
                        onClick={cmd.run}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          i === cursor ? "bg-surface-2 text-fg" : "text-fg-muted",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            i === cursor ? "text-neon" : "text-fg-subtle",
                          )}
                        />
                        <span className="flex-1 truncate text-[14px]">{cmd.label}</span>
                        {cmd.hint && (
                          <span className="hidden shrink-0 font-mono text-[10.5px] text-fg-subtle sm:block">
                            {cmd.hint}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10.5px] text-fg-subtle">
              <span className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </span>
              <span>
                {resolvedTheme === "light" ? "light" : "dark"} · {results.length} results
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
