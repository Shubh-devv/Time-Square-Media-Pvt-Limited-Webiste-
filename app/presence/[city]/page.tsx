import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITY_PAGES } from "@/lib/city-data";
import CityBrochure from "@/components/CityBrochure";

/* ── Static params — all 6 city slugs ───────────────────────── */
export function generateStaticParams() {
  return CITY_PAGES.map((c) => ({ city: c.slug }));
}

/* ── Dynamic metadata ─────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_PAGES.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: `OOH Advertising in ${city.name} | Time Square Media`,
    description: `Complete OOH media plan for ${city.name} — ${city.totalSites}+ sites across ${city.formats.length} formats. Hoardings, unipoles, auto branding, bus wraps, LED screens and more. ${city.population} population.`,
  };
}

/* ── Page ─────────────────────────────────────────────────────── */
export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = CITY_PAGES.find((c) => c.slug === slug);
  if (!city) notFound();
  return <CityBrochure city={city} />;
}
