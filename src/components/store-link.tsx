"use client";

import { useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { schemeStoreUrl, webStoreUrl, type AppData } from "@/lib/apps";
import { cn } from "@/lib/utils";

/**
 * User-agent tokens for the embedded browsers that swallow App Store links.
 * Instagram ships `Instagram`; the rest of Meta's apps ship FBAN/FBAV/FB_IAB.
 */
const IN_APP_BROWSER =
  /(Instagram|FBAN|FBAV|FBIOS|FB_IAB|Snapchat|musical_ly|TikTok|Line\/|Pinterest|LinkedInApp)/i;

const IOS = /iPad|iPhone|iPod/;

/** Friendly names for the in-app browsers we can recognise. */
function browserName(ua: string): string {
  if (/Instagram/i.test(ua)) return "Instagram";
  if (/FB_IAB|FBAN|FBAV|FBIOS/i.test(ua)) return "Facebook";
  if (/Snapchat/i.test(ua)) return "Snapchat";
  if (/musical_ly|TikTok/i.test(ua)) return "TikTok";
  if (/LinkedInApp/i.test(ua)) return "LinkedIn";
  if (/Pinterest/i.test(ua)) return "Pinterest";
  return "this app";
}

export type Environment = {
  /** True once we know we are inside a social app's embedded browser. */
  isInApp: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  /** Name of the host app, e.g. "Instagram". */
  appName: string;
};

const SERVER: Environment = {
  isInApp: false,
  isIOS: false,
  isAndroid: false,
  appName: "this app",
};

/**
 * The user agent never changes mid-session, so read it once and hand the same
 * object back every time — `useSyncExternalStore` requires a stable snapshot.
 */
let cached: Environment | null = null;

function clientEnvironment(): Environment {
  if (!cached) {
    const ua = navigator.userAgent;
    // iPadOS 13+ reports itself as a Mac; the touch points give it away.
    const isIPadOS =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

    cached = {
      isInApp: IN_APP_BROWSER.test(ua),
      isIOS: IOS.test(ua) || isIPadOS,
      isAndroid: /Android/i.test(ua),
      appName: browserName(ua),
    };
  }
  return cached;
}

/** Nothing to subscribe to — the snapshot is fixed for the life of the page. */
const noopSubscribe = () => () => {};

const serverEnvironment = () => SERVER;

/**
 * Detects the embedded-browser situation on the client.
 *
 * The prerendered HTML and the hydration pass both see the neutral `SERVER`
 * value, so the markup matches; React then swaps in the real snapshot. This is
 * the "Browser APIs" caveat from the Next.js static-export guide — `navigator`
 * does not exist at build time.
 */
export function useEnvironment(): Environment {
  return useSyncExternalStore(
    noopSubscribe,
    clientEnvironment,
    serverEnvironment,
  );
}

type StoreLinkProps = {
  app: AppData;
  className?: string;
  children?: React.ReactNode;
};

/**
 * "Download on the App Store" link that survives in-app browsers.
 *
 * Two things matter here and both are easy to undo by accident:
 *   1. no `target="_blank"` — a new tab inside Instagram's webview is its own
 *      reliable way to get a blank screen;
 *   2. the href only becomes `itms-apps://` after we know we are on iOS, so the
 *      prerendered HTML (and anyone without JS) still gets a working https URL.
 */
export function StoreLink({ app, className, children }: StoreLinkProps) {
  const { isIOS } = useEnvironment();

  if (!app.appStoreId) return null;

  const href = isIOS
    ? schemeStoreUrl(app.appStoreId)
    : webStoreUrl(app.appStoreId);

  return (
    <a
      href={href}
      data-store-id={app.appStoreId}
      rel="noopener"
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {children ?? (
        <>
          <Download size={18} />
          Download on the App Store
        </>
      )}
    </a>
  );
}
