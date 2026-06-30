"use client";

import { useEffect } from "react";

export default function WaterCursor() {
  useEffect(() => {
    const dot  = document.getElementById("wc-dot");
    const ring = document.getElementById("wc-ring");
    if (!dot || !ring) return;

    let cx = -200, cy = -200;
    let rx = -200, ry = -200;
    let rafId: number;

    const loop = () => {
      rx += (cx - rx) * 0.14;
      ry += (cy - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      dot.style.left = cx + "px";
      dot.style.top  = cy + "px";
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        const el = document.createElement("div");
        el.className = i === 0 ? "water-ripple" : "water-ripple-2";
        el.style.left = e.clientX + "px";
        el.style.top  = e.clientY + "px";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div
        id="wc-dot"
        aria-hidden
        style={{
          position: "fixed",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "rgba(45,120,200,0.95)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%,-50%)",
          mixBlendMode: "screen",
          left: -200,
          top: -200,
          boxShadow: "0 0 8px rgba(45,120,200,0.6)",
        }}
      />
      <div
        id="wc-ring"
        aria-hidden
        style={{
          position: "fixed",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(45,120,200,0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          left: -200,
          top: -200,
        }}
      />
    </>
  );
}
