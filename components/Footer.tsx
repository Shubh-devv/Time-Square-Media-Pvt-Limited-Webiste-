import Link from "next/link";
import { COMPANY, CITIES, NAV } from "@/lib/data";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink-soft py-16 md:py-20">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">

          {/* Brand */}
          <div className="md:col-span-5">
            <Logo imageClassName="h-10 w-auto md:h-12" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate">
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
                  className="font-mono text-xs uppercase tracking-[0.14em] text-slate transition-colors hover:text-blue"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
              Explore
            </p>
            <ul className="mt-4 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-paper/75 transition-colors hover:text-blue">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-paper/75 transition-colors hover:text-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Head office */}
          <div className="md:col-span-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-dim">
              Head office
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              {CITIES[0].city} — {CITIES[0].address}
            </p>
            <div className="mt-5 space-y-1.5">
              <a
                href={`tel:${COMPANY.phone}`}
                className="block font-mono text-xs text-slate transition-colors hover:text-blue"
              >
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="block font-mono text-xs text-slate transition-colors hover:text-blue"
              >
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-slate-dim">
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-slate-dim">
            Out-of-Home · Digital · Web · BTL · Retail
          </p>
        </div>
      </div>
    </footer>
  );
}
