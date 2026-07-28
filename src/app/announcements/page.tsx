import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/ui/Section";
import { ListCard } from "@/components/ui/Card";
import { Newsletter } from "@/components/sections/Newsletter";
import { JoinCta } from "@/components/sections/JoinCta";
import { announcements } from "@/data";
import type { AnnouncementTone } from "@/types";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Everything currently open at Kryptonex — recruitment windows, workshop registrations, competition sign-ups and upcoming sessions.",
};

const TONE_VAR: Record<AnnouncementTone, string> = {
  accent: "var(--accent)",
  violet: "var(--violet)",
  gold: "var(--gold)",
  emerald: "var(--emerald)",
  neutral: "var(--fg-subtle)",
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Announcements"
        title="What's live right now"
        description="Every open window in one place — recruitment, registrations and sessions you can act on today."
      />

      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {announcements.map((item) => (
            <li key={item.id}>
              <ListCard accent={TONE_VAR[item.tone]} className="flex h-full flex-col p-7 sm:p-8">
                <p
                  className="font-mono text-[10px] tracking-[0.16em] uppercase"
                  style={{ color: TONE_VAR[item.tone] }}
                >
                  {item.kicker}
                </p>
                <h2 className="mt-3 text-[19px] leading-snug font-medium tracking-[-0.024em] text-fg">
                  {item.title}
                </h2>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-fg-muted">
                  {item.body}
                </p>

                <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="font-mono text-[11.5px] text-fg-subtle">{item.meta}</span>
                  {item.cta && (
                    <Link
                      href={item.cta.href}
                      data-cursor="hover"
                      className="group/cta inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
                    >
                      {item.cta.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </ListCard>
            </li>
          ))}
        </ul>
      </Section>

      <Newsletter />
      <JoinCta />
    </>
  );
}
