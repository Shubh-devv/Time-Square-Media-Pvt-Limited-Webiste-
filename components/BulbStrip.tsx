export default function BulbStrip({ count = 28 }: { count?: number }) {
  return (
    <div className="bulb-strip" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span className="bulb" key={i} />
      ))}
    </div>
  );
}
