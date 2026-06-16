import Link from "next/link";
import { ArrowRight, FileText, LifeBuoy, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { AppCard } from "@/components/app-card";
import { CTASection } from "@/components/cta-section";
import { Button } from "@/components/ui";
import { getAllApps } from "@/lib/apps";
import { site } from "@/lib/site";

const pointers = [
  {
    icon: ShieldCheck,
    title: "Privacy first",
    body: "Every app collects as little as possible — and tells you exactly what and why.",
    href: "/privacy",
    cta: "Privacy Policy",
  },
  {
    icon: FileText,
    title: "Clear terms",
    body: "Plain-English terms covering how the apps work and any purchases.",
    href: "/terms",
    cta: "Terms & Conditions",
  },
  {
    icon: LifeBuoy,
    title: "Real support",
    body: "Have a question or a request? Find answers fast or reach out directly.",
    href: "/help",
    cta: "Help Center",
  },
];

export default function HomePage() {
  const apps = getAllApps();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[60rem] max-w-full rounded-full opacity-[0.15] blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--accent), transparent)",
          }}
        />
        <Container>
          <div className="relative flex flex-col items-center py-20 text-center sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              iOS apps by {site.author}
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              A small studio of focused iOS apps — each with a clear privacy
              policy and terms you can actually read.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/apps" size="lg">
                Explore apps
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Apps */}
      <section>
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Apps
              </h2>
              <p className="mt-1 text-muted-foreground">
                Built with care. More on the way.
              </p>
            </div>
            <Link
              href="/apps"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
            >
              All apps
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </Container>
      </section>

      {/* Trust / legal pointers */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {pointers.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6"
                >
                  <Icon size={22} className="text-accent" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
                    {card.body}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    {card.cta}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
