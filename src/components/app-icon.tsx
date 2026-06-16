import { AppWindow, Brain, Dumbbell, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import type { AppData, AppIconKey } from "@/lib/apps";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const ICONS: Record<AppIconKey, IconComponent> = {
  dumbbell: Dumbbell,
  brain: Brain,
  sparkles: Sparkles,
  app: AppWindow,
};

type Size = "sm" | "md" | "lg";

const TILE: Record<Size, string> = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-20 w-20 rounded-3xl",
};

const GLYPH: Record<Size, number> = { sm: 18, md: 26, lg: 36 };

export function AppIcon({
  app,
  size = "md",
  className,
}: {
  app: AppData;
  size?: Size;
  className?: string;
}) {
  const Icon = ICONS[app.icon] ?? AppWindow;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid place-items-center text-white shadow-sm ring-1 ring-black/5",
        TILE[size],
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${app.gradient.from}, ${app.gradient.to})`,
      }}
    >
      <Icon size={GLYPH[size]} strokeWidth={2} />
    </span>
  );
}
