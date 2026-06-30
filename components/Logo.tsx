import Link from "next/link";

export default function Logo({
  className = "",
  imageClassName = "h-9 w-auto md:h-11",
  asLink = true,
}: {
  className?: string;
  imageClassName?: string;
  asLink?: boolean;
}) {
  const svg = (
    <svg
      viewBox="0 0 280 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={imageClassName}
      role="img"
      aria-label="Time Square Media Services"
    >
      {/* Bracket frame — brand blue */}
      <path
        d="M8 7 L8 65 M8 7 L60 7 L60 23 M8 65 L60 65 L60 49"
        stroke="#2D78C8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* TIME — white so it's visible on dark backgrounds */}
      <text
        x="13"
        y="50"
        fontFamily="Anton, Impact, sans-serif"
        fontSize="30"
        fill="#FFFFFF"
      >
        TIME
      </text>
      {/* SQUARE — brand blue */}
      <text
        x="70"
        y="52"
        fontFamily="Anton, Impact, sans-serif"
        fontSize="36"
        fill="#2D78C8"
      >
        SQUARE
      </text>
      {/* MEDIA SERVICES — slate gray */}
      <text
        x="71"
        y="66"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9.5"
        fill="#888898"
        letterSpacing="3.5"
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
