"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";
import BulbStrip from "./BulbStrip";

/* ── static data ─────────────────────────────────────────────── */

const BEAMS = [
  { left: "8%",  rotate: "-16deg", delay: "0s",   dur: "5.2s", op: 0.18 },
  { left: "22%", rotate: "-8deg",  delay: "1.6s", dur: "6.8s", op: 0.14 },
  { left: "40%", rotate: "0deg",   delay: "0.5s", dur: "4.9s", op: 0.22 },
  { left: "60%", rotate: "8deg",   delay: "2.2s", dur: "5.6s", op: 0.13 },
  { left: "78%", rotate: "18deg",  delay: "0.9s", dur: "7.1s", op: 0.16 },
  { left: "92%", rotate: "25deg",  delay: "3.1s", dur: "5.3s", op: 0.12 },
];

const SERVICES_LIVE = [
  { label: "OOH · Brand Building"  },
  { label: "Mobile Media"          },
  { label: "Digital Marketing"     },
  { label: "Web Solutions"         },
  { label: "BTL & Activations"     },
  { label: "On / In Media"         },
  { label: "Retail Consultancy"    },
];

const STATS = [
  { v: "12+",  l: "Years"    },
  { v: "6",    l: "Cities"   },
  { v: "100+", l: "Brands"   },
  { v: "1",    l: "Fab Unit" },
];

const CITIES = ["Lucknow", "Kanpur", "Delhi", "Bhopal", "Agra", "Prayagraj"];

const BADGES = [
  { label: "OOH Advertising",  icon: "📍" },
  { label: "Digital Marketing", icon: "📲" },
  { label: "Web Solutions",     icon: "💻" },
  { label: "BTL Activations",   icon: "🎯" },
];

/* ── component ───────────────────────────────────────────────── */

export default function Hero() {
  const reduce  = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const vidRef  = useRef<HTMLVideoElement>(null);

  /* Ensure video autoplay works cross-browser */
  useEffect(() => {
    if (vidRef.current) vidRef.current.muted = true;
  }, []);

  /* Water hover effect on headline words */
  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      el.querySelectorAll<HTMLElement>("[data-word]").forEach((word) => {
        const r    = word.getBoundingClientRect();
        const dx   = e.clientX - (r.left + r.width  / 2);
        const dy   = e.clientY - (r.top  + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const s = ((180 - dist) / 180) * 34;
          const a = Math.atan2(dy, dx);
          word.style.transform = `translate(${(-Math.cos(a) * s).toFixed(1)}px,${(-Math.sin(a) * s).toFixed(1)}px)`;
        } else {
          word.style.transform = "translate(0,0)";
        }
      });
    };
    const onLeave = () =>
      el.querySelectorAll<HTMLElement>("[data-word]").forEach((w) => (w.style.transform = "translate(0,0)"));

    el.addEventListener("mousemove",  onMove,   { passive: true });
    el.addEventListener("mouseleave", onLeave,  { passive: true });
    return () => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  /* Framer Motion word entrance */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.065, delayChildren: 0.2 } },
  };
  const wv = {
    hidden: { y: "110%" },
    show:   { y: "0%", transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
  };

  const Word = ({ w, accent }: { w: string; accent?: boolean }) => (
    <span
      data-word
      className="inline-block"
      style={{ transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    >
      <span className="inline-block overflow-hidden">
        <motion.span
          variants={reduce ? undefined : wv}
          className={`inline-block ${accent ? "text-blue" : ""}`}
        >
          {w}
        </motion.span>
      </span>
    </span>
  );

  return (
    /*
     * Layout: flex flex-col, height 100svh
     *   - navbar spacer (flex-shrink-0, 72px)
     *   - content area  (flex-1, items-center) — vertically centred
     *   - BulbStrip     (flex-shrink-0) — pinned to bottom
     * Everything is visible in the first viewport, no scrolling needed.
     *
     * VIDEO: drop your footage at /public/videos/hero-bg.mp4
     * (free city / billboard videos at pexels.com or pixabay.com)
     */
    <section
      ref={heroRef}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* Base gradient — always visible, acts as fallback behind the video */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(-45deg,#090910 0%,#0d1c30 25%,#162a45 50%,#0d1520 75%,#090910 100%)",
          backgroundSize: "300% 300%",
          animation: "heroBg 16s ease infinite",
        }}
      />

      {/* ── Video background — sits above gradient, below overlay ─── */}
      <video
        ref={vidRef}
        autoPlay
        loop
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.55, zIndex: 1 }}
      >
        <source src="/videos/hero-bg.mp4"  type="video/mp4"  />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* Dark overlay — keeps all text readable over video */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(135deg,rgba(9,9,16,0.80) 0%,rgba(9,9,16,0.58) 55%,rgba(9,9,16,0.72) 100%)",
        }}
      />

      {/* Fine dot-grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 2,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* Centre spotlight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          zIndex: 2,
          width: "70vw",
          height: "52vh",
          background: "radial-gradient(ellipse 65% 60% at 50% 0%,rgba(45,120,200,0.18),transparent 80%)",
        }}
      />

      {/* Side glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-1/3 h-[38rem] w-[38rem] animate-glow rounded-full"
        style={{ zIndex: 2, background: "radial-gradient(circle,rgba(45,120,200,0.16),transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-24 h-[28rem] w-[28rem] animate-glow rounded-full"
        style={{
          zIndex: 2,
          background: "radial-gradient(circle,rgba(45,120,200,0.10),transparent 60%)",
          animationDelay: "3s",
        }}
      />

      {/* Light beams */}
      {BEAMS.map((b, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute top-0"
          style={{
            zIndex: 3,
            left: b.left,
            width: "1px",
            height: "65%",
            background: `linear-gradient(to bottom,rgba(45,120,200,${b.op}),transparent)`,
            transform: `rotate(${b.rotate})`,
            transformOrigin: "top center",
            animation: `beamFade ${b.dur} ease-in-out infinite ${b.delay}`,
          }}
        />
      ))}

      {/* ── Navbar height spacer ─────────────────────────────────── */}
      <div aria-hidden className="flex-shrink-0" style={{ height: "72px" }} />

      {/* ── Main content — grows to fill remaining viewport height ── */}
      <div
        className="shell relative flex flex-1 items-center py-2"
        style={{ zIndex: 10 }}
      >
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1fr_296px] xl:grid-cols-[1fr_320px] xl:gap-10">

          {/* ── LEFT column ─────────────────────────────────────── */}
          <div>

            {/* Eyebrow */}
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="eyebrow mb-4"
            >
              Bigger · Bolder · Braver · Est. 2012 · Pan-India
            </motion.p>

            {/* Headline with billboard corner brackets */}
            <div className="relative w-fit">
              <span aria-hidden className="absolute -left-4 -top-3 h-5 w-5 border-l-[1.5px] border-t-[1.5px] border-blue/40" />
              <span aria-hidden className="absolute -right-4 -top-3 h-5 w-5 border-r-[1.5px] border-t-[1.5px] border-blue/40" />
              <span aria-hidden className="absolute -bottom-1 -left-4 h-5 w-5 border-b-[1.5px] border-l-[1.5px] border-blue/40" />
              <span aria-hidden className="absolute -bottom-1 -right-4 h-5 w-5 border-b-[1.5px] border-r-[1.5px] border-blue/40" />

              <motion.h1
                variants={reduce ? undefined : container}
                initial={reduce ? false : "hidden"}
                animate="show"
                className="display"
                style={{ fontSize: "clamp(2.2rem,4.8vw,5.2rem)", lineHeight: 0.92 }}
              >
                <span className="block">
                  <span className="inline-flex flex-wrap gap-x-[0.22em]">
                    <Word w="OWN" /><Word w="THE" /><Word w="STREET." accent />
                  </span>
                </span>
                <span className="block mt-1">
                  <span className="inline-flex flex-wrap gap-x-[0.22em]">
                    <Word w="OWN" /><Word w="THE" /><Word w="SCROLL." accent />
                  </span>
                </span>
              </motion.h1>
            </div>

            {/* Media-type badges */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {BADGES.map((m) => (
                <span
                  key={m.label}
                  className="flex items-center gap-1.5 rounded-full border border-blue/20 px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-blue-light"
                  style={{ background: "rgba(45,120,200,0.09)" }}
                >
                  <span>{m.icon}</span>
                  {m.label}
                </span>
              ))}
            </motion.div>

            {/* Short description */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-4 max-w-lg text-sm leading-[1.75] text-paper/75 md:text-base"
            >
              From Lucknow to Delhi — 12+ years of high-impact OOH billboards, performance digital campaigns and web solutions that make brands impossible to ignore across 6 Indian cities.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.02 }}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/work"
                className="rounded-[2px] bg-blue px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all hover:bg-blue-light"
              >
                See our work
              </Link>
              <Link
                href="/contact"
                className="rounded-[2px] border border-blue/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-blue transition-all hover:border-blue hover:bg-blue hover:text-paper"
              >
                Free consultation
              </Link>
              <a
                href="tel:+919506017729"
                className="flex items-center gap-1.5 font-mono text-xs text-slate transition-colors hover:text-blue"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
                +91 95060 17729
              </a>
            </motion.div>

            {/* Stats + cities strip */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
              className="mt-5 flex flex-wrap items-center gap-5 border-t border-ink-line pt-5"
            >
              {STATS.map((s) => (
                <div key={s.l} className="flex items-baseline gap-1.5">
                  <span className="font-display text-[1.55rem] leading-none text-blue">{s.v}</span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-slate">{s.l}</span>
                </div>
              ))}

              <div className="hidden h-3 w-px self-center bg-ink-line sm:block" />

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[0.53rem] uppercase tracking-[0.16em] text-slate">Cities:</span>
                {CITIES.slice(0, 4).map((c) => (
                  <span key={c} className="flex items-center gap-1 font-mono text-[0.57rem] text-paper/60">
                    <span className="inline-block h-1 w-1 rounded-full bg-blue" />
                    {c}
                  </span>
                ))}
                <span className="font-mono text-[0.57rem] text-paper/40">+2 more</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT column — compact service dashboard ─────── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.95, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div
              className="rounded-2xl p-4"
              style={{
                background: "rgba(9,9,16,0.72)",
                border: "1px solid rgba(45,120,200,0.20)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Dashboard header */}
              <div className="mb-3 flex items-center justify-between border-b border-ink-line pb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-paper/60">
                    Active services
                  </span>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[0.56rem] text-blue"
                  style={{ background: "rgba(45,120,200,0.15)" }}
                >
                  7 live
                </span>
              </div>

              {/* Services list */}
              <ul className="space-y-2">
                {SERVICES_LIVE.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue"
                        style={{ boxShadow: "0 0 5px rgba(45,120,200,0.8)" }}
                      />
                      <span className="text-[0.74rem] text-paper/80">{s.label}</span>
                    </div>
                    <span className="text-[0.5rem] text-green-400">●</span>
                  </motion.li>
                ))}
              </ul>

              <div className="my-3 border-t border-ink-line" />

              {/* Media type tabs */}
              <div className="flex gap-1.5">
                {["OOH", "Digital", "Web"].map((m) => (
                  <div
                    key={m}
                    className="flex-1 rounded-lg py-1.5 text-center"
                    style={{
                      background: "rgba(45,120,200,0.10)",
                      border: "1px solid rgba(45,120,200,0.18)",
                    }}
                  >
                    <span className="font-mono text-[0.53rem] uppercase tracking-[0.1em] text-blue-light">
                      {m}
                    </span>
                  </div>
                ))}
              </div>

              {/* Phone */}
              <div
                className="mt-3 rounded-xl p-3"
                style={{
                  background: "rgba(45,120,200,0.10)",
                  border: "1px solid rgba(45,120,200,0.25)",
                }}
              >
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-blue">
                  Call us now
                </p>
                <a
                  href="tel:+919506017729"
                  className="mt-0.5 block font-display text-[1.15rem] leading-tight text-paper transition-colors hover:text-blue"
                >
                  +91 95060 17729
                </a>
                <p className="mt-0.5 font-mono text-[0.53rem] text-slate">
                  Lucknow · Kanpur · Delhi · 3 more cities
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-3 block w-full rounded-[2px] border border-blue/40 py-2.5 text-center font-mono text-[0.56rem] uppercase tracking-[0.16em] text-blue transition-all hover:border-blue hover:bg-blue hover:text-paper"
              >
                Get a free quote →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Full-width bulb strip — pinned to bottom of viewport ── */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <BulbStrip count={120} />
      </div>
    </section>
  );
}
