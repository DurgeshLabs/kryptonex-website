"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Badge";
import { stats } from "@/data";

const ITEMS = [
  { value: stats.members, label: "Council members", suffix: "" },
  { value: stats.events, label: "Events planned", suffix: "" },
  { value: stats.workshops, label: "Hands-on workshops", suffix: "" },
  { value: stats.speakers, label: "Industry speakers", suffix: "" },
  { value: stats.competitions, label: "CTF competitions", suffix: "" },
  { value: stats.tracks, label: "Learning tracks", suffix: "" },
  { value: stats.teams, label: "Operating teams", suffix: "" },
  { value: stats.seats, label: "Seats across the year", suffix: "+" },
];

export function Stats() {
  return (
    <Section id="stats" container={false} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 cyber-grid mask-radial opacity-50" />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <Eyebrow>By the numbers</Eyebrow>
          <h2
            className="max-w-2xl text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-fg"
            style={{ textWrap: "balance" }}
          >
            One season, planned end to end.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--border)] sm:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg px-5 py-8 text-center transition-colors duration-300 hover:bg-surface sm:px-6 sm:py-10"
            >
              <p className="text-[clamp(2rem,4.6vw,3.1rem)] leading-none font-semibold tracking-[-0.045em] text-fg transition-colors duration-300 group-hover:text-neon">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-3 font-mono text-[10.5px] leading-tight tracking-[0.14em] text-fg-subtle uppercase">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-fg-subtle">
          Figures derive directly from the council roster and event calendar in{" "}
          <span className="text-fg-muted">src/data</span>.
        </p>
      </div>
    </Section>
  );
}
