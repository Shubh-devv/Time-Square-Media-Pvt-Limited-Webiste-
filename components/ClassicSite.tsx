"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Each page: final resting position + rotation after flying off */
const PAGES = [
  { rotate: -22, x: -380, y: -170, delay: 0.00 },
  { rotate:  14, x:  340, y: -130, delay: 0.10 },
  { rotate:  -7, x: -260, y:  210, delay: 0.17 },
  { rotate:  28, x:  300, y:  185, delay: 0.23 },
  { rotate: -32, x: -160, y:   50, delay: 0.06 },
  { rotate:  18, x:  120, y:  250, delay: 0.19 },
  { rotate: -14, x:  380, y:   30, delay: 0.13 },
];

/* Ruled lines inside each page */
function PageLines() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "22px 18px 18px" }}>
      <div style={{ width: 60, height: 3, background: "rgba(45,120,200,0.35)", borderRadius: 2, marginBottom: 6 }} />
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{ height: 1.5, background: i % 3 === 0 ? "rgba(45,120,200,0.18)" : "rgba(0,0,0,0.08)", borderRadius: 1, width: i % 4 === 3 ? "70%" : "100%" }} />
      ))}
    </div>
  );
}

export default function ClassicSite() {
  const [active, setActive] = useState(false);

  const trigger = () => {
    if (active) return;
    setActive(true);
    /* Open old site after pages have flown */
    setTimeout(() => {
      window.open("https://timesquaremedia.in/old/", "_blank");
    }, 2000);
    /* Close overlay after transition finishes */
    setTimeout(() => setActive(false), 2900);
  };

  return (
    <>
      {/* Trigger button — lives in the footer */}
      <button
        onClick={trigger}
        className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] transition-all duration-300 hover:text-blue"
        style={{ color: "#5a7a9a" }}
      >
        {/* Book icon */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-rotate-6"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        Classic Website
      </button>

      {/* Full-screen book animation overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] overflow-hidden"
            style={{ background: "rgba(11,22,40,0.97)" }}
          >
            {/* Flying pages */}
            {PAGES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.5, opacity: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  rotate: p.rotate,
                  scale: [0.5, 1.15, 1.05],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.9,
                  delay: p.delay,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { times: [0, 0.15, 0.7, 1], duration: 1.9 },
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: -75,
                  marginTop: -105,
                  width: 150,
                  height: 210,
                  borderRadius: 3,
                  background: "linear-gradient(160deg,#ffffff 0%,#eaf0ff 100%)",
                  boxShadow: "3px 6px 28px rgba(0,0,0,0.45), inset -2px 0 0 rgba(45,120,200,0.12)",
                }}
              >
                <PageLines />
              </motion.div>
            ))}

            {/* Centre content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

              {/* Animated book icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 18 }}
                style={{ marginBottom: 28 }}
              >
                <svg
                  width="56" height="56" viewBox="0 0 24 24" fill="none"
                  stroke="#2D78C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="font-display text-[clamp(2.2rem,8vw,5rem)] uppercase leading-none tracking-widest text-white"
              >
                Time Square
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.38em] text-blue-light"
              >
                Opening Classic Site…
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="mt-8 h-px w-48 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1.8, ease: "linear" }}
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
