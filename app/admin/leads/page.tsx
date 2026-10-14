import type { Metadata } from "next";
import LeadsAdmin from "@/components/LeadsAdmin";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return <LeadsAdmin />;
}
