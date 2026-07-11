"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Pages that scatter when the animation fires */
const PAGES = [
  { rotate: -22, x: -380, y: -170, delay: 0.00 },
  { rotate:  14, x:  340, y: -130, delay: 0.10 },
  { rotate:  -7, x: -260, y:  210, delay: 0.17 },
  { rotate:  28, x:  300, y:  185, delay: 0.23 },
  { rotate: -32, x: -160, y:   50, delay: 0.06 },
  { rotate:  18, x:  120, y:  250, delay: 0.19 },
  { rotate: -14, x:  380, y:   30, delay: 0.13 },
];

function PageLines() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "22px 18px 18px" }}>
      <div style={{ width: 56, height: 3, background: "rgba(45,120,200,0.4)", borderRadius: 2, marginBottom: 4 }} />
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{ height: 1.5, borderRadius: 1, width: i % 4 === 3 ? "65%" : "100%", background: i % 3 === 0 ? "rgba(45,120,200,0.18)" : "rgba(0,0,0,0.07)" }} />
      ))}
    </div>
  );
}

export default function ClassicSite() {
  const [visible, setVisible]       = useState(false);
  const [animating, setAnimating]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Slide in after page load */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  /* Hide when service drawer or hamburger menu is open */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDrawerOpen(
        document.body.classList.contains("drawer-open") ||
        document.body.classList.contains("menu-open")
      );
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const trigger = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => window.open("https://classic.timesquaremedia.in/", "_blank"), 2000);
    setTimeout(() => setAnimating(false), 2900);
  };

  return (
    <>
      {/* ── Floating button — hidden when service drawer is open ── */}
      <AnimatePresence>
        {visible && !drawerOpen && (
          <motion.button
            onClick={trigger}
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0 }}
            whileHover={{ scale: 1.06, x: 4 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Visit Classic Website"
            className="fixed left-6 z-50 flex items-center gap-2.5 rounded-xl px-4 py-2.5"
            style={{
              bottom: "32px",
              background: "rgba(11,22,40,0.92)",
              border: "1px solid rgba(45,120,200,0.45)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.35), 0 0 0 0 rgba(45,120,200,0)",
              cursor: "pointer",
            }}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
            </span>

            {/* Book icon */}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#5BA3E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>

            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-blue-light whitespace-nowrap">
              Classic Site
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Full-screen book animation overlay ── */}
      <AnimatePresence>
        {animating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55 } }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] overflow-hidden"
            style={{ background: "rgba(11,22,40,0.97)" }}
          >
            {/* Flying pages */}
            {PAGES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.45, opacity: 0 }}
                animate={{
                  x: p.x, y: p.y, rotate: p.rotate,
                  scale: [0.45, 1.15, 1.05],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.9, delay: p.delay,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { times: [0, 0.12, 0.72, 1], duration: 1.9 },
                }}
                style={{
                  position: "absolute", left: "50%", top: "50%",
                  marginLeft: -75, marginTop: -105,
                  width: 150, height: 210, borderRadius: 3,
                  background: "linear-gradient(160deg,#ffffff 0%,#eaf0ff 100%)",
                  boxShadow: "3px 6px 28px rgba(0,0,0,0.45), inset -2px 0 0 rgba(45,120,200,0.12)",
                }}
              >
                <PageLines />
              </motion.div>
            ))}

            {/* Centre text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -18 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.28, type: "spring", stiffness: 260, damping: 18 }}
                style={{ marginBottom: 24 }}
              >
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
                  stroke="#2D78C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.55 }}
                className="font-display text-[clamp(2rem,8vw,5rem)] uppercase leading-none tracking-widest text-white"
              >
                Time Square
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62, duration: 0.45 }}
                className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.38em] text-blue-light"
              >
                Opening Classic Site…
              </motion.p>

              <motion.div className="mt-8 h-px w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.48, duration: 1.8, ease: "linear" }}
                  className="h-full rounded-full bg-blue"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
