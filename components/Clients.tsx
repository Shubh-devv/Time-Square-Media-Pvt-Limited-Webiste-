"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";


const CLIENTS = [
  { name: "BlueStone",       init: "BS", accent: "#1A6FA5", logo: "/clients/Bluestone.jpg"  },
   { name: "Tea Valley",      init: "TV", accent: "#3A7D44", logo: "/clients/Tea Valley.jpg" },
  { name: "Pan Bahar",       init: "PB", accent: "#C0392B", logo: "/clients/Pan Bahar.jpg"  },
  { name: "Digiway",         init: "D",  accent: "#2D78C8", logo: "/clients/Digiway.jpg"    },
  { name: "Baljiwan Ghutti", init: "BG", accent: "#16A085", logo: "/clients/Baljiwan.jpg"   },
  { name: "Siggnature",      init: "S",  accent: "#2C3E50", logo: "/clients/Siggnature.jpg" },
  { name: "Rudra",           init: "R",  accent: "#C0392B", logo: "/clients/Rudra.jpg"      },
  { name: "Paras",           init: "P",  accent: "#E8511A", logo: "/clients/Paras.jpg"      },
  { name: "Tanishq",         init: "T",  accent: "#B8860B", logo: "/clients/Tanishq.jpg"    },
  { name: "Maruti",          init: "M",  accent: "#003087", logo: "/clients/Maruti.png"      },
  { name: "Ratan",           init: "R",  accent: "#8E44AD", logo: "/clients/Ratan.jpg"      },
  { name: "Allen",           init: "A",  accent: "#1A73E8", logo: "/clients/Allen.png"       },
  { name: "Aakash",          init: "A",  accent: "#E67E22", logo: "/clients/Aakash.jpg"     },
  { name: "Kashi",           init: "K",  accent: "#FF6B35", logo: "/clients/Kashi.png"       },
  { name: "PNG",             init: "P",  accent: "#DAA520", logo: "/clients/PNG.jpg"         },
  { name: "ACC",             init: "A",  accent: "#546E7A", logo: "/clients/ACC.png"          },
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
          <p className="eyebrow mb-6">The brands we move</p>
          <h2
            className="display text-[clamp(2rem,5vw,3.5rem)] transition-colors duration-500 hover:text-blue"
            style={{ lineHeight: 1.12 }}
          >
            Trusted by brands big <span className="text-blue">&amp;</span> bold.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.name} delay={0.04 * i}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                animate={
                  hovered === i
                    ? { scale: 1.08, y: -6 }
                    : hovered !== null
                    ? { scale: 0.95, opacity: 0.55 }
                    : { scale: 1, y: 0, opacity: 1 }
                }
                transition={{ type: "spring", damping: 22, stiffness: 320 }}
                className="group relative flex cursor-default flex-col items-center gap-3 rounded-2xl border border-ink-line bg-ink-soft p-5 text-center"
                style={
                  hovered === i
                    ? {
                        borderColor: c.accent + "55",
                        boxShadow: `0 16px 40px ${c.accent}22, 0 0 0 1px ${c.accent}33`,
                      }
                    : {}
                }
              >
                {/* Logo image or styled text mark */}
                <div
                  className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: c.logo
                      ? "#fff"
                      : `linear-gradient(135deg, ${c.accent} 0%, ${c.accent}cc 100%)`,
                    boxShadow: hovered === i
                      ? `0 8px 28px ${c.accent}55`
                      : `0 2px 10px ${c.accent}22`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {c.logo ? (
                    <Image
                      src={c.logo}
                      alt={c.name}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: c.init.length > 3 ? "0.85rem" : c.init.length > 1 ? "1rem" : "1.5rem",
                        letterSpacing: "0.04em",
                        color: "#fff",
                        fontWeight: 900,
                        textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                        lineHeight: 1,
                      }}
                    >
                      {c.init}
                    </span>
                  )}
                </div>

                {/* Client name */}
                <p
                  className="text-[0.72rem] font-mono uppercase leading-tight tracking-[0.1em] transition-colors duration-300"
                  style={{ color: hovered === i ? c.accent : "rgba(136,136,152,0.75)" }}
                >
                  {c.name}
                </p>

                {/* Glow ring on hover */}
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ boxShadow: `inset 0 0 20px ${c.accent}18` }}
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
