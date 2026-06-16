import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { CTASection } from "@/components/cta-section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Answers to common questions about the apps, privacy, and support.",
  alternates: { canonical: "/help" },
};

const faqs = [
  {
    q: "How do I get support for an app?",
    a: `Email ${site.email} with the name of the app and a short description of what is happening. Screenshots and your device/OS version help a lot.`,
  },
  {
    q: "How do I request, export, or delete my data?",
    a: `Most apps keep your data on your device, so deleting the app removes it. If an app stores an account or you would like to make a specific request, email ${site.email} and we will help.`,
  },
  {
    q: "How do refunds work?",
    a: "Purchases and subscriptions are handled by the App Store. Refunds for App Store purchases are processed by Apple under their policies — you can request one from Apple directly through your purchase history.",
  },
  {
    q: "How do I cancel a subscription?",
    a: "Open the Settings app on your device, tap your name, then Subscriptions, and manage or cancel from there. Cancelling stops future renewals; the current period remains active until it ends.",
  },
  {
    q: "Where can I find the privacy policy and terms?",
    a: "Each app has its own privacy policy and terms, linked from that app's page. There are also site-wide versions in the footer under Legal.",
  },
  {
    q: "How do I report a bug or suggest a feature?",
    a: `Feedback is always welcome — email ${site.email} with your idea or the issue you ran into. It genuinely shapes what gets built next.`,
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Help Center"
        description="Answers to common questions. Can't find what you need? Get in touch."
      />
      <Container>
        <div className="mx-auto max-w-3xl py-12 sm:py-16">
          <dl className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <dt className="text-base font-semibold text-foreground">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <CTASection
        title="Still need help?"
        description={`Email ${site.email} and you'll get a reply, usually within a couple of business days.`}
      />
    </>
  );
}
