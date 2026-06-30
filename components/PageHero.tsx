"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-ink-line pb-20 pt-36 md:pb-28 md:pt-48">
      {/* Blue ambient glows — fixed opacity to standard values */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-0 h-[36rem] w-[36rem] animate-glow rounded-full"
        style={{ background: "radial-gradient(circle, rgba(45,120,200,0.18), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(45,120,200,0.08), transparent 65%)" }}
      />

      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="shell relative z-10">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-8"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[clamp(2.8rem,9vw,8rem)]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
