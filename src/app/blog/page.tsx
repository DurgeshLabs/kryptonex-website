import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { Newsletter } from "@/components/sections/Newsletter";
import { blogPosts } from "@/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writeups and field notes from the Kryptonex community — security walkthroughs, engineering practice, and how we run the programme.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writeups and field notes"
        description="What we learned running sessions, solving challenges and shipping projects — written for the people who come next."
      />

      <Section>
        <ul className="border-t border-line">
          {blogPosts.map((post) => (
            <li key={post.id}>
              <article className="group grid gap-4 border-b border-line py-8 lg:grid-cols-[170px_1fr] lg:gap-10">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2 lg:pt-1">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[12px] whitespace-nowrap text-fg-subtle"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="hidden h-px w-6 bg-line-strong lg:block" />
                  <span className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                    {post.category}
                  </span>
                </div>

                <div className="max-w-2xl">
                  <h2 className="text-[19px] leading-snug font-medium tracking-[-0.026em] text-fg transition-colors group-hover:text-accent sm:text-[21px]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-fg-muted">{post.excerpt}</p>
                  <p className="mt-4 font-mono text-[11px] text-fg-subtle">
                    {post.author} · {post.readingTime} read
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-[13.5px] leading-[1.65] text-fg-subtle">
          Full articles are published to the community channels first. Members can pitch a post to
          the documentation team at any point in the season.
        </p>
      </Section>

      <Newsletter />
    </>
  );
}
