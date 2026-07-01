"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { type CityPage } from "@/lib/city-data";
import Reveal from "@/components/Reveal";

/* ── Zone badge config ─────────────────────────────────────────── */
const ZONE_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  commercial:  { bg: "rgba(45,120,200,0.12)",  text: "#5BA3E8", label: "Commercial"  },
  residential: { bg: "rgba(90,200,90,0.12)",   text: "#5cb85c", label: "Residential" },
  transit:     { bg: "rgba(255,165,0,0.12)",    text: "#f0a500", label: "Transit Hub" },
  highway:     { bg: "rgba(200,60,60,0.12)",    text: "#e05555", label: "Highway"     },
  tourism:     { bg: "rgba(140,80,210,0.12)",   text: "#a56de0", label: "Tourism"     },
  mixed:       { bg: "rgba(136,136,152,0.12)",  text: "#888898", label: "Mixed Use"   },
};

/* Format category → colour + label */
const CAT_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  static:  { bg: "rgba(45,120,200,0.15)",  text: "#5BA3E8", label: "Static"  },
  mobile:  { bg: "rgba(255,165,0,0.15)",   text: "#f0a500", label: "Mobile"  },
  digital: { bg: "rgba(90,200,90,0.15)",   text: "#5cb85c", label: "Digital" },
  ambient: { bg: "rgba(140,80,210,0.15)",  text: "#a56de0", label: "Ambient" },
};

/* Format category icon */
const CAT_ICON: Record<string, string> = {
  static:  "⬛",
  mobile:  "🔄",
  digital: "📺",
  ambient: "💡",
};

/* ── Pan-India city list ────────────────────────────────────────── */
const PAN_INDIA_CITIES = [
  "Mumbai", "Pune", "Bengaluru", "Chennai", "Hyderabad", "Kolkata",
  "Ahmedabad", "Jaipur", "Surat", "Chandigarh", "Patna", "Indore",
  "Nagpur", "Varanasi", "Meerut", "Dehradun", "Jodhpur", "Amritsar",
  "Gurugram", "Noida", "Kochi", "Coimbatore", "Visakhapatnam",
  "Guwahati", "Bhubaneswar", "Vadodara", "Ludhiana", "Nashik",
  "Aurangabad", "Mysuru",
];

/* ── Quote form ─────────────────────────────────────────────────── */
type FormState = { name: string; company: string; phone: string; formats: string; message: string };
const EMPTY: FormState = { name: "", company: "", phone: "", formats: "", message: "" };

function QuoteForm({ city, panIndia = false }: { city: string; panIndia?: boolean }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const intro = panIndia
      ? `Hi! I'd like a Pan-India OOH media plan. Cities: ${city}.`
      : `Hi! I'd like an OOH media plan for ${city}.`;
    const text = [
      intro,
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.formats ? `Formats interested in: ${form.formats}` : "",
      form.message ? `Additional info: ${form.message}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/919506017729?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setTimeout(() => { setSent(false); setForm(EMPTY); }, 3000);
  };

  const inputCls = "w-full rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder-slate/40 focus:border-blue focus:outline-none transition-colors";
  const labelCls = "mb-1.5 block font-mono text-xs uppercase tracking-[0.16em] text-slate";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(37,211,102,0.15)" }}>
            <svg width="22" height="22" fill="none" stroke="#25D366" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <p className="font-display text-xl uppercase text-blue">Opening WhatsApp…</p>
          <p className="text-sm text-slate">We&apos;ll reply within 30 minutes.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={labelCls}>Your Name *</label><input required type="text" value={form.name} onChange={set("name")} placeholder="Rahul Sharma" className={inputCls} /></div>
            <div><label className={labelCls}>Company</label><input type="text" value={form.company} onChange={set("company")} placeholder="Brand / Agency" className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Phone *</label><input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={inputCls} /></div>
          <div>
            <label className={labelCls}>Format Interested In</label>
            <select value={form.formats} onChange={set("formats")} className={inputCls}>
              <option value="">Select format…</option>
              {["Large Format Hoardings", "Unipoles & Gantries", "Auto Rickshaw Branding", "City Bus Branding", "LED Digital Screens", "Bus Shelter Panels", "Full City Package", "Pan India Multi-City", "Other / Multiple"].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Message (optional)</label><textarea value={form.message} onChange={set("message")} placeholder="Budget range, duration, specific cities or areas…" rows={3} className={`${inputCls} resize-none`} /></div>
          <button type="submit" className="w-full rounded-[2px] py-3.5 font-mono text-sm font-bold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90" style={{ background: "#25D366" }}>
            Send via WhatsApp →
          </button>
        </>
      )}
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function CityBrochure({ city }: { city: CityPage }) {

  const handleDownload = () => {
    const text = `Hi! I'd like to download the complete OOH Inventory Plan for ${city.name}. Please send me the PDF brochure with site photos, dimensions, locations and current availability.\n\nName:\nCompany:\nPhone:`;
    window.open(`https://wa.me/919506017729?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <main>

      {/* ════════════════════════════════════════
          1 — HERO
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-ink pb-0 pt-32 md:pt-40">
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-8 font-display text-[22vw] leading-none opacity-[0.03] md:right-12"
        >
          {city.number}
        </span>

        <div className="shell relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate">
            <Link href="/presence" className="transition-colors hover:text-blue">Our Presence</Link>
            <span className="text-slate/40">/</span>
            <span className="text-blue">{city.name}</span>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-blue"
              >
                OOH Media Plan · {city.name}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.06 }}
                className="font-display text-[clamp(3.5rem,11vw,9rem)] uppercase leading-[0.9] tracking-tight"
              >
                {city.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.16 }}
                className="mt-4 max-w-lg text-base leading-relaxed text-slate"
              >
                {city.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap gap-6 lg:flex-col lg:items-end lg:gap-4"
            >
              {[
                { v: city.heroStat,            l: city.heroStatLabel       },
                { v: `${city.totalSites}+`,    l: "OOH Sites Available"    },
                { v: `${city.formats.length}`, l: "Media Formats"          },
                { v: city.dailyCommuters,       l: "Daily Commuters"        },
              ].map(s => (
                <div key={s.l} className="text-right">
                  <div className="font-display text-3xl text-blue md:text-4xl">{s.v}</div>
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-slate">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-t-2xl border border-b-0 border-ink-line bg-ink-line md:grid-cols-4"
          >
            {[
              { label: "Population",      value: city.population           },
              { label: "Key Markets",     value: `${city.keyMarkets} zones` },
              { label: "Daily Commuters", value: city.dailyCommuters       },
              { label: "Available Sites", value: `${city.totalSites}+`     },
            ].map(s => (
              <div key={s.label} className="bg-ink-soft px-6 py-5">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-slate">{s.label}</div>
                <div className="mt-1 font-display text-xl text-paper">{s.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          1b — DOWNLOAD INVENTORY PLAN STRIP
      ════════════════════════════════════════ */}
      <div className="border border-t-0 border-ink-line bg-ink-soft">
        <div className="shell flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            {/* PDF icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue/30 bg-blue/10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D78C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <div>
              <p className="font-display text-lg uppercase tracking-wide text-paper">
                Download Complete Inventory Plan — {city.name}
              </p>
              <p className="mt-0.5 text-sm text-slate">
                Full PDF with site photos, exact dimensions, locations and current availability. Sent via WhatsApp within 2 hours.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="shrink-0 rounded-[2px] border border-blue bg-blue/10 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-blue transition-all hover:bg-blue hover:text-white"
          >
            📥 Request PDF Plan
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════
          2 — MARKET OVERVIEW
      ════════════════════════════════════════ */}
      <section className="border-x border-ink-line bg-ink-soft py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
            <Reveal>
              <p className="eyebrow mb-5">Market intelligence</p>
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
                Why <span className="text-blue">{city.name}?</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate">{city.overview}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4 pt-2 md:pt-14">
                {city.whyHere.map((reason, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-ink-line bg-ink p-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue/30 font-mono text-xs font-bold text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-slate">{reason}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3 — OOH FORMAT INVENTORY  (improved typography)
      ════════════════════════════════════════ */}
      <section className="border-t border-ink-line bg-ink py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Media inventory</p>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
              Available <span className="text-blue">OOH formats</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
              Every format below is available in {city.name} through our in-house team — no middlemen, no delays.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {city.formats.map((fmt, i) => {
              const cat = CAT_STYLE[fmt.category] ?? CAT_STYLE.static;
              return (
                <motion.div
                  key={fmt.code}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-soft transition-all duration-300 hover:border-blue/40 hover:shadow-[0_8px_36px_rgba(45,120,200,0.14)]"
                >
                  {/* ── Card header ── */}
                  <div className="border-b border-ink-line px-6 pt-6 pb-5">
                    {/* Code + category badge row */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold tracking-[0.22em] text-blue">{fmt.code}</span>
                      <span
                        className="rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em]"
                        style={{ background: cat.bg, color: cat.text }}
                      >
                        {CAT_ICON[fmt.category]} {cat.label}
                      </span>
                    </div>
                    {/* Format name — large & readable */}
                    <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-paper transition-colors duration-300 group-hover:text-blue md:text-3xl">
                      {fmt.name}
                    </h3>
                    {/* USP line */}
                    <p className="mt-2 text-sm leading-relaxed text-slate">{fmt.usp}</p>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-1 flex-col gap-5 p-6">

                    {/* Sizes */}
                    <div>
                      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue/70">
                        Sizes / Formats
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {fmt.sizes.map(s => (
                          <span
                            key={s}
                            className="rounded-[2px] border border-ink-line px-2.5 py-1 font-mono text-xs text-paper/80"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Locations */}
                    <div>
                      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue/70">
                        Key Locations
                      </p>
                      <p className="text-sm leading-relaxed text-slate">{fmt.locations.join(" · ")}</p>
                    </div>

                    {/* Metrics — bigger and cleaner */}
                    <div className="mt-auto grid grid-cols-3 gap-3 rounded-xl border border-ink-line bg-ink p-4">
                      <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate/60">Daily Reach</p>
                        <p className="mt-1 font-mono text-sm font-bold leading-snug text-paper">{fmt.dailyReach}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate/60">Available</p>
                        <p className="mt-1 font-mono text-sm font-bold leading-snug text-blue">{fmt.units}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate/60">Rate / Month</p>
                        <p className="mt-1 font-mono text-xs font-bold leading-snug text-paper/85">{fmt.rateRange}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover bottom blue accent */}
                  <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>

          {/* Inline download CTA */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-blue/20 bg-blue/5 p-7 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <p className="font-display text-xl uppercase tracking-wide text-paper">
                  Want the complete inventory list with site photos?
                </p>
                <p className="mt-1 text-sm text-slate">
                  We&apos;ll send you a PDF with every site, photo, exact dimensions and current availability for {city.name}.
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="shrink-0 rounded-[2px] bg-blue px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:opacity-90"
              >
                📥 Download Inventory Plan
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4 — KEY ADVERTISING CORRIDORS
      ════════════════════════════════════════ */}
      <section className="border-t border-ink-line bg-ink-soft py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Where we activate</p>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
              Key advertising <span className="text-blue">corridors</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
              Prime {city.name} zones where we have active inventory — commercial hubs to highway gantries.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {city.zones.map((zone, i) => {
              const badge = ZONE_BADGE[zone.type] ?? ZONE_BADGE.mixed;
              return (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.07 }}
                  className="group rounded-xl border border-ink-line bg-ink p-5 transition-all duration-300 hover:border-blue/25 hover:bg-ink-soft"
                >
                  <span
                    className="mb-3 inline-block rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.12em]"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {badge.label}
                  </span>
                  <h3 className="font-display text-xl uppercase leading-tight tracking-wide transition-colors duration-300 group-hover:text-blue">
                    {zone.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{zone.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {zone.bestFormats.map(f => (
                      <span key={f} className="rounded-[2px] border border-blue/25 px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-blue">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5 — PAST CAMPAIGNS GALLERY
      ════════════════════════════════════════ */}
      <section className="border-t border-ink-line bg-ink py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Our work</p>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
              Campaigns in <span className="text-blue">{city.name}</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
              Brands that trusted Time Square Media to own {city.name}&apos;s streets.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {city.campaigns.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.07 }}
                className="group relative overflow-hidden rounded-2xl"
                style={{ minHeight: "190px" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${c.accent}dd 0%, ${c.accent}88 55%, #090910 100%)` }}
                />
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.08) 0px,rgba(255,255,255,0.08) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.08) 0px,rgba(255,255,255,0.08) 1px,transparent 1px,transparent 32px)",
                  }}
                />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">{c.year} · {city.name}</p>
                    <h3 className="mt-2 font-display text-2xl uppercase leading-tight tracking-wide text-white md:text-3xl">{c.brand}</h3>
                  </div>
                  <div className="mt-4">
                    <span className="rounded-[2px] bg-white/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-white/85 backdrop-blur-sm">{c.format}</span>
                    <p className="mt-2 font-mono text-xs text-white/55">{c.area}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 flex justify-center">
              <Link href="/work" className="font-mono text-xs uppercase tracking-[0.2em] text-blue transition-colors hover:text-blue-light">
                View all campaigns →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6 — CUSTOM PLAN · PAN INDIA  (NEW)
      ════════════════════════════════════════ */}
      <section className="border-t border-ink-line bg-ink-soft py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">

            {/* Left — copy + city chips */}
            <Reveal>
              <p className="eyebrow mb-5">Beyond {city.name}</p>
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
                Custom plan for<br />
                <span className="text-blue">Pan India.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Planning a national campaign beyond our six core cities? We work with trusted OOH partners across <strong className="text-paper">100+ Indian cities</strong> to execute multi-city campaigns — single point of contact, unified brand execution, one consolidated report.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Single agency — one brief, one bill, one report for all cities",
                  "Pan-India site network across metros, Tier 1 and Tier 2 cities",
                  "Simultaneous launch in multiple cities for national campaign impact",
                  "Quality checks, photo confirmation and unified delivery timelines",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue/40 font-mono text-[0.52rem] text-blue">{i + 1}</span>
                    <span className="text-sm leading-relaxed text-slate">{pt}</span>
                  </li>
                ))}
              </ul>

              {/* City chips */}
              <div className="mt-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-slate">We can plan your campaign in:</p>
                <div className="flex flex-wrap gap-2">
                  {PAN_INDIA_CITIES.map(c => (
                    <span
                      key={c}
                      className="rounded-[2px] border border-ink-line px-3 py-1 font-mono text-xs text-slate transition-colors hover:border-blue/30 hover:text-blue"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="rounded-[2px] border border-blue/30 px-3 py-1 font-mono text-xs text-blue">
                    + 70 more cities
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-ink-line bg-ink p-7">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.18em] text-blue">Pan India OOH</p>
                <h3 className="mb-5 font-display text-2xl uppercase tracking-wide">Request a multi-city plan</h3>
                <QuoteForm city={city.name + " + other cities"} panIndia />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7 — GET A MEDIA PLAN (city specific)
      ════════════════════════════════════════ */}
      <section className="border-t border-ink-line bg-ink py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_440px]">

            {/* Left — office info */}
            <div>
              <Reveal>
                <p className="eyebrow mb-5">Get a media plan</p>
                <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
                  Let&apos;s plan your<br />
                  <span className="text-blue">{city.name} campaign.</span>
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-slate">
                  Tell us your brand, budget and objectives — we&apos;ll send you a custom OOH media plan with site photos, costs and reach estimates within 24 hours.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 rounded-2xl border border-ink-line bg-ink-soft p-6">
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-blue">{city.name} Office</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 font-mono text-xs text-blue">▸</span>
                      <div>
                        <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] text-paper">{city.office.person}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate">{city.office.address}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${city.office.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 font-mono text-sm text-blue transition-colors hover:text-blue-light"
                    >
                      <span>☎</span>{city.office.phone}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-6">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-slate">Also active in</p>
                  <div className="flex flex-wrap gap-2">
                    {["Lucknow", "Kanpur", "Delhi", "Bhopal", "Agra", "Prayagraj"]
                      .filter(c => c.toLowerCase() !== city.slug)
                      .map(c => (
                        <Link
                          key={c}
                          href={`/presence/${c.toLowerCase()}`}
                          className="rounded-[2px] border border-ink-line px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-slate transition-all hover:border-blue hover:text-blue"
                        >
                          {c}
                        </Link>
                      ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — city form */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-ink-line bg-ink-soft p-7">
                <h3 className="mb-6 font-display text-2xl uppercase tracking-wide">Request a plan</h3>
                <QuoteForm city={city.name} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8 — CTA BANNER
      ════════════════════════════════════════ */}
      <section className="border-t border-ink-line bg-blue py-16 text-center">
        <div className="shell">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/60">
            Ready to advertise in {city.name}?
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,6vw,4rem)] uppercase leading-tight text-white">
            Own the streets of {city.name}.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-[2px] bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue transition-all hover:bg-blue-light hover:text-white"
            >
              Start a Campaign →
            </Link>
            <button
              onClick={handleDownload}
              className="rounded-[2px] border border-white/40 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:border-white hover:bg-white/10"
            >
              📥 Download Inventory Plan
            </button>
            <Link
              href="/presence"
              className="rounded-[2px] border border-white/30 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:border-white hover:bg-white/10"
            >
              ← All Cities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
