"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

/* All long-format campaign images */
const SLIDES = [
  { name: "BlueStone",      city: "Lucknow",       img: "/clients/Bluestone Lucknow Long.png"       },
  { name: "Dove",           city: "Kanpur",         img: "/clients/Dove Kanpur Long.png"              },
  { name: "Siggnature",     city: "Hyderabad",      img: "/clients/Hydrabad Siggnature long.jpeg"     },
  { name: "Pan Bahar",      city: "",               img: "/clients/Pan Bahar Long.png"                },
  { name: "Pan Bahar",      city: "Visakhapatnam",  img: "/clients/Pan Bahar Visakhapatnam Long.png"  },
  { name: "Paras Hospital", city: "Kanpur",         img: "/clients/Paras Kanpur Long.png"             },
  { name: "Ratan Jewel",    city: "Kanpur",         img: "/clients/Ratan Jewel Kanpur Long.png"       },
  { name: "Ratan Paloma",   city: "Kanpur",         img: "/clients/Ratan Paloma Kanpur Long.png"      },
  { name: "Rudra",          city: "Kanpur",         img: "/clients/Rudra Kanpur Long.png"             },
  { name: "Siggnature",     city: "",               img: "/clients/Siggnature Long.png"               },
  { name: "Tea Valley",     city: "Agra",           img: "/clients/Tea Valley Agra Long.png"          },
  { name: "Digiway",        city: "",               img: "/clients/Digiway Long.png"                  },
  { name: "Nestlé",         city: "",               img: "/clients/nestle-long.jpeg"                  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function Work({ previewCount }: { previewCount?: number }) {
  const [index, setIndex]   = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    const bounded = (next + SLIDES.length) % SLIDES.length;
    setDir(next > index ? 1 : -1);
    setIndex(bounded);
  }, [index]);

  /* Auto-advance every 4.5 s unless hovered */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(index + 1), 4500);
    return () => clearInterval(t);
  }, [index, paused, go]);

  const slide = SLIDES[index];

  return (
    <section id="work" className="border-t border-ink-line py-24 md:py-32">
      <div className="shell">
        {/* ── Heading ── */}
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

        {/* ── Carousel ── */}
        <Reveal delay={0.08}>
          <div
            className="mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Image frame */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-ink-line bg-ink-soft"
              style={{ aspectRatio: "4/5", maxHeight: "80vh" }}
            >
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={index}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.img}
                    alt={slide.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:768px) 100vw, 60vw"
                    priority
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(6,6,18,0.88) 0%,rgba(6,6,18,0.18) 45%,transparent 100%)" }}
                  />

                  {/* City / brand label — animated */}
                  <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-8 gap-2">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.4 }}
                      className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/55"
                    >
                      {slide.name}
                    </motion.p>

                    <motion.span
                      initial={{ opacity: 0, y: 14, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.28, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-full px-4 py-1.5 font-sans text-sm font-bold text-white"
                      style={{
                        background: slide.city
                          ? "rgba(45,120,200,0.88)"
                          : "rgba(0,0,0,0.60)",
                        backdropFilter: "blur(8px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {slide.city || slide.name}
                    </motion.span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-blue hover:border-blue"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-blue hover:border-blue"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

              {/* Slide counter */}
              <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 font-mono text-[0.6rem] text-white/70 backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width:  i === index ? 24 : 8,
                    height: 4,
                    borderRadius: 4,
                    background: i === index ? "#2D78C8" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            {!paused && (
              <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-ink-line">
                <motion.div
                  key={index}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  className="h-full rounded-full bg-blue"
                />
              </div>
            )}
          </div>
        </Reveal>

        {/* See all link */}
        {previewCount && (
          <Reveal delay={0.12}>
            <div className="mt-8 flex justify-end">
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
