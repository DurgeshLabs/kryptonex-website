import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { ListCard } from "@/components/ui/Card";
import { DomainIcon } from "@/components/ui/DomainIcon";
import { JoinCta } from "@/components/sections/JoinCta";
import { hallOfFame } from "@/data";
import { toneChip, toTone } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description:
    "How Kryptonex recognises its members — six categories awarded on evidence, from hackathon results to merged open-source contributions.",
};

export default function HallOfFamePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hall of Fame"
        title="Celebrating builders"
        description="Recognition here is earned on evidence rather than attendance. These are the six categories and what each one requires — names are added as every season's results are confirmed."
      />

      <Section>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hallOfFame.map((category) => (
            <li key={category.id}>
              <ListCard accent={`var(--tone-${toTone(category.tone)})`} className="flex h-full flex-col p-7 sm:p-8">
                <span
                  className="grid h-11 w-11 place-items-center rounded-md border"
                  style={toneChip(toTone(category.tone))}
                >
                  <DomainIcon name={category.icon} className="h-[18px] w-[18px]" />
                </span>

                <h2 className="mt-6 text-[17.5px] font-medium tracking-[-0.024em] text-fg">
                  {category.title}
                </h2>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-fg-muted">
                  {category.summary}
                </p>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                    Criteria
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-fg-muted">{category.criteria}</p>
                </div>
              </ListCard>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-[13.5px] leading-[1.65] text-fg-subtle">
          Nominations open at the end of each semester. Any member can nominate another, and the
          council verifies the evidence before a name is added.
        </p>
      </Section>

      <JoinCta />
    </>
  );
}
