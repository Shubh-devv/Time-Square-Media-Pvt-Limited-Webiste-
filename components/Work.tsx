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

                {/* Text below image */}
                <div className="relative flex flex-col px-6 py-5"
                  style={{ background: "linear-gradient(to bottom, rgba(10,20,40,0.0), rgba(10,20,40,0.0))" }}
                >
                  {/* Top rule with blue accent */}
                  <div className="mb-4 flex items-center gap-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 28 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 + 0.07 * i, duration: 0.5 }}
                      className="h-[2px] rounded-full bg-blue flex-shrink-0"
                    />
                    <div className="h-px flex-1 bg-ink-line" />
                  </div>

                  {/* Brand name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + 0.07 * i, duration: 0.45 }}
                    className="font-sans text-[1.05rem] font-semibold leading-snug text-paper/90"
                    style={{ letterSpacing: "0.01em" }}
                  >
                    {card.name}
                  </motion.h3>

                  {/* City with pin icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-2 flex items-center gap-1.5"
                  >
                    {/* Pin icon */}
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="flex-shrink-0" style={{ color: "#2D78C8" }}>
                      <path d="M6 0C3.79 0 2 1.79 2 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 6 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
                    </svg>
                    <span
                      className="font-sans text-sm font-medium"
                      style={{ color: "#2D78C8", letterSpacing: "0.06em" }}
                    >
                      {card.city || "Pan India"}
                    </span>
                  </motion.div>

                  {/* Arrow hint — appears on hover */}
                  <span className="absolute right-5 bottom-5 font-mono text-xs text-blue/0 transition-all duration-300 group-hover:text-blue/70 group-hover:translate-x-1">
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
