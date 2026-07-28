"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ScrambleText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Badge";
import { ScanSweep } from "@/components/fx/Backgrounds";

const PILLARS = [
  { word: "Break it.", desc: "Learn how systems actually fail — in labs and CTF ranges built to be broken." },
  { word: "Understand it.", desc: "Go past the exploit to the root cause, the design decision, the trade-off." },
  { word: "Defend it.", desc: "Turn that understanding into detection, hardening and incident response." },
];

export function Mission() {
  const reduce = useReducedMotion();

  return (
    <Section id="mission" container={false} className="relative overflow-hidden">
      <ScanSweep />
      <div className="pointer-events-none absolute inset-0 cyber-grid mask-radial opacity-60" />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <Eyebrow>Our mission</Eyebrow>
          <p
            className="mt-8 max-w-4xl text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.24] font-medium tracking-[-0.032em] text-fg"
            style={{ textWrap: "balance" }}
          >
            Cultivate a hands-on, ethically-grounded cybersecurity culture at DPGU — and grow into
            the <span className="gold-text">most recognised student security community in Pune.</span>
          </p>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--border)] sm:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.word}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.11, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg p-8 transition-colors duration-300 hover:bg-surface sm:p-9"
            >
              <span className="font-mono text-[10.5px] tracking-[0.2em] text-fg-subtle">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-[clamp(1.35rem,2.6vw,1.75rem)] font-semibold tracking-[-0.03em] text-fg">
                {reduce ? pillar.word : <ScrambleText text={pillar.word} />}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">{pillar.desc}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--neon),var(--violet))] transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
