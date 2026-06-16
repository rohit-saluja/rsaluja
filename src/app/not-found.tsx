import { Container } from "@/components/container";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-semibold text-accent">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/apps" variant="secondary">
            Browse apps
          </Button>
        </div>
      </div>
    </Container>
  );
}
