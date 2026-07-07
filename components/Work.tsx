"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const CARDS = [
  { name: "BlueStone",      city: "Lucknow",      category: "Outdoor Hoarding", img: "/clients/Bluestone Lucknow Long.png"      },
  { name: "Pan Bahar",      city: "",              category: "Branding",          img: "/clients/Pan Bahar Long.png"               },
  { name: "Dove",           city: "Kanpur",        category: "Branding",          img: "/clients/Dove Kanpur Long.png"             },
  { name: "Siggnature",     city: "Hyderabad",     category: "Outdoor Hoarding",  img: "/clients/Hydrabad Siggnature Long.jpeg"    },
  { name: "Pan Bahar",      city: "Visakhapatnam", category: "Branding",          img: "/clients/Pan Bahar Visakhapatnam Long.png" },
  { name: "Paras Hospital", city: "Kanpur",        category: "Healthcare",        img: "/clients/Paras Kanpur Long.png"            },
  { name: "Ratan Jewel",    city: "Kanpur",        category: "Retail Branding",   img: "/clients/Ratan Jewel Kanpur Long.png"      },
  { name: "Tea Valley",     city: "Agra",          category: "Branding",          img: "/clients/Tea Valley Agra Long.png"         },
  { name: "Rudra",          city: "Kanpur",        category: "Outdoor Hoarding",  img: "/clients/Rudra Kanpur Long.png"            },
];

/* Visible cards at a time */
const VISIBLE = 3;

function Card({ card, index }: { card: typeof CARDS[0]; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-line"
      style={{ minWidth: 0 }}
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
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(6,6,18,0.28) 0%, transparent 40%)" }}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-sans text-[0.6rem] font-medium uppercase tracking-widest text-white/75 backdrop-blur-sm">
          {card.category}
        </span>
      </div>

      {/* Glass panel */}
      <div
        className="relative flex flex-col gap-3 px-6 py-6"
        style={{
          background: "rgba(8,18,40,0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <h3
          className="font-display text-[1.75rem] font-bold leading-tight text-white"
          style={{ letterSpacing: "-0.01em" }}
        >
          {card.name}
        </h3>
        <div className="flex items-center gap-2">
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
        </div>
        <span
          className="self-start font-mono text-[0.58rem] uppercase tracking-[0.16em]"
          style={{ color: "rgba(45,120,200,0.6)" }}
        >
          {card.category}
        </span>
        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-sans text-lg text-blue opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          →
        </span>
      </div>
    </motion.div>
  );
}

export default function Work({ previewCount }: { previewCount?: number }) {
  const [start, setStart] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) {
        setStart(s => (s + 1) % CARDS.length);
      }
    }, 3200);
    return () => clearInterval(t);
  }, []);

  /* Wrap-around slice of 3 cards */
  const visible = Array.from({ length: VISIBLE }, (_, i) => ({
    card: CARDS[(start + i) % CARDS.length],
    key: (start + i) % CARDS.length,
  }));

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

        {/* Carousel */}
        <Reveal delay={0.08}>
          <div
            className="mt-14"
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; }}
          >
            {/* 3-card grid with animated swap */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map(({ card, key }, i) => (
                  <Card key={key} card={card} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStart(i)}
                  aria-label={`Go to ${CARDS[i].name}`}
                  className="transition-all duration-300"
                  style={{
                    width:  i === start ? 22 : 7,
                    height: 4,
                    borderRadius: 4,
                    background: i === start ? "#2D78C8" : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* See all link */}
        {previewCount && (
          <Reveal delay={0.2}>
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
