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
      analytics: true,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: true,
      purchases: true,
      userContent: false,
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
      analytics: true,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: false,
      purchases: true,
      userContent: true,
    },
  },
  {
    slug: "affirmations",
    name: "Affirmations",
    tagline: "A calmer, more positive mindset, daily.",
    description:
      "Gentle daily affirmations and reminders to help you build a kinder inner voice.",
    longDescription: [
      "Affirmations delivers thoughtful, uplifting prompts throughout your day and lets you save the ones that resonate.",
      "Personalize your themes, set reminders, and make a few seconds of mindfulness part of your routine.",
    ],
    category: "Health & Fitness",
    status: "coming-soon",
    icon: "sparkles",
    gradient: { from: "#f43f5e", to: "#f97316" },
    features: [
      "Daily curated affirmations",
      "Customizable reminders",
      "Save your favorites",
      "Themes for different moods and goals",
    ],
    privacy: {
      account: false,
      analytics: true,
      ads: true,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: false,
      purchases: true,
      userContent: false,
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
