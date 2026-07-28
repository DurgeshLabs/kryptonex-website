"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <Section id="projects" bordered>
      <SectionHeader
        index="08"
        eyebrow="Featured projects"
        title="What members are building"
        description="Real software with real users, built inside the community. Repositories and demos go live as each project ships."
        action={
          <LinkButton href="/projects" variant="secondary" size="md">
            All projects
            <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        }
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <Card className="flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                  {project.domain}
                </span>
                <Badge tone="neutral">{project.status}</Badge>
              </div>

              <h3 className="mt-6 text-[17px] font-medium tracking-[-0.022em] text-fg">
                {project.name}
              </h3>
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

              {(project.repo || project.demo) && (
                <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
                  {project.repo && (
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
              )}
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
