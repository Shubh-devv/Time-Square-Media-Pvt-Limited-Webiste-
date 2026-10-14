"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "tsm_festival_popup_seen";

export default function FestivalOfferPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          source: "festival-popup",
          page: window.location.pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
      sessionStorage.setItem(SESSION_KEY, "1");
      setTimeout(() => setOpen(false), 2600);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 px-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink-line bg-ink-soft"
          >
            {/* Festive header strip */}
            <div
              className="relative px-6 py-5 text-center"
              style={{ background: "linear-gradient(135deg,#C0392B 0%,#E8511A 55%,#DAA520 100%)" }}
            >
              <button
                aria-label="Close"
                onClick={close}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/35"
              >
                ✕
              </button>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/85">
                🪔 Festive Season Special
              </p>
              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
                Light up your brand this festival!
              </h3>
            </div>

            <div className="p-6 md:p-7">
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <p className="font-display text-xl text-blue">Thank you! 🎉</p>
                  <p className="mt-2 text-sm text-slate">
                    Our team will reach out to you shortly with your festive offer.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-slate">
                    Share your number and our team will get back to you with exclusive
                    festive-season advertising offers — OOH, DOOH &amp; digital, all in one place.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="w-full rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 00000 00000"
                      className="w-full rounded-[2px] border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none transition-colors"
                    />
                    {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-[2px] bg-blue py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-all hover:bg-blue-light disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Claim festive offer"}
                    </button>
                  </form>

                  <button
                    onClick={close}
                    className="mt-3 w-full text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-slate-dim transition-colors hover:text-slate"
                  >
                    Maybe later
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
