export const siteConfig = {
  name: "Bizzed",
  description:
    "Leverage cutting-edge AI to discover, analyze, and acquire businesses with unprecedented speed and accuracy. Transform your investment strategy today.",
  url: "https://bizzed.com",
  ogImage: "https://bizzed.com/og.png",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navLinks: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/features#integrations" },
    { label: "Changelog", href: "/blog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/about#contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const socialLinks = [
  { label: "Twitter", href: "https://twitter.com/bizzed" },
  { label: "GitHub", href: "https://github.com/bizzed" },
  { label: "LinkedIn", href: "https://linkedin.com/company/bizzed" },
] as const;
