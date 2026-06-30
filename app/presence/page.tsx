import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Presence from "@/components/Presence";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Presence",
  description:
    "Time Square Media operates across six Indian cities — Lucknow, Kanpur, Delhi, Bhopal, Agra and Prayagraj. Local teams, national reach.",
};

export default function PresencePage() {
  return (
    <main>
      <PageHero
        eyebrow="Our presence"
        title={
          <>
            Six cities.<br />
            <span className="text-blue">One network.</span>
          </>
        }
        subtitle="Boots on the ground across North and Central India — local teams who know every prime site in their city, delivering national-scale campaigns with local precision."
      />
      <Presence />

      {/* CTA */}
      <section className="border-t border-ink-line py-24 text-center md:py-32">
        <div className="shell">
          <p className="eyebrow mb-6 justify-center">Your city is next</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">
            Want to own<br />
            <span className="text-blue">your streets?</span>
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-[2px] bg-blue px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  );
}
