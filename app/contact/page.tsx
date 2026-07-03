import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start your next campaign with Time Square Media. Reach us by email, phone or fill in the form — we respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        image="/clients/campaign/Back%202.jpg"
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s talk<br />
            <span className="text-blue">strategy.</span>
          </>
        }
        subtitle="Ready to make your brand unmissable? Drop us a message and we'll get back to you within 24 hours."
      />
      <Contact />
    </main>
  );
}
