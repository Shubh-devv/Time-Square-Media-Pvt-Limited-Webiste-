"use client";

import Link from "next/link";
import { CITIES } from "@/lib/data";
import { CITY_PAGES } from "@/lib/city-data";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

/* Accent colour per city — used for the card top border */
const CITY_ACCENT: Record<string, string> = {
  lucknow:    "#2D78C8",
  kanpur:     "#E67E22",
  delhi:      "#C0392B",
  bhopal:     "#16A085",
  agra:       "#8E44AD",
  prayagraj:  "#3A7D44",
};

export default function Presence() {
  return (
    <>
      {/* ── City brochure cards ──────────────────────────────── */}
      <section id="presence" className="border-t border-ink-line py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-6">Where we operate</p>
            <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">
              Six cities.<br />
              <span className="text-blue">Full OOH coverage.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
              Click any city to see a complete OOH media plan — available formats, key corridors, past campaigns and how to get started.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CITY_PAGES.map((city, i) => {
              const accent = CITY_ACCENT[city.slug] ?? "#2D78C8";
              return (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                >
                  <Link
                    href={`/presence/${city.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-soft transition-all duration-300 hover:border-blue/30 hover:shadow-[0_12px_40px_rgba(45,120,200,0.14)]"
                  >
                    {/* Top accent bar */}
                    <span
                      className="block h-[3px] w-full transition-all duration-500 group-hover:h-[5px]"
                      style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }}
                    />

                    <div className="flex flex-1 flex-col p-6">
                      {/* Number + city */}
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[0.55rem] text-slate/50">{city.number}</span>
                        <span
                          className="font-mono text-[0.5rem] uppercase tracking-widest rounded-full px-2 py-0.5"
                          style={{ background: `${accent}22`, color: accent }}
                        >
                          OOH Plan
                        </span>
                      </div>

                      <h3
                        className="mt-2 font-display text-3xl uppercase leading-tight tracking-wide transition-colors duration-300 md:text-4xl"
                        style={{ color: "inherit" }}
                      >
                        <span className="text-paper group-hover:text-blue transition-colors duration-300">
                          {city.name}
                        </span>
                      </h3>

                      <p className="mt-1 font-mono text-[0.58rem] leading-snug text-slate">
                        {city.tagline}
                      </p>

                      {/* Stats row */}
                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-line pt-4">
                        <div>
                          <div className="font-display text-xl" style={{ color: accent }}>{city.heroStat}</div>
                          <div className="font-mono text-[0.48rem] uppercase tracking-widest text-slate/60">{city.heroStatLabel}</div>
                        </div>
                        <div>
                          <div className="font-display text-xl text-blue">{city.totalSites}+</div>
                          <div className="font-mono text-[0.48rem] uppercase tracking-widest text-slate/60">OOH Sites</div>
                        </div>
                        <div>
                          <div className="font-display text-xl text-paper">{city.formats.length}</div>
                          <div className="font-mono text-[0.48rem] uppercase tracking-widest text-slate/60">Formats</div>
                        </div>
                      </div>

                      {/* CTA row */}
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {city.formats.slice(0, 3).map(f => (
                            <span key={f.code} className="rounded-[2px] border border-ink-line px-1.5 py-0.5 font-mono text-[0.48rem] uppercase tracking-wider text-slate/60">
                              {f.code}
                            </span>
                          ))}
                          {city.formats.length > 3 && (
                            <span className="rounded-[2px] border border-ink-line px-1.5 py-0.5 font-mono text-[0.48rem] text-slate/40">
                              +{city.formats.length - 3}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-blue opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          View Plan →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Office directory list ────────────────────────────── */}
      <section className="border-t border-ink-line py-20 md:py-24">
        <div className="shell">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow mb-6">Our offices</p>
                <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
                  Local teams.<br />
                  <span className="text-blue">National</span> reach.
                </h2>
                <p className="mt-6 max-w-xs text-base leading-relaxed text-slate">
                  Boots on the ground across North and Central India — local people who know every prime site in their city.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-ink-line">
                {CITIES.map((c, i) => (
                  <Reveal key={c.city} delay={0.04 * i}>
                    <div className="group border-b border-ink-line p-6 transition-colors last:border-b-0 hover:bg-ink-soft md:p-7">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                        <div className="flex items-center gap-4 sm:w-48 sm:shrink-0">
                          <span className="font-mono text-xs text-slate/40">{String(i + 1).padStart(2, "0")}</span>
                          <h3 className="font-display text-2xl uppercase tracking-wide transition-colors group-hover:text-blue md:text-3xl">
                            {c.city}
                          </h3>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed text-slate">{c.address}</p>
                          {c.contact && (
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-blue">
                                {c.contact}
                              </span>
                              {c.phone && (
                                <a
                                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                                  className="font-mono text-[0.68rem] text-slate transition-colors hover:text-blue"
                                >
                                  {c.phone}
                                </a>
                              )}
                            </div>
                          )}
                          {CITY_PAGES.find(p => p.slug === c.city.toLowerCase()) && (
                            <Link
                              href={`/presence/${c.city.toLowerCase()}`}
                              className="mt-3 inline-block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-blue transition-colors hover:text-blue-light"
                            >
                              View OOH Plan →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
