import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { AppCard } from "@/components/app-card";
import { CTASection } from "@/components/cta-section";
import { getAllApps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Browse the iOS apps — each with its own privacy policy and terms.",
  alternates: { canonical: "/apps" },
};

export default function AppsPage() {
  const apps = getAllApps();

  return (
    <>
      <PageHeader
        eyebrow="Apps"
        title="All apps"
        description="Every app below has its own page, privacy policy, and terms."
      />
      <Container>
        <div className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </Container>
      <CTASection />
    </>
  );
}
