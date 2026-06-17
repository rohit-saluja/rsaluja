import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg bg-foreground font-display text-sm font-bold text-background transition-transform duration-200 group-hover:-rotate-6"
      >
        r
      </span>
      <span className="font-display text-base font-semibold tracking-tight text-foreground">
        {site.name}
      </span>
    </Link>
  );
}
