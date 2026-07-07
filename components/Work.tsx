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
                <div className="flex flex-col items-center gap-3 px-5 py-6 text-center">
                  {/* Brand name */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-sans text-base font-semibold tracking-wide text-paper"
                  >
                    {card.name}
                  </motion.p>

                  {/* City — big, animated, blue pill */}
                  {card.city ? (
                    <motion.span
                      initial={{ opacity: 0, y: 16, scale: 0.88 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.18 + 0.07 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-full px-5 py-2 font-sans text-base font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#2D78C8,#1a5a9e)", letterSpacing: "0.05em" }}
                    >
                      {card.city}
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: 16, scale: 0.88 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.18 + 0.07 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-full px-5 py-2 font-sans text-base font-bold text-slate"
                      style={{ background: "rgba(255,255,255,0.07)", letterSpacing: "0.05em" }}
                    >
                      Pan India
                    </motion.span>
                  )}
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
