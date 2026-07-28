"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";

const POINTS = [
  {
    n: "01",
    title: "Sequenced, not scattered",
    body: "Five domain tracks, each taught in order from the ground up. You are never asked to skip a rung because a session sounded exciting.",
  },
  {
    n: "02",
    title: "Practitioners in the room",
    body: "Guest sessions from people doing the work — engineers, analysts, founders — describing the job as it actually is.",
  },
  {
    n: "03",
    title: "Everything ships publicly",
    body: "Projects, writeups and competition results go into the open. You finish a season with artefacts, not attendance.",
  },
];

export function WhyKryptonex({ index }: { index?: string } = {}) {
  return (
    <Section id="why" bordered container={false} className="relative overflow-hidden">
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <Eyebrow index={index}>Why Kryptonex</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.05] font-semibold tracking-[-0.042em]">
            <span className="block text-fg-subtle">College teaches subjects.</span>
            <span className="block text-fg">We build careers.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.65] text-fg-muted sm:text-[17px]">
            A degree gives you the theory. It rarely gives you a repository someone else can run, a
            competition record, or a person in industry who knows your name. Kryptonex exists to
            close that distance while you are still on campus — through structured tracks, real
            projects, and consistent contact with people already doing the work.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-[var(--border)] md:grid-cols-3">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle">
                {point.n}
              </span>
              <h3 className="mt-5 text-[17px] leading-snug font-medium tracking-[-0.022em] text-fg">
                {point.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-fg-muted">{point.body}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
