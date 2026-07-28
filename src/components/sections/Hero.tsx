"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronDown, Terminal } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { Globe } from "@/components/fx/Globe";
import { NeuralField } from "@/components/fx/NeuralField";
import { CodeRain } from "@/components/fx/Backgrounds";
import { stats } from "@/data";
import { site } from "@/lib/site";

/** Positioned in the right-hand gutter only, so they never collide with the headline column. */
const FLOATING_SNIPPETS = [
  { code: "nmap -sV -T4 target", top: "17%", right: "26%", delay: 0 },
  { code: "' OR 1=1 --", top: "31%", right: "6%", delay: 0.6 },
  { code: "checksec ./fortress", top: "52%", right: "20%", delay: 1.2 },
  { code: "flag{str_dpgu_2026}", bottom: "19%", right: "8%", delay: 1.8 },
  { code: "volatility -f mem.raw", bottom: "31%", right: "30%", delay: 2.4 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-20"
    >
      {/* Layered background: neural field, code rain, globe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <NeuralField className="opacity-70" />
        <CodeRain className="opacity-[0.16] mask-fade-b" density={0.35} />
        <div className="scanlines absolute inset-0 opacity-40" />
      </div>

      <motion.div
        aria-hidden={false}
        style={reduce ? undefined : { y: globeY, scale: globeScale }}
        className="pointer-events-none absolute top-1/2 right-[-16%] -z-10 hidden h-[720px] w-[720px] -translate-y-1/2 opacity-80 lg:block xl:right-[-4%]"
      >
        <div className="pointer-events-auto h-full w-full">
          <Globe />
        </div>
      </motion.div>

      {/* Floating code snippets */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
          {FLOATING_SNIPPETS.map((s, i) => (
            <motion.span
              key={s.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.16, duration: 0.9 }}
              style={{ top: s.top, right: s.right, bottom: s.bottom }}
              className="absolute"
            >
              <span
                className="animate-float inline-block rounded-lg border border-line bg-surface/50 px-2.5 py-1.5 font-mono text-[11px] text-fg-subtle backdrop-blur-sm"
                style={{ animationDelay: `${s.delay}s` }}
              >
                {s.code}
              </span>
            </motion.span>
          ))}
        </div>
      )}

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[1180px] px-5 sm:px-8"
      >
        <div className="max-w-[46rem]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow>Recruitment open · No experience needed</Eyebrow>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.6rem,7.2vw,5.1rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
            <AnimatedText text="Become the next generation" className="block text-fg" delay={0.15} />
            <AnimatedText
              text="cybersecurity professional."
              className="gradient-text block"
              delay={0.42}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-fg-muted sm:text-[17.5px]"
            style={{ textWrap: "pretty" }}
          >
            Kryptonex is {site.universityShort}&apos;s dedicated cybersecurity and Capture-the-Flag
            community at the {site.parent} — a {stats.tracks}-topic learning ladder, real
            practitioners in the room, and a flagship inter-college CTF.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <LinkButton href="#recruitment" size="lg">
              Join Kryptonex
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="#events" variant="secondary" size="lg">
              <CalendarDays className="h-4 w-4" />
              View events
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11.5px] tracking-[0.08em] text-fg-subtle uppercase"
          >
            <span className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-neon" />
              {stats.members} council members
            </span>
            <span className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>{stats.events} events planned</span>
            <span className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>{stats.tracks} security tracks</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        aria-label="Scroll to About"
        data-cursor="hover"
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-fg-subtle transition-colors hover:text-fg"
      >
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase">Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
