"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, FileText, MessagesSquare, Rocket, UserCheck } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: FileText,
    title: "Apply",
    duration: "5 minutes",
    body: "Fill in the recruitment form and tell us what you'd love to learn. No entrance test, no résumé screening, no prerequisite coursework.",
    detail: [
      "Name, branch and year",
      "What draws you to security",
      "Which team you'd like to help run",
    ],
  },
  {
    icon: MessagesSquare,
    title: "Conversation",
    duration: "~15 minutes",
    body: "A short, informal chat with the council. We're working out where you'll enjoy contributing, not testing what you already know.",
    detail: [
      "Meet a council member",
      "Talk through your interests",
      "Ask us anything about the year",
    ],
  },
  {
    icon: UserCheck,
    title: "Onboarding",
    duration: "First week",
    body: "You get added to the community channels, pointed at the current track cycle, and given the setup guide for your machine.",
    detail: ["Community access", "Environment setup", "Current track materials"],
  },
  {
    icon: Rocket,
    title: "First flag",
    duration: "First month",
    body: "You attend your first workshop, take your first guided CTF challenge, and find a flag without a hint. That's when it clicks.",
    detail: ["Attend a workshop", "Solve a guided challenge", "Write your first writeup"],
  },
];

export function Recruitment() {
  const [active, setActive] = useState(0);

  return (
    <Section id="recruitment">
      <SectionHeader
        eyebrow="Join us"
        title={
          <>
            No experience required.{" "}
            <span className="gradient-text">Just curiosity.</span>
          </>
        }
        description="We'll take you from zero to shipping real security skills. Here's exactly what happens between filling the form and finding your first flag."
        action={<Badge tone="emerald" dot>Recruitment open</Badge>}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-10">
        {/* Process */}
        <Reveal>
          <ol className="relative space-y-3">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    data-cursor="hover"
                    className={cn(
                      "group w-full overflow-hidden rounded-2xl border p-6 text-left transition-all duration-400 sm:p-7",
                      isActive
                        ? "border-[color-mix(in_oklab,var(--neon)_32%,transparent)] bg-[linear-gradient(120deg,color-mix(in_oklab,var(--neon)_8%,transparent),transparent_60%)]"
                        : "border-line bg-surface hover:border-line-strong",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-all duration-400",
                          isActive
                            ? "border-transparent bg-neon text-[#050505]"
                            : "border-line bg-bg text-fg-subtle group-hover:text-fg",
                        )}
                      >
                        <step.icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle">
                            0{i + 1}
                          </span>
                          <h3 className="text-[16.5px] font-medium tracking-[-0.02em] text-fg">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-0.5 font-mono text-[10.5px] tracking-[0.12em] text-fg-subtle uppercase">
                          {step.duration}
                        </p>
                      </div>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-all duration-300",
                          isActive ? "rotate-90 text-neon" : "text-fg-subtle opacity-0 group-hover:opacity-60",
                        )}
                      />
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-fg-muted">
                        {step.body}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {step.detail.map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 py-1.5 text-[12px] text-fg-muted"
                          >
                            <Check className="h-3 w-3 text-emerald" strokeWidth={2.5} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* CTA panel */}
        <Reveal delay={0.1}>
          <div className="panel sticky top-28 overflow-hidden rounded-2xl p-7 sm:p-8">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-[radial-gradient(circle,var(--neon),transparent_68%)] opacity-25 blur-3xl"
            />
            <h3 className="relative text-[19px] leading-snug font-semibold tracking-[-0.025em] text-fg">
              Come learn to break it, understand it, and defend it.
            </h3>
            <p className="relative mt-3 text-[14.5px] leading-relaxed text-fg-muted">
              Open to every branch at the {site.parent}. Fill the recruitment form and tell us what
              you&apos;d love to learn.
            </p>

            <div className="relative mt-7 space-y-2.5">
              <LinkButton href={site.links.recruitment} size="lg" className="w-full">
                Fill the recruitment form
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton
                href={site.links.discord}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Join the community
              </LinkButton>
            </div>

            <div className="relative mt-7 space-y-3 border-t border-line pt-6">
              {[
                "No experience or prerequisite required",
                "Open to every branch and year",
                "Free — all tooling is open source",
              ].map((line) => (
                <p key={line} className="flex items-start gap-2.5 text-[13.5px] text-fg-muted">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" strokeWidth={2.5} />
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
