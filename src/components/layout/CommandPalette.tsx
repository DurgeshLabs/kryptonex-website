"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  FileText,
  FolderGit2,
  Layers,
  Laptop,
  Mail,
  Megaphone,
  Moon,
  Search,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  announcements,
  blogPosts,
  domains,
  events,
  hallOfFame,
  projects,
  resources,
  team,
} from "@/data";
import { routes, site } from "@/lib/site";
import { useLockBodyScroll } from "@/lib/hooks";
import { cn, formatDate } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
  keywords?: string;
}

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
  const router = useRouter();
  const { setTheme } = useTheme();

  useLockBodyScroll(open);

  const commands = useMemo<Command[]>(() => {
    const close = () => onOpenChange(false);
    const go = (path: string) => () => {
      close();
      router.push(path);
    };

    const pages: Command[] = routes.map((r) => ({
      id: `page-${r.path}`,
      label: r.label,
      hint: r.path,
      group: "Pages",
      icon: Layers,
      run: go(r.path),
    }));

    const actions: Command[] = [
      {
        id: "theme-dark",
        label: "Switch to dark theme",
        group: "Actions",
        icon: Moon,
        run: () => {
          setTheme("dark");
          close();
        },
        keywords: "appearance night",
      },
      {
        id: "theme-light",
        label: "Switch to light theme",
        group: "Actions",
        icon: Sun,
        run: () => {
          setTheme("light");
          close();
        },
        keywords: "appearance day",
      },
      {
        id: "theme-system",
        label: "Use system theme",
        group: "Actions",
        icon: Laptop,
        run: () => {
          setTheme("system");
          close();
        },
        keywords: "appearance auto",
      },
      {
        id: "email",
        label: `Email the council — ${site.email}`,
        group: "Actions",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${site.email}`;
          close();
        },
        keywords: "contact reach out",
      },
    ];

    return [
      ...pages,
      ...actions,
      ...announcements.map((a) => ({
        id: `ann-${a.id}`,
        label: a.title,
        hint: a.meta,
        group: "Announcements",
        icon: Megaphone,
        run: go("/announcements"),
        keywords: a.body,
      })),
      ...events.map((e) => ({
        id: `evt-${e.id}`,
        label: e.name,
        hint: `${e.type} · ${formatDate(e.date)}`,
        group: "Events",
        icon: CalendarDays,
        run: go("/events"),
        keywords: `${e.domain} ${e.venue} ${e.summary}`,
      })),
      ...domains.map((d) => ({
        id: `dom-${d.id}`,
        label: d.name,
        hint: "Domain track",
        group: "Domains",
        icon: Layers,
        run: go("/about"),
        keywords: d.topics.join(" "),
      })),
      ...projects.map((p) => ({
        id: `prj-${p.id}`,
        label: p.name,
        hint: p.domain,
        group: "Projects",
        icon: FolderGit2,
        run: go("/projects"),
        keywords: `${p.stack.join(" ")} ${p.summary}`,
      })),
      ...resources.map((r) => ({
        id: `res-${r.id}`,
        label: r.title,
        hint: `${r.count} resources`,
        group: "Resources",
        icon: BookOpen,
        run: go("/resources"),
        keywords: r.items.join(" "),
      })),
      ...hallOfFame.map((h) => ({
        id: `hof-${h.id}`,
        label: h.title,
        hint: "Hall of Fame",
        group: "Recognition",
        icon: Trophy,
        run: go("/hall-of-fame"),
        keywords: h.summary,
      })),
      ...blogPosts.map((b) => ({
        id: `blog-${b.id}`,
        label: b.title,
        hint: `${b.category} · ${b.readingTime}`,
        group: "Blog",
        icon: FileText,
        run: go("/blog"),
        keywords: b.excerpt,
      })),
      ...team.map((m) => ({
        id: `mem-${m.id}`,
        label: m.name,
        hint: `${m.role} · ${m.team}`,
        group: "Team",
        icon: Users,
        run: go("/team"),
        keywords: `${m.role} ${m.team}`,
      })),
    ];
  }, [onOpenChange, router, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.filter((c) => c.group === "Pages" || c.group === "Actions");
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
    if (open) window.setTimeout(() => inputRef.current?.focus(), 30);
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
    listRef.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let index = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-[9000] no-print"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-[10vh] w-[min(94vw,600px)] overflow-hidden rounded-xl border border-line-strong bg-bg-elevated shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-fg-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, events, projects, resources…"
                aria-label="Search"
                className="h-13 w-full bg-transparent py-4 text-[14.5px] text-fg outline-none placeholder:text-fg-subtle"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[50vh] overflow-y-auto overscroll-contain p-2">
              {grouped.length === 0 && (
                <p className="px-3 py-10 text-center text-[13.5px] text-fg-subtle">
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
                          "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                          i === cursor ? "bg-surface-2 text-fg" : "text-fg-muted",
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", i === cursor ? "text-accent" : "text-fg-subtle")} />
                        <span className="flex-1 truncate text-[13.5px]">{cmd.label}</span>
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
                <span>↵ open</span>
              </span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
