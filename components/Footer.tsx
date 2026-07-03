import Link from "next/link";
import Image from "next/image";
import { COMPANY, CITIES, NAV } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="pb-16 md:pb-20"
      style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e3effc 40%, #f8fbff 100%)" }}
    >

      {/* Digital marketing image banner */}
      <div className="relative mb-14 h-48 w-full overflow-hidden md:h-64">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: "linear-gradient(135deg, #0d1e3a 0%, #1a3a6e 50%, #2D78C8 100%)" }}
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-blue-light">
            Full-Spectrum Advertising
          </p>
          <p className="font-display text-4xl uppercase tracking-widest text-white md:text-6xl">
            OOH · Digital · BTL
          </p>
          <p className="font-mono text-xs text-white/70">
            Drop your digital marketing image at <span className="text-blue-light">public/digital-marketing.jpg</span> to replace this
          </p>
        </div>
      </div>

      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/">
              <Image
                src="/Hero Video/Logo.png"
                alt="TimeSquare Media Logo"
                width={160}
                height={40}
                className="h-12 w-auto md:h-14"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: "#3a5a7a" }}>
              {COMPANY.tagline} A full-spectrum advertising agency delivering OOH, digital,
              BTL and retail solutions across India — under one roof.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {COMPANY.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-blue"
                  style={{ color: "#5a7a9a" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: "#2D78C8" }}>
              Explore
            </p>
            <ul className="mt-4 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm transition-colors hover:text-blue" style={{ color: "#1a3a5a" }}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm transition-colors hover:text-blue" style={{ color: "#1a3a5a" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Head office */}
          <div className="md:col-span-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: "#2D78C8" }}>
              Head office
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#3a5a7a" }}>
              {CITIES[0].city} — {CITIES[0].address}
            </p>
            <div className="mt-5 space-y-1.5">
              <a
                href={`tel:${COMPANY.phone}`}
                className="block font-mono text-xs transition-colors hover:text-blue"
                style={{ color: "#1a3a5a" }}
              >
                {COMPANY.phone}
              </a>
              <a
                href={`tel:${COMPANY.phone2}`}
                className="block font-mono text-xs transition-colors hover:text-blue"
                style={{ color: "#1a3a5a" }}
              >
                {COMPANY.phone2}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="block font-mono text-xs transition-colors hover:text-blue"
                style={{ color: "#1a3a5a" }}
              >
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-blue/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs" style={{ color: "#5a7a9a" }}>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: "#5a7a9a" }}>
            Out-of-Home · Digital · Web · BTL · Retail
          </p>
        </div>
      </div>
    </footer>
  );
}
