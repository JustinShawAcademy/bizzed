import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { PricingPreview } from "@/components/blocks/pricing-preview";
import { ComparisonTable } from "@/components/blocks/comparison-table";
import { FaqAccordion } from "@/components/blocks/faq-accordion";
import { CtaSection } from "@/components/blocks/cta-section";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for teams of all sizes. Start free, scale as you grow, and only pay for what you need.",
};

const pricingTiers = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "For small teams getting started with modern analytics.",
    features: [
      "Up to 5 team members",
      "10 GB storage",
      "Basic analytics",
      "Email support",
      "API access",
      "3 projects",
    ],
    cta: "Start Free Trial",
    action: "checkout" as const,
  },
  {
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: "For growing businesses that need more power.",
    features: [
      "Up to 25 team members",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Workflow automation",
      "Unlimited projects",
    ],
    cta: "Start Free Trial",
    href: "/pricing",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "For large organizations with custom needs.",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Enterprise analytics",
      "Dedicated support",
      "Custom SLA",
      "SSO & SAML",
      "Audit logs",
      "On-premise option",
    ],
    cta: "Contact Sales",
    href: "/about#contact",
  },
];

const comparisonColumns = ["Starter", "Pro", "Enterprise"];

const comparisonCategories: {
  name: string;
  rows: { feature: string; values: (boolean | string)[] }[];
}[] = [
  {
    name: "Core Features",
    rows: [
      { feature: "Team members", values: ["Up to 5", "Up to 25", "Unlimited"] },
      { feature: "Storage", values: ["10 GB", "100 GB", "Unlimited"] },
      { feature: "Projects", values: ["3", "Unlimited", "Unlimited"] },
    ],
  },
  {
    name: "Analytics",
    rows: [
      { feature: "Basic analytics", values: [true, true, true] },
      { feature: "Advanced analytics", values: [false, true, true] },
      { feature: "Custom dashboards", values: [false, true, true] },
      { feature: "AI-powered insights", values: [false, false, true] },
    ],
  },
  {
    name: "Collaboration",
    rows: [
      { feature: "Real-time editing", values: [true, true, true] },
      { feature: "Guest access", values: [false, true, true] },
      { feature: "Video conferencing", values: [false, true, true] },
    ],
  },
  {
    name: "Security",
    rows: [
      { feature: "Two-factor auth", values: [true, true, true] },
      { feature: "SSO / SAML", values: [false, false, true] },
      { feature: "Audit logs", values: [false, false, true] },
      { feature: "Custom SLA", values: [false, false, true] },
    ],
  },
  {
    name: "Support",
    rows: [
      { feature: "Email support", values: [true, true, true] },
      { feature: "Priority support", values: [false, true, true] },
      { feature: "Dedicated CSM", values: [false, false, true] },
      { feature: "Custom onboarding", values: [false, false, true] },
    ],
  },
];

const faqItems = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes! All plans come with a 14-day free trial. No credit card required to start. You'll have full access to every feature in your chosen plan during the trial period.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the change takes effect at the start of your next billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards including Visa, Mastercard, and American Express. Enterprise customers can also pay via invoice with NET-30 terms.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. We offer a 30-day money-back guarantee on all plans. If you're not satisfied within the first 30 days, contact our support team for a full refund — no questions asked.",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer:
      "The Enterprise plan includes everything in Pro, plus unlimited team members, unlimited storage, SSO/SAML, audit logs, a custom SLA, a dedicated customer success manager, custom onboarding, and the option to deploy on-premise or in your own cloud.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer:
      "Yes. We offer 50% off for verified nonprofit organizations and educational institutions. Contact our sales team with proof of status to get set up.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "When your trial ends, you'll be prompted to choose a plan. If you don't subscribe, your account will be downgraded to a read-only state — you won't lose any data, but you won't be able to create new content until you subscribe.",
  },
];

export default function PricingPage() {
  return (
    <PageWrapper>
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Start free, scale as you grow. Every plan includes a 14-day trial
            with full access — no credit card required.
          </p>
        </div>
      </Section>

      <Section id="plans">
        <PricingPreview
          heading="Choose your plan"
          subheading="All plans include core features. Upgrade for advanced analytics, automation, and enterprise security."
          tiers={pricingTiers}
        />
      </Section>

      <Section id="compare" className="bg-muted/30">
        <ComparisonTable
          heading="Compare plans in detail"
          subheading="See exactly what's included in each plan."
          columns={comparisonColumns}
          categories={comparisonCategories}
          highlightColumn={1}
        />
      </Section>

      <Section id="faq">
        <FaqAccordion
          heading="Frequently asked questions"
          subheading="Everything you need to know about pricing, billing, and getting started."
          items={faqItems}
        />
      </Section>

      <CtaSection
        headline="Need a custom solution?"
        description="Our Enterprise plan is fully customizable. Talk to our sales team to build the perfect package for your organization."
        primaryCta={{ label: "Contact Sales", href: "/about#contact" }}
        secondaryCta={{ label: "Start Free Trial", href: "/pricing#plans" }}
      />
    </PageWrapper>
  );
}
