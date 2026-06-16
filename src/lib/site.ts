/**
 * Central site configuration.
 *
 * Edit the values here once and they flow through the whole site — header,
 * footer, metadata, and the generated privacy policy & terms.
 */
export const site = {
  /** Short brand / wordmark shown in the header and footer. */
  name: "rsaluja",
  /** Default page title and SEO name. */
  title: "rsaluja",
  /** One-line tagline used in the hero and metadata. */
  tagline: "iOS apps, thoughtfully made.",
  /** Longer description used for SEO / Open Graph. */
  description:
    "rsaluja is the home of iOS apps by Rohit Saluja — with the privacy policy and terms for each app, plus help and contact.",
  /** The person/brand behind the apps (shown in the footer). */
  author: "Rohit Saluja",

  /**
   * Legal entity name used throughout the Privacy Policy and Terms.
   * Change this to a registered company name if/when you have one.
   */
  legalEntity: "Rohit Saluja",
  /**
   * Governing law for the Terms & Conditions.
   * TODO: confirm this matches the jurisdiction you actually operate from.
   */
  jurisdiction: "India",
  /**
   * Shown as "Last updated" on the Privacy Policy and Terms.
   * Update whenever you change the legal text.
   */
  legalEffectiveDate: "June 16, 2026",

  /** Canonical domain + URL (used for metadata and canonical links). */
  domain: "rsaluja.com",
  url: "https://rsaluja.com",
  /** Public contact address shown across the site and in legal pages. */
  email: "contact@rsaluja.com",

  /** Primary header navigation. */
  nav: [
    { label: "Apps", href: "/apps" },
    { label: "Help", href: "/help" },
    { label: "Contact", href: "/contact" },
  ],

  /** Footer link groups. */
  footerNav: {
    Product: [{ label: "All apps", href: "/apps" }],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

export type SiteConfig = typeof site;
