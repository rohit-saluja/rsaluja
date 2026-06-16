import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { getPrivacyDoc } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalEntity} handles your information across ${site.name} apps and services.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocument doc={getPrivacyDoc()} />;
}
