"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "bot" | "user"; text: string };

const GREETING =
  "Hi! I'm the TSM Assistant. Choose a question below or type your own — I'll answer instantly.";

const QUICK_REPLIES = [
  "What is OOH advertising?",
  "Which cities do you cover?",
  "Pricing & campaign quotes",
  "Digital marketing services",
  "Web solutions we offer",
  "How to get started?",
];

const FAQ: Array<{ q: RegExp; a: string }> = [
  {
    q: /\b(hi|hello|hey|namaste|helo|good)\b/i,
    a: "Hello! Welcome to Time Square Media. How can I help you today? You can ask about our services, pricing, or the cities we operate in.",
  },
  {
    q: /billboard|hoarding|outdoor|ooh|unipole|gantry|led wall/i,
    a: "We offer premium billboard and hoarding advertising across 6 cities — Lucknow, Kanpur, Delhi, Bhopal, Agra and Prayagraj. Formats: hoardings, unipoles, gantries and LED video walls. Want a free site survey? Call +91 95060 17729.",
  },
  {
    q: /digital|social media|seo|google ads|meta|facebook|instagram|influencer/i,
    a: "Our digital marketing team runs Google Ads, Meta Ads, SEO, social media management and influencer campaigns — all integrated with your outdoor campaign for maximum brand impact.",
  },
  {
    q: /web|website|landing page|ecommerce|e-commerce|app|online/i,
    a: "Yes! We build fast, mobile-first websites, landing pages and e-commerce platforms. All SEO-ready, designed to convert visitors into real leads. Simple process explained in plain language — no tech jargon.",
  },
  {
    q: /mobile|auto|bus|canter|van|toto|wrap|vehicle/i,
    a: "Mobile media puts your brand on the move — auto/toto branding, bus wraps, metro train ads and activity vans. Great for reaching areas that fixed hoardings can't cover.",
  },
  {
    q: /btl|activation|event|experiential|on.ground|sampling|promo/i,
    a: "We plan and execute BTL activations — mall events, on-ground promotions, sampling drives and experiential setups that create personal connections between your brand and customers.",
  },
  {
    q: /retail|store|shop|signage|neon|dealer board|in.store/i,
    a: "Our retail consultancy covers in-store branding, neon signs, dealer boards, crystal LEDs and visual merchandising — all fabricated and installed in-house.",
  },
  {
    q: /cost|price|rate|budget|how much|charges|fees|expensive|cheap/i,
    a: "A single hoarding in Lucknow starts from ₹50K/month. Full city-launch campaigns range ₹3L–₹15L. For a tailored quote, use the green WhatsApp button or call +91 95060 17729.",
  },
  {
    q: /city|cities|lucknow|kanpur|delhi|bhopal|agra|prayagraj|allahabad|location/i,
    a: "We operate in 6 cities: Lucknow (Narjis, +91 95060 17729), Kanpur (Khushi, +91 83539 72277), Delhi (Akshay, +91 98387 98388), Bhopal (Syed, +91 81759 88988), Agra (Shubhashish, +91 99979 27300) and Prayagraj.",
  },
  {
    q: /contact|call|phone|number|email|reach|whatsapp|meet/i,
    a: "Call us at +91 95060 17729 (Lucknow) or email info@timesquaremedia.in. Or hit the green WhatsApp button at the bottom-right for a quick quote!",
  },
  {
    q: /years|since|founded|established|experience|history|old/i,
    a: "Time Square Media was founded in 2012 — over 12 years of advertising experience. We've worked with Nestlé, HDFC Bank, Vaseline, BlueStone, Tea Valley, Pan Bahar and many more.",
  },
  {
    q: /fabricat|print|install|produc|manufacture|in.house/i,
    a: "Yes — we have our own in-house fabrication unit. This means faster turnaround, better quality control and lower costs compared to agencies that outsource printing and installation.",
  },
  {
    q: /service|offer|do|work|specializ/i,
    a: "We offer 7 services: OOH Brand Building, Mobile Media, Digital Marketing, On/In Media, BTL Activations, Retail Consultancy and Web Solutions — all executed in-house, end-to-end.",
  },
  {
    q: /started|begin|start|first step|how to|get in touch|approach|quote/i,
    a: "Getting started is simple! (1) Tell us your city & campaign goal. (2) We shortlist sites & formats. (3) We share a custom proposal within 24 hours. Call +91 95060 17729 or tap the green WhatsApp button — our team responds fast.",
  },
];

function getResponse(input: string): string {
  for (const { q, a } of FAQ) {
    if (q.test(input)) return a;
  }
  return "That's a great question! For details, call +91 95060 17729 or use the green WhatsApp button. I'm best at answering questions about our OOH advertising, digital marketing, web solutions, pricing and city presence.";
}

export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState<Msg[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [quickDone, setQuickDone] = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setQuickDone(true);
    setMsgs(prev => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { role: "bot", text: getResponse(msg) }]);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Chat FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(v => !v)}
        aria-label="Open chat assistant"
        className="fixed z-50 flex items-center justify-center rounded-full border-0"
        style={{
          bottom: "5.5rem",
          right: "1.5rem",
          width: 52,
          height: 52,
          background: "#2D78C8",
          boxShadow: "0 4px 20px rgba(45,120,200,0.45)",
          cursor: "pointer",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: "9.5rem",
              right: "1.5rem",
              zIndex: 60,
              width: 320,
              maxHeight: "68vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0F0F1A",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(45,120,200,0.1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(45,120,200,0.09)",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2D78C8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0f8", fontFamily: "var(--font-grotesk)" }}>
                  TSM Assistant
                </div>
                <div style={{ fontSize: 11, color: "#22c55e", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 5px #22c55e" }} />
                  Online · OOH · Digital · Web
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Quick reply chips — shown until user picks one */}
              {!quickDone && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      style={{
                        padding: "6px 11px",
                        borderRadius: 20,
                        border: "1px solid rgba(45,120,200,0.35)",
                        background: "rgba(45,120,200,0.07)",
                        color: "#5BA3E8",
                        fontSize: 11.5,
                        fontFamily: "var(--font-mono)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        letterSpacing: "0.02em",
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(45,120,200,0.18)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#2D78C8";
                        (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(45,120,200,0.07)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(45,120,200,0.35)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#5BA3E8";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {msgs.map((m, i) => (
                <div key={i} className="msg-pop" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "87%",
                    padding: "9px 13px",
                    borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                    background: m.role === "user" ? "#2D78C8" : "rgba(255,255,255,0.04)",
                    border: m.role === "bot" ? "1px solid rgba(255,255,255,0.06)" : "none",
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "#f0f0f8",
                    fontFamily: "var(--font-grotesk)",
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ display: "flex", gap: 4, padding: "9px 13px", width: 54, borderRadius: "12px 12px 12px 3px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D78C8", animation: `tDot 1.2s ease-in-out infinite ${i * 0.2}s` }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, flexShrink: 0, background: "rgba(0,0,0,0.2)" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Type your question..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "#f0f0f8",
                  outline: "none",
                  fontFamily: "var(--font-grotesk)",
                }}
              />
              <button
                onClick={() => send()}
                style={{ width: 36, height: 36, borderRadius: 8, background: "#2D78C8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes tDot{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}`}</style>
    </>
  );
}
