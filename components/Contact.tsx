"use client";

import { COMPANY, CITIES } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-ink-line py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[36rem] w-[36rem] animate-glow rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(45,120,200,0.14), transparent 65%)" }}
      />

      <div className="shell relative z-10">
        <div className="grid gap-16 md:grid-cols-12">

          {/* Left: info */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">Let&apos;s talk</p>
              <h2 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
                Ready to own<br />
                <span className="text-blue">your</span> city?
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-slate">
                Tell us about your campaign and we&apos;ll get back to you within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-5">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                    Email
                  </p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-1 block text-lg transition-colors hover:text-blue"
                  >
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                    Phone
                  </p>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="mt-1 block text-lg transition-colors hover:text-blue"
                  >
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY.phone2}`}
                    className="mt-0.5 block text-lg transition-colors hover:text-blue"
                  >
                    {COMPANY.phone2}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                    Head office
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-slate">
                    {CITIES[0].city} — {CITIES[0].address}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
                {COMPANY.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.14em] text-slate transition-colors hover:text-blue"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-2xl border border-ink-line bg-ink-soft p-8 md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                      Service needed
                    </label>
                    <select className="rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper focus:border-blue focus:outline-none transition-colors">
                      <option value="">Select a service</option>
                      <option value="ooh">OOH / Outdoor</option>
                      <option value="digital">Digital Marketing</option>
                      <option value="btl">BTL &amp; Activations</option>
                      <option value="retail">Retail Consultancy</option>
                      <option value="all">Full Package</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your campaign, goals and timeline..."
                    className="rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-[2px] bg-blue py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-all hover:bg-blue-light"
                >
                  Send message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
