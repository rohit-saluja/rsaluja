/**
 * The catalogue of iOS apps shown on the site.
 *
 * To add an app: append an entry to the `apps` array below. Each app
 * automatically gets:
 *   - a card on the home page and /apps
 *   - a detail page at /apps/<slug>
 *   - a privacy policy at /apps/<slug>/privacy
 *   - terms at /apps/<slug>/terms
 *   - an install/redirect page at /get/<slug> (only once `appStoreId` is set)
 *
 * The `privacy` flags drive which sections appear in the generated legal
 * documents, so set them honestly for each app.
 */

/** Lucide icon keys supported by <AppIcon />. Add more in app-icon.tsx. */
export type AppIconKey =
  | "dumbbell"
  | "brain"
  | "sparkles"
  | "flame"
  | "app";

export type AppStatus = "live" | "coming-soon";

/** Drives which sections appear in the generated privacy policy / terms. */
export type PrivacyProfile = {
  /** Collects an email / account info. */
  account: boolean;
  /** Uses Sign in with Apple and/or Google to authenticate (name + email come from the provider). */
  socialSignIn: boolean;
  /** Uses usage analytics (e.g. Google Analytics / Firebase). */
  analytics: boolean;
  /** Shows third-party ads (e.g. Google AdMob). */
  ads: boolean;
  /** Requests camera access. */
  camera: boolean;
  /** Requests photo library access. */
  photos: boolean;
  /** Sends user content to a third-party AI provider for processing. */
  aiProcessing: boolean;
  /** Stores health/fitness related data. */
  health: boolean;
  /** Offers in-app purchases or subscriptions. */
  purchases: boolean;
  /** Lets users create/submit content. */
  userContent: boolean;
  /** Stores account data / user content on our servers and syncs it across the user's devices. */
  cloudSync: boolean;
};

export type AppData = {
  slug: string;
  name: string;
  tagline: string;
  /** One or two sentences, used on cards and as the detail intro. */
  description: string;
  /** Optional extra paragraphs for the detail page. */
  longDescription?: string[];
  category: string;
  status: AppStatus;
  /**
   * Numeric App Store ID (the digits after `id` in the store URL).
   *
   * This — not `appStoreUrl` — is what `<StoreLink />` uses to build the
   * `itms-apps://` handoff that survives Instagram's in-app browser.
   */
  appStoreId?: string;
  /**
   * App Store link. Leave undefined while the app is in development.
   *
   * Keep this in the country-less `https://apps.apple.com/app/id<id>` form so
   * Apple routes each visitor to their own storefront. A `/in/` or `/us/`
   * segment pins everyone to one country.
   */
  appStoreUrl?: string;
  icon: AppIconKey;
  /** Icon tile gradient (applied via inline style, so any CSS color works). */
  gradient: { from: string; to: string };
  /** Short feature highlights for the detail page. */
  features?: string[];
  privacy: PrivacyProfile;
};

export const apps: AppData[] = [
  {
    slug: "gymledger",
    name: "GymLedger",
    tagline: "Your strength training, in one clean log.",
    description:
      "Plan workouts, log every set, and watch your strength trend upward over time.",
    longDescription: [
      "GymLedger keeps your training simple: build routines, log sets and reps as you go, and review your progress with clear charts.",
      "Your training data lives on your device, so your log stays private and works whether or not you are online.",
    ],
    category: "Health & Fitness",
    status: "live",
    appStoreId: "6762124792",
    appStoreUrl: "https://apps.apple.com/app/id6762124792",
    icon: "dumbbell",
    gradient: { from: "#10b981", to: "#0d9488" },
    features: [
      "Build and reuse custom routines",
      "Fast set-by-set logging",
      "Progress charts for every lift",
      "Works offline — data stays on your device",
    ],
    privacy: {
      account: false,
      socialSignIn: false,
      analytics: true,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: true,
      purchases: true,
      userContent: false,
      cloudSync: false,
    },
  },
  {
    slug: "active-recall",
    name: "Active Recall",
    tagline: "Remember more with spaced repetition.",
    description:
      "Turn your notes, PDFs and photos into flashcards, and review each one at the moment you were about to forget it.",
    longDescription: [
      "Active Recall is built on the two study techniques with the strongest evidence behind them: retrieval practice and spacing. Reviews are scheduled by FSRS, a modern spaced-repetition algorithm that models how your memory for each card decays and learns from your own review history, rather than using fixed intervals.",
      "Make cards by hand in a fast, keyboard-first editor, or hand it a page of notes, a PDF or a photo and let it draft the deck for you. Sign in with Apple or Google and your decks, streak and review history follow you to any device.",
      "Your first 10 chapters are free, forever. Active Recall Plus unlocks unlimited chapters and AI card generation. There are no ads, ever.",
    ],
    category: "Education",
    status: "coming-soon",
    icon: "brain",
    gradient: { from: "#8b5cf6", to: "#4f46e5" },
    features: [
      "FSRS scheduling that learns from your own reviews",
      "Turn notes, PDFs and photos into cards with AI",
      "Cloze deletion cards, plus a fast keyboard-first editor",
      "Streaks, forecasts and progress charts",
      "Syncs across your devices — and works offline",
    ],
    privacy: {
      account: true,
      socialSignIn: true,
      analytics: false,
      ads: false,
      camera: false,
      photos: true,
      aiProcessing: true,
      health: false,
      purchases: true,
      userContent: true,
      cloudSync: true,
    },
  },
  {
    slug: "affirmations",
    name: "Daily Affirmations - Desire",
    tagline: "A calmer, more positive mindset, daily.",
    description:
      "Curated daily affirmations across calming themes — plus your own affirmations, favorites, and gentle reminders.",
    longDescription: [
      "Daily Affirmations - Desire gives you hand-written affirmations across themes like Morning, Night, Calm, Gratitude, Confidence, Self-Love, Focus, and Sleep — and lets you write your own and organize them into custom categories.",
      "Save the lines that resonate, personalize the fonts and look, and set daily reminders at the times that suit you. Sign in with Apple or Google and your affirmations, favorites, and settings sync across your devices.",
    ],
    category: "Health & Fitness",
    status: "live",
    appStoreId: "6782949150",
    appStoreUrl: "https://apps.apple.com/app/id6782949150",
    icon: "sparkles",
    gradient: { from: "#f43f5e", to: "#f97316" },
    features: [
      "Curated affirmations across calming themes",
      "Write your own affirmations and categories",
      "Save favorites and personalize fonts & themes",
      "Daily reminders at the times you choose",
      "Sign in to sync across your devices",
    ],
    privacy: {
      account: true,
      socialSignIn: true,
      analytics: false,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: false,
      purchases: true,
      userContent: true,
      cloudSync: true,
    },
  },
  {
    slug: "recurra",
    name: "Recurra",
    tagline: "Everything you're paying for, on one screen.",
    description:
      "A subscription manager that warns you before each renewal and keeps the whole list on your iPhone — no bank login, no account.",
    longDescription: [
      "Recurra puts every subscription you pay for on one screen and shows what they really cost each month, amortising annual plans instead of letting them spike. Pick a service from a bundled catalogue of 252 and the price, billing cycle and cancellation route are already filled in.",
      "Every renewal is announced twice — seven days out, while cancelling is still easy, and again the day before. Free trials get their own reminder before they convert.",
      "Your statements never leave your phone. Screenshots, spreadsheets and PDFs are read entirely on-device using Apple's own text recognition. There is no Recurra account, no bank link and no analytics. Recurra is a one-time purchase, because paying a subscription to manage subscriptions would be a joke at your expense.",
    ],
    category: "Finance",
    status: "coming-soon",
    icon: "flame",
    gradient: { from: "#E8A33D", to: "#B87A26" },
    features: [
      "Every subscription on one screen, with the real monthly total",
      "Renewal reminders seven days out and again the day before",
      "Screenshot and CSV import, read entirely on your device",
      "Cancel assist, plus a ledger of what you stopped paying",
      "One payment — never a subscription",
    ],
    privacy: {
      account: false,
      socialSignIn: false,
      analytics: false,
      ads: false,
      camera: false,
      // Screenshot import reads an image the user picks from their library.
      photos: true,
      // On-device Vision only — nothing is sent to a third-party model.
      aiProcessing: false,
      health: false,
      purchases: true,
      // Subscriptions the user records stay on their device; nothing is submitted.
      userContent: false,
      // Optional iCloud sync writes to the user's own private database, not ours.
      cloudSync: false,
    },
  },
];

export function getAllApps(): AppData[] {
  return apps;
}

export function getAppBySlug(slug: string): AppData | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getAppSlugs(): string[] {
  return apps.map((app) => app.slug);
}

/** The plain web URL. Country-less, so Apple picks the visitor's storefront. */
export function webStoreUrl(appStoreId: string): string {
  return `https://apps.apple.com/app/id${appStoreId}`;
}

/**
 * The App Store's own URL scheme.
 *
 * On iOS, `apps.apple.com` answers a mobile user-agent with a 301 to
 * `itms-appss://`. Safari follows that fine, but an embedded WKWebView — which
 * is what Instagram, Facebook and friends use — has no handler for a non-http
 * scheme arriving mid-redirect, so the navigation dies and the user is left
 * staring at a blank page. Handing iOS the scheme directly from a real tap
 * skips the redirect entirely.
 */
export function schemeStoreUrl(appStoreId: string): string {
  return `itms-apps://apps.apple.com/app/id${appStoreId}`;
}

/**
 * Apps that are actually on the App Store.
 *
 * Drives the `/get/<slug>` install pages — there is nothing to redirect to for
 * an app that has not shipped yet.
 */
export function getLaunchedApps(): AppData[] {
  return apps.filter((app) => Boolean(app.appStoreId));
}
