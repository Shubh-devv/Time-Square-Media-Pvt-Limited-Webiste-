import Link from "next/link";
import Image from "next/image";
import { COMPANY, CITIES, NAV } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ background: "#f4f8ff" }}>

      {/* Top accent band */}
      <div style={{ background: "linear-gradient(90deg, #0d1e3a 0%, #1a3a6e 55%, #2D78C8 100%)", height: 4 }} />

      {/* Main content */}
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">

          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/">
              <Image
                src="/Hero Video/Logo.png"
                alt="TimeSquare Media Logo"
                width={160}
                height={40}
                className="h-12 w-auto md:h-14"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#1a2e45", fontWeight: 400 }}>
              A full-spectrum advertising agency delivering OOH, digital, BTL and retail solutions across India — under one roof.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
              {COMPANY.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold transition-colors hover:text-blue"
                  style={{ color: "#2D78C8" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "#0d1e3a" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm font-medium transition-colors hover:text-blue"
                    style={{ color: "#1a2e45" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-sm font-medium transition-colors hover:text-blue"
                  style={{ color: "#1a2e45" }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-medium transition-colors hover:text-blue"
                  style={{ color: "#1a2e45" }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* All Offices */}
          <div className="md:col-span-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "#0d1e3a" }}>
              Our Offices
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
              {CITIES.map((c) => (
                <div key={c.city}>
                  <p className="text-sm font-bold" style={{ color: "#2D78C8" }}>
                    {c.city}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#1a2e45" }}>
                    {c.address}
                  </p>
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="mt-1 block text-xs font-medium transition-colors hover:text-blue"
                      style={{ color: "#2D78C8" }}
                    >
                      {c.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(45,120,200,0.15)" }}>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-sm font-semibold transition-colors hover:text-blue"
                style={{ color: "#1a2e45" }}
              >
                {COMPANY.email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(45,120,200,0.18)" }}
        >
          <p className="text-xs font-medium" style={{ color: "#1a2e45" }}>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="text-xs font-medium" style={{ color: "#1a2e45" }}>
            Out-of-Home · Digital · Web · BTL · Retail
          </p>
        </div>
      </div>
    </footer>
  );
}
