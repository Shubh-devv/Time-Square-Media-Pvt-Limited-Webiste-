"use client";

import { IMPACT_STATS } from "@/lib/data";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Impact() {
  return (
    <section className="border-t border-ink/10 bg-paper py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">Why out-of-home works</p>
              <h2 className="display text-ink text-[clamp(2.4rem,7vw,5.5rem)]">
                Attention you<br />can&apos;t scroll past.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink/60">
                OOH builds powerful, trust-driven connections that resonate deeply — and
                pushes people to act. The numbers below are why brands keep coming back to
                the street.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i} className="bg-ink">
              <div className="flex h-full flex-col p-8 md:p-10">
                <div className="font-display text-6xl leading-none text-blue md:text-7xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper">
                  {s.label}
                </div>
                <p className="mt-3 text-sm leading-snug text-slate">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
