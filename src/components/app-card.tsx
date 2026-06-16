import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AppData } from "@/lib/apps";
import { AppIcon } from "./app-icon";
import { Badge } from "./ui";

export function AppCard({ app }: { app: AppData }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lg hover:shadow-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between">
        <AppIcon app={app} size="md" />
        <ArrowUpRight
          size={18}
          className="text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {app.name}
      </h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{app.tagline}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge>{app.category}</Badge>
        {app.status === "coming-soon" && <Badge>Coming soon</Badge>}
      </div>
    </Link>
  );
}
