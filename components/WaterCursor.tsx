"use client";

import { useEffect } from "react";

/* ── which state should the cursor be in? ─────────────────────── */
type CursorState = "default" | "hover" | "input";

function getState(el: Element | null): CursorState {
  if (!el) return "default";
  // Text / form fields → I-beam mode
  if (el.matches("input, textarea, select")) return "input";
  // Any clickable element → expand mode
  if (el.closest("a, button, [role='button'], label")) return "hover";
  return "default";
}

/* ── visual config per state ──────────────────────────────────── */
type DotCfg  = { w: string; h: string; r: string; bg: string; opacity: string; shadow: string };
type RingCfg = { w: string; h: string; bc: string; bw: string; bg: string; scale: string };

const DOT: Record<CursorState, DotCfg> = {
  default: { w: "11px", h: "11px", r: "50%",  bg: "rgba(45,120,200,0.92)", opacity: "1",   shadow: "0 0 10px rgba(45,120,200,0.55)" },
  hover:   { w:  "0px", h:  "0px", r: "50%",  bg: "rgba(45,120,200,0.92)", opacity: "0",   shadow: "none" },
  input:   { w:  "2px", h: "20px", r: "2px",  bg: "#2D78C8",               opacity: "1",   shadow: "0 0 6px rgba(45,120,200,0.4)"  },
};

const RING: Record<CursorState, RingCfg> = {
  default: { w: "34px", h: "34px", bc: "rgba(45,120,200,0.42)", bw: "1px",   bg: "transparent",          scale: "1"    },
  hover:   { w: "56px", h: "56px", bc: "#2D78C8",               bw: "1.5px", bg: "rgba(45,120,200,0.09)", scale: "1"    },
  input:   { w: "34px", h: "34px", bc: "rgba(45,120,200,0.6)",  bw: "1px",   bg: "transparent",           scale: "1"    },
};

/* ── transition presets ───────────────────────────────────────── */
const DOT_TRANSITION  = "width .14s ease, height .14s ease, border-radius .14s ease, opacity .14s ease, box-shadow .2s ease";
const RING_TRANSITION = "width .28s cubic-bezier(.22,1,.36,1), height .28s cubic-bezier(.22,1,.36,1), border-color .2s ease, border-width .2s ease, background .2s ease, transform .18s cubic-bezier(.22,1,.36,1)";
const LABEL_TRANSITION = "opacity .18s ease, transform .22s cubic-bezier(.22,1,.36,1)";

export default function WaterCursor() {
  useEffect(() => {
    // ── Don't run on touch-only devices ──
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot   = document.getElementById("wc-dot");
    const ring  = document.getElementById("wc-ring");
    const label = document.getElementById("wc-label");
    if (!dot || !ring || !label) return;

    // Set up transitions once
    dot.style.transition   = DOT_TRANSITION;
    ring.style.transition  = RING_TRANSITION;
    label.style.transition = LABEL_TRANSITION;

    let cx = -300, cy = -300;  // dot position (instant)
    let rx = -300, ry = -300;  // ring position (lagged)
    let state: CursorState = "default";
    let isDown = false;
    let rafId: number;

    /* apply visual state to elements */
    function applyState(s: CursorState, down: boolean) {
      const d = DOT[s];
      const r = RING[s];

      // dot
      dot!.style.width       = down ? "6px"                          : d.w;
      dot!.style.height      = down ? "6px"                          : d.h;
      dot!.style.borderRadius = d.r;
      dot!.style.background  = d.bg;
      dot!.style.opacity     = d.opacity;
      dot!.style.boxShadow   = d.shadow;

      // ring — use transform scale for click, keep translate for centering
      ring!.style.width       = down ? "26px"                        : r.w;
      ring!.style.height      = down ? "26px"                        : r.h;
      ring!.style.borderColor = r.bc;
      ring!.style.borderWidth = r.bw;
      ring!.style.background  = r.bg;
      // subtle squish on mousedown
      ring!.style.transform   = down
        ? "translate(-50%,-50%) scale(0.82)"
        : "translate(-50%,-50%) scale(1)";

      // label (the arrow inside the ring)
      label!.style.opacity   = s === "hover" && !down ? "1" : "0";
      label!.style.transform = s === "hover" && !down
        ? "translate(-50%,-50%) scale(1)"
        : "translate(-50%,-50%) scale(0.35)";
    }

    /* RAF loop — ring lags behind cursor */
    const loop = () => {
      rx += (cx - rx) * 0.14;
      ry += (cy - ry) * 0.14;
      ring!.style.left  = rx + "px";
      ring!.style.top   = ry + "px";
      label!.style.left = rx + "px";
      label!.style.top  = ry + "px";
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    /* events */
    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      dot!.style.left = cx + "px";
      dot!.style.top  = cy + "px";

      const next = getState(e.target as Element);
      if (next !== state) {
        state = next;
        applyState(state, isDown);
      }
    };

    const onDown = (e: MouseEvent) => {
      isDown = true;
      applyState(state, true);

      // Water ripple circles on every click
      for (let i = 0; i < 2; i++) {
        const ripple = document.createElement("div");
        ripple.className = i === 0 ? "water-ripple" : "water-ripple-2";
        ripple.style.left = e.clientX + "px";
        ripple.style.top  = e.clientY + "px";
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1200);
      }
    };

    const onUp = (e: MouseEvent) => {
      isDown = false;
      state = getState(e.target as Element);
      applyState(state, false);
    };

    const onLeave = () => {
      dot!.style.opacity  = "0";
      ring!.style.opacity = "0";
      label!.style.opacity = "0";
    };

    const onEnter = () => {
      dot!.style.opacity  = "1";
      ring!.style.opacity = "1";
    };

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mousedown",  onDown,  { passive: true });
    window.addEventListener("mouseup",    onUp,    { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* ── Inner dot — tracks instantly ── */}
      <div
        id="wc-dot"
        aria-hidden
        style={{
          position:      "fixed",
          left:          -300,
          top:           -300,
          width:         11,
          height:        11,
          borderRadius:  "50%",
          background:    "rgba(45,120,200,0.92)",
          pointerEvents: "none",
          zIndex:        9999,
          transform:     "translate(-50%,-50%)",
          boxShadow:     "0 0 10px rgba(45,120,200,0.55)",
          mixBlendMode:  "screen",
        }}
      />

      {/* ── Outer ring — follows with lag ── */}
      <div
        id="wc-ring"
        aria-hidden
        style={{
          position:      "fixed",
          left:          -300,
          top:           -300,
          width:         34,
          height:        34,
          borderRadius:  "50%",
          border:        "1px solid rgba(45,120,200,0.42)",
          background:    "transparent",
          pointerEvents: "none",
          zIndex:        9998,
          transform:     "translate(-50%,-50%) scale(1)",
        }}
      />

      {/* ── Arrow label inside ring — shown on hover ── */}
      <div
        id="wc-label"
        aria-hidden
        style={{
          position:      "fixed",
          left:          -300,
          top:           -300,
          pointerEvents: "none",
          zIndex:        9999,
          transform:     "translate(-50%,-50%) scale(0.35)",
          opacity:       0,
          color:         "#2D78C8",
          fontFamily:    "var(--font-mono), monospace",
          fontSize:      "0.7rem",
          fontWeight:    "bold",
          letterSpacing: "0.08em",
          userSelect:    "none",
          lineHeight:    1,
        }}
      >
        →
      </div>
    </>
  );
}
