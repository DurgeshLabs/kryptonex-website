"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollToId } from "@/lib/hooks";
import {
  buttonBase,
  buttonSizes,
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Routes internal paths through next/link, smooth-scrolls `#hash` targets with a
 * navbar offset, and opens external links safely.
 */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  ...props
}: LinkButtonProps) {
  const scrollToId = useScrollToId();
  const classes = cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
  const isHash = href.startsWith("#");
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isHash) {
    return (
      <a
        href={href}
        data-cursor="hover"
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          scrollToId(href);
          history.replaceState(null, "", href);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        data-cursor="hover"
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor="hover" className={classes} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
