import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand building, mobile media, digital marketing, on/in media, BTL activations and retail consultancy — all delivered end-to-end, in-house.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="What we offer"
        title={
          <>
            Six ways to own<br />
            <span className="text-blue">your market.</span>
          </>
        }
        subtitle="From a single outdoor hoarding to a fully integrated multi-channel campaign — every service is executed in-house, end-to-end."
      />
      <Services columns={3} />

      {/* CTA */}
      <section className="border-t border-ink-line py-24 text-center md:py-32">
        <div className="shell">
          <p className="eyebrow mb-6 justify-center">Ready to start?</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">
            Let&apos;s build your<br />
            <span className="text-blue">next campaign.</span>
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-[2px] bg-blue px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
