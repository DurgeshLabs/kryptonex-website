import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { Eyebrow } from "@/components/ui/Badge";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,340px)] lg:gap-20">
          <div>
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="mt-6 text-[clamp(3.5rem,12vw,8rem)] leading-[0.85] font-semibold tracking-[-0.055em] text-fg">
              404
            </h1>
            <p className="mt-7 max-w-md text-[16px] leading-[1.65] text-fg-muted sm:text-[17px]">
              This page doesn&apos;t exist, or it moved. Nothing here to see — but the rest of the
              site is one click away.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/" size="lg">
                <Home className="h-4 w-4" />
                Back to home
              </LinkButton>
              <LinkButton href="/events" variant="secondary" size="lg">
                See upcoming events
              </LinkButton>
            </div>
          </div>

          <nav aria-label="All pages" className="lg:pt-4">
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
              All pages
            </p>
            <ul className="mt-5 border-t border-line">
              {routes.map((route) => (
                <li key={route.path} className="border-b border-line">
                  <Link
                    href={route.path}
                    data-cursor="hover"
                    className="group flex items-center justify-between py-3 text-[14px] text-fg-muted transition-colors hover:text-fg"
                  >
                    {route.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
