# rsaluja

The home for **iOS apps by Rohit Saluja** — a small marketing site that also
hosts a **privacy policy** and **terms & conditions** for every app, so each App
Store listing has a stable, public legal URL.

Built with **Next.js (App Router) + Tailwind CSS**, fully static, with
**light & dark mode**. Design and structure take cues from sites like
[artmvstd.com](https://artmvstd.com/).

> ℹ️ The legal text is a solid, plain-English starting point — **not legal
> advice**. Review it (ideally with a professional) and make sure it matches what
> each app actually does before you publish.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, `src/` directory)
- React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [lucide-react](https://lucide.dev/) icons
- **Static export** (`output: "export"`) → deploys to any static host

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site is written to ./out
```

## Project structure

```
src/
  app/
    layout.tsx                 # Root layout: theme provider, header, footer, SEO
    page.tsx                   # Home (hero + apps grid + CTA)
    apps/
      page.tsx                 # All apps
      [slug]/
        page.tsx               # App detail page
        privacy/page.tsx       # Per-app privacy policy
        terms/page.tsx         # Per-app terms
    privacy/page.tsx           # Site-wide privacy policy
    terms/page.tsx             # Site-wide terms
    help/page.tsx              # Help center (FAQ)
    contact/page.tsx           # Contact (opens a pre-filled email)
    not-found.tsx              # 404
  components/                  # Header, Footer, ThemeToggle, AppCard, LegalDocument, ...
  lib/
    site.ts                    # ← Site config (name, domain, email, jurisdiction, dates)
    apps.ts                    # ← The app catalogue (add your apps here)
    legal.ts                   # Generates privacy/terms from the app data
```

## Legal URLs (for App Store Connect)

Every app automatically gets its own pages:

| Page                | URL                       |
| ------------------- | ------------------------- |
| App detail          | `/apps/<slug>`            |
| App privacy policy  | `/apps/<slug>/privacy`    |
| App terms           | `/apps/<slug>/terms`      |
| Site-wide privacy   | `/privacy`                |
| Site-wide terms     | `/terms`                  |

e.g. `https://rsaluja.com/apps/gymledger/privacy`. (URLs use a trailing slash;
hosts redirect the non-slash form automatically.)

## Add a new app

Append an entry to `apps` in [`src/lib/apps.ts`](src/lib/apps.ts). The card,
detail page, and tailored privacy/terms pages are generated automatically.

```ts
{
  slug: "my-app",                 // becomes /apps/my-app
  name: "My App",
  tagline: "One line about it.",
  description: "A sentence or two used on the card and detail page.",
  category: "Productivity",
  status: "coming-soon",           // or "live"
  appStoreUrl: undefined,          // add the App Store link when live
  icon: "app",                     // dumbbell | brain | sparkles | app
  gradient: { from: "#6366f1", to: "#4f46e5" },
  features: ["…", "…"],
  privacy: {                       // these flags decide which legal sections appear
    account: false,
    socialSignIn: false,           // Sign in with Apple / Google
    analytics: true,
    ads: false,
    camera: false,
    photos: false,
    aiProcessing: false,
    health: false,
    purchases: true,
    userContent: false,
    cloudSync: false,              // stores data on our servers & syncs across devices
  },
}
```

Set the `privacy` flags **honestly** — they control whether sections like
advertising, camera/photos, AI processing, accounts, social sign-in, cloud sync,
or in-app purchases show up in that app's generated policy. To add a new icon, register it in
[`src/components/app-icon.tsx`](src/components/app-icon.tsx).

## Before you publish — things to confirm

These live in [`src/lib/site.ts`](src/lib/site.ts):

- `jurisdiction` — currently **"India"**; set this to the place whose laws govern
  your terms.
- `email` — `contact@rsaluja.com`; set up forwarding for this address (or change it).
- `legalEffectiveDate` — the "Last updated" date shown on legal pages.
- App Store links and app details in `src/lib/apps.ts`.

## Deploy

`npm run build` outputs a static site to `out/`, which works on any static host:

- **Cloudflare Pages** — Framework preset: Next.js (Static export) · Build:
  `npm run build` · Output dir: `out`
- **Vercel** — import the repo; it builds automatically.
- **GitHub Pages / Netlify / S3** — serve the contents of `out/`.

Point your domain (`rsaluja.com`) at the host and you're live. If you later need
server features, remove `output: "export"` from `next.config.ts`.

## License

© Rohit Saluja. All rights reserved.
