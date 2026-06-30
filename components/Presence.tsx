"use client";

import { CITIES } from "@/lib/data";
import Reveal from "./Reveal";

export default function Presence() {
  return (
    <section id="presence" className="border-t border-ink-line py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow mb-6">Where we are</p>
              <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">
                Six cities.<br />
                <span className="text-blue">One</span> network.
              </h2>
              <p className="mt-6 max-w-xs text-base leading-relaxed text-slate">
                Boots on the ground across North and Central India — local teams who know
                every prime site in their city.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-ink-line">
              {CITIES.map((c, i) => (
                <Reveal key={c.city} delay={0.04 * i}>
                  <div className="group border-b border-ink-line p-6 transition-colors last:border-b-0 hover:bg-ink-soft md:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                      {/* City name + number */}
                      <div className="flex items-center gap-4 sm:w-48 sm:shrink-0">
                        <span className="font-mono text-xs text-slate-dim">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-2xl uppercase tracking-wide transition-colors group-hover:text-blue md:text-3xl">
                          {c.city}
                        </h3>
                      </div>

                      {/* Address + contact */}
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
  );
}
