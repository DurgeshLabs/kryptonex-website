"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { announcements } from "@/data";

const DISMISS_KEY = "kx-ticker-dismissed";

const ICONS = ["🚀", "🔥", "🏆", "📢", "✦"];

/**
 * Sticky ticker under the navbar. Dismissible, and the dismissal persists for
 * the session so it doesn't nag on every page.
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(DISMISS_KEY) === "1") setVisible(false);
  }, []);

  if (!mounted || !visible || announcements.length === 0) return null;

  const items = announcements.map((a, i) => ({
    id: a.id,
    icon: ICONS[i % ICONS.length],
    text: a.ticker,
  }));

  return (
    <div className="fixed inset-x-0 top-16 z-[68] border-b border-line bg-bg-elevated/95 backdrop-blur no-print">
      <div className="flex h-9 items-center">
        <div className="pause-on-hover mask-fade-x flex flex-1 overflow-hidden">
          <div className="animate-marquee-fast flex shrink-0 items-center gap-10 pr-10">
            {[...items, ...items].map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href="/announcements"
                className="flex shrink-0 items-center gap-2 text-[12.5px] whitespace-nowrap text-fg-muted transition-colors hover:text-fg"
              >
                <span aria-hidden>{item.icon}</span>
                {item.text}
                <ArrowRight className="h-3 w-3 opacity-40" />
              </Link>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            sessionStorage.setItem(DISMISS_KEY, "1");
          }}
          aria-label="Dismiss announcements"
          data-cursor="hover"
          className="grid h-9 w-9 shrink-0 place-items-center border-l border-line text-fg-subtle transition-colors hover:text-fg"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
