import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.author} — questions, feedback, or privacy requests.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, feedback, or a privacy request — send a message and you'll hear back."
      />
      <Container>
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Mail size={22} className="text-accent" />
              <h2 className="mt-3 text-base font-semibold text-foreground">
                Email
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block text-sm text-accent hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Clock size={22} className="text-accent" />
              <h2 className="mt-3 text-base font-semibold text-foreground">
                Response time
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Replies usually go out within a couple of business days.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
