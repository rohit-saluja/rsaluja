import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { getTermsDoc } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${site.name} apps and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDocument doc={getTermsDoc()} />;
}
