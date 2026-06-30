import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || BLOG_POSTS.indexOf(p) < 3)
  ).slice(0, 3);

  return (
    <main>
      {/* Article hero */}
      <section className="relative overflow-hidden border-b border-ink-line pb-14 pt-36 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-48 top-0 h-[32rem] w-[32rem] animate-glow rounded-full"
          style={{ background: "radial-gradient(circle, rgba(45,120,200,0.16), transparent 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="shell relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/blog" className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-slate transition-colors hover:text-blue">
              ← Blog
            </Link>
            <span className="text-slate/30">·</span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-blue">
              {post.category}
            </span>
          </div>

          <h1 className="display mt-6 text-[clamp(2rem,6vw,4.5rem)] leading-tight">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-paper/70">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-ink-line pt-5">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-slate/50">Published</p>
              <p className="mt-1 font-mono text-[0.7rem] text-slate">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="h-8 w-px bg-ink-line" />
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-slate/50">Read time</p>
              <p className="mt-1 font-mono text-[0.7rem] text-slate">{post.readTime}</p>
            </div>
            <div className="h-8 w-px bg-ink-line" />
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-slate/50">Author</p>
              <p className="mt-1 font-mono text-[0.7rem] text-slate">Time Square Media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="border-b border-ink-line py-20">
        <div className="shell max-w-3xl">
          <div className="space-y-8">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-4 font-display text-2xl uppercase tracking-wide text-paper md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                <p className="text-[1rem] leading-[1.85] text-paper/75">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* In-article CTA */}
          <div
            className="mt-14 rounded-2xl p-7"
            style={{
              background: "rgba(45,120,200,0.07)",
              border: "1px solid rgba(45,120,200,0.2)",
            }}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue">
              Ready to advertise?
            </p>
            <h3 className="mt-2 font-display text-2xl uppercase leading-snug">
              Let&apos;s plan your next campaign —<br />
              <span className="text-blue">free consultation.</span>
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-[2px] bg-blue px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all hover:bg-blue-light"
              >
                Get in touch
              </Link>
              <a
                href="tel:+919506017729"
                className="rounded-[2px] border border-ink-line px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate transition-colors hover:border-blue hover:text-blue"
              >
                +91 95060 17729
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="shell">
            <p className="eyebrow mb-8">More articles</p>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-2xl border border-ink-line bg-ink-soft p-6 transition-all hover:-translate-y-1 hover:border-blue/40"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-blue">
                    {rp.category}
                  </span>
                  <h3 className="mt-3 font-display text-xl uppercase leading-tight transition-colors group-hover:text-blue">
                    {rp.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate line-clamp-2">
                    {rp.excerpt}
                  </p>
                  <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue/70 group-hover:text-blue">
                    Read article →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
