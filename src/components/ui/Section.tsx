"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Badge";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Section({
  id,
  children,
  className,
  container = true,
  bordered = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  container?: boolean;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-28 py-20 sm:py-24 lg:py-28",
        bordered && "border-t border-line",
        className,
      )}
    >
      {container ? <div className="container-page">{children}</div> : children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-4", align === "center" && "items-center")}>
        {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <h2 className="text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.032em] text-fg">
          {title}
        </h2>
        {description && (
          <p className="text-[15px] leading-[1.65] text-fg-muted sm:text-[15.5px]">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.06,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Page-level header for sub-pages: eyebrow, title, lede, optional aside. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_100%_at_20%_0%,var(--accent-dim),transparent_70%)]"
      />
      <div className="container-page relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-3xl"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-fg">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.62] text-fg-muted sm:text-[17px]">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </header>
  );
}
