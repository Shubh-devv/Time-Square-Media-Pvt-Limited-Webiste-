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

export const metadata: Metadata = {
  title: {
    template: "%s — Time Square Media",
    default: "Time Square Media — OOH + Digital + Web Marketing Agency",
  },
  description:
    "Time Square Media is a full-spectrum advertising agency: out-of-home billboards, digital marketing, web solutions, BTL activations and retail consultancy across six Indian cities.",
  keywords: [
    "OOH advertising India",
    "out of home advertising",
    "billboard advertising",
    "hoarding advertising",
    "digital marketing agency Lucknow",
    "outdoor advertising agency India",
    "web solutions India",
    "BTL activations",
    "Lucknow",
    "Kanpur",
    "Delhi",
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
        <Navbar />
        {children}
        <Footer />
        <GlobalUI />
      </body>
    </html>
  );
}
