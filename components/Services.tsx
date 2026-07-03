"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SERVICES, type Service } from "@/lib/data";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";

/* ── Alternating drawer colour per service index ────────────────────
   LIGHT (white bg, dark text) → Digital (2), BTL (4), Web (6)
   DARK  (ink  bg, light text) → OOH (0), Mobile (1), On/In (3), Retail (5) */
const LIGHT_INDICES = new Set([2, 4, 6]);

function getTheme(idx: number) {
  const light = LIGHT_INDICES.has(idx);
  return {
    light,
    drawerBg:     light ? "#FFFFFF"               : "#0B1628",
    headerBg:     light ? "#f4f7ff"               : "#162338",
    headerBorder: light ? "#dde6f5"               : "rgba(255,255,255,0.12)",
    titleColor:   light ? "#0B1628"               : "#f0f0f8",
    tagline:      light ? "#2D78C8"               : "rgba(45,120,200,0.8)",
    bodyText:     light ? "#2a2a3c"               : "rgba(240,240,248,0.8)",
    labelColor:   light ? "#888898"               : "rgba(136,136,152,0.55)",
    tagBg:        light ? "rgba(45,120,200,0.10)" : "rgba(45,120,200,0.12)",
    tagBorder:    light ? "rgba(45,120,200,0.22)" : "rgba(45,120,200,0.2)",
    tagText:      light ? "#2D78C8"               : "#5BA3E8",
    stepBorder:   light ? "rgba(45,120,200,0.3)"  : "rgba(45,120,200,0.25)",
    stepNum:      light ? "#2D78C8"               : "#2D78C8",
    stepText:     light ? "#2a2a3c"               : "rgba(240,240,248,0.75)",
    boxBg:        light ? "#f8faff"               : "rgba(45,120,200,0.06)",
    boxBorder:    light ? "#dde6f5"               : "rgba(45,120,200,0.18)",
    boxLabel:     light ? "#2D78C8"               : "#2D78C8",
    boxText:      light ? "#2a2a3c"               : "rgba(240,240,248,0.75)",
    suitableBg:   light ? "#f4f7ff"               : "rgba(255,255,255,0.03)",
    suitableBdr:  light ? "#dde6f5"               : "rgba(255,255,255,0.07)",
    suitableText: light ? "#3a3a5c"               : "rgba(240,240,248,0.7)",
    closeBorder:  light ? "#dde6f5"               : "rgba(255,255,255,0.1)",
    closeText:    light ? "#888898"               : "#888898",
    closeX:       light ? "#555"                  : "#888898",
    divider:      light ? "#dde6f5"               : "rgba(255,255,255,0.07)",
  };
}

export default function Services({
  preview = false,
}: {
  preview?: boolean;
  columns?: 2 | 3; // kept for API compat, ignored — single column now
}) {
  const [active, setActive] = useState<Service | null>(null);
  const activeIdx = active ? SERVICES.findIndex((s) => s.code === active.code) : -1;
  const theme     = activeIdx >= 0 ? getTheme(activeIdx) : null;

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);

  return (
    <>
      <section
        id="services"
        className="relative overflow-hidden border-t border-ink-line py-24 md:py-32"
      >
        {/* Blurred background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/clients/campaign/Back%201.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(6px)",
            transform: "scale(1.08)",
          }}
        />
        {/* Single dark navy overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(11,22,40,0.70)" }} />
        <div className="shell relative z-10">

          {/* ── Section header ─────────────────────────────────────── */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
                Integrated.<br />
                <span className="text-blue">Or stand-alone.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-base leading-relaxed text-slate">
                Take the full communications package or pick a single service — every part
                delivered end-to-end, in-house.{" "}
                <span className="text-blue">Click any card to explore.</span>
              </p>
            </Reveal>
          </div>

          {/* ── Service cards — alternating left / right reveal ─────── */}
          {/* overflow-hidden clips the cards while they fly in from the sides */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-ink-line">
            {SERVICES.map((s, i) => {
              const fromLeft = i % 2 === 0;   // even → enters from LEFT
              return (
                <motion.div
                  key={s.code}
                  initial={{ opacity: 0, x: fromLeft ? -120 : 120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative border-b border-ink-line last:border-b-0 ${
                    fromLeft ? "origin-left" : "origin-right"
                  }`}
                >
                  {/* Direction hint stripe — blue left border for even, right for odd */}
                  <span
                    aria-hidden
                    className={`absolute top-0 ${fromLeft ? "left-0" : "right-0"} h-0 w-[3px] bg-blue transition-all duration-500 ease-out group-hover:h-full`}
                  />

                  <button
                    onClick={() => setActive(s)}
                    className="relative w-full overflow-hidden bg-ink-soft px-8 py-7 text-left transition-colors duration-300 hover:bg-ink md:px-12 md:py-9"
                  >
                    {/* Hover shimmer sweep — direction matches entry */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 ${fromLeft ? "-translate-x-full" : "translate-x-full"} bg-blue/[0.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0`}
                    />

                    <div className="relative z-10 flex items-start gap-6 md:gap-10">

                      {/* ── LEFT col: index + code ── */}
                      <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 pt-1 md:w-20">
                        <span
                          className="font-display text-4xl leading-none md:text-5xl"
                          style={{ color: "rgba(45,120,200,0.12)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[0.6rem] font-bold tracking-[0.2em] text-blue">
                          {s.code}
                        </span>
                      </div>

                      {/* ── MAIN content ── */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-2xl uppercase leading-tight tracking-wide transition-colors duration-300 group-hover:text-blue md:text-3xl lg:text-4xl">
                            {s.title}
                          </h3>
                          {/* Explore arrow — appears on hover, direction matches entry */}
                          <span
                            className={`mt-1 shrink-0 font-mono text-sm text-blue opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                              fromLeft
                                ? "-translate-x-2 group-hover:translate-x-0"
                                : "translate-x-2 group-hover:translate-x-0"
                            }`}
                          >
                            {fromLeft ? "→" : "←"}
                          </span>
                        </div>

                        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate md:text-base">
                          {s.body}
                        </p>

                        {/* Tag pills */}
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {s.points.map((p) => (
                            <li
                              key={p}
                              className="rounded-[2px] border border-ink-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-paper/45 transition-all duration-300 group-hover:border-blue/25 group-hover:text-paper/70"
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {preview && (
            <Reveal delay={0.15}>
              <div className="mt-8 flex justify-end">
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

      {/* ── Drawer — slides in from LEFT ───────────────────────────────── */}
      <AnimatePresence>
        {active && theme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[45]"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setActive(null)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-full max-w-xl overflow-y-auto"
              style={{
                background: theme.drawerBg,
                borderRight: `1px solid ${theme.headerBorder}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Spacer clears fixed header */}
              <div className="h-16 flex-none md:h-20" />

              {/* Sticky drawer header bar */}
              <div
                className="sticky top-16 z-10 flex items-center justify-between px-8 py-4 md:top-20"
                style={{ background: theme.headerBg, borderBottom: `1px solid ${theme.headerBorder}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-[0.28em] text-blue">
                    {active.code}
                  </span>
                  <span style={{ display: "inline-block", height: 1, width: 14, background: theme.headerBorder }} />
                  <span className="font-mono text-[0.58rem]" style={{ color: theme.labelColor }}>
                    {String(activeIdx + 1).padStart(2, "0")} / 07
                  </span>
                  <span
                    className="ml-1 rounded-full px-2 py-0.5 font-mono text-[0.48rem] uppercase tracking-widest"
                    style={
                      theme.light
                        ? { background: "#e8f0fc", color: "#2D78C8" }
                        : { background: "rgba(45,120,200,0.12)", color: "#5BA3E8" }
                    }
                  >
                    {theme.light ? "Light" : "Dark"}
                  </span>
                </div>

                {/* Prev / Next navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActive(SERVICES[(activeIdx - 1 + SERVICES.length) % SERVICES.length])}
                    className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-all duration-200"
                    style={{ border: `1px solid ${theme.closeBorder}`, color: theme.closeX }}
                    title="Previous service"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setActive(SERVICES[(activeIdx + 1) % SERVICES.length])}
                    className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-all duration-200"
                    style={{ border: `1px solid ${theme.closeBorder}`, color: theme.closeX }}
                    title="Next service"
                  >
                    →
                  </button>
                  <button
                    onClick={() => setActive(null)}
                    className="ml-1 flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-all duration-200"
                    style={{ border: `1px solid ${theme.closeBorder}`, color: theme.closeX }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#2D78C8";
                      (e.currentTarget as HTMLElement).style.color = "#2D78C8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = theme!.closeBorder;
                      (e.currentTarget as HTMLElement).style.color = theme!.closeX;
                    }}
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* ── Drawer body ── */}
              <div className="px-8 py-8 md:px-10">

                <h2
                  className="font-display text-4xl uppercase leading-tight tracking-wide md:text-5xl"
                  style={{ color: theme.titleColor }}
                >
                  {active.title}
                </h2>
                <p className="mt-3 font-mono text-xs italic" style={{ color: theme.tagline }}>
                  &ldquo;{active.extended.tagline}&rdquo;
                </p>

                {/* Overview */}
                <div className="mt-8">
                  <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.24em]" style={{ color: theme.labelColor }}>
                    Overview
                  </p>
                  <p className="text-[0.95rem] leading-relaxed" style={{ color: theme.bodyText }}>
                    {active.extended.overview}
                  </p>
                </div>

                {/* What's included */}
                <div className="mt-7">
                  <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.24em]" style={{ color: theme.labelColor }}>
                    What&apos;s included
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.points.map((p) => (
                      <span
                        key={p}
                        className="rounded-[2px] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em]"
                        style={{ background: theme.tagBg, border: `1px solid ${theme.tagBorder}`, color: theme.tagText }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="mt-7">
                  <p className="mb-4 font-mono text-[0.58rem] uppercase tracking-[0.24em]" style={{ color: theme.labelColor }}>
                    Our process
                  </p>
                  <ol className="space-y-4">
                    {active.extended.process.map((step, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.55rem]"
                          style={{ border: `1px solid ${theme.stepBorder}`, color: theme.stepNum }}
                        >
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: theme.stepText }}>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* In simple words */}
                {active.extended.simpleExplainer && (
                  <div
                    className="mt-7 rounded-xl p-5"
                    style={{ background: theme.boxBg, border: `1px solid ${theme.boxBorder}` }}
                  >
                    <p className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.22em]" style={{ color: theme.boxLabel }}>
                      In simple words
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: theme.boxText }}>
                      {active.extended.simpleExplainer}
                    </p>
                  </div>
                )}

                {/* Perfect for */}
                <div
                  className="mt-5 rounded-xl p-5"
                  style={{ background: theme.suitableBg, border: `1px solid ${theme.suitableBdr}` }}
                >
                  <p className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.22em]" style={{ color: theme.labelColor }}>
                    Perfect for
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: theme.suitableText }}>
                    {active.extended.suitableFor}
                  </p>
                </div>

                {/* CTA row */}
                <div
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                  style={{ borderTop: `1px solid ${theme.divider}`, paddingTop: "2rem" }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setActive(null)}
                    className="flex-1 rounded-[2px] py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:opacity-90"
                    style={{ background: "#2D78C8" }}
                  >
                    Start a campaign →
                  </Link>
                  <button
                    onClick={() => setActive(null)}
                    className="flex-1 rounded-[2px] py-3.5 text-center font-mono text-xs uppercase tracking-[0.18em] transition-all"
                    style={{ border: `1px solid ${theme.closeBorder}`, color: theme.closeText }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#2D78C8";
                      (e.currentTarget as HTMLElement).style.color = "#2D78C8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = theme!.closeBorder;
                      (e.currentTarget as HTMLElement).style.color = theme!.closeText;
                    }}
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
