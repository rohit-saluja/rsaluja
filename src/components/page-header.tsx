import { Container } from "./container";

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="border-b border-border bg-subtle">
      <Container>
        <div className="py-12 sm:py-16">
          {eyebrow ? (
            <p className="text-sm font-medium text-accent">{eyebrow}</p>
          ) : null}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
