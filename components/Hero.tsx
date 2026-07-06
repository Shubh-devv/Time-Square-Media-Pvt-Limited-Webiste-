"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

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

export default function Hero() {
  const reduce  = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const vidRef  = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (vidRef.current) vidRef.current.muted = true;
  }, []);

  /* Water ripple on headline words */
  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      el.querySelectorAll<HTMLElement>("[data-word]").forEach((word) => {
        const r    = word.getBoundingClientRect();
        const dx   = e.clientX - (r.left + r.width  / 2);
        const dy   = e.clientY - (r.top  + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const s = ((200 - dist) / 200) * 28;
          const a = Math.atan2(dy, dx);
          word.style.transform = `translate(${(-Math.cos(a) * s).toFixed(1)}px,${(-Math.sin(a) * s).toFixed(1)}px)`;
        } else {
          word.style.transform = "translate(0,0)";
        }
      });
    };
    const onLeave = () =>
      el.querySelectorAll<HTMLElement>("[data-word]").forEach((w) => (w.style.transform = "translate(0,0)"));

    el.addEventListener("mousemove",  onMove,  { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
  };
  const wv = {
    hidden: { y: "110%" },
    show:   { y: "0%", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  const Word = ({ w, accent }: { w: string; accent?: boolean }) => (
    <span
      data-word
      className="inline-block"
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
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
    <section
      ref={heroRef}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* Base gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(-45deg,#0B1628 0%,#112035 25%,#1A3050 50%,#0F1E34 75%,#0B1628 100%)",
          backgroundSize: "300% 300%",
          animation: "heroBg 16s ease infinite",
        }}
      />

      {/* Video */}
      <video
        ref={vidRef}
        autoPlay loop playsInline muted
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.52, zIndex: 1 }}
      >
        <source src="/videos/hero-bg.mp4"  type="video/mp4"  />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(135deg,rgba(11,22,40,0.78) 0%,rgba(11,22,40,0.55) 55%,rgba(11,22,40,0.70) 100%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 2,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Navbar spacer */}
      <div aria-hidden className="flex-shrink-0" style={{ height: "84px" }} />

      {/* ── Main content — edge-to-edge ── */}
      <div
        className="relative flex flex-1 flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20"
        style={{ zIndex: 10 }}
      >

        {/* Eyebrow */}
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="eyebrow mb-5"
        >
          Bigger · Bolder · Braver · Est. 2012 · Pan-India
        </motion.p>

        {/* MASSIVE headline — fills width */}
        <div className="relative w-fit">
          <span aria-hidden className="absolute -left-5 -top-4 h-6 w-6 border-l-[2px] border-t-[2px] border-blue/50" />
          <span aria-hidden className="absolute -right-5 -top-4 h-6 w-6 border-r-[2px] border-t-[2px] border-blue/50" />
          <span aria-hidden className="absolute -bottom-2 -left-5 h-6 w-6 border-b-[2px] border-l-[2px] border-blue/50" />
          <span aria-hidden className="absolute -bottom-2 -right-5 h-6 w-6 border-b-[2px] border-r-[2px] border-blue/50" />

          <motion.h1
            variants={reduce ? undefined : container}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="display"
            style={{ fontSize: "clamp(3.8rem, 10vw, 12rem)", lineHeight: 0.9 }}
          >
            <span className="block">
              <span className="inline-flex flex-wrap gap-x-[0.2em]">
                <Word w="OWN" /><Word w="THE" /><Word w="STREET." accent />
              </span>
            </span>
            <span className="block mt-1">
              <span className="inline-flex flex-wrap gap-x-[0.2em]">
                <Word w="OWN" /><Word w="THE" /><Word w="SCROLL." accent />
              </span>
            </span>
          </motion.h1>
        </div>

        {/* Two-column row: description + CTAs | service panel */}
        <div className="mt-8 grid w-full items-start gap-8 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_330px]">

          {/* Left: sub-copy + CTAs + stats */}
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="max-w-2xl text-base leading-[1.8] text-paper/80 md:text-lg"
            >
              12 years. 6 cities. We put your brand on hoardings thousands drive past every single day — and follow them home with digital campaigns that actually convert.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.98 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/work"
                className="rounded-[2px] bg-blue px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
              >
                See our work
              </Link>
              <Link
                href="/contact"
                className="rounded-[2px] border border-blue/50 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue transition-all hover:border-blue hover:bg-blue hover:text-paper"
              >
                Free consultation
              </Link>
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
                <a href="tel:+919506017729" className="transition-colors hover:text-blue">+91 95060 17729</a>
                <span className="text-slate/40">·</span>
                <a href="tel:+919838798388" className="transition-colors hover:text-blue">+91 98387 98388</a>
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex flex-wrap items-center gap-6 border-t border-ink-line pt-6"
            >
              {STATS.map((s) => (
                <div key={s.l} className="flex items-baseline gap-2">
                  <span className="font-display text-[1.8rem] leading-none text-blue">{s.v}</span>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-slate">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: compact service dashboard */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div
              className="rounded-2xl p-4"
              style={{
                background: "rgba(11,22,40,0.68)",
                border: "1px solid rgba(45,120,200,0.22)",
                backdropFilter: "blur(24px)",
              }}
            >
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

              <ul className="space-y-2">
                {SERVICES_LIVE.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.15 + i * 0.05 }}
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

              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(45,120,200,0.10)",
                  border: "1px solid rgba(45,120,200,0.25)",
                }}
              >
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-blue">
                  Call us now
                </p>
                <div className="mt-1 space-y-0.5">
                  <a href="tel:+919506017729" className="block font-display text-[1.1rem] leading-tight text-paper transition-colors hover:text-blue">+91 95060 17729</a>
                  <a href="tel:+919838798388" className="block font-display text-[1.1rem] leading-tight text-paper transition-colors hover:text-blue">+91 98387 98388</a>
                </div>
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
    </section>
  );
}
