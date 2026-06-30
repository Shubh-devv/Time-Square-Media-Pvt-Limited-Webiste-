import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "OOH advertising guides, outdoor marketing strategy and digital insights from Time Square Media — helping Indian brands get seen on every street and every screen.",
};

const CAT_STYLE: Record<string, { bg: string; color: string }> = {
  "OOH Advertising": { bg: "rgba(45,120,200,0.12)",  color: "#5BA3E8" },
  "Strategy":        { bg: "rgba(167,139,250,0.12)", color: "#a78bfa" },
  "Local Guide":     { bg: "rgba(52,211,153,0.12)",  color: "#34d399" },
  "BTL Marketing":   { bg: "rgba(255,176,46,0.12)",  color: "#FFB02E" },
  "Mobile Media":    { bg: "rgba(34,211,238,0.12)",  color: "#22d3ee" },
};

function catStyle(cat: string) {
  return CAT_STYLE[cat] ?? CAT_STYLE["OOH Advertising"];
}

export default function BlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Insights & Strategy"
        title={
          <>
            OOH knowledge<br />
            <span className="text-blue">hub.</span>
          </>
        }
        subtitle="Guides, research and strategy pieces for marketing managers and brand builders across India — written by the team at Time Square Media."
      />

      <section className="border-t border-ink-line py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => {
              const cs = catStyle(post.category);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-ink-line bg-ink-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/40"
                  style={{ boxShadow: "0 0 0 0 transparent", transition: "all 0.3s ease" }}
                >
                  {/* Category */}
                  <span
                    className="inline-block w-fit rounded-[2px] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em]"
                    style={{ background: cs.bg, color: cs.color }}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide transition-colors group-hover:text-blue md:text-2xl">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-4">
                    <span className="font-mono text-[0.6rem] text-slate/60">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {post.readTime} read
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-blue transition-colors group-hover:text-blue-light">
                      Read →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-2xl border border-ink-line bg-ink-soft p-8 text-center md:p-12">
            <p className="eyebrow mb-4 justify-center">Start your campaign</p>
            <h3 className="display mx-auto max-w-2xl text-[clamp(2rem,5vw,4rem)]">
              Ready to put your brand<br />
              <span className="text-blue">on the map?</span>
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate">
              Call us at{" "}
              <a href="tel:+919506017729" className="text-blue hover:text-blue-light transition-colors">
                +91 95060 17729
              </a>{" "}
              or use the WhatsApp button for a free consultation.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-[2px] bg-blue px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
