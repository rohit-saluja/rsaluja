/**
 * Generates the Privacy Policy and Terms & Conditions as structured data.
 *
 * The same builders power both the site-wide documents (/privacy, /terms)
 * and the per-app documents (/apps/<slug>/privacy, /apps/<slug>/terms):
 *   - call with no app  -> a general policy that covers "our apps"
 *   - call with an app  -> a tailored policy that references the app by name
 *     and only includes the sections relevant to that app's data practices.
 *
 * NOTE: This text is a solid, plain-English starting point — it is not legal
 * advice. Review it (ideally with a professional) before publishing, and make
 * sure it matches what each app actually does.
 */
import { site } from "./site";
import type { AppData, PrivacyProfile } from "./apps";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
  list?: string[];
};

export type LegalDoc = {
  kind: "privacy" | "terms";
  title: string;
  /** e.g. "GymLedger" or "rsaluja apps & services" */
  appliesTo: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
};

/** Assume the broadest set of practices for the general, site-wide policy. */
const GENERAL_PROFILE: PrivacyProfile = {
  account: true,
  socialSignIn: true,
  analytics: true,
  ads: true,
  camera: true,
  photos: true,
  aiProcessing: true,
  health: false,
  purchases: true,
  userContent: true,
  cloudSync: true,
};

type Ctx = {
  isApp: boolean;
  /** Value for the "Applies to" line. */
  appliesTo: string;
  /** "the app" (app) or "our apps" (site). */
  noun: string;
  /** "The app" / "Our apps". */
  nounCap: string;
  /** "is" (app) / "are" (site). */
  be: string;
  /** app name (app) / "our apps and services" (site). */
  appsRef: string;
  /** "Some of our apps" framing helper for site scope. */
  someApps: string;
  flags: PrivacyProfile;
};

function contextFor(app?: AppData): Ctx {
  if (app) {
    return {
      isApp: true,
      appliesTo: app.name,
      noun: "the app",
      nounCap: "The app",
      be: "is",
      appsRef: app.name,
      someApps: app.name,
      flags: app.privacy,
    };
  }
  return {
    isApp: false,
    appliesTo: `${site.name} apps & services`,
    noun: "our apps",
    nounCap: "Our apps",
    be: "are",
    appsRef: "our apps and services",
    someApps: "Some of our apps",
    flags: GENERAL_PROFILE,
  };
}

function compact(items: Array<string | false | null | undefined>): string[] {
  return items.filter((x): x is string => Boolean(x));
}

/* ------------------------------ Privacy Policy ----------------------------- */

export function getPrivacyDoc(app?: AppData): LegalDoc {
  const c = contextFor(app);
  const f = c.flags;
  const sections: LegalSection[] = [];

  // Information We Collect
  sections.push({
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      `We aim to collect as little personal information as possible. Depending on the features you use, ${c.noun} may collect the following:`,
    ],
    list: compact([
      f.account &&
        (f.socialSignIn
          ? "Account information — your name and email address — that we receive from Apple or Google when you sign in using Sign in with Apple or Sign in with Google."
          : "Account information, such as an email address, that you provide voluntarily during onboarding or when you contact us."),
      f.cloudSync &&
        `Content and settings you create or save in ${c.noun} — such as the items you add, your favorites, and your in-app preferences — which are stored on our servers so that they can sync across your devices.`,
      f.analytics &&
        "Usage and device data — such as in-app interactions, device model, operating system version, and crash diagnostics — collected to understand how the app is used and to fix problems.",
      f.ads &&
        "Advertising identifiers, which may be processed by third-party advertising partners to deliver and measure ads.",
      (f.camera || f.photos) &&
        "Photos or images that you explicitly choose to provide for features that need them (see the section on visual data below).",
      f.health &&
        "Health and fitness information that you enter, such as workouts, sets, or related metrics. This stays on your device unless you choose to back it up or sync it.",
      "Information you send us directly, such as the contents of support emails and feedback.",
    ]),
  });

  // Photos / visual data (only when relevant)
  if (f.camera || f.photos) {
    sections.push({
      id: "photos-images-and-visual-data",
      title: "Photos, Images, and Visual Data",
      body: compact([
        `With your permission, ${c.noun} may access your camera or photo library so you can ${
          f.aiProcessing
            ? "capture or choose images for features such as content generation and analysis"
            : "add images within the app"
        }.`,
        f.aiProcessing &&
          "To provide these features, images may be sent to third-party AI providers (for example, Google Gemini) for processing. They are used only to produce the result you asked for and are not used for facial recognition.",
        "Images are stored on your device and can be removed at any time from within the app or your device settings. You can revoke camera and photo permissions whenever you like in your device's privacy settings.",
      ]),
    });
  }

  // How We Use Your Information
  sections.push({
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: compact([
      "Provide, maintain, and improve the app and its features.",
      f.cloudSync &&
        "Store your content and settings and sync them across the devices where you are signed in.",
      f.analytics && "Understand how the app is used so we can make it better.",
      f.ads && "Display and measure advertising.",
      "Respond to your requests, feedback, and support enquiries.",
      "Detect, prevent, and address technical issues, fraud, or abuse.",
      "Comply with our legal obligations.",
    ]),
  });

  // Sharing
  sections.push({
    id: "sharing-your-information",
    title: "Sharing Your Information",
    body: [
      `We do not sell your personal information. We share information only as needed to operate ${c.appsRef}:`,
    ],
    list: [
      "With service providers who process data on our behalf (such as analytics and, where applicable, advertising and AI processing partners).",
      "When required by law, regulation, legal process, or an enforceable government request.",
      "To protect the rights, property, or safety of our users, the public, or us.",
      "In connection with a merger, acquisition, or sale of assets — in which case we will continue to protect your information.",
    ],
  });

  // Third-party services (only list what's used)
  const tp = compact([
    f.socialSignIn &&
      "Identity providers — Sign in with Apple and Sign in with Google — that authenticate you and provide your name and email address when you sign in.",
    f.cloudSync &&
      "Cloud hosting and database providers that store and process app data on our behalf so it can sync across your devices.",
    f.analytics &&
      "Analytics providers (for example, Google Analytics or Firebase) that help us understand app usage.",
    f.ads &&
      "Advertising providers (for example, Google AdMob) that deliver and measure ads.",
    f.aiProcessing &&
      "AI processing providers (for example, Google Gemini) that process content you submit to power certain features.",
    f.purchases &&
      "App stores (Apple App Store, and Google Play where applicable) that process purchases and subscriptions.",
  ]);
  if (tp.length > 0) {
    sections.push({
      id: "third-party-services",
      title: "Third-Party Services",
      body: [
        `${c.someApps} rel${c.isApp ? "ies" : "y"} on trusted third-party services, each of which has its own privacy policy governing how it handles your information:`,
      ],
      list: tp,
    });
  }

  // Data retention
  sections.push({
    id: "data-retention",
    title: "Data Retention",
    body: compact([
      f.cloudSync
        ? `We keep personal information only for as long as necessary to provide ${c.appsRef} and for the purposes described in this policy, unless a longer period is required by law.`
        : `We keep personal information only for as long as necessary to provide ${c.appsRef} and for the purposes described in this policy, unless a longer period is required by law. Information stored locally on your device remains until you delete it or uninstall the app.`,
      f.cloudSync &&
        "Your account and the content you sync are kept on our servers until you delete them or delete your account, after which they are removed from our active systems. Information cached on your device remains until you delete it or uninstall the app.",
    ]),
  });

  // Your rights
  sections.push({
    id: "your-rights-and-choices",
    title: "Your Rights and Choices",
    body: [
      "Depending on where you live, you may have rights over your personal information — including the right to access, correct, or delete it, and to object to or restrict certain processing.",
    ],
    list: compact([
      f.account
        ? f.cloudSync
          ? "You can delete your account at any time from within the app, which removes your account and the content you have synced from our servers. You can also contact us for help."
          : "You can update or delete your account information from within the app or by contacting us."
        : "Where we hold information about you, you can contact us to access or delete it.",
      f.ads &&
        "You can limit ad personalization through your device's privacy settings.",
      "You can revoke permissions (such as camera or photos) at any time in your device settings.",
      `You can reach us at ${site.email} to exercise any of these rights.`,
    ]),
  });

  // Security
  sections.push({
    id: "data-security",
    title: "Data Security",
    body: [
      "We use reasonable technical and organizational measures designed to protect your information. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.",
    ],
  });

  // Children
  sections.push({
    id: "childrens-privacy",
    title: "Children's Privacy",
    body: [
      `${c.nounCap} ${c.be} not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it. If you believe a child has provided us with personal information, please contact us.`,
    ],
  });

  // Changes
  sections.push({
    id: "changes-to-this-policy",
    title: "Changes to This Policy",
    body: [
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date shown at the top of this page. We encourage you to review this policy periodically.',
    ],
  });

  // Contact
  sections.push({
    id: "contact-us",
    title: "Contact Us",
    body: [
      `If you have any questions about this Privacy Policy or how your information is handled, contact us at ${site.email}.`,
    ],
  });

  return {
    kind: "privacy",
    title: "Privacy Policy",
    appliesTo: c.appliesTo,
    effectiveDate: site.legalEffectiveDate,
    intro: [
      c.isApp
        ? `This Privacy Policy explains how ${site.legalEntity} ("we", "us", or "our") handles your information in ${c.appsRef}.`
        : `This Privacy Policy explains how ${site.legalEntity} ("we", "us", or "our") handles information across ${c.appsRef}. Where an individual app publishes its own privacy policy, that policy applies to that app.`,
      `By using ${c.appsRef}, you agree to the practices described in this policy.`,
    ],
    sections,
  };
}

/* --------------------------- Terms & Conditions ---------------------------- */

export function getTermsDoc(app?: AppData): LegalDoc {
  const c = contextFor(app);
  const f = c.flags;
  const sections: LegalSection[] = [];

  sections.push({
    id: "eligibility-and-use",
    title: "Eligibility and Acceptable Use",
    body: [
      `You must be at least 13 years old (or the minimum age of digital consent in your country) to use ${c.appsRef}. By using ${c.noun}, you confirm that you meet this requirement.`,
      "When using the app, you agree not to:",
    ],
    list: [
      "Break any applicable law or regulation, or infringe anyone's rights.",
      "Attempt to gain unauthorized access to the app, our systems, or other users' data.",
      "Introduce malware or otherwise interfere with the app's normal operation.",
      "Reverse engineer, resell, or commercially exploit the app except as permitted by law.",
    ],
  });

  if (f.account) {
    sections.push({
      id: "accounts",
      title: "Accounts",
      body: [
        "Some features may require you to create an account or provide an email address. You are responsible for the information you provide and for keeping your credentials confidential. Please notify us promptly if you believe your account has been compromised. You may delete your account at any time from within the app or by contacting us.",
      ],
    });
  }

  if (f.userContent) {
    sections.push({
      id: "your-content",
      title: "Your Content",
      body: [
        "You may be able to create or submit content (such as notes, decks, or other materials). You keep ownership of the content you create.",
        f.cloudSync
          ? "You grant us a limited, worldwide, royalty-free, non-exclusive license to host, store, sync, and display that content across your devices solely to operate and provide the app to you. You are responsible for ensuring your content does not violate any law or the rights of others."
          : "You grant us a limited, worldwide, royalty-free, non-exclusive license to host, store, and display that content solely to operate and provide the app to you. You are responsible for ensuring your content does not violate any law or the rights of others.",
      ],
    });
  }

  if (f.purchases) {
    sections.push({
      id: "purchases-and-refunds",
      title: "Purchases, Subscriptions, and Refunds",
      body: [
        "The app may offer one-time purchases or subscriptions. Prices and what is included are shown before you buy. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period, and you can manage or cancel them in your device's account settings.",
        "Purchases are processed by the relevant app store, and refunds are handled under that store's policies: refunds for purchases on the Apple App Store are subject to Apple's procedures, and refunds on Google Play (where applicable) are subject to Google's policies.",
      ],
    });
  }

  sections.push({
    id: "privacy",
    title: "Privacy",
    body: [
      `Your use of ${c.noun} is also governed by our Privacy Policy, which explains how we handle your information. By using ${c.noun}, you consent to those practices.`,
    ],
  });

  sections.push({
    id: "intellectual-property",
    title: "Intellectual Property",
    body: [
      `The app, including its design, text, graphics, and software, is owned by ${site.legalEntity} and protected by intellectual property laws. We grant you a personal, non-transferable, non-exclusive, revocable license to use the app for your own use. You may not copy, modify, distribute, or create derivative works from the app without our permission, except as allowed by law.`,
    ],
  });

  sections.push({
    id: "third-party-services",
    title: "Third-Party Services",
    body: [
      "The app may use or link to third-party services that have their own terms and privacy policies. We are not responsible for the content or practices of those third parties, and your use of them is at your own risk.",
    ],
  });

  sections.push({
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    body: compact([
      'The app is provided "as is" and "as available", without warranties of any kind, whether express or implied, including fitness for a particular purpose and non-infringement. We do not warrant that the app will be uninterrupted, error-free, or secure.',
      f.health &&
        "The app is for general informational and personal use only and is not medical, health, or professional advice. Always consult a qualified professional before making decisions about your health or training.",
    ]),
  });

  sections.push({
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: [
      `To the maximum extent permitted by law, ${site.legalEntity} will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or goodwill, arising from your use of (or inability to use) the app, even if we have been advised of the possibility of such damages.`,
    ],
  });

  // iOS consumption data consent — relevant to App Store distribution.
  sections.push({
    id: "consumption-data-apple",
    title: "Consent to Share Consumption Data with Apple",
    body: [
      "If you obtained the app from the Apple App Store, you agree that we may share information about your usage of the app (consumption data) with Apple to help resolve refund requests and reduce fraud, in accordance with Apple's requirements.",
    ],
  });

  sections.push({
    id: "termination",
    title: "Termination",
    body: [
      "We may suspend or end your access to the app at any time if you breach these Terms or if we discontinue the app. You may stop using the app at any time by uninstalling it. Provisions that by their nature should survive termination will continue to apply.",
    ],
  });

  sections.push({
    id: "changes-to-terms",
    title: "Changes to These Terms",
    body: [
      'We may update these Terms from time to time. When we do, we will revise the "Last updated" date at the top of this page. Your continued use of the app after changes take effect means you accept the updated Terms.',
    ],
  });

  sections.push({
    id: "governing-law",
    title: "Governing Law",
    body: [
      `These Terms are governed by the laws of ${site.jurisdiction}, without regard to its conflict-of-laws rules. Any disputes will be subject to the courts located in ${site.jurisdiction}, unless applicable law requires otherwise.`,
    ],
  });

  sections.push({
    id: "contact-us",
    title: "Contact Us",
    body: [
      `If you have any questions about these Terms, contact us at ${site.email}.`,
    ],
  });

  return {
    kind: "terms",
    title: "Terms & Conditions",
    appliesTo: c.appliesTo,
    effectiveDate: site.legalEffectiveDate,
    intro: [
      c.isApp
        ? `These Terms & Conditions ("Terms") govern your use of ${c.appsRef}. Please read them carefully.`
        : `These Terms & Conditions ("Terms") govern your use of ${c.appsRef}. Individual apps may provide additional or specific terms where noted.`,
      `By downloading, accessing, or using ${c.noun}, you agree to these Terms and to our Privacy Policy. If you do not agree, please do not use ${c.noun}.`,
    ],
    sections,
  };
}
