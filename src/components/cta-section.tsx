import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "./container";
import { Button } from "./ui";

export function CTASection({
  title = "Get in touch",
  description = "Questions, feedback, or a privacy request about any of the apps? Send a message — every email is read.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 w-[40rem] max-w-full rounded-full opacity-[0.18] blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, var(--accent), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              {description}
            </p>
            <div className="mt-7 flex justify-center">
              <Button href={`mailto:${site.email}`} external size="lg">
                <Mail size={18} />
                {site.email}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
