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
          <h2
            className="display mx-auto max-w-2xl text-center text-[clamp(2rem,5vw,3.5rem)]"
            style={{ color: "#090910" }}
          >
            What our <span style={{ color: "#2D78C8" }}>clients</span> say
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * i}>
              <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                {/* Decorative quote mark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-5 left-6 select-none font-display text-[6rem] leading-none"
                  style={{ color: "rgba(45,120,200,0.12)" }}
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p
                  className="relative z-10 flex-1 text-base leading-relaxed"
                  style={{ color: "#2a2a35" }}
                >
                  {t.quote}
                </p>

                {/* Attribution */}
                <div className="relative z-10 mt-8 border-t border-gray-100 pt-5">
                  <p
                    className="font-mono text-sm font-bold uppercase tracking-[0.12em]"
                    style={{ color: "#2D78C8" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.08em]"
                    style={{ color: "#555565" }}
                  >
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
