"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail } from "lucide-react";
import { Section, Reveal } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * The site is a static export with no backend, so this composes a subscribe
 * email to the council rather than pretending to POST to an endpoint. Swap in a
 * real form action (Buttondown, Mailchimp, Formspree) when one exists.
 */
export function Newsletter({ index }: { index?: string } = {}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("Kryptonex newsletter — subscribe");
    const body = encodeURIComponent(`Please add ${email.trim()} to the Kryptonex mailing list.`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="newsletter" bordered>
      <Reveal>
        <div className="panel grid gap-8 rounded-lg p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow index={index}>Newsletter</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-fg">
              Never miss an event
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-[1.65] text-fg-muted">
              One email before each session — what it covers, what to bring, and how to register.
              No more than twice a month, and unsubscribing is one click.
            </p>
          </div>

          <form onSubmit={onSubmit} className="w-full">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSent(false);
                  }}
                  placeholder="you@dpgu.edu.in"
                  className="h-12 w-full rounded-md border border-line bg-bg pr-4 pl-10 text-[14px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent"
                />
              </div>
              <Button type="submit" size="lg" className="sm:w-auto">
                {sent ? (
                  <>
                    <Check className="h-4 w-4" />
                    Opening mail
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            <p className="mt-3 text-[12px] text-fg-subtle">
              Opens a pre-filled email to the council — we add you by hand until the mailing list is
              automated.
            </p>
          </form>
        </div>
      </Reveal>
    </Section>
  );
}
