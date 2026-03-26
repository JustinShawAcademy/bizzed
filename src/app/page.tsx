import {
  BarChart3,
  Blocks,
  Globe,
  LineChart,
  MessageSquare,
  Shield,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/blocks/hero";
import { SocialProof } from "@/components/blocks/social-proof";
import { BentoGrid } from "@/components/blocks/bento-grid";
import { FeatureShowcase } from "@/components/blocks/feature-showcase";
import { StatsSection } from "@/components/blocks/stats-section";
import { Testimonials } from "@/components/blocks/testimonials";
import { PricingPreview } from "@/components/blocks/pricing-preview";
import { CtaSection } from "@/components/blocks/cta-section";

const companies = [
  "Vercel",
  "Stripe",
  "Shopify",
  "Linear",
  "Notion",
  "Figma",
  "Supabase",
  "Clerk",
];

const bentoItems = [
  {
    icon: <BarChart3 className="size-5 text-foreground" />,
    title: "Real-time Analytics",
    description:
      "Monitor your key metrics with live dashboards, instant alerts, and granular drill-downs — no data engineering required.",
  },
  {
    icon: <Blocks className="size-5 text-foreground" />,
    title: "200+ Integrations",
    description:
      "Connect with the tools your team already uses, from Slack and Salesforce to custom webhooks.",
  },
  {
    icon: <Shield className="size-5 text-foreground" />,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, and role-based access control.",
  },
  {
    icon: <Users className="size-5 text-foreground" />,
    title: "Team Collaboration",
    description:
      "Shared workspaces, real-time editing, and threaded discussions keep your team aligned.",
  },
  {
    icon: <Zap className="size-5 text-foreground" />,
    title: "AI Automation",
    description:
      "Automate repetitive tasks and let AI surface insights from your data with zero setup.",
  },
  {
    icon: <Globe className="size-5 text-foreground" />,
    title: "Global Infrastructure",
    description:
      "Deploy to 50+ regions worldwide with automatic failover and a 99.99% uptime SLA.",
  },
];

const showcaseFeatures = [
  {
    icon: <LineChart className="size-6 text-foreground" />,
    title: "Powerful Analytics Dashboard",
    description:
      "Track every metric that matters with customizable dashboards, real-time data sync, and predictive forecasting powered by machine learning.",
    highlights: [
      "Real-time data synchronization",
      "Custom report builder with drag-and-drop",
      "Predictive forecasting and anomaly detection",
    ],
  },
  {
    icon: <Workflow className="size-6 text-foreground" />,
    title: "Intelligent Workflow Automation",
    description:
      "Build complex automations with a visual no-code builder. Set triggers, define conditions, and let Bizzed handle the rest.",
    highlights: [
      "Visual workflow builder",
      "Conditional logic and branching",
      "200+ pre-built workflow templates",
    ],
  },
  {
    icon: <MessageSquare className="size-6 text-foreground" />,
    title: "Seamless Team Communication",
    description:
      "Keep your distributed team in sync with built-in messaging, shared documents, and integrated video calls.",
    highlights: [
      "Real-time co-editing on documents",
      "Threaded discussions with context",
      "Built-in video conferencing",
    ],
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Active Users" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 200, suffix: "+", label: "Integrations" },
  { value: 50, suffix: "+", label: "Countries Served" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow",
    quote:
      "Bizzed transformed how our engineering team works. The real-time analytics alone saved us 20 hours per week in manual reporting.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    company: "ScaleHQ",
    quote:
      "We evaluated a dozen platforms before choosing Bizzed. The reliability and uptime have been exceptional — exactly what we needed for our enterprise clients.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "DataSync",
    quote:
      "The collaboration features are game-changing. Our distributed team finally feels like we're all in the same room.",
  },
  {
    name: "James Park",
    role: "Head of Operations",
    company: "CloudNine",
    quote:
      "Workflow automation in Bizzed eliminated 80% of our repetitive tasks. Our team can now focus on what actually matters.",
  },
  {
    name: "Aisha Patel",
    role: "Director of Engineering",
    company: "ByteWorks",
    quote:
      "Security was our top priority, and Bizzed delivered. SOC 2 compliance out of the box gave us confidence from day one.",
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "LaunchPad",
    quote:
      "Bizzed is the platform I wish we had five years ago. It's not just a tool — it's a competitive advantage.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "For small teams getting started.",
    features: [
      "Up to 5 team members",
      "10 GB storage",
      "Basic analytics",
      "Email support",
      "API access",
    ],
    cta: "Start Free Trial",
    href: "/contact",
  },
  {
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: "For growing businesses that need more.",
    features: [
      "Up to 25 team members",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Workflow automation",
    ],
    cta: "Start Free Trial",
    href: "/contact",
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
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <Hero
        badge="Now in public beta"
        headline="Build, Ship, and Scale — Without Limits"
        description="The all-in-one platform that empowers teams to build faster, ship with confidence, and scale without compromise. Powerful analytics, seamless integrations, and enterprise-grade security."
        primaryCta={{ label: "Start Free Trial", href: "/contact" }}
        secondaryCta={{ label: "Book a Demo", href: "/contact" }}
      />

      <SocialProof companies={companies} />

      <Section id="features">
        <BentoGrid
          heading="Everything you need to scale"
          subheading="Powerful features designed for modern teams. From analytics to automation, we've got you covered."
          items={bentoItems}
        />
      </Section>

      <Section>
        <FeatureShowcase
          heading="Built for the way you work"
          subheading="Deep-dive into the core capabilities that set Bizzed apart."
          features={showcaseFeatures}
        />
      </Section>

      <Section className="bg-muted/50">
        <StatsSection heading="Trusted by thousands" stats={stats} />
      </Section>

      <Section>
        <Testimonials
          heading="Loved by teams everywhere"
          subheading="See what our customers have to say about their experience with Bizzed."
          testimonials={testimonials}
        />
      </Section>

      <Section>
        <PricingPreview
          heading="Simple, transparent pricing"
          subheading="Start free, upgrade when you're ready. No hidden fees."
          tiers={pricingTiers}
        />
      </Section>

      <CtaSection
        headline="Ready to transform your business?"
        description="Join thousands of teams already using Bizzed to ship faster and scale smarter."
        primaryCta={{ label: "Start Free Trial", href: "/contact" }}
        secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
      />
    </PageWrapper>
  );
}
