"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { testimonials } from "@/data";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(index + 1, 1), INTERVAL);
    return () => window.clearInterval(id);
  }, [index, paused, reduce, go]);

  const active = testimonials[index];

  return (
    <Section id="testimonials" bordered>
      <SectionHeader
        index="14"
        eyebrow="Testimonials"
        title="In our own words"
        description="Statements from the council building this year's programme. Member and alumni stories replace these as the first full season is documented."
      />

      <Reveal className="mt-12">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="panel relative overflow-hidden rounded-lg"
        >
          <div className="relative min-h-[260px] px-7 py-12 sm:min-h-[240px] sm:px-12 sm:py-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-3xl text-[clamp(1.15rem,2.4vw,1.55rem)] leading-[1.45] font-medium tracking-[-0.024em] text-fg">
                  “{active.quote}”
                </p>
                <footer className="mt-8 flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" />
                  <cite className="not-italic">
                    <span className="block text-[13.5px] font-medium text-fg">
                      {active.attribution}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                      {active.context}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="relative flex items-center justify-between border-t border-line px-7 py-4 sm:px-12">
            <div className="flex items-center gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Show quote ${i + 1}`}
                  aria-current={i === index}
                  data-cursor="hover"
                  className="group/dot py-2"
                >
                  <span
                    className={cn(
                      "block h-[3px] rounded-full transition-all duration-400",
                      i === index ? "w-6 bg-accent" : "w-2.5 bg-line-strong group-hover/dot:bg-fg-subtle",
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2 hidden font-mono text-[11px] text-fg-subtle sm:block">
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label="Previous quote"
                data-cursor="hover"
                className="grid h-8 w-8 place-items-center rounded-md border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next quote"
                data-cursor="hover"
                className="grid h-8 w-8 place-items-center rounded-md border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
