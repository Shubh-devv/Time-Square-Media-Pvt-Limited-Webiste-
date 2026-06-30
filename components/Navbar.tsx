"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, SERVICES, CITIES, COMPANY } from "@/lib/data";
import Logo from "@/components/Logo";

/* ── Roll-text link (desktop nav) ───────────────────────────── */
function RollLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link href={href} className="group relative inline-block">
      <span className="relative block overflow-hidden leading-none py-0.5">
        <span
          className={`block font-mono text-[0.68rem] uppercase tracking-[0.22em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full ${
            active ? "text-blue" : "text-slate"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 block translate-y-full font-mono text-[0.68rem] uppercase tracking-[0.22em] text-blue transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        >
          {label}
        </span>
      </span>
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-blue transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full group-hover:bg-blue/40"
        }`}
      />
    </Link>
  );
}

/* ── Phone icon SVG ─────────────────────────────────────────── */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.49 13.88a19.79 19.79 0 01-3.07-8.67A2 2 0 013.4 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 10.5a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

const ALL_NAV = [...NAV, { label: "Contact", href: "/contact" }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-ink-line bg-ink/95 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">

          {/* ── Logo ──────────────────────────────────────────── */}
          <Logo imageClassName="h-9 w-auto md:h-11" />

          {/* ── Right controls ──────────────────────────────────── */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Desktop roll-links — fade out when menu is open */}
            <nav
              className={`hidden items-center gap-7 transition-opacity duration-300 md:flex ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {NAV.map((item) => (
                <RollLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </nav>

            {/* ── Call Us button ─────────────────────────────────── */}
            <a
              href={`tel:${COMPANY.phone}`}
              className={`group flex items-center gap-1.5 border border-blue/20 px-2.5 py-2 transition-all duration-300 hover:border-blue hover:bg-blue/5 hover:text-blue md:gap-2 md:px-3.5 md:py-2.5 ${
                open ? "pointer-events-none opacity-0" : "text-slate"
              }`}
              aria-label={`Call us at ${COMPANY.phone}`}
            >
              {/* Subtle pulse ring */}
              <span className="relative flex h-4 w-4 items-center justify-center md:h-[18px] md:w-[18px]">
                <span className="absolute inset-0 animate-ping rounded-full bg-blue/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <PhoneIcon className="relative h-3.5 w-3.5 md:h-4 md:w-4" />
              </span>
              <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] md:inline">
                Call Us
              </span>
            </a>

            {/* ── Hamburger — all screen sizes ──────────────────── */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="group relative flex h-10 w-10 items-center justify-center"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {/* Hover / active ring */}
              <span
                className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                  open
                    ? "scale-110 border-blue/40"
                    : "scale-100 border-transparent group-hover:scale-110 group-hover:border-blue/30"
                }`}
              />

              {/* Three lines → X */}
              <span className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "translate-y-[9px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] rounded-full bg-paper transition-all duration-300 ${
                    open ? "w-0 opacity-0" : "w-full opacity-100"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "-translate-y-[9px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen menu — NO SCROLL, single viewport ───────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-ink"
          >
            {/* Matches header height */}
            <div className="h-16 flex-none md:h-20" />

            {/*
              Mobile  → grid-rows [3fr nav | 2fr details]  (stacked, no scroll)
              Desktop → grid-cols [48% nav | 52% details]  (side-by-side)
            */}
            <div className="min-h-0 flex-1 grid grid-rows-[3fr_2fr] md:grid-cols-[48%_52%] md:grid-rows-none">

              {/* ── NAV LINKS ─────────────────────────────────────── */}
              <div className="flex min-h-0 flex-col border-b border-ink-line md:border-b-0 md:border-r">
                <nav className="flex flex-1 flex-col">
                  {ALL_NAV.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -36 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.16 + i * 0.07,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex min-h-0 flex-1"
                    >
                      <Link
                        href={item.href}
                        className={`group relative flex flex-1 items-center overflow-hidden border-b border-ink-line px-6 transition-colors duration-300 md:px-14 ${
                          pathname === item.href
                            ? "text-blue"
                            : "text-paper hover:text-blue"
                        }`}
                      >
                        {/* Hover sweep */}
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-blue/[0.04] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                        />
                        <span className="relative z-10 mr-3 w-5 font-mono text-[0.5rem] tabular-nums text-slate/25 md:mr-6 md:text-[0.58rem]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="relative z-10 font-display text-4xl uppercase leading-none tracking-wide md:text-6xl lg:text-7xl">
                          {item.label}
                        </span>
                        <span className="relative z-10 ml-auto translate-x-0 font-mono text-base text-blue opacity-0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100 md:text-lg">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* ── DETAILS: Services + Offices + Contact ──────────── */}
              <div className="flex min-h-0 flex-col justify-between px-6 py-3 md:px-12 md:py-8">

                {/* Services */}
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44, duration: 0.5 }}
                >
                  <p className="mb-1.5 font-mono text-[0.56rem] uppercase tracking-[0.24em] text-slate/40">
                    Services
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {SERVICES.map((s, i) => (
                      <motion.div
                        key={s.code}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.045 }}
                      >
                        <Link
                          href="/services"
                          className="group flex items-center gap-1.5 transition-colors duration-300"
                        >
                          <span className="font-mono text-[0.58rem] font-semibold text-blue/60 transition-colors duration-300 group-hover:text-blue">
                            {s.code}
                          </span>
                          <span className="text-[0.78rem] text-paper/50 transition-colors duration-300 group-hover:text-paper md:text-sm">
                            {s.title}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* ── All Offices — bigger text for easy reading ─── */}
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="border-t border-ink-line pt-3 md:pt-5"
                >
                  <p className="mb-2.5 font-mono text-[0.56rem] uppercase tracking-[0.24em] text-slate/40">
                    Our Offices
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3 md:gap-y-4">
                    {CITIES.map((city) => (
                      <div key={city.city}>
                        {/* City name — prominently bigger */}
                        <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] text-blue md:text-[0.95rem]">
                          {city.city}
                        </p>
                        {/* Phone number — larger and readable */}
                        {city.phone ? (
                          <a
                            href={`tel:${city.phone}`}
                            className="mt-1 block font-mono text-xs leading-snug text-slate/60 transition-colors hover:text-blue md:text-[0.72rem]"
                          >
                            {city.phone}
                          </a>
                        ) : (
                          <p className="mt-1 font-mono text-[0.65rem] text-slate/30">
                            Regional
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Contact details + CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.74, duration: 0.45 }}
                  className="flex items-center justify-between gap-4 border-t border-ink-line pt-3 md:pt-5"
                >
                  <div className="flex flex-col gap-1">
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="font-mono text-[0.65rem] text-slate transition-colors hover:text-blue md:text-xs"
                    >
                      {COMPANY.phone}
                    </a>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-mono text-[0.65rem] text-slate transition-colors hover:text-blue md:text-xs"
                    >
                      {COMPANY.email}
                    </a>
                  </div>

                  <Link
                    href="/contact"
                    className="group relative shrink-0 overflow-hidden border border-blue px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-blue transition-colors duration-500 hover:text-paper md:px-6 md:py-3 md:text-xs"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-blue transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                    />
                    <span className="relative z-10">Get in touch →</span>
                  </Link>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
