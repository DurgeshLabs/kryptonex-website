"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { RevealLines } from "@/components/ui/AnimatedText";
import { LinkButton } from "@/components/ui/LinkButton";
import { NeuralField } from "@/components/fx/NeuralField";
import { communityStats, derived, domains } from "@/data";
import { site } from "@/lib/site";

const WORDS = ["Build", "Learn", "Innovate", "Lead"];

export function Hero() {
  const reduce = useReducedMotion();
  const members = communityStats.find((s) => s.id === "members");

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-36 pb-20 sm:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <NeuralField className="opacity-45" count={48} linkDistance={128} />
      </div>

      <div className="container-page">
        <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
              </span>
              <p className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
                Recruitment open · {site.parent}
              </p>
            </motion.div>

            <h1 className="mt-8 text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-fg">
              <RevealLines lines={WORDS} delay={0.1} stagger={0.08} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 max-w-lg text-[16.5px] leading-[1.6] text-fg-muted sm:text-[18px]"
            >
              {site.promise}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <LinkButton href="/join" size="lg">
                Join Kryptonex
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/events" variant="secondary" size="lg">
                <CalendarDays className="h-4 w-4" />
                Upcoming events
              </LinkButton>
            </motion.div>
          </div>

          {/* Facts rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pb-2"
          >
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-[var(--border)] sm:grid-cols-4 lg:grid-cols-2">
              {[
                { k: `${members?.value ?? 250}+`, v: "Members" },
                { k: String(derived.domains), v: "Domain tracks" },
                { k: String(derived.plannedEvents), v: "Events on calendar" },
                { k: String(derived.councilSize), v: "Council members" },
              ].map((item) => (
                <div key={item.v} className="bg-bg px-4 py-5">
                  <dt className="text-[clamp(1.5rem,2.6vw,2rem)] leading-none font-semibold tracking-[-0.04em] text-fg tabular-nums">
                    {item.k}
                  </dt>
                  <dd className="mt-2 font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {domains.map((d) => (
                <span
                  key={d.id}
                  className="rounded border border-line px-2 py-1 font-mono text-[10.5px] tracking-[0.08em] text-fg-subtle uppercase"
                >
                  {d.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute inset-x-0 bottom-8 mx-auto hidden w-fit sm:block"
        >
          <div className="h-10 w-px bg-[linear-gradient(to_bottom,transparent,var(--border-strong))]" />
        </motion.div>
      )}
    </section>
  );
}
