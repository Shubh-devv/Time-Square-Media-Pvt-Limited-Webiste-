"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const CARDS = [
  { name: "BlueStone", city: "Lucknow", category: "Outdoor Hoarding", img: "/clients/Bluestone Lucknow Long.png" },
  { name: "Pan Bahar", city: "",        category: "Branding",          img: "/clients/Pan Bahar Long.png"         },
  { name: "Dove",      city: "Kanpur",  category: "Branding",          img: "/clients/Dove Kanpur Long.png"       },
];

export default function Work({ previewCount }: { previewCount?: number }) {
  return (
    <section id="work" className="border-t border-ink-line py-24 md:py-32">
      <div className="shell">
        {/* Heading */}
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

        {/* 3-card grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.name + i} delay={0.08 * i}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-soft"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={card.img}
                    alt={card.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                  {/* Subtle top-only vignette so image reads clean */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(6,6,18,0.28) 0%, transparent 40%)" }}
                  />
                  {/* Category pill top-left */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-sans text-[0.6rem] font-medium uppercase tracking-widest text-white/75 backdrop-blur-sm">
                    {card.category}
                  </span>
                </div>

                {/* Glass panel below image */}
                <div
                  className="relative flex flex-col gap-3 px-6 py-6"
                  style={{
                    background: "rgba(8,18,40,0.55)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Brand name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[1.75rem] font-bold leading-tight text-white"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {card.name}
                  </motion.h3>

                  {/* City row */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2"
                  >
                    {/* Glowing dot */}
                    <span
                      className="h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ background: "#2D78C8", boxShadow: "0 0 8px 2px rgba(45,120,200,0.7)" }}
                    />
                    <span
                      className="font-sans text-sm font-semibold uppercase tracking-[0.12em]"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {card.city || "Pan India"}
                    </span>
                  </motion.div>

                  {/* Category tag */}
                  <span
                    className="self-start font-mono text-[0.58rem] uppercase tracking-[0.16em]"
                    style={{ color: "rgba(45,120,200,0.6)" }}
                  >
                    {card.category}
                  </span>

                  {/* Arrow hint on hover */}
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 font-sans text-lg text-blue opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* See all link */}
        {previewCount && (
          <Reveal delay={0.22}>
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
