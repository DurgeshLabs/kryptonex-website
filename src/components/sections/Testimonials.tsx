"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { testimonials } from "@/data";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;

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
    <Section id="testimonials">
      <SectionHeader
        eyebrow="Voices"
        title={
          <>
            The council, <span className="gradient-text">in its own words.</span>
          </>
        }
        description="Statements from the people building this year's programme. Member stories replace these once the first full season is documented."
      />

      <Reveal className="mt-14">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="panel relative overflow-hidden rounded-2xl"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_15%_0%,color-mix(in_oklab,var(--violet)_12%,transparent),transparent_60%)]"
          />

          <div className="relative min-h-[300px] px-7 py-12 sm:min-h-[280px] sm:px-14 sm:py-16">
            <Quote
              className="h-8 w-8 text-neon opacity-40"
              strokeWidth={1.5}
              aria-hidden
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <p
                  className="max-w-3xl text-[clamp(1.15rem,2.6vw,1.65rem)] leading-[1.42] font-medium tracking-[-0.025em] text-fg"
                  style={{ textWrap: "pretty" }}
                >
                  “{active.quote}”
                </p>
                <footer className="mt-7 flex items-center gap-3">
                  <span className="h-px w-8 bg-neon" />
                  <cite className="not-italic">
                    <span className="block text-[14px] font-medium text-fg">
                      {active.attribution}
                    </span>
                    <span className="block font-mono text-[10.5px] tracking-[0.14em] text-fg-subtle uppercase">
                      {active.context}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative flex items-center justify-between border-t border-line px-7 py-4 sm:px-14">
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
                      "block h-1 rounded-full transition-all duration-400",
                      i === index
                        ? "w-7 bg-neon"
                        : "w-3 bg-line-strong group-hover/dot:bg-fg-subtle",
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
                className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next quote"
                data-cursor="hover"
                className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Auto-advance rail */}
          {!reduce && (
            <div className="absolute inset-x-0 bottom-0 h-px bg-transparent">
              <motion.div
                key={`${active.id}-${paused}`}
                className="h-full bg-[linear-gradient(90deg,var(--neon),var(--violet))]"
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{ duration: paused ? 0.2 : INTERVAL / 1000, ease: "linear" }}
              />
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
