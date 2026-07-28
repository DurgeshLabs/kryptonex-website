"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Terminal } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { ctfJourney } from "@/data";
import { cn } from "@/lib/utils";

export function CtfJourney() {
  const [step, setStep] = useState(0);
  const active = ctfJourney[step];
  const progress = ((step + 1) / ctfJourney.length) * 100;

  return (
    <Section id="ctf-journey">
      <SectionHeader
        eyebrow="CTF journey"
        title={
          <>
            From first shell to{" "}
            <span className="gradient-text">running the competition.</span>
          </>
        }
        description="Six stages, roughly one academic year. Nobody arrives at stage one knowing anything — that is the point of stage one."
      />

      {/* Stage rail */}
      <Reveal className="mt-14">
        <div className="relative">
          <div aria-hidden className="absolute top-[21px] right-0 left-0 h-px bg-line" />
          <motion.div
            aria-hidden
            className="absolute top-[21px] left-0 h-px bg-[linear-gradient(90deg,var(--neon),var(--violet))]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
          <ol className="relative grid grid-cols-3 gap-2 md:grid-cols-6">
            {ctfJourney.map((stage, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={stage.id} className="flex flex-col items-center gap-3 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={current}
                    aria-label={`Stage ${stage.step}: ${stage.title}`}
                    data-cursor="hover"
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full border-2 font-mono text-[12.5px] transition-all duration-300",
                      current
                        ? "scale-110 border-neon bg-neon text-[#050505] shadow-[0_0_28px_-6px_var(--neon)]"
                        : done
                          ? "border-violet bg-[color-mix(in_oklab,var(--violet)_18%,var(--bg))] text-violet"
                          : "border-line bg-bg text-fg-subtle hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : stage.step}
                  </button>
                  <span
                    className={cn(
                      "text-[12.5px] leading-tight font-medium tracking-[-0.01em] transition-colors",
                      current ? "text-fg" : "text-fg-subtle",
                    )}
                  >
                    {stage.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>

      {/* Stage detail */}
      <Reveal delay={0.08} className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="panel grid gap-8 overflow-hidden rounded-2xl p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
          >
            <div>
              <span className="font-mono text-[10.5px] tracking-[0.18em] text-neon uppercase">
                Stage {active.step} · {active.timeframe}
              </span>
              <h3 className="mt-4 text-[clamp(1.6rem,3.4vw,2.35rem)] leading-tight font-semibold tracking-[-0.035em] text-fg">
                {active.title}
              </h3>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-fg-muted">
                {active.summary}
              </p>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-line bg-[#08080a] px-4 py-3 font-mono text-[12.5px]">
                <Terminal className="h-3.5 w-3.5 shrink-0 text-neon" />
                <span className="text-zinc-500">$</span>
                <span className="truncate text-zinc-300">{active.command}</span>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                What you walk away with
              </h4>
              <ul className="mt-5 space-y-4">
                {active.outcomes.map((outcome, i) => (
                  <motion.li
                    key={outcome}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[color-mix(in_oklab,var(--emerald)_35%,transparent)] bg-[color-mix(in_oklab,var(--emerald)_12%,transparent)] text-emerald">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-fg-muted">{outcome}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-9 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="rounded-lg border border-line bg-surface px-3.5 py-2 text-[13px] text-fg-muted transition-colors hover:text-fg disabled:pointer-events-none disabled:opacity-35"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(ctfJourney.length - 1, s + 1))}
                  disabled={step === ctfJourney.length - 1}
                  className="rounded-lg border border-line bg-surface px-3.5 py-2 text-[13px] text-fg-muted transition-colors hover:text-fg disabled:pointer-events-none disabled:opacity-35"
                >
                  Next stage
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}
