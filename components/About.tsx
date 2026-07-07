"use client";

import Reveal from "./Reveal";
import CountUp from "./CountUp";

const ABOUT_STATS = [
  { value: 17,    suffix: "+", label: "Years of Experience",  sub: "Est. 2008"         },
  { value: 28,    suffix: "+", label: "States Covered",       sub: "Pan India"         },
  { value: 100,   suffix: "+", label: "Associate Partners",   sub: "Across India"      },
  { value: 10000, suffix: "+", label: "Media Units",          sub: "OOH · Digital · Web" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-ink-line py-24 md:py-32"
      style={{ background: "rgba(11,22,40,0.94)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/clients/campaign/Back%203.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          opacity: 0.65,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(11,22,40,0.46)" }} />

      <div className="shell relative z-10 grid gap-14 md:grid-cols-12">

        {/* ── Left: heading ── */}
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6">Who we are</p>
            <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.93] transition-colors duration-500 hover:text-blue/80">
              One agency.<br />
              <span className="text-blue">Every</span> medium.<br />
              Pan India.
            </h2>
          </Reveal>
        </div>

        {/* ── Right: copy + stats ── */}
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-paper/85">
              Founded in 2008, Time Square Media has spent 17+ years building brands across India's
              most competitive markets. Our reach extends deep into tier 2 and tier 3 cities —
              precisely where brand visibility creates decisive competitive advantage over rivals
              still thinking only metro. Built on a foundation of long-term client retention, we
              have systematically diversified across OOH, digital, and web so every brand gets
              a unified, always-on presence regardless of medium or market.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              We operate a pan-India OOH network through{" "}
              <span className="font-semibold text-paper/90">Options.marketing</span> — our
              proprietary media platform that connects brands directly to{" "}
              <span className="text-blue font-semibold">100+ associate partners</span> and{" "}
              <span className="text-blue font-semibold">10,000+ media units</span> across the
              country. From highway hoardings on national corridors to transit media in smaller
              towns, the network and expertise to reach your audience — wherever they are — is
              already in place.
            </p>
          </Reveal>

          {/* ── Stats grid ── */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-4">
            {ABOUT_STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i} className="bg-ink-soft">
                <div className="flex flex-col items-start p-6">
                  <div className="font-display text-4xl text-blue md:text-5xl">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm font-bold text-paper">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-slate">
                    {s.sub}
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
