import Link from "next/link";

export default function Logo({
  className = "",
  imageClassName = "h-9 w-auto",
  asLink = true,
}: {
  className?: string;
  imageClassName?: string;
  asLink?: boolean;
}) {
  /*
   * SVG faithfully reproduces the actual logo for dark backgrounds:
   *   - Blue bracket frame (open right, square corners)
   *   - "TIME"   → white  (original is dark-gray, inverted for dark bg)
   *   - "SQUARE" → brand blue #2D78C8 (unchanged)
   *   - "MEDIA SERVICES" → #888898 (light enough on dark)
   *
   * viewBox designed so the logo renders crisply at any size via imageClassName.
   */
  const svg = (
    <svg
      viewBox="0 0 320 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={imageClassName}
      role="img"
      aria-label="Time Square Media Services"
    >
      {/* ── Blue bracket (partial square, open on right) ── */}
      <path
        d="M 8 82 L 8 6 L 80 6 L 80 22
           M 8 82 L 80 82 L 80 66"
        stroke="#2D78C8"
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* ── TIME — white so it reads on dark backgrounds ── */}
      <text
        x="13"
        y="70"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="52"
        fill="#FFFFFF"
        letterSpacing="-1"
      >
        TIME
      </text>

      {/* ── SQUARE — brand blue, slightly larger ── */}
      <text
        x="92"
        y="74"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="58"
        fill="#2D78C8"
        letterSpacing="-1"
      >
        SQUARE
      </text>

      {/* ── MEDIA SERVICES — slate gray, below SQUARE ── */}
      <text
        x="93"
        y="86"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontWeight="600"
        fontSize="11"
        fill="#888898"
        letterSpacing="3.2"
      >
        MEDIA SERVICES
      </text>
    </svg>
  );

  if (!asLink) return <span className={`inline-flex shrink-0 ${className}`}>{svg}</span>;

  return (
    <Link
      href="/"
      aria-label="Time Square Media — home"
      className={`inline-flex shrink-0 transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      {svg}
    </Link>
  );
}
