import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Impact from "@/components/Impact";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "17+ years of OOH, Digital OOH and digital advertising excellence across India. Meet Time Square Media — one roof, every medium.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        image="/clients/campaign/Campaign%20%281%29.png"
        eyebrow="About Time Square Media"
        title={
          <>
            Our story.<br />
            <span className="text-blue">Our cities.</span>
          </>
        }
        subtitle="For over a decade, Time Square Media has been turning cities into canvases — pairing high-impact outdoor with sharp digital so brands stay top of mind, everywhere."
      />
      <About />
      <Impact />
    </main>
  );
}
