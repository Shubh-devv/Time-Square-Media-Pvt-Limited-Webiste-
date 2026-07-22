import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — OOH, DOOH & Digital Marketing Questions Answered",
  description:
    "Answers to the most common questions about OOH advertising, Digital OOH (DOOH), billboard costs in India, OOH vs digital marketing, BTL activations and choosing the right advertising agency.",
  alternates: { canonical: "/faq" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <PageHero
        image="/clients/campaign/Back%203.jpg"
        eyebrow="Frequently asked"
        title={
          <>
            OOH & digital<br />
            <span className="text-blue">questions, answered.</span>
          </>
        }
        subtitle="Straight answers on OOH advertising, Digital OOH, billboard costs, BTL activations and how to combine outdoor with digital marketing — the questions we get asked most."
      />

      <section className="border-t border-ink-line py-24 md:py-32">
        <div className="shell max-w-3xl">
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-ink-line bg-ink-soft p-6 open:border-blue/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg uppercase leading-snug tracking-wide text-paper marker:content-none">
                  {faq.question}
                  <span className="shrink-0 font-mono text-blue transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-[0.95rem] leading-[1.85] text-paper/75">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-ink-line bg-ink-soft p-8 text-center md:p-12">
            <p className="eyebrow mb-4 justify-center">Still have questions?</p>
            <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,5vw,3.5rem)]">
              Talk to our<br />
              <span className="text-blue">strategy team.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate">
              Call{" "}
              <a href="tel:+919506017729" className="text-blue hover:text-blue-light transition-colors">
                +91 95060 17729
              </a>{" "}
              or reach out for a free consultation on your OOH, DOOH and digital marketing mix.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-[2px] bg-blue px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.18em] text-paper transition-all hover:bg-blue-light"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
