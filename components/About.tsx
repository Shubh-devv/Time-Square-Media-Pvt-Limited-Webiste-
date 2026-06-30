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
            <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">
              One agency.<br />
              <span className="text-blue">Every</span> medium.<br />
              Every city.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-paper/80">
              Time Square Media is North India's trusted partner for advertising excellence — connecting brands with consumers since 2012. Our team delivers the full spectrum: high-impact OOH hoardings, mobile media, digital campaigns, BTL activations, retail consultancy and web solutions.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              From a single billboard in Lucknow to multi-city campaigns spanning Delhi, Kanpur, Bhopal, Agra and Prayagraj — our in-house fabrication unit and single-point-of-contact model ensure flawless execution, on time, within budget.
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
