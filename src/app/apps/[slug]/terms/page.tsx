import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-document";
import { getAppBySlug, getAppSlugs } from "@/lib/apps";
import { getTermsDoc } from "@/lib/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return {};

  return {
    title: `${app.name} Terms & Conditions`,
    description: `Terms and conditions for ${app.name}.`,
    alternates: { canonical: `/apps/${app.slug}/terms` },
  };
}

export default async function AppTermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  return <LegalDocument doc={getTermsDoc(app)} />;
}
