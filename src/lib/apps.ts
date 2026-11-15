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
import type { LegalSection } from "./legal";

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

/**
 * App-specific additions to the generated legal documents, for practices the
 * shared flags can't express (a keyboard extension, an anonymous device
 * identifier, usage allowances…). Every field only adds to that app's own
 * documents — `purchaseTerms` and `effectiveDate` replace the generic text for
 * that app alone — so apps without `legal` render exactly as before.
 */
export type AppLegalExtras = {
  /** "Last updated" for this app's documents, when it differs from the site-wide date. */
  effectiveDate?: string;
  /** Extra "Information We Collect" bullets, before the "Information you send us directly" one. */
  collect?: string[];
  /** Whole privacy-policy sections, inserted after "Information We Collect". */
  privacySections?: LegalSection[];
  /** Extra "How We Use Your Information" bullets, before "Respond to your requests". */
  uses?: string[];
  /** Extra "Third-Party Services" bullets, after the generic ones. */
  thirdParties?: string[];
  /** Extra "Data Retention" paragraphs. */
  retention?: string[];
  /** Extra "Your Rights and Choices" bullets, before the contact line. */
  rights?: string[];
  /** Extra "you agree not to" bullets in the Terms. */
  prohibitedUses?: string[];
  /** Whole Terms sections, inserted after "Eligibility and Acceptable Use". */
  termsSections?: LegalSection[];
  /** Replaces the generic paragraphs of "Purchases, Subscriptions, and Refunds". */
  purchaseTerms?: string[];
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
  /** Public product website, when the app also has a dedicated web presence. */
  websiteUrl?: string;
  icon: AppIconKey;
  /** Icon tile gradient (applied via inline style, so any CSS color works). */
  gradient: { from: string; to: string };
  /** Short feature highlights for the detail page. */
  features?: string[];
  privacy: PrivacyProfile;
  /**
   * Named third-party processors, when the generic examples in the legal
   * documents would be wrong for this app. Omit to keep the generic wording.
   */
  processors?: {
    /** The AI provider that processes submitted content, e.g. "OpenAI". */
    ai?: string;
    /** True when images are read on-device and only extracted text is sent to the AI provider. */
    aiReceivesTextOnly?: boolean;
    /**
     * What the AI provider receives, completing "<provider>, which processes …".
     * Defaults to "the content you submit (such as text you scan, paste or search for)".
     */
    aiInput?: string;
    /** A subscription-management service, e.g. "RevenueCat". */
    subscriptions?: string;
  };
  /** App-specific additions to the generated legal documents. */
  legal?: AppLegalExtras;
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
      "Sign in with Apple, Google or email to keep your workouts and progress securely synced across your iPhones.",
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
      "Secure account sync across your iPhones",
    ],
    privacy: {
      account: true,
      socialSignIn: true,
      analytics: true,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: true,
      purchases: true,
      userContent: true,
      cloudSync: true,
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
    status: "live",
    appStoreId: "6802939557",
    appStoreUrl: "https://apps.apple.com/app/id6802939557",
    websiteUrl: "https://activerecalling.com",
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
  {
    slug: "meaningly",
    name: "Meaningly",
    tagline: "Point your camera at any word and understand it.",
    description:
      "Scan any page and Meaningly explains the words you might not know — what they mean in that exact sentence, how to say them, and how to use them.",
    longDescription: [
      "Point your iPhone at a book, article, menu or sign. Meaningly reads the text on your device, picks out the words that are likely new to you based on your reading level, and explains each one in the context of the sentence it came from — with pronunciation, every dictionary sense, examples, synonyms and the word's origin.",
      "Read in 25 languages and get explanations in 39. Search any word, keep favorites, get a Word of the Day, and see your reading week at a glance. There's no account to create: Meaningly Pro starts with a 7-day free trial, then continues weekly or yearly.",
    ],
    category: "Reference",
    status: "coming-soon",
    icon: "app",
    gradient: { from: "#FFA348", to: "#F2570C" },
    features: [
      "Explains words in the context of your sentence",
      "Live camera scanning — tap a line or explain the whole page",
      "Pronunciation, senses, examples, synonyms and origins",
      "Read in 25 languages, explanations in 39",
      "Word of the Day and a weekly reading summary",
      "No account — your library stays on your iPhone",
    ],
    privacy: {
      account: false,
      socialSignIn: false,
      analytics: false,
      ads: false,
      camera: true,
      // Scanning is the live camera only; the photo library is never accessed.
      photos: false,
      // Recognised text (never the image) is sent to OpenAI to write the explanations.
      aiProcessing: true,
      health: false,
      purchases: true,
      // Saved words stay on the device; nothing is published or shared.
      userContent: false,
      cloudSync: false,
    },
    processors: {
      ai: "OpenAI",
      aiReceivesTextOnly: true,
      subscriptions: "RevenueCat",
    },
  },
  {
    slug: "typemuse",
    name: "TypeMuse",
    tagline: "An AI keyboard for better writing, in every app.",
    description:
      "Rewrite any text in the tone you want, fix grammar in one tap, and get AI help with replies, captions and summaries — right from your keyboard.",
    longDescription: [
      "TypeMuse is a keyboard for iPhone that rewrites what you've typed in the tone you choose — Professional, Casual, Polite, Romantic, Funny, Witty, Gen-Z and more — and fixes grammar and spelling in a single tap, in any app where you type.",
      "AI assistants draft replies, pickup lines, posts and Instagram or Facebook captions, summarise and explain long text, add emoji, continue your writing and suggest idioms. Create your own tones and assistants, and translate before you send.",
      "There's no account and no ads. Ordinary typing never leaves your iPhone: only the text you choose to send with an AI action is processed, and it isn't stored. Every install starts with 10,000 free AI tokens, and TypeMuse Pro adds a generous monthly allowance.",
    ],
    category: "Productivity",
    status: "coming-soon",
    icon: "sparkles",
    gradient: { from: "#6D5BFF", to: "#FF7A59" },
    features: [
      "Rewrite any text in Professional, Casual, Polite, Funny, Gen-Z and more",
      "Fix grammar and spelling in one tap",
      "AI assistants for replies, captions, summaries, emoji and more",
      "Your own custom tones and assistants",
      "Translate before you send",
      "No account, no ads — your typing stays on your iPhone",
    ],
    privacy: {
      account: false,
      socialSignIn: false,
      analytics: false,
      ads: false,
      camera: false,
      photos: false,
      // Text the user sends with an AI action goes to OpenAI via our Worker; not stored.
      aiProcessing: true,
      health: false,
      purchases: true,
      // Custom tones/assistants stay on the device; nothing is published or shared.
      userContent: false,
      // Only a token count and subscription status are kept server-side, keyed to an
      // anonymous device identifier — no account data or content is synced.
      cloudSync: false,
    },
    processors: {
      ai: "OpenAI",
      aiInput: "the text you choose to send with an AI action",
      subscriptions: "RevenueCat",
    },
    legal: {
      effectiveDate: "November 13, 2026",
      collect: [
        "Text you choose to send with an AI action — the contents of the current text field, or the text you have selected, at the moment you tap an action such as a tone, grammar fix, assistant or translation. It is used only to create your result and is not stored by us.",
        "A random, anonymous identifier that the app creates on your device and keeps in your device's Keychain. It is not derived from your name, email address, phone number, Apple ID or any device identifier, and we use it only to count your free AI tokens and to link your subscription status.",
        "Your AI token usage and subscription status, which our server stores against that anonymous identifier.",
        "Purchase information — such as purchase receipts and subscription status — processed by Apple and by RevenueCat when you subscribe.",
      ],
      privacySections: [
        {
          id: "keyboard-and-full-access",
          title: "The TypeMuse Keyboard and Full Access",
          body: [
            "TypeMuse includes a custom keyboard. Because a keyboard sees what you type, here is exactly what it does with it.",
          ],
          list: [
            "Ordinary keystrokes are never logged, stored, or transmitted. Nothing you type leaves your device unless you tap an AI action.",
            "When you tap an AI action, only the text that action works on — the current text field's contents, or your selection — is sent, and only to produce that result.",
            'iOS asks you to "Allow Full Access" before a keyboard can use the network. TypeMuse needs Full Access only to send the text for the AI actions you tap and receive the result, and to provide haptic feedback. You can type without it; the AI features need it.',
            "iOS switches to the system keyboard in password fields, so TypeMuse never sees what you type there.",
            "Your custom tones, custom assistants, and settings are stored only on your device, in storage shared between the TypeMuse app and its keyboard.",
          ],
        },
        {
          id: "how-ai-actions-work",
          title: "How AI Actions Work",
          body: [
            "When you tap an AI action, the text is sent over an encrypted (HTTPS) connection to our server, which runs on Cloudflare Workers, together with your anonymous identifier so we can count the tokens it uses. Our server passes the text to OpenAI, which generates the result, and sends the result back to your device.",
            "We do not store the text you send or the result. OpenAI processes it under its API data policy: data sent through OpenAI's API is not used to train its models by default, and OpenAI may retain it for up to 30 days to monitor for abuse before deleting it, unless it is legally required to keep it longer.",
            "Please don't send passwords, payment details, or other sensitive information with an AI action.",
          ],
        },
      ],
      uses: [
        "Perform the AI actions you request and return the result to you.",
        "Count AI tokens against your free allowance or your subscription's monthly allowance, and check your subscription status.",
      ],
      thirdParties: [
        "Cloudflare, which hosts our server (Cloudflare Workers) and relays the text you send with an AI action to OpenAI.",
      ],
      retention: [
        "The text you send with an AI action is not stored by us; OpenAI's retention is described above. Your token count and subscription status are kept on our server against your anonymous identifier for as long as they are needed to apply your free allowance and your subscription. The identifier is kept in your device's Keychain, which may keep it even if you delete and reinstall the app. Your custom tones, assistants, and settings stay on your device and are removed when you delete the app.",
      ],
      rights: [
        "TypeMuse has no accounts, so the app never asks for your name, email address, or other contact details. The records our server keeps — your token count and subscription status — are tied to a random identifier rather than to you, so if you would like them deleted we may need your help to find them (for example, with an App Store purchase receipt).",
        "You can turn off Full Access or remove the TypeMuse keyboard at any time in Settings > General > Keyboard > Keyboards.",
      ],
      prohibitedUses: [
        "Use TypeMuse to harass, threaten, bully, impersonate, or deceive anyone, or to create spam, scams, or misinformation.",
        "Create or send content that is unlawful, sexually exploits or endangers minors, promotes violence or self-harm, or infringes anyone's intellectual property or privacy.",
        "Use the AI features in ways that break the usage policies of our AI provider, OpenAI.",
        "Access our server other than through the app, automate or script AI requests, or try to get around the free allowance or the Pro plan's limits — for example, by resetting or faking identifiers.",
      ],
      termsSections: [
        {
          id: "ai-features-and-your-text",
          title: "AI Features and Your Text",
          body: [
            "TypeMuse uses artificial intelligence to rewrite, correct, translate, and generate text. AI output can be inaccurate, incomplete, offensive, or unsuitable for your purpose, and it may not say what you meant. Always review a result before you use or send it.",
            "You are responsible for the text you send with an AI action and for anything you choose to send, post, or publish using a result. Results are not professional advice, so don't rely on them for legal, medical, financial, or other important decisions.",
            "You keep any rights you have in the text you send, and you may use the results for any lawful purpose. Results may be similar or identical to results generated for other people, and we don't promise that they are unique or free of third-party rights.",
            "To create a result, your text is processed by our server and by our AI provider, OpenAI, as described in our Privacy Policy.",
          ],
        },
        {
          id: "free-allowance-and-fair-use",
          title: "Free Allowance and Fair Use",
          body: [
            "Each device gets a one-time free allowance of 10,000 AI tokens. Tokens measure how much text an AI action processes, so longer text uses more of them. The free allowance is given once per device and is not restored by deleting and reinstalling the app.",
            "TypeMuse Pro includes a high monthly AI allowance intended for normal personal use. It is not unlimited: to keep the service fast and affordable for everyone, we may limit or suspend AI features for usage that goes far beyond normal personal use, is automated, or is abusive. If you reach the monthly allowance, AI features may be unavailable until it resets at the start of your next billing period. Ordinary typing always keeps working.",
          ],
        },
      ],
      purchaseTerms: [
        "TypeMuse is free to download and includes the one-time free allowance described above. TypeMuse Pro is an optional auto-renewing monthly subscription that adds a high monthly AI allowance, subject to fair use.",
        "The price is shown in the app, in your local currency, before you buy. Payment is charged to your Apple ID account when you confirm the purchase. Your subscription renews automatically each month unless you cancel it at least 24 hours before the end of the current period, and your account is charged for the renewal within the 24 hours before the period ends.",
        "You can manage or cancel your subscription in your Apple ID account settings (Settings > your name > Subscriptions). Cancelling stops future renewals; you keep Pro until the end of the period you have already paid for.",
        "Purchases are processed by Apple, and refunds are handled by Apple under its own policies.",
      ],
    },
  },
  {
    slug: "sweepy",
    name: "Sweepy",
    tagline: "Swipe your camera roll clean.",
    description:
      "Swipe left to toss, right to keep. Sweepy turns clearing out your camera roll into a quick, oddly satisfying game, and nothing is deleted until you say so.",
    longDescription: [
      "Sweepy shows your photos and videos one at a time. Swipe left to toss, swipe right to keep. Work through them month by month, or jump straight to the usual suspects: screenshots, videos, Live Photos and selfies.",
      "Tossed photos wait in a Bin so you can double-check them, and nothing is deleted until you confirm it. iOS keeps deleted items in Recently Deleted for 30 days, so mistakes are easy to undo.",
      "There is no account and no sign-in. Your photos never leave your iPhone. Sweepy is free for 50 swipes a day; Sweepy Pro removes the limit.",
    ],
    category: "Photo & Video",
    status: "coming-soon",
    icon: "sparkles",
    gradient: { from: "#A0C27F", to: "#6E9A4F" },
    features: [
      "Swipe left to toss, right to keep",
      "Smart piles: screenshots, videos, Live Photos, selfies, recents",
      "Every month of your library, with progress for each",
      "A Bin to review before anything is deleted",
      "Streaks and stats, including how much space you freed",
      "No account, no ads, and your photos never leave your iPhone",
    ],
    privacy: {
      account: false,
      socialSignIn: false,
      analytics: false,
      ads: false,
      camera: false,
      // Reads the photo library to show items for sorting, and deletes only what the user confirms.
      photos: true,
      aiProcessing: false,
      health: false,
      purchases: true,
      userContent: false,
      cloudSync: false,
    },
    legal: {
      effectiveDate: "November 13, 2026",
      privacySections: [
        {
          id: "how-sweepy-uses-your-photo-library",
          title: "How Sweepy Uses Your Photo Library",
          body: [
            "Sweepy asks for access to your photo library so it can show you your photos and videos one at a time and delete the ones you choose. Here is exactly what it does with that access.",
          ],
          list: [
            "Your photos, videos and their details (such as dates and locations) are read on your iPhone only. They are never uploaded, copied to a server, or shared with anyone, including us.",
            "Your decisions (what you kept or tossed), your Bin and your stats are stored only in the app's private storage on your device. Deleting the app deletes them.",
            "Sweepy never deletes anything on its own. Items are deleted only after you confirm in the iOS system prompt, and iOS keeps them in Recently Deleted for 30 days.",
            "If you tap the heart on a photo, Sweepy marks it as a Favorite in your Photos library. It makes no other changes.",
            "You can limit which photos Sweepy can see, or turn off access entirely, in Settings > Privacy & Security > Photos.",
          ],
        },
      ],
      purchaseTerms: [
        "Sweepy is free to download and includes 50 swipes per day. Sweepy Pro removes the daily limit and is offered as a weekly or yearly auto-renewing subscription, or as a one-time lifetime purchase. The price is shown in the app, in your local currency, before you buy.",
        "Payment is charged to your Apple ID account when you confirm the purchase. Subscriptions renew automatically unless you cancel at least 24 hours before the end of the current period, and your account is charged for the renewal within the 24 hours before the period ends. If a free trial is offered, any unused part of it ends when you buy a subscription.",
        "You can manage or cancel your subscription in your Apple ID account settings (Settings > your name > Subscriptions). Cancelling stops future renewals; you keep Pro until the end of the period you have already paid for.",
        "Purchases are processed by Apple, and refunds are handled by Apple under its own policies.",
      ],
    },
  },
  {
    slug: "neurotype",
    name: "Neurotype",
    tagline: "Name every part of the human body.",
    description:
      "A Duolingo-style anatomy trainer for biology students: name the glowing part of the brain, heart, skeleton, organs, eye and ear by typing, speaking, choosing or tapping.",
    longDescription: [
      "Neurotype turns anatomy diagrams into short, game-like lessons. Each one introduces a few new parts, then asks you to name them in different ways — type over the letters, type from memory, say the name out loud, pick it from four, or find it on the diagram.",
      "Streaks, XP, a daily goal, badges, a 60-second Rush mode and a daily challenge keep you coming back, and spaced repetition brings back the parts you're about to forget. It works in English, Spanish, French, German, Italian, Portuguese and Hindi, in light or dark.",
      "There's no account and no ads, and your progress stays on your device.",
    ],
    category: "Education",
    status: "coming-soon",
    icon: "brain",
    gradient: { from: "#FD9ECF", to: "#5EEAD4" },
    features: [
      "78 parts across the brain, heart, skeleton, torso organs, eye and ear",
      "Answer by typing, speaking, multiple choice or tapping the diagram",
      "Streaks, XP, daily goals, badges and a 60-second Rush",
      "Spaced repetition brings back what you're about to forget",
      "7 languages, light and dark themes",
      "No account, no ads — progress stays on your device",
    ],
    privacy: {
      account: false,
      socialSignIn: false,
      analytics: false,
      ads: false,
      camera: false,
      photos: false,
      aiProcessing: false,
      health: false,
      purchases: false,
      userContent: false,
      cloudSync: false,
    },
    legal: {
      effectiveDate: "November 14, 2026",
      collect: [
        "Your learning progress — XP, streak, completed lessons, badges, settings and how well you know each body part. It is stored only on your device and is never sent to us.",
        "Your voice, only during a speaking exercise after you tap the microphone. It is used to recognise the name you say and is not recorded or stored by us (see “Microphone and Speech Recognition” below).",
      ],
      privacySections: [
        {
          id: "microphone-and-speech",
          title: "Microphone and Speech Recognition",
          body: [
            "Speaking exercises are optional. iOS asks for your permission before Neurotype can use the microphone or speech recognition, and you can turn speaking exercises off in the app's settings or revoke access at any time in the Settings app.",
          ],
          list: [
            "Neurotype listens only after you tap the microphone in a speaking exercise, and stops as soon as your answer is recognised or you tap again.",
            "Speech is turned into text by Apple's Speech framework. When your device supports it for your language, recognition happens entirely on your device; otherwise Apple processes the audio under Apple's own privacy policy.",
            "The recognised text is compared with the correct answer and then discarded. We never receive, record or store your audio or transcripts.",
            "Body-part names are read aloud with your device's built-in text-to-speech voices, on your device.",
          ],
        },
      ],
      thirdParties: [
        "Apple's Speech Recognition service, which may process audio from speaking exercises when on-device recognition isn't available for your language.",
      ],
      retention: [
        "Because your progress is stored only on your device, it stays until you reset it in the app's settings or delete the app.",
      ],
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
