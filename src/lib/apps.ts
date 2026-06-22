/**
 * The catalogue of iOS apps shown on the site.
 *
 * To add an app: append an entry to the `apps` array below. Each app
 * automatically gets:
 *   - a card on the home page and /apps
 *   - a detail page at /apps/<slug>
 *   - a privacy policy at /apps/<slug>/privacy
 *   - terms at /apps/<slug>/terms
 *
 * The `privacy` flags drive which sections appear in the generated legal
 * documents, so set them honestly for each app.
 */

/** Lucide icon keys supported by <AppIcon />. Add more in app-icon.tsx. */
export type AppIconKey =
  | "dumbbell"
  | "brain"
  | "sparkles"
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
  /** App Store link. Leave undefined while the app is in development. */
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
    status: "coming-soon",
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
      "Turn anything you are learning into smart flashcards and review them at the perfect time.",
    longDescription: [
      "Active Recall uses spaced repetition to schedule reviews right before you would forget, so study time turns into long-term memory.",
      "Create decks for any subject, study in quick sessions, and keep your streak going.",
    ],
    category: "Education",
    status: "coming-soon",
    icon: "brain",
    gradient: { from: "#8b5cf6", to: "#4f46e5" },
    features: [
      "Spaced-repetition scheduling",
      "Create unlimited decks and cards",
      "Quick daily review sessions",
      "Progress and streak tracking",
    ],
    privacy: {
      account: true,
      socialSignIn: false,
      analytics: true,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: false,
      purchases: true,
      userContent: true,
      cloudSync: false,
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
    status: "coming-soon",
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
