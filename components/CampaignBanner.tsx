"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const CAMPAIGNS = [
  "/clients/campaign/WhatsApp Image 2026-05-25 at 15.56.17 (1).jpeg",
  "/clients/campaign/WhatsApp Image 2026-05-25 at 15.56.17.jpeg",
  "/clients/campaign/WhatsApp Image 2026-05-25 at 15.56.18.jpeg",
  "/clients/campaign/WhatsApp Image 2026-05-25 at 15.56.19 (2).jpeg",
  "/clients/campaign/WhatsApp Image 2026-05-25 at 15.56.20.jpeg",
  "/clients/campaign/WhatsApp Image 2026-06-16 at 14.50.00.jpeg",
  "/clients/campaign/WhatsApp Image 2026-06-16 at 14.50.04.jpeg",
  "/clients/campaign/WhatsApp Image 2026-06-16 at 14.50.05.jpeg",
  "/clients/campaign/WhatsApp-Image-2026-02-24-at-17.48.48-1.jpeg",
  "/clients/campaign/WhatsApp-Image-2026-02-24-at-17.48.48-2.jpeg",
];

/* duplicate for seamless infinite loop */
const LOOP = [...CAMPAIGNS, ...CAMPAIGNS];

export default function CampaignBanner() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="overflow-hidden border-t border-ink-line py-14 md:py-18">
      {/* Section label */}
      <div className="shell mb-10">
        <p className="eyebrow">Live campaigns</p>
        <h2 className="display mt-3 text-[clamp(1.6rem,4vw,2.8rem)]">
          Our work, <span className="text-blue">on the ground.</span>
        </h2>
      </div>

      {/* Scrolling strip */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-ink to-transparent" />

        <motion.div
          className="flex items-end gap-4 px-4"
          animate={paused ? {} : { x: ["0%", "-50%"] }}
          transition={{
            duration: 36,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ width: "max-content" }}
        >
          {LOOP.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              /* 4:5 portrait frame — fixed width, height = width × 5/4 */
              className="group relative shrink-0 overflow-hidden rounded-2xl border border-ink-line"
              style={{ width: 220, height: 275 }}
            >
              <Image
                src={src}
                alt={`Campaign ${(i % CAMPAIGNS.length) + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="220px"
              />
              {/* subtle dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* campaign number badge */}
              <div className="absolute bottom-3 left-3 rounded-md bg-blue/80 px-2 py-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white">
                  Campaign {(i % CAMPAIGNS.length) + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
