"use client";

import { CLIENTS } from "@/lib/data";
import Reveal from "./Reveal";
import Ticker from "./Ticker";

export default function Clients() {
  return (
    <section className="border-t border-ink-line py-24 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6">The brands we move</p>
          <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
            Trusted by brands big <span className="text-blue">&amp;</span> bold.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <Ticker items={CLIENTS} tone="ink" speed="slow" />
      </div>
      <div className="mt-3">
        <Ticker items={[...CLIENTS].reverse()} tone="blue" speed="fast" />
      </div>
    </section>
  );
}
