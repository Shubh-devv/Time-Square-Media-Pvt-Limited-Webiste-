"use client";

import Link from "next/link";
import { WORK } from "@/lib/data";
import Reveal from "./Reveal";

export default function Work({ previewCount }: { previewCount?: number }) {
  const items = previewCount ? WORK.slice(0, previewCount) : WORK;
  const isPreview = !!previewCount;

  return (
    <section id="work" className="border-t border-ink-line py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-6">Selected work</p>
            <h2 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
              Brands we&apos;ve<br />put on the map.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-slate">
              A snapshot of campaigns — from highway hoardings to full brand rollouts.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <Reveal key={w.name} delay={0.04 * i}>
              <article className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-ink-line bg-ink-soft p-6 transition-transform duration-300 hover:-translate-y-1">
                {/* Gradient overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(120% 80% at 80% 0%, rgba(45,120,200,0.25), transparent 60%)"
                        : "radial-gradient(120% 80% at 20% 0%, rgba(91,163,232,0.18), transparent 60%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute right-5 top-5 font-display text-7xl text-paper/5 transition-colors group-hover:text-paper/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-2xl uppercase leading-tight tracking-wide transition-colors group-hover:text-blue md:text-3xl">
                    {w.name}
                  </h3>
                  <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-slate">
                    {w.category}
                    {w.city ? ` · ${w.city}` : ""}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {isPreview && (
          <Reveal delay={0.12}>
            <div className="mt-10 flex justify-end">
              <Link
                href="/work"
                className="font-mono text-xs uppercase tracking-[0.2em] text-blue transition-colors hover:text-blue-light"
              >
                See all work →
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
