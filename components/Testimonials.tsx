import Reveal from "@/components/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Time Square Media transformed our brand presence across Lucknow and Kanpur. Their OOH placements delivered massive footfall to our showrooms within the first month.",
    name: "Rajesh Sharma",
    role: "Marketing Head",
    company: "BlueStone Jewellery",
  },
  {
    quote:
      "Their end-to-end approach — from hoarding selection to digital retargeting — gave us city-wide visibility we couldn't achieve individually. Truly one roof, every medium.",
    name: "Priya Mishra",
    role: "Brand Manager",
    company: "HDFC Bank (UP West)",
  },
  {
    quote:
      "The in-house fabrication team at Time Square Media is unmatched. Flawless execution, on time, every time. Our retail rollout across 4 cities was seamless.",
    name: "Ankit Verma",
    role: "Director",
    company: "Tea Valley",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-gray-100 bg-gray-50 py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6 justify-center text-center">Client Voices</p>
          <h2 className="display text-ink mx-auto max-w-2xl text-center text-[clamp(2rem,5vw,3.5rem)]">
            What our <span className="text-blue">clients</span> say
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * i}>
              <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                {/* Decorative quote mark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 left-6 select-none font-display text-[7rem] leading-none text-blue/10"
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p className="relative z-10 flex-1 text-[1rem] leading-relaxed text-ink/75">
                  {t.quote}
                </p>

                {/* Attribution */}
                <div className="relative z-10 mt-8 border-t border-gray-100 pt-6">
                  <p className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-blue">
                    {t.name}
                  </p>
                  <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink/40">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
