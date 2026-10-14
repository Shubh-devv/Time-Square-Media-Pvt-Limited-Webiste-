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
    company: "Tanishq",
  },
  {
    quote:
      "The in-house fabrication team at Time Square Media is unmatched. Flawless execution, on time, every time. Our retail rollout across 4 cities was seamless.",
    name: "Ankit Verma",
    role: "Director",
    company: "Tea Valley",
  },
  // TODO: replace placeholder quote/name/role below with the real testimonial from RUPA.
  {
    quote:
      "Working with Time Square Media gave our brand strong, consistent visibility exactly where our customers were. A dependable partner for outdoor advertising.",
    name: "Client Name",
    role: "Marketing Head",
    company: "RUPA",
  },
  // TODO: replace placeholder quote/name/role below with the real testimonial from RSPL.
  {
    quote:
      "Their planning and execution across multiple markets helped us scale our outdoor presence quickly without compromising on quality.",
    name: "Client Name",
    role: "Brand Manager",
    company: "RSPL",
  },
  // TODO: replace placeholder quote/name/role below with the real testimonial from Dollar.
  {
    quote:
      "From site selection to final installation, the team handled everything professionally and delivered real impact for our campaigns.",
    name: "Client Name",
    role: "Marketing Head",
    company: "Dollar",
  },
  // TODO: replace placeholder quote/name/role below with the real testimonial from Ganpati Sariya.
  {
    quote:
      "A reliable partner that understands local markets well — our brand visibility improved significantly after working with Time Square Media.",
    name: "Client Name",
    role: "Director",
    company: "Ganpati Sariya",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-ink-line pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Background image — subtle blur so image reads clearly */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/clients/campaign/Back%202.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "blur(3px)",
          transform: "scale(1.06)",
        }}
      />
      {/* Light dark overlay — enough to read text, image still visible */}
      <div className="absolute inset-0" style={{ background: "rgba(11,22,40,0.42)" }} />
      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow mb-6 justify-center text-center">Client Voices</p>
          <h2 className="display mx-auto max-w-2xl text-center text-[clamp(2rem,5vw,3.5rem)] text-paper">
            What our <span className="text-blue">clients</span> say
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-16 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="marquee-track flex w-max gap-6">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="relative flex h-full w-[340px] shrink-0 flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:w-[380px]"
                >
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
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
