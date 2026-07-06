"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, SERVICES, CITIES, COMPANY } from "@/lib/data";
import Image from "next/image";

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
          className={`block font-sans text-[0.82rem] font-bold tracking-[0.01em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full ${
            active ? "text-blue" : "text-ink/65"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 block translate-y-full font-sans text-[0.82rem] font-bold tracking-[0.01em] text-blue transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
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

/* ── Presence dropdown cities ────────────────────────────────── */
const PRESENCE_CITIES = [
  { label: "Delhi",    href: "/presence/delhi",   code: "DEL", accent: "#C0392B" },
  { label: "Lucknow",  href: "/presence/lucknow", code: "LKO", accent: "#2D78C8" },
  { label: "Kanpur",   href: "/presence/kanpur",  code: "KNP", accent: "#E67E22" },
  { label: "Bhopal",   href: "/presence/bhopal",  code: "BHO", accent: "#16A085" },
  { label: "Agra",     href: "/presence/agra",    code: "AGR", accent: "#8E44AD" },
];

function PresenceMenu({ pathname, dark = false }: { pathname: string; dark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const isActive = pathname.startsWith("/presence");

  const show = () => { clearTimeout(closeTimer.current); setMenuOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setMenuOpen(false), 160); };

  return (
    <div className="relative flex items-center gap-1" onMouseEnter={show} onMouseLeave={hide}>
      {/* Clicking the label navigates directly to /presence */}
      <Link href="/presence" className="group relative inline-block">
        <span className="relative block overflow-hidden leading-none py-0.5">
          <span
            className={`block font-sans text-[0.82rem] font-bold tracking-[0.01em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full ${
              isActive ? (dark ? "text-white" : "text-blue") : (dark ? "text-white/80" : "text-ink/65")
            }`}
          >
            Presence
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 block translate-y-full font-sans text-[0.82rem] font-bold tracking-[0.01em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 ${dark ? "text-white" : "text-blue"}`}
          >
            Presence
          </span>
        </span>
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-blue transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-blue/40"
          }`}
        />
      </Link>

      {/* Chevron */}
      <svg
        aria-hidden
        className={`pointer-events-none h-2 w-2 shrink-0 transition-all duration-300 ${
          menuOpen
              ? (dark ? "rotate-180 text-white" : "rotate-180 text-blue")
              : isActive
                ? (dark ? "text-white/60" : "text-blue/60")
                : (dark ? "text-white/40" : "text-slate/40")
        }`}
        fill="none"
        viewBox="0 0 10 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M1 1l4 4 4-4" />
      </svg>

      {/* Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0,  scaleY: 1   }}
            exit={{    opacity: 0, y: -8, scaleY: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute left-1/2 top-full z-[60] mt-3 w-52 -translate-x-1/2 overflow-hidden rounded-xl border border-ink-line bg-ink shadow-[0_20px_60px_rgba(0,0,0,0.72)]"
          >
            {/* Header label */}
            <div className="border-b border-ink-line px-4 py-2">
              <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-slate/40">
                Our Presence
              </p>
            </div>

            {/* City rows */}
            {PRESENCE_CITIES.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 hover:bg-ink-soft"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 group-hover:scale-125"
                  style={{ background: city.accent }}
                />
                <span className="font-sans text-[0.84rem] font-semibold text-paper/70 transition-colors duration-150 group-hover:text-paper">
                  {city.label}
                </span>
              </Link>
            ))}

            {/* Custom / Pan India */}
            <div className="border-t border-ink-line">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-blue/10"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                <span className="font-sans text-[0.84rem] font-bold text-blue">
                  Custom / Pan India
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
      {/* ── Transparent full-width navbar — glassmorphism chips ─── */}
      <header className="fixed left-0 right-0 top-0 z-[60] w-full">
        <div className="flex h-[72px] items-center gap-2.5 px-5 md:px-10 lg:px-16">

          {/* ── Logo chip — bright frosted white glass ───────────────── */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(45,120,200,0.3)",
              boxShadow: "0 4px 32px rgba(45,120,200,0.25), 0 1px 0 rgba(255,255,255,1) inset",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
            className={`flex h-16 shrink-0 items-center rounded-2xl px-8 mt-4 transition-all duration-300 hover:shadow-[0_6px_40px_rgba(45,120,200,0.4)] ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Link href="/" aria-label="Home">
              <Image
                src="/Hero Video/Logo.png"
                alt="TimeSquare Media Logo"
                width={130}
                height={22}
              />
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Desktop nav — each link its own glass chip ──────────── */}
          <nav
            className={`hidden items-center gap-2 md:flex ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {NAV.map((item) =>
              item.label === "Presence" ? (
                <div
                  key={item.href}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(45,120,200,0.25)",
                    boxShadow: "0 4px 24px rgba(45,120,200,0.18), inset 0 1px 0 rgba(255,255,255,1)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                  }}
                  className="rounded-full px-4 py-2 transition-all duration-200 hover:shadow-[0_6px_32px_rgba(45,120,200,0.35)]"
                >
                  <PresenceMenu pathname={pathname} />
                </div>
              ) : (
                <div
                  key={item.href}
                  style={{
                    background: pathname === item.href
                      ? "linear-gradient(135deg, #2D78C8 0%, #1a4a8a 100%)"
                      : "#ffffff",
                    border: pathname === item.href
                      ? "1px solid rgba(93,163,232,0.7)"
                      : "1px solid rgba(45,120,200,0.25)",
                    boxShadow: pathname === item.href
                      ? "0 4px 28px rgba(45,120,200,0.55), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : "0 4px 24px rgba(45,120,200,0.18), inset 0 1px 0 rgba(255,255,255,1)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                  }}
                  className="rounded-full px-4 py-2 transition-all duration-200 hover:shadow-[0_6px_32px_rgba(45,120,200,0.35)]"
                >
                  <Link
                    href={item.href}
                    className={`font-sans text-[0.82rem] font-bold tracking-[0.01em] transition-colors duration-200 ${
                      pathname === item.href ? "text-white" : "text-[#1e3a5f] hover:text-blue"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}
          </nav>

          {/* ── Phone chip — blue glow glass ───────────────────────── */}
          <a
            href={`tel:${COMPANY.phone}`}
            aria-label={`Call us at ${COMPANY.phone}`}
            style={{
              background: "rgba(45,120,200,0.32)",
              border: "1px solid rgba(93,163,232,0.65)",
              boxShadow: "0 4px 32px rgba(45,120,200,0.42), inset 0 1px 0 rgba(255,255,255,0.18)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
            className={`ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:shadow-[0_6px_40px_rgba(45,120,200,0.65)] ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <PhoneIcon className="h-[15px] w-[15px] text-white" />
          </a>

          {/* ── Hamburger chip — dark glass / blue when open ────────── */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{
              background: open
                ? "linear-gradient(135deg, #2D78C8 0%, #1a4a8a 100%)"
                : "rgba(6,12,36,0.72)",
              border: open
                ? "1px solid rgba(93,163,232,0.75)"
                : "1px solid rgba(45,120,200,0.48)",
              boxShadow: open
                ? "0 4px 32px rgba(45,120,200,0.65), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "0 4px 24px rgba(45,120,200,0.22), inset 0 1px 0 rgba(255,255,255,0.07)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 hover:shadow-[0_6px_40px_rgba(45,120,200,0.5)]"
          >
            <span className="relative flex h-[13px] w-[18px] flex-col justify-between">
              <span
                className={`block h-[1.5px] w-full origin-center rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-[5.75px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] rounded-full bg-white transition-all duration-300 ${
                  open ? "w-0 opacity-0" : "w-full opacity-100"
                }`}
              />
              <span
                className={`block h-[1.5px] w-full origin-center rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "-translate-y-[5.75px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

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
            <div className="h-[72px] flex-none" />

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

              {/* ── DETAILS: Services + Offices + Contact — SOLID WHITE PANEL ── */}
              <div
                className="flex min-h-0 flex-col justify-between px-6 py-3 md:px-12 md:py-8"
                style={{ background: "#FFFFFF" }}
              >

                {/* ── Services ── */}
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44, duration: 0.5 }}
                >
                  <p
                    className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.28em]"
                    style={{ color: "#2D78C8" }}
                  >
                    What We Offer
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    {SERVICES.map((s, i) => (
                      <motion.div
                        key={s.code}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.04 }}
                      >
                        <Link
                          href="/services"
                          className="group flex items-center gap-2"
                        >
                          <span
                            className="rounded px-1.5 py-0.5 font-mono text-[0.52rem] font-bold tracking-wider transition-all duration-200 group-hover:text-white"
                            style={{
                              color: "#2D78C8",
                              background: "rgba(45,120,200,0.12)",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "#2D78C8";
                              (e.currentTarget as HTMLElement).style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "rgba(45,120,200,0.12)";
                              (e.currentTarget as HTMLElement).style.color = "#2D78C8";
                            }}
                          >
                            {s.code}
                          </span>
                          <span
                            className="text-[0.8rem] font-medium transition-colors duration-200"
                            style={{ color: "#1a1a2e" }}
                          >
                            {s.title}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* ── All Offices ── */}
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  style={{ borderTop: "1px solid #e3eaf5", paddingTop: "12px" }}
                >
                  <p
                    className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.28em]"
                    style={{ color: "#2D78C8" }}
                  >
                    Our Offices
                  </p>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {CITIES.map((city) => (
                      <div
                        key={city.city}
                        className="rounded-lg p-2.5"
                        style={{ background: "#f0f5ff", border: "1px solid #d0e0f5" }}
                      >
                        <p
                          className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em]"
                          style={{ color: "#2D78C8" }}
                        >
                          {city.city}
                        </p>
                        {city.phone ? (
                          <a
                            href={`tel:${city.phone}`}
                            className="mt-1 block font-mono text-[0.64rem] leading-snug transition-colors hover:text-blue"
                            style={{ color: "#3a3a5c" }}
                          >
                            {city.phone}
                          </a>
                        ) : (
                          <p
                            className="mt-1 font-mono text-[0.6rem]"
                            style={{ color: "#888898" }}
                          >
                            Regional
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* ── Contact + CTA ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.74, duration: 0.45 }}
                  className="flex items-center justify-between gap-4 pt-3"
                  style={{ borderTop: "1px solid #e3eaf5" }}
                >
                  <div className="flex flex-col gap-1.5">
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="font-mono text-[0.65rem] font-medium transition-colors hover:text-blue md:text-xs"
                      style={{ color: "#3a3a5c" }}
                    >
                      {COMPANY.phone}
                    </a>
                    <a
                      href={`tel:${COMPANY.phone2}`}
                      className="font-mono text-[0.65rem] font-medium transition-colors hover:text-blue md:text-xs"
                      style={{ color: "#3a3a5c" }}
                    >
                      {COMPANY.phone2}
                    </a>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-mono text-[0.65rem] font-medium transition-colors hover:text-blue md:text-xs"
                      style={{ color: "#3a3a5c" }}
                    >
                      {COMPANY.email}
                    </a>
                  </div>

                  <Link
                    href="/contact"
                    className="shrink-0 rounded-sm px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 md:px-6 md:py-3 md:text-xs"
                    style={{
                      background: "#2D78C8",
                      boxShadow: "0 4px 14px rgba(45,120,200,0.35)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "#5BA3E8")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "#2D78C8")
                    }
                  >
                    Get in touch →
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
