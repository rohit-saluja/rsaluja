"use client";

import { useCallback, useState } from "react";
import { Check, Copy, MoreHorizontal } from "lucide-react";
import { useEnvironment } from "./store-link";
import { site } from "@/lib/site";

/**
 * Copies text without depending on the async Clipboard API, which Instagram's
 * webview sometimes withholds. Falls back to a throwaway textarea.
 */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

/**
 * The always-works escape hatch for people who arrive from a social app.
 *
 * The `itms-apps://` link in <StoreLink /> handles most taps. This covers the
 * rest: there is no reliable way to *force* Instagram to hand off to Safari
 * (`x-safari-https://` and `instagram://extbrowser` are both intercepted now),
 * so the honest fix is to tell people where the button is and let them copy the
 * link if they would rather paste it.
 */
export function OpenInBrowserNotice({ path }: { path: string }) {
  const { isInApp, isIOS, appName } = useEnvironment();
  const [copied, setCopied] = useState(false);

  const url = `${site.url}${path}`;

  const onCopy = useCallback(async () => {
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  if (!isInApp) return null;

  return (
    <div className="rounded-2xl border border-border bg-subtle p-5 text-left">
      <p className="text-sm font-semibold text-foreground">
        Tap the button below to open the App Store.
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        If nothing happens, {appName}&apos;s built-in browser is blocking it.
        Tap{" "}
        <MoreHorizontal
          size={16}
          className="inline align-text-bottom text-foreground"
          aria-label="the three dots menu"
        />{" "}
        at the top right, then{" "}
        <span className="font-medium text-foreground">
          {isIOS ? "Open in external browser" : "Open in Chrome"}
        </span>
        .
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
          aria-label="Link to this page"
          className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
