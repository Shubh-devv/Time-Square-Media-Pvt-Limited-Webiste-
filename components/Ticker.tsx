"use client";

type TickerProps = {
  items: string[];
  speed?: "slow" | "fast";
  tone?: "amber" | "ink" | "paper" | "blue";
};

export default function Ticker({ items, speed = "slow", tone = "ink" }: TickerProps) {
  const loop = [...items, ...items];
  const anim = speed === "fast" ? "animate-ticker-fast" : "animate-ticker-slow";

  const toneClasses =
    tone === "amber"
      ? "bg-amber text-ink border-y border-amber-deep/40"
      : tone === "paper"
      ? "bg-paper text-ink border-y border-paper-dim"
      : tone === "blue"
      ? "bg-blue/10 text-blue-light border-y border-blue/20"
      : "bg-ink-soft text-paper/70 border-y border-ink-line";

  return (
    <div className={`group relative w-full overflow-hidden ${toneClasses}`}>
      <div className={`flex w-max ${anim} group-hover:[animation-play-state:paused]`}>
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap py-3 font-mono text-sm font-bold uppercase tracking-[0.18em]"
          >
            {item}
            <span aria-hidden className="mx-6 text-base opacity-40">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
