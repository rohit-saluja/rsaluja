import type { LegalDoc } from "@/lib/legal";
import { Container } from "./container";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <Container>
      <article className="mx-auto max-w-3xl py-12 sm:py-16">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {doc.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>
              Applies to:{" "}
              <span className="font-medium text-foreground">
                {doc.appliesTo}
              </span>
            </span>
            <span aria-hidden>·</span>
            <span>Last updated: {doc.effectiveDate}</span>
          </div>
        </header>

        <div className="mt-6 space-y-4">
          {doc.intro.map((paragraph, i) => (
            <p key={i} className="text-base leading-7 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <nav
          aria-label="Contents"
          className="mt-8 rounded-2xl border border-border bg-subtle p-5"
        >
          <h2 className="text-sm font-semibold text-foreground">Contents</h2>
          <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {doc.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {i + 1}. {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-base leading-7 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.list ? (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-base leading-7 text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
