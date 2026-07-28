import type { Metadata } from "next";
import { ArrowUpRight, Github } from "lucide-react";
import { PageHeader, Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { JoinCta } from "@/components/sections/JoinCta";
import { projects } from "@/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software built by Kryptonex members — campus tooling, AI utilities, security tooling and developer products.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="What members are building"
        description="Real software with real users, built inside the community. Repository and demo links go live as each project ships."
      />

      <Section>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Card className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                    {project.domain}
                  </span>
                  <Badge tone="neutral">{project.status}</Badge>
                </div>

                <h2 className="mt-6 text-[17.5px] font-medium tracking-[-0.024em] text-fg">
                  {project.name}
                </h2>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-fg-muted">
                  {project.summary}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-line px-2 py-1 font-mono text-[10.5px] text-fg-subtle"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-muted transition-colors hover:text-fg"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Repository
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle">
                      <Github className="h-3.5 w-3.5" />
                      Repo on release
                    </span>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-muted transition-colors hover:text-fg"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <JoinCta />
    </>
  );
}
