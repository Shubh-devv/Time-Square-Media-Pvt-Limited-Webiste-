"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";


/* Pan-India campaign glimpses — city takes the spotlight, not the brand */
const CAMPAIGNS = [
  { city: "Lucknow",       img: "/clients/Bluestone Lucknow Long.png"       },
  { city: "Kanpur",        img: "/clients/Dove Kanpur Long.png"             },
  { city: "Hyderabad",     img: "/clients/Hydrabad Siggnature Long.png"     },
  { city: "Visakhapatnam", img: "/clients/Pan Bahar Visakhapatnam Long.png" },
  { city: "Kanpur",        img: "/clients/Ratan Jewel Kanpur Long.png"      },
  { city: "Agra",          img: "/clients/Tea Valley Agra Long.png"         },
  { city: "Kanpur",        img: "/clients/Rudra Kanpur Long.png"            },
  { city: "Delhi",         img: "/clients/siggnature delhi airport.jpeg"    },
];

const STATS = [
  { v: 100, suffix: "+", l: "Brands",    desc: "Trusted by top brands" },
  { v: 12,  suffix: "+", l: "Years",     desc: "Of industry experience" },
  { v: 6,   suffix: "",  l: "Cities",    desc: "Pan-India presence"     },
  { v: 500, suffix: "+", l: "Campaigns", desc: "Successfully executed"  },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400 + index * 120;
    const steps = 60;
    const increment = stat.v / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), stat.v);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, stat.v, index]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.06, y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative flex cursor-default flex-col items-center justify-center overflow-hidden rounded-2xl border border-ink-line p-6 text-center"
      style={{ background: "rgba(45,120,200,0.04)" }}
    >
      {/* hover radial glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(45,120,200,0.14)_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* hover border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-blue/40" />
      {/* top accent line */}
      <div className="absolute left-1/2 top-0 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue transition-all duration-500 group-hover:w-2/3" />

      <motion.span
        className="relative font-display text-4xl text-blue md:text-5xl"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
      >
        {count}{stat.suffix}
      </motion.span>
      <p className="relative mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate transition-colors duration-300 group-hover:text-blue/70">
        {stat.l}
      </p>
      <p className="relative mt-1 max-h-0 overflow-hidden font-sans text-[0.7rem] text-slate/50 transition-all duration-500 group-hover:max-h-8 group-hover:text-slate/70">
        {stat.desc}
      </p>
    </motion.div>
  );
}

export default function Clients() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="border-t border-ink-line py-24 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6">A glimpse of our pan India campaign</p>
          <h2
            className="display text-[clamp(2rem,5vw,3.5rem)] transition-colors duration-500 hover:text-blue"
            style={{ lineHeight: 1.12 }}
          >
            Brands we&apos;ve <span className="text-blue">put on the map.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CAMPAIGNS.map((c, i) => (
            <Reveal key={`${c.city}-${i}`} delay={0.04 * i}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                animate={
                  hovered === i
                    ? { scale: 1.04, y: -6 }
                    : hovered !== null
                    ? { scale: 0.97, opacity: 0.6 }
                    : { scale: 1, y: 0, opacity: 1 }
                }
                transition={{ type: "spring", damping: 22, stiffness: 320 }}
                className="group relative flex cursor-default flex-col overflow-hidden rounded-2xl border border-ink-line"
              >
                {/* Campaign photo */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={c.img}
                    alt={`${c.city} outdoor campaign`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                  {/* Bottom gradient so the city name always reads */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(6,6,18,0.92) 0%, rgba(6,6,18,0.35) 42%, transparent 68%)" }}
                  />

                  {/* City name — big, front and center */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span
                      className="font-display text-2xl uppercase leading-none text-white transition-colors duration-300 sm:text-3xl md:text-4xl"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {c.city}
                    </span>
                  </div>
                </div>

                {/* Accent glow ring on hover */}
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(45,120,200,0.5), 0 16px 40px rgba(45,120,200,0.2)" }}
                  />
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Stats grid */}
        <Reveal delay={0.2}>
          <div className="mt-14 border-t border-ink-line pt-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {STATS.map((s, i) => (
                <StatCard key={s.l} stat={s} index={i} />
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
