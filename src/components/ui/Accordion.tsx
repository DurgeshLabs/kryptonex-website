"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
  meta?: string;
}

export function Accordion({
  items,
  className,
  defaultOpen,
}: {
  items: AccordionItemData[];
  className?: string;
  defaultOpen?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const uid = useId();

  return (
    <div className={cn("divide-y divide-[var(--border)] border-y border-line", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="group">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                data-cursor="hover"
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-neon"
              >
                <span className="flex flex-1 flex-col gap-1.5">
                  {item.meta && (
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-subtle">
                      {item.meta}
                    </span>
                  )}
                  <span className="text-[16.5px] leading-snug font-medium tracking-[-0.015em] text-fg transition-colors group-hover:text-neon sm:text-[17.5px]">
                    {item.title}
                  </span>
                </span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface transition-all duration-300",
                    isOpen && "rotate-45 border-neon bg-[color-mix(in_oklab,var(--neon)_14%,transparent)] text-neon",
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pr-12 pb-7 text-[15px] leading-relaxed text-fg-muted">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
