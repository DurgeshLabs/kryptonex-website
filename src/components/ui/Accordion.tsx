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
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                data-cursor="hover"
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-[15.5px] leading-snug font-medium tracking-[-0.012em] transition-colors sm:text-[16px]",
                      isOpen ? "text-fg" : "text-fg group-hover:text-accent",
                    )}
                  >
                    {item.title}
                  </span>
                  {item.meta && (
                    <span className="mt-1.5 block font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                      {item.meta}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded border border-line text-fg-subtle transition-all duration-300",
                    isOpen && "rotate-45 border-accent text-accent",
                  )}
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
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
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl pr-10 pb-6 text-[14.5px] leading-[1.65] text-fg-muted">
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
