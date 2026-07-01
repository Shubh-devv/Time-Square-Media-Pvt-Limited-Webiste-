"use client";

import { HOUSE_STATS } from "@/lib/data";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function About() {
  return (
    <section id="about" className="relative border-t border-ink-line py-24 md:py-32">
      <div className="shell grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6">Who we are</p>
            <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] transition-colors duration-500 hover:text-blue/80">
              One agency.<br />
              <span className="text-blue">Every</span> medium.<br />
              Every city.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-paper/80">
              We started in Lucknow in 2012 with a simple idea — help brands get seen in places people actually look. Today we work across 6 cities, handling everything from 40-foot hoardings to Google Ads to shop signage, all under one roof.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              We own our fabrication unit, so there's no outsourcing, no middlemen, no "let me check with the printer" delays. One hoarding in Kanpur or a full multi-city launch — the same team takes it from brief to billboard.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-4">
            {HOUSE_STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i} className="bg-ink-soft">
                <div className="p-6">
                  <div className="font-display text-4xl text-blue md:text-5xl">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-[0.68rem] uppercase leading-tight tracking-[0.14em] text-slate">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
