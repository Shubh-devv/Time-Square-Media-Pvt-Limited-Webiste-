"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { WORK } from "@/lib/data";
import Reveal from "./Reveal";

const WORK_IMAGES: Record<string, string> = {
  "BlueStone":             "/clients/Bluestone Long.png",
  "Siggnature":            "/clients/Siggnature Long.png",
  "Dove":                  "/clients/Loreal Long.png",
  "Rudra":                 "/clients/Rudra Long.png",
  "Digiway Net Pvt. Ltd.": "/clients/Digiway Long.png",
  "Tea Valley":            "/clients/Tea Valley Long.png",
  "Pan Bahar":             "/clients/Pan Bahar Long.png",
  "Paras Hospital":        "/clients/Paras Long.png",
};

/* All long images for the scroll strip — brand + optional city */
const STRIP_ITEMS = [
  { name: "BlueStone",      city: "Lucknow",       img: "/clients/Bluestone Lucknow Long.png"          },
  { name: "Dove",           city: "Kanpur",         img: "/clients/Dove Kanpur Long.png"                },
  { name: "Siggnature",     city: "Hyderabad",      img: "/clients/Hydrabad Siggnature long.jpeg"       },
  { name: "Pan Bahar",      city: "",               img: "/clients/Pan Bahar Long.png"                  },
  { name: "Pan Bahar",      city: "Visakhapatnam",  img: "/clients/Pan Bahar Visakhapatnam Long.png"    },
  { name: "Paras Hospital", city: "Kanpur",         img: "/clients/Paras Kanpur Long.png"               },
  { name: "Ratan Jewel",    city: "Kanpur",         img: "/clients/Ratan Jewel Kanpur Long.png"         },
  { name: "Ratan Paloma",   city: "Kanpur",         img: "/clients/Ratan Paloma Kanpur Long.png"        },
  { name: "Rudra",          city: "Kanpur",         img: "/clients/Rudra Kanpur Long.png"               },
  { name: "Siggnature",     city: "",               img: "/clients/Siggnature Long.png"                 },
  { name: "Tea Valley",     city: "Agra",           img: "/clients/Tea Valley Agra Long.png"            },
  { name: "Digiway",        city: "",               img: "/clients/Digiway Long.png"                    },
  { name: "Nestlé",         city: "",               img: "/clients/nestle-long.jpeg"                    },
];

export default function Work({ previewCount }: { previewCount?: number }) {
  const items = previewCount ? WORK.slice(0, previewCount) : WORK;
  const isPreview = !!previewCount;

  return (
    <section id="work" className="border-t border-ink-line py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-6">Selected work</p>
            <h2 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
              Brands we&apos;ve<br />put on the map.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-slate">
              A snapshot of campaigns — from highway hoardings to full brand rollouts.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Full-width auto-scrolling strip ── */}
      <div className="relative mt-14 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent 0%,black 7%,black 93%,transparent 100%)",
          maskImage:        "linear-gradient(90deg,transparent 0%,black 7%,black 93%,transparent 100%)",
        }}
      >
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          {/* Two copies for seamless loop */}
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden rounded-xl"
              style={{ width: 180, height: 252 }}
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover object-center"
                sizes="180px"
              />

              {/* Bottom gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top,rgba(6,6,18,0.88) 0%,rgba(6,6,18,0.2) 48%,transparent 100%)" }}
              />

              {/* Label: city pill if city, brand name if not */}
              <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-3 gap-1">
                {item.city ? (
                  <>
                    <span className="font-sans text-[0.6rem] font-medium text-paper/60 leading-none">
                      {item.name}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 font-sans text-[0.62rem] font-bold text-white"
                      style={{ background: "rgba(45,120,200,0.82)", backdropFilter: "blur(6px)" }}
                    >
                      {item.city}
                    </span>
                  </>
                ) : (
                  <span
                    className="rounded-full px-2.5 py-0.5 font-sans text-[0.62rem] font-bold text-white"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Card grid ── */}
      <div className="shell">
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <Reveal key={w.name} delay={0.04 * i}>
              <article className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-ink-line bg-ink-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(45,120,200,0.22)]">
                {WORK_IMAGES[w.name] && (
                  <Image
                    src={WORK_IMAGES[w.name]}
                    alt={w.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                )}

                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, rgba(6,6,16,0.92) 0%, rgba(6,6,16,0.45) 50%, rgba(6,6,16,0.15) 100%)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(135deg, rgba(45,120,200,0.22) 0%, transparent 60%)" }}
                />
                <div
                  aria-hidden
                  className="absolute right-5 top-5 font-display text-7xl text-paper/10 transition-colors group-hover:text-paper/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 p-6">
                  <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-paper transition-colors group-hover:text-blue md:text-3xl">
                    {w.name}
                  </h3>
                  <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-slate">
                    {w.category}{w.city ? ` · ${w.city}` : ""}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {isPreview && (
          <Reveal delay={0.12}>
            <div className="mt-10 flex justify-end">
              <Link
                href="/work"
                className="font-mono text-xs uppercase tracking-[0.2em] text-blue transition-colors hover:text-blue-light"
              >
                See all work →
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
