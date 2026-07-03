import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Presence from "@/components/Presence";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OOH Advertising Presence | Time Square Media",
  description:
    "Time Square Media operates across six Indian cities — Lucknow, Kanpur, Delhi, Bhopal, Agra and Prayagraj. View complete OOH media plans with available formats, sites and rates for each city.",
};

export default function PresencePage() {
  return (
    <main>
      <PageHero
        image="/clients/campaign/Campaign%20%283%29.png"
        eyebrow="Our presence"
        title={
          <>
            Six cities.<br />
            <span className="text-blue">One network.</span>
          </>
        }
        subtitle="Complete OOH media plans for every city we operate in — hoardings, mobile media, LED screens and more. Click any city to explore available inventory, key corridors and past campaigns."
      />

      <Presence />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-ink-line py-24 text-center md:py-32">
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "url('/clients/campaign/Back%202.jpg')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(6px)", transform: "scale(1.08)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "rgba(11,22,40,0.68)" }} />
        <div className="shell relative z-10">
          <p className="eyebrow mb-6 justify-center">Your city. Your campaign.</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">
            Want to own<br />
            <span className="text-blue">your streets?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate">
            Tell us your city and budget — we'll send a complete OOH media plan with site photos, reach estimates and rates within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-[2px] bg-blue px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
            >
              Request a Media Plan
            </Link>
            <a
              href="https://wa.me/919506017729"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[2px] border border-ink-line px-9 py-4 font-mono text-sm uppercase tracking-[0.18em] text-slate transition-all hover:border-blue hover:text-blue"
            >
              WhatsApp Us →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
