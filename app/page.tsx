import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Impact from "@/components/Impact";
import Services from "@/components/Services";
import Work from "@/components/Work";
import CampaignBanner from "@/components/CampaignBanner";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import { TICKER_TERMS } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker items={TICKER_TERMS} tone="ink" speed="slow" />
      <About />
      <Impact />
      <Services preview />
      <Work previewCount={3} />
      <CampaignBanner />
      <Clients />
      <Testimonials />

      {/* Bottom CTA */}
      <section className="relative overflow-hidden border-t border-ink-line py-28 text-center md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[150px] animate-glow"
        />
        <div className="shell relative z-10">
          <p className="eyebrow mb-8 justify-center">Start a campaign</p>
          <h2 className="display mx-auto max-w-5xl text-[clamp(2.6rem,9vw,7rem)]">
            Ready to own<br />
            <span className="text-blue">your</span> city?
          </h2>
          <Link
            href="/contact"
            className="mt-12 inline-block rounded-[2px] bg-blue px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
