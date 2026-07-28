import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import { PageHeader, Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { DomainIcon } from "@/components/ui/DomainIcon";
import { Newsletter } from "@/components/sections/Newsletter";
import { JoinCta } from "@/components/sections/JoinCta";
import { derived, resources } from "@/data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Curated Kryptonex learning material across Git, cybersecurity, AI, DSA, resumes, interviews and open source.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resource library"
        title="Everything we teach, written down"
        description={`${derived.resourceCount} guides across ${resources.length} categories — the same material members work through in sessions, free and open to everyone at DPGU.`}
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((category) => (
            <Card key={category.id} className="flex h-full flex-col p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span
                  className="grid h-11 w-11 place-items-center rounded-md border"
                  style={{
                    borderColor: `hsl(${category.hue} 70% 55% / 0.28)`,
                    background: `hsl(${category.hue} 70% 50% / 0.09)`,
                    color: `hsl(${category.hue} 80% 66%)`,
                  }}
                >
                  <DomainIcon name={category.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-[10.5px] text-fg-subtle">
                  {category.count} files
                </span>
              </div>

              <h2 className="mt-6 text-[18px] font-medium tracking-[-0.024em] text-fg">
                {category.title}
              </h2>
              <p className="mt-2.5 text-[14px] leading-[1.65] text-fg-muted">{category.summary}</p>

              <ul className="mt-6 flex-1 divide-y divide-[var(--border)] border-t border-line">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 py-3 text-[13.5px] text-fg-muted">
                    <FileDown className="h-3.5 w-3.5 shrink-0 text-fg-subtle" />
                    <span className="flex-1">{item}</span>
                    <span className="font-mono text-[10px] tracking-[0.1em] text-fg-subtle uppercase">
                      PDF
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-fg-subtle">
                Files are distributed to members through the community channels.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Newsletter />
      <JoinCta />
    </>
  );
}
