"use client";

import { roadmap } from "@/data";
import { cn } from "@/lib/utils";

const TOPICS = [...roadmap.map((t) => t.title), "OSINT", "Social Engineering", "Threat Intel"];

/** Edge-to-edge scrolling band of everything the ladder covers. */
export function TopicsBand() {
  return (
    <div className="relative border-y border-line py-4 no-print">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {[...TOPICS, ...TOPICS].map((topic, i) => (
            <span key={`${topic}-${i}`} className="flex shrink-0 items-center gap-8">
              <span
                className={cn(
                  "font-mono text-[11px] tracking-[0.2em] whitespace-nowrap uppercase",
                  i % 5 === 2 ? "text-neon/60" : "text-fg-subtle/55",
                )}
              >
                {topic}
              </span>
              <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-line-strong" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
