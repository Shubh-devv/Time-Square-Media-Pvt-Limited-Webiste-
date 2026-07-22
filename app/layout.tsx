import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalUI from "@/components/GlobalUI";

const SITE_URL = "https://timesquaremedia.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Time Square Media",
    default: "Time Square Media — OOH, DOOH + Digital Marketing Agency India",
  },
  icons: {
    icon: "/times_favicon.png",
    shortcut: "/times_favicon.png",
    apple: "/times_favicon.png",
  },
  description:
    "Time Square Media is a full-spectrum advertising agency: OOH billboards, Digital OOH (DOOH), digital marketing, web solutions, BTL activations and retail consultancy across six Indian cities — Delhi, Lucknow, Kanpur, Bhopal, Agra and Prayagraj.",
  keywords: [
    "OOH advertising India",
    "out of home advertising agency",
    "digital OOH advertising",
    "DOOH advertising India",
    "billboard advertising cost India",
    "hoarding advertising agency",
    "OOH vs digital marketing",
    "outdoor advertising agency India",
    "digital marketing agency Lucknow",
    "digital marketing agency India",
    "web solutions company India",
    "website design and development India",
    "BTL activations agency India",
    "full service advertising agency India",
    "advertising agency near me",
    "Lucknow",
    "Kanpur",
    "Delhi",
    "Bhopal",
    "Agra",
    "Prayagraj",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "abc123xyz",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Time Square Media",
    title: "Time Square Media — OOH, DOOH + Digital Marketing Agency India",
    description:
      "Full-spectrum advertising agency: OOH, Digital OOH, digital marketing, web solutions, BTL and retail consultancy across six Indian cities.",
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AdvertisingAgency",
  name: "Time Square Media",
  legalName: "TimesSquare Media Services Pvt. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Full-spectrum advertising agency delivering OOH, Digital OOH (DOOH), digital marketing, BTL activations, on/in media, retail consultancy and web solutions across India.",
  telephone: "+91-95060-17729",
  email: "info@timesquaremedia.in",
  areaServed: ["Delhi", "Lucknow", "Kanpur", "Bhopal", "Agra", "Prayagraj", "India"],
  sameAs: [
    "https://www.instagram.com/timesquare_media/",
    "https://www.facebook.com/TimeSquareServices",
    "https://www.linkedin.com/company/timesquare-media/",
    "https://twitter.com/timesquarmedia",
    "https://in.pinterest.com/timesquaremedia/",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "OOH / Billboard Advertising" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital OOH (DOOH) Advertising" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Media Advertising" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "BTL Activations" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retail Consultancy" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Solutions" } },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <Navbar />
        {children}
        <Footer />
        <GlobalUI />
      </body>
    </html>
  );
}
