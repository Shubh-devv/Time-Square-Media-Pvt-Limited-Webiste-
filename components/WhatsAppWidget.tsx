"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACTS = [
  { label: "Lucknow HQ",  number: "919506017729" },
  { label: "Delhi Office", number: "919838798388" },
];

const SERVICES_LIST = [
  "OOH / Hoarding Advertising",
  "Mobile Media (Auto / Bus Branding)",
  "Digital Marketing",
  "Web Solutions",
  "BTL & Activations",
  "Retail Consultancy",
  "Multiple Services",
];

const BUDGETS = [
  "Under ₹50,000",
  "₹50K – ₹2 Lakh",
  "₹2L – ₹5 Lakh",
  "₹5L – ₹20 Lakh",
  "₹20 Lakh+",
];

type FormState = {
  name: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = { name: "", phone: "", service: "", budget: "", message: "" };

export default function WhatsAppWidget() {
  const [open, setOpen]     = useState(false);
  const [form, setForm]     = useState<FormState>(EMPTY);
  const [sent, setSent]     = useState(false);
  const [contactIdx, setContactIdx] = useState(0);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "Hello Time Square Media! 👋",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.service}`,
      `Budget: ${form.budget}`,
      form.message ? `Message: ${form.message}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${CONTACTS[contactIdx].number}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setForm(EMPTY);
    }, 2000);
  };

  const inputCls = "w-full rounded-[2px] border border-ink-line bg-ink px-4 py-2.5 text-sm text-paper placeholder-slate/40 focus:border-blue focus:outline-none transition-colors";
  const labelCls = "mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate";

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        aria-label="Get a quote on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-0"
        style={{ background: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,0.38)", cursor: "pointer" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[65] flex items-end justify-center p-4 sm:items-center"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ y: 36, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-md rounded-2xl border border-ink-line bg-ink-soft p-6"
            >
              {/* Header */}
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: "#25D366" }} />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]" style={{ color: "#25D366" }}>
                      WhatsApp
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl uppercase tracking-wide">
                    Get a Free Quote
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate">
                    Fill in your details — we&apos;ll reply within 30 minutes.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink-line font-mono text-xs text-slate transition-colors hover:border-blue hover:text-blue"
                >
                  ✕
                </button>
              </div>

              {sent ? (
                <div className="py-10 text-center">
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "rgba(37,211,102,0.15)" }}
                  >
                    <svg width="26" height="26" fill="none" stroke="#25D366" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="font-display text-2xl uppercase" style={{ color: "#25D366" }}>
                    Opening WhatsApp...
                  </p>
                  <p className="mt-2 text-sm text-slate">Your message is pre-filled and ready to send.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Contact chooser */}
                  <div className="flex gap-2">
                    {CONTACTS.map((c, idx) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => setContactIdx(idx)}
                        className="flex-1 rounded-[2px] border py-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-all duration-200"
                        style={
                          contactIdx === idx
                            ? { borderColor: "#25D366", background: "rgba(37,211,102,0.1)", color: "#25D366" }
                            : { borderColor: "rgba(255,255,255,0.08)", color: "rgba(136,136,152,0.7)", background: "transparent" }
                        }
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Your Name *</label>
                      <input required type="text" value={form.name} onChange={set("name")} placeholder="Rahul Sharma" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone *</label>
                      <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Service Needed *</label>
                    <select required value={form.service} onChange={set("service")} className={inputCls}>
                      <option value="">Select a service...</option>
                      {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Monthly Budget *</label>
                    <select required value={form.budget} onChange={set("budget")} className={inputCls}>
                      <option value="">Select budget range...</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Message (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="City, campaign details, or any specific requirement..."
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-[2px] py-3.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                    style={{ background: "#25D366" }}
                  >
                    Send on WhatsApp →
                  </button>

                  <p className="text-center font-mono text-[0.57rem] text-slate/70">
                    Sending to {CONTACTS[contactIdx].label} · Reply within 30 mins
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
