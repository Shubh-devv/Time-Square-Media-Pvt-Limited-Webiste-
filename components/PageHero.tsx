"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "/clients/campaign/Back%204.jpg",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-ink-line">
      {/* Blurred background image */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "blur(7px)",
          transform: "scale(1.1)",
        }}
      />
      {/* Dark navy overlay */}
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(11,22,40,0.72)" }} />

      {/* Blue ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] animate-glow rounded-full md:-left-48 md:h-[36rem] md:w-[36rem]"
        style={{ background: "radial-gradient(circle, rgba(45,120,200,0.18), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[18rem] w-[18rem] rounded-full md:h-[24rem] md:w-[24rem]"
        style={{ background: "radial-gradient(circle, rgba(45,120,200,0.08), transparent 65%)" }}
      />

      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content — padded to clear navbar on all screen sizes */}
      <div className="shell relative z-10 pb-16 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-5 sm:mb-8"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[clamp(2rem,8vw,7.5rem)] leading-[0.93]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-paper/70 sm:mt-7 sm:max-w-2xl sm:text-base md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Bottom accent line */}
        <motion.div
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-16 origin-left bg-blue sm:mt-14 sm:w-20"
        />
      </div>
    </section>
  );
}
