"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SERVICES, type Service } from "@/lib/data";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";

export default function Services({
  preview = false,
  columns = 2,
}: {
  preview?: boolean;
  columns?: 2 | 3;
}) {
  const [active, setActive] = useState<Service | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [active]);

  const gridClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <>
      <section id="services" className="border-t border-ink-line py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
                Integrated.<br />
                <span className="display-outline">Or stand-alone.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-base leading-relaxed text-slate">
                Take the full communications package or pick a single service — every part
                delivered end-to-end, in-house.{" "}
                <span className="text-blue">Click any card to learn more.</span>
              </p>
            </Reveal>
          </div>

          <div className={`mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line ${gridClass}`}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.code} delay={0.04 * i} className="group bg-ink-soft">
                <button
                  onClick={() => setActive(s)}
                  className="relative h-full w-full overflow-hidden p-8 text-left transition-colors duration-300 hover:bg-ink md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-blue">
                      {s.code}
                    </span>
                    <span className="font-mono text-xs text-slate-dim">0{i + 1}</span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl uppercase tracking-wide transition-colors group-hover:text-blue md:text-3xl">
                    {s.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate md:text-base">
                    {s.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-[2px] border border-ink-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-paper/60"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>Details</span>
                    <span>→</span>
                  </div>

                  <div
                    aria-hidden
                    className="mt-3 h-px w-0 bg-blue transition-all duration-500 group-hover:w-full"
                  />
                </button>
              </Reveal>
            ))}
          </div>

          {preview && (
            <Reveal delay={0.15}>
              <div className="mt-10 flex justify-end">
                <Link
                  href="/services"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-blue transition-colors hover:text-blue-light"
                >
                  View all services →
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Service detail drawer — slides from right, header stays on top ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[45]"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && setActive(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xl overflow-y-auto border-l border-ink-line bg-ink"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Spacer — sits behind the header (z-50) */}
              <div className="h-16 flex-none md:h-20" />

              {/* Drawer header bar */}
              <div className="sticky top-16 z-10 flex items-center justify-between border-b border-ink-line bg-ink px-8 py-4 md:top-20">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-[0.28em] text-blue">
                    {active.code}
                  </span>
                  <span className="h-[1px] w-4 bg-ink-line" />
                  <span className="font-mono text-[0.6rem] text-slate/60">
                    0{SERVICES.findIndex((s) => s.code === active.code) + 1} / 07
                  </span>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-ink-line font-mono text-xs text-slate transition-all duration-200 hover:border-blue hover:bg-blue/5 hover:text-blue"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-8 md:px-10">
                <h2 className="font-display text-4xl uppercase leading-tight tracking-wide md:text-5xl">
                  {active.title}
                </h2>
                <p className="mt-3 font-mono text-xs italic text-blue/80">
                  &ldquo;{active.extended.tagline}&rdquo;
                </p>

                <div className="mt-8">
                  <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-slate/50">
                    Overview
                  </p>
                  <p className="text-[0.95rem] leading-relaxed text-paper/80">
                    {active.extended.overview}
                  </p>
                </div>

                <div className="mt-7">
                  <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-slate/50">
                    What&apos;s included
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.points.map((p) => (
                      <span
                        key={p}
                        className="rounded-[2px] border border-blue/20 bg-blue/8 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-blue-light"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-slate/50">
                    Our process
                  </p>
                  <ol className="space-y-4">
                    {active.extended.process.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue/25 font-mono text-[0.58rem] text-blue">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm leading-relaxed text-paper/70">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {active.extended.simpleExplainer && (
                  <div
                    className="mt-7 rounded-xl p-5"
                    style={{
                      background: "rgba(45,120,200,0.06)",
                      border: "1px solid rgba(45,120,200,0.18)",
                    }}
                  >
                    <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-blue">
                      In simple words
                    </p>
                    <p className="text-sm leading-relaxed text-paper/80">
                      {active.extended.simpleExplainer}
                    </p>
                  </div>
                )}

                <div className="mt-7 rounded-xl border border-ink-line p-5">
                  <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-slate/50">
                    Perfect for
                  </p>
                  <p className="text-sm leading-relaxed text-paper/70">
                    {active.extended.suitableFor}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    onClick={() => setActive(null)}
                    className="flex-1 rounded-[2px] bg-blue py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
                  >
                    Start a campaign →
                  </Link>
                  <button
                    onClick={() => setActive(null)}
                    className="flex-1 rounded-[2px] border border-ink-line py-3.5 text-center font-mono text-xs uppercase tracking-[0.18em] text-slate transition-colors hover:border-blue hover:text-blue"
                  >
                    Close ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
