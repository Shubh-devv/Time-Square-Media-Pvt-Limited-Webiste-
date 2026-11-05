"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Diwali splash on every full page load (fireworks → diyas → fades into the site),
// then candles under the header and a row of diyas along the bottom stay on screen.
const DIYA_AT = 1500; // ms — diyas + greeting appear
const FADE_AT = 4400; // ms — overlay starts fading out
const COLORS = ["#FFB02E", "#FFD166", "#FF7A18", "#FF4D6D", "#5BA3E8", "#FFFFFF"];

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
type Rocket = { x: number; y: number; vy: number; targetY: number; color: string };

export default function DiwaliIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [showDiyas, setShowDiyas] = useState(false);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setVisible(true);
    const t1 = setTimeout(() => setShowDiyas(true), DIYA_AT);
    const t2 = setTimeout(() => setVisible(false), FADE_AT);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Lock page scroll while the intro is on screen
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  // Fireworks canvas
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)];
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const launch = () => {
      rockets.push({
        x: W() * (0.12 + Math.random() * 0.76),
        y: H(),
        vy: -(9 + Math.random() * 4),
        targetY: H() * (0.12 + Math.random() * 0.3),
        color: pick(),
      });
    };

    const burst = (x: number, y: number, color: string) => {
      const count = 70 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 4.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: Math.random() < 0.25 ? pick() : color,
        });
      }
    };

    const start = performance.now();
    let lastLaunch = 0;
    let raf = 0;

    const frame = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 3400 && now - lastLaunch > 260) {
        launch();
        if (Math.random() < 0.4) launch();
        lastLaunch = now;
      }

      // Trail effect: paint a translucent night sky over the previous frame
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(9, 9, 16, 0.22)";
      ctx.fillRect(0, 0, W(), H());
      ctx.globalCompositeOperation = "lighter";

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.985;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.targetY || r.vy > -2) {
          burst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy = p.vy * 0.97 + 0.06;
        p.life -= 0.013;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <style>{`
        @keyframes tsm-flicker {
          0%, 100% { transform: translateX(-50%) scale(1, 1) rotate(-2deg); opacity: 1; }
          25% { transform: translateX(-50%) scale(0.92, 1.08) rotate(2deg); opacity: 0.9; }
          50% { transform: translateX(-50%) scale(1.05, 0.95) rotate(-1deg); opacity: 1; }
          75% { transform: translateX(-50%) scale(0.96, 1.1) rotate(1deg); opacity: 0.85; }
        }
      `}</style>

      <AnimatePresence onExitComplete={() => setDone(true)}>
        {visible && (
          <motion.div
            key="diwali-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-end overflow-hidden"
            style={{ background: "radial-gradient(ellipse at bottom, #1a1030 0%, #090910 70%)" }}
            aria-label="Happy Diwali"
            role="dialog"
          >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/25 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white/70 transition hover:border-white/60 hover:text-white"
            >
              Skip
            </button>

            <AnimatePresence>
              {showDiyas && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="relative z-10 mb-[12vh] flex flex-col items-center px-4 text-center"
                >
                  <h2
                    className="font-display text-5xl uppercase tracking-wide sm:text-7xl"
                    style={{
                      color: "#FFD166",
                      textShadow: "0 0 18px rgba(255,176,46,0.8), 0 0 42px rgba(255,122,24,0.5)",
                    }}
                  >
                    Happy Diwali
                  </h2>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                    Time Square Media wishes you light &amp; prosperity
                  </p>

                  <div className="mt-10 flex items-end gap-5 sm:gap-10">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: i === 2 ? 1.25 : 1 }}
                        transition={{ delay: 0.15 * i, duration: 0.5 }}
                      >
                        <Diya size={68} delay={i * 0.17} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {done && <DiwaliDecor />}
    </>
  );
}

// Stays on the page after the intro: lanterns hanging from the header, diyas along the bottom
function DiwaliDecor() {
  return (
    <div aria-hidden className="pointer-events-none">
      {/* Hanging lanterns — strings start at the top and run behind the header chips */}
      <div className="fixed left-1 top-0 z-30 flex gap-3 md:left-4 md:gap-6">
        <Lantern string={96} size={34} delay={0} />
        <Lantern string={130} size={28} delay={0.8} />
      </div>
      <div className="fixed right-1 top-0 z-30 flex gap-3 md:right-4 md:gap-6">
        <Lantern string={130} size={28} delay={0.4} />
        <Lantern string={96} size={34} delay={1.2} />
      </div>

      {/* Row of diyas along the bottom, centred so it clears the WhatsApp / chat buttons */}
      <div className="fixed bottom-2 left-0 right-0 z-30 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-end gap-3 sm:gap-6"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={i === 0 || i === 4 ? "hidden sm:block" : ""}>
              <Diya size={i === 2 ? 40 : 32} delay={i * 0.2} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Flame({ width, height, delay }: { width: number; height: number; delay: number }) {
  return (
    <div
      className="absolute left-1/2"
      style={{
        width,
        height,
        top: -height * 0.85,
        borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
        background: "radial-gradient(ellipse at 50% 75%, #FFFFFF 0%, #FFE08A 30%, #FFB02E 60%, #FF6A00 100%)",
        boxShadow: `0 0 ${width * 3}px ${width}px rgba(255,160,40,0.6)`,
        transformOrigin: "50% 100%",
        animation: `tsm-flicker 0.6s ${delay}s ease-in-out infinite`,
      }}
    />
  );
}

function Diya({ size, delay }: { size: number; delay: number }) {
  const bowl = size * 0.5;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          top: -size * 0.3,
          background: "radial-gradient(circle, rgba(255,176,46,0.55) 0%, rgba(255,122,24,0) 70%)",
        }}
      />
      {/* flame sits on the bowl's rim */}
      <div className="absolute left-0 w-full" style={{ bottom: bowl }}>
        <Flame width={size * 0.22} height={size * 0.42} delay={delay} />
      </div>
      {/* clay bowl */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: bowl,
          borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          background: "linear-gradient(180deg, #E0703A 0%, #A8431C 55%, #6E2A10 100%)",
          boxShadow: "inset 0 4px 0 #FFB27A, 0 6px 14px rgba(255,120,40,0.35)",
        }}
      />
      {/* rim dots */}
      <div className="absolute left-1/2 flex -translate-x-1/2" style={{ bottom: bowl * 0.45, gap: size * 0.06 }}>
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="block rounded-full bg-[#FFD166]"
            style={{ width: size * 0.07, height: size * 0.07 }}
          />
        ))}
      </div>
    </div>
  );
}

// Akash kandil — gold-trimmed hanging lantern that sways gently from its string
function Lantern({ string, size, delay }: { string: number; size: number; delay: number }) {
  const h = size * 2.1;
  const id = `lantern-${size}-${string}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0, rotate: [-4, 4, -4] }}
      transition={{
        opacity: { duration: 0.6, delay: delay * 0.3 },
        y: { duration: 0.9, delay: delay * 0.3, ease: "easeOut" },
        rotate: { duration: 3.6, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className="flex flex-col items-center"
      style={{ transformOrigin: "50% 0%", width: size }}
    >
      {/* string */}
      <div
        className="w-px"
        style={{ height: string, background: "linear-gradient(180deg, rgba(242,193,78,0.2) 0%, #F2C14E 100%)" }}
      />
      <svg
        width={size}
        height={h}
        viewBox="0 0 40 84"
        style={{ filter: "drop-shadow(0 0 10px rgba(255,140,40,0.75)) drop-shadow(0 0 22px rgba(255,90,40,0.35))" }}
      >
        <defs>
          <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B3201A" />
            <stop offset="50%" stopColor="#FF5A2A" />
            <stop offset="100%" stopColor="#B3201A" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="45%" stopColor="#FFC24A" />
            <stop offset="100%" stopColor="#FF7A18" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE08A" />
            <stop offset="100%" stopColor="#B8862A" />
          </linearGradient>
        </defs>

        {/* top cap + ring */}
        <circle cx="20" cy="2.5" r="2" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="1.2" />
        <path d="M14 6 H26 L28 10 H12 Z" fill={`url(#${id}-gold)`} />

        {/* body */}
        <path d="M12 10 H28 L38 26 L38 40 L28 56 H12 L2 40 L2 26 Z" fill={`url(#${id}-body)`} />
        <ellipse cx="20" cy="33" rx="12" ry="16" fill={`url(#${id}-glow)`} opacity="0.95">
          <animate attributeName="opacity" values="0.95;0.7;0.95" dur="1.4s" repeatCount="indefinite" />
        </ellipse>

        {/* gold frame */}
        <path
          d="M12 10 H28 L38 26 L38 40 L28 56 H12 L2 40 L2 26 Z M2 26 H38 M2 40 H38 M12 10 L20 26 L28 10 M12 56 L20 40 L28 56"
          fill="none"
          stroke={`url(#${id}-gold)`}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="33" r="2.2" fill="#FFE08A" />

        {/* bottom cap */}
        <path d="M12 56 H28 L25 61 H15 Z" fill={`url(#${id}-gold)`} />

        {/* tassels */}
        {[-8, -4, 0, 4, 8].map((dx, i) => (
          <g key={dx}>
            <line
              x1={20 + dx * 0.4}
              y1="61"
              x2={20 + dx}
              y2={i === 2 ? 82 : 76}
              stroke={`url(#${id}-gold)`}
              strokeWidth="0.9"
            />
            <circle cx={20 + dx} cy={i === 2 ? 82 : 76} r="1.2" fill="#FFD166" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
