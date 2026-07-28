import type { Metadata } from "next";
import { ArrowRight, Check, FileText, MessagesSquare, Rocket, UserCheck } from "lucide-react";
import { PageHeader, Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { Badge } from "@/components/ui/Badge";
import { domains } from "@/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Apply to Kryptonex — open to every branch and year at the School of Technology and Research. No experience required, no entrance test.",
};

const STEPS = [
  {
    icon: FileText,
    title: "Apply",
    duration: "5 minutes",
    body: "Fill in the recruitment form and tell us what you'd love to build. No entrance test, no résumé screening, no prerequisite coursework.",
    detail: ["Name, branch and year", "What draws you in", "Which domain track interests you"],
  },
  {
    icon: MessagesSquare,
    title: "Conversation",
    duration: "~15 minutes",
    body: "A short, informal chat with a council member. We're working out where you'll enjoy contributing, not testing what you already know.",
    detail: ["Meet a council member", "Talk through your interests", "Ask us anything"],
  },
  {
    icon: UserCheck,
    title: "Onboarding",
    duration: "First week",
    body: "You're added to the community channels, pointed at the current track cycle, and given the setup guide for your machine.",
    detail: ["Community access", "Environment setup", "Current track material"],
  },
  {
    icon: Rocket,
    title: "First build",
    duration: "First month",
    body: "You attend your first workshop and ship your first small thing. That's the point at which it clicks for most people.",
    detail: ["Attend a session", "Complete a guided build", "Publish your first writeup"],
  },
];

const REASSURANCE = [
  "No experience or prerequisite required",
  "Open to every branch and every year",
  "Free — all tooling is open source",
  "Switch tracks at any cycle boundary",
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join Kryptonex"
        title="Not looking for members. Looking for builders."
        description={`Open to every branch and year at the ${site.parent}. What we look for is curiosity and the willingness to keep showing up after the first session gets difficult.`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <LinkButton href={site.links.recruitment} size="lg">
            Apply now
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href={site.links.discord} variant="secondary" size="lg">
            Join the community
          </LinkButton>
          <Badge tone="emerald" dot>
            Recruitment open
          </Badge>
        </div>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="The process"
          title="What happens after you apply"
          description="Four steps, roughly a month from form to first shipped thing."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Card className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line bg-bg text-accent">
                    <step.icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle">
                        0{i + 1}
                      </span>
                      <h3 className="text-[16.5px] font-medium tracking-[-0.022em] text-fg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-0.5 font-mono text-[10.5px] tracking-[0.12em] text-fg-subtle uppercase">
                      {step.duration}
                    </p>
                  </div>
                </div>

                <p className="mt-5 flex-1 text-[14px] leading-[1.65] text-fg-muted">{step.body}</p>

                <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {step.detail.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-1.5 rounded border border-line px-2 py-1 text-[11.5px] text-fg-muted"
                    >
                      <Check className="h-3 w-3 text-emerald" strokeWidth={2.5} />
                      {d}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section bordered>
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Pick a track"
              title="Where would you like to start?"
              description="You choose one at application. Moving between tracks later is normal and costs nothing."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {domains.map((domain) => (
                <li
                  key={domain.id}
                  className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <h3 className="text-[15px] font-medium tracking-[-0.02em] text-fg">
                    {domain.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-fg-muted">
                    {domain.topics.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel h-fit rounded-lg p-7 sm:p-8 lg:sticky lg:top-28">
            <h3 className="text-[18px] leading-snug font-medium tracking-[-0.024em] text-fg">
              Ready when you are
            </h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-fg-muted">
              Applications are reviewed on a rolling basis and the council follows up over email.
            </p>

            <div className="mt-7 space-y-2.5">
              <LinkButton href={site.links.recruitment} size="lg" className="w-full">
                Fill the recruitment form
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="lg" className="w-full">
                Ask a question first
              </LinkButton>
            </div>

            <ul className="mt-7 space-y-3 border-t border-line pt-6">
              {REASSURANCE.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-fg-muted">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

    </>
  );
}
