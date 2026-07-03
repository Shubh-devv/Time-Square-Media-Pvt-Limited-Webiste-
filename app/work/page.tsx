import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Work from "@/components/Work";
import Clients from "@/components/Clients";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A showcase of Time Square Media campaigns — outdoor hoardings, digital activations and full brand rollouts across India.",
};

export default function WorkPage() {
  return (
    <main>
      <PageHero
        image="/clients/campaign/Campaign%20%282%29.png"
        eyebrow="Portfolio"
        title={
          <>
            Our work.<br />
            <span className="text-blue">Our craft.</span>
          </>
        }
        subtitle="A snapshot of brands we've helped build landmark presence — from highway hoardings to full-spectrum campaigns."
      />
      <Work />
      <Clients />
    </main>
  );
}
