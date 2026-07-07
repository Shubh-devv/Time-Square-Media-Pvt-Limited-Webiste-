"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const CARDS = [
  { name: "BlueStone",  city: "Lucknow", category: "Outdoor Hoarding", img: "/clients/Bluestone Lucknow Long.png"  },
  { name: "Pan Bahar",  city: "",        category: "Branding",          img: "/clients/Pan Bahar Long.png"          },
  { name: "Dove",       city: "Kanpur",  category: "Branding",          img: "/clients/Dove Kanpur Long.png"        },
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
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.name + i} delay={0.06 * i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-ink-line bg-ink-soft"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 33vw"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,6,18,0.88) 0%, rgba(6,6,18,0.12) 55%, transparent 100%)" }}
                />

                {/* Labels */}
                <div className="absolute bottom-0 inset-x-0 flex flex-col items-start px-6 pb-7 gap-2">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/50">
                    {card.category}
                  </span>
                  <p className="font-display text-xl font-bold text-paper leading-tight">
                    {card.name}
                  </p>
                  {card.city && (
                    <span
                      className="rounded-full px-3 py-1 font-sans text-xs font-bold text-white"
                      style={{ background: "rgba(45,120,200,0.85)", backdropFilter: "blur(6px)", letterSpacing: "0.04em" }}
                    >
                      {card.city}
                    </span>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* See all link */}
        {previewCount && (
          <Reveal delay={0.2}>
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
