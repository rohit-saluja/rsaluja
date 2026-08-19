import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/container";
import { AppIcon } from "@/components/app-icon";
import { OpenInBrowserNotice } from "@/components/open-in-browser-notice";
import { StoreHandoffScript } from "@/components/store-handoff-script";
import { StoreLink } from "@/components/store-link";
import { getAppBySlug, getLaunchedApps, webStoreUrl } from "@/lib/apps";
import { site } from "@/lib/site";

/**
 * Short install links, built for social bios.
 *
 * `/get/<slug>` exists because a raw `apps.apple.com` link is unusable inside
 * Instagram: its embedded browser cannot follow Apple's redirect to the
 * `itms-appss://` scheme, so the tap ends on a blank page. This page is served
 * from our own domain over plain https — nothing for the webview to choke on —
 * and hands off to the store from a real user tap. See <StoreLink /> for the
 * mechanics and <OpenInBrowserNotice /> for the fallback.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getLaunchedApps().map((app) => ({ slug: app.slug }));
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
    title: `Get ${app.name}`,
    description: app.description,
    alternates: { canonical: `/get/${app.slug}` },
    // A thin redirect page shouldn't outrank the real one at /apps/<slug>.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${app.name} · ${site.name}`,
      description: app.description,
    },
  };
}

export default async function GetAppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app?.appStoreId) notFound();

  return (
    <Container>
      <StoreHandoffScript />
      <div className="mx-auto flex max-w-md flex-col items-center py-14 text-center sm:py-20">
        <AppIcon app={app} size="lg" />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          {app.name}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{app.tagline}</p>

        <div className="mt-8 w-full">
          <OpenInBrowserNotice path={`/get/${app.slug}`} />
        </div>

        <div className="mt-6 flex w-full flex-col items-center gap-3">
          <StoreLink app={app} className="w-full sm:w-auto" />
          <noscript>
            <a
              href={webStoreUrl(app.appStoreId)}
              className="text-sm font-medium underline underline-offset-4"
            >
              Open {app.name} on the App Store
            </a>
          </noscript>
          <p className="text-xs text-muted-foreground">
            Free on the App Store · iPhone
          </p>
        </div>

        {app.features && app.features.length > 0 ? (
          <ul className="mt-10 w-full space-y-2 text-left">
            {app.features.slice(0, 4).map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
              >
                <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href={`/apps/${app.slug}`}
          className="mt-10 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          More about {app.name}
        </Link>
      </div>
    </Container>
  );
}
