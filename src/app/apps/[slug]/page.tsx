import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Download,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/container";
import { AppIcon } from "@/components/app-icon";
import { Badge, Button } from "@/components/ui";
import { getAppBySlug, getAppSlugs } from "@/lib/apps";
import { site } from "@/lib/site";

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
    title: app.name,
    description: app.description,
    alternates: { canonical: `/apps/${app.slug}` },
    openGraph: {
      title: `${app.name} · ${site.name}`,
      description: app.description,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const paragraphs = app.longDescription ?? [app.description];

  return (
    <>
      <div className="border-b border-border bg-subtle">
        <Container>
          <div className="py-12 sm:py-16">
            <Link
              href="/apps"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              All apps
            </Link>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <AppIcon app={app} size="lg" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {app.name}
                </h1>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg">
                  {app.tagline}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge>{app.category}</Badge>
                  {app.status === "coming-soon" ? (
                    <Badge>Coming soon</Badge>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {app.appStoreUrl ? (
                <Button href={app.appStoreUrl} external size="lg">
                  <Download size={18} />
                  Download on the App Store
                </Button>
              ) : (
                <Button variant="secondary" size="lg" className="cursor-default">
                  Coming soon to the App Store
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              About
            </h2>
            <div className="mt-3 space-y-3">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-base leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {app.features && app.features.length > 0 ? (
              <>
                <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
                  Features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {app.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                    >
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold text-foreground">Legal</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Policies specific to {app.name}.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/apps/${app.slug}/privacy`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ShieldCheck size={18} className="text-accent" />
                  <span className="flex-1">Privacy Policy</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
                <Link
                  href={`/apps/${app.slug}/terms`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <FileText size={18} className="text-accent" />
                  <span className="flex-1">Terms &amp; Conditions</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
