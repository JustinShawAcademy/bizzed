import type { Metadata } from "next";
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
  Lock,
  Cloud,
  Bell,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { BentoGrid } from "@/components/blocks/bento-grid";
import { FeatureShowcase } from "@/components/blocks/feature-showcase";
import { ComparisonTable } from "@/components/blocks/comparison-table";
import { CtaSection } from "@/components/blocks/cta-section";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the powerful features that make Bizzed the platform of choice for modern enterprises. Real-time analytics, workflow automation, and enterprise security.",
};

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
      "Connect with the tools your team already uses, from Slack and Salesforce to custom webhooks and REST APIs.",
  },
  {
    icon: <Shield className="size-5 text-foreground" />,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, SAML, and role-based access control.",
  },
  {
    icon: <Users className="size-5 text-foreground" />,
    title: "Team Collaboration",
    description:
      "Shared workspaces, real-time co-editing, threaded discussions, and built-in video conferencing.",
  },
  {
    icon: <Zap className="size-5 text-foreground" />,
    title: "AI Automation",
    description:
      "Automate repetitive tasks with AI that understands context. Build workflows in plain English.",
  },
  {
    icon: <Globe className="size-5 text-foreground" />,
    title: "Global Infrastructure",
    description:
      "Deploy to 50+ regions worldwide with automatic failover and a 99.99% uptime SLA.",
  },
  {
    icon: <Bell className="size-5 text-foreground" />,
    title: "Smart Notifications",
    description:
      "AI-prioritized alerts that surface what matters. Delivered via email, Slack, SMS, or in-app.",
  },
  {
    icon: <Lock className="size-5 text-foreground" />,
    title: "Audit Logging",
    description:
      "Complete audit trail of every action, data access, and configuration change across your organization.",
  },
  {
    icon: <Cloud className="size-5 text-foreground" />,
    title: "Hybrid Deployment",
    description:
      "Run Bizzed in our cloud, your cloud, or on-premise. Same experience everywhere.",
  },
];

const showcaseFeatures = [
  {
    icon: <LineChart className="size-6 text-foreground" />,
    title: "Powerful Analytics Dashboard",
    description:
      "Track every metric that matters with customizable dashboards, real-time data sync, and predictive forecasting powered by machine learning.",
    highlights: [
      "Real-time data synchronization across all sources",
      "Drag-and-drop custom report builder",
      "Predictive forecasting and anomaly detection",
    ],
  },
  {
    icon: <Workflow className="size-6 text-foreground" />,
    title: "Intelligent Workflow Automation",
    description:
      "Build complex automations with a visual no-code builder. Set triggers, define conditions, and let Bizzed handle the rest.",
    highlights: [
      "Visual workflow builder with branching logic",
      "200+ pre-built templates for common scenarios",
      "AI-powered workflow suggestions based on your data",
    ],
  },
  {
    icon: <MessageSquare className="size-6 text-foreground" />,
    title: "Seamless Team Communication",
    description:
      "Keep your distributed team in sync with built-in messaging, shared documents, and integrated video calls — all inside Bizzed.",
    highlights: [
      "Real-time co-editing on documents and dashboards",
      "Threaded discussions with full context",
      "Built-in video conferencing with screen sharing",
    ],
  },
];

const comparisonColumns = ["Bizzed", "Acme Corp", "Legacy Inc"];

const comparisonCategories: {
  name: string;
  rows: { feature: string; values: (boolean | string)[] }[];
}[] = [
  {
    name: "Analytics & Reporting",
    rows: [
      { feature: "Real-time dashboards", values: [true, true, false] },
      { feature: "Custom report builder", values: [true, "Limited", true] },
      { feature: "AI-powered insights", values: [true, false, false] },
      { feature: "Data export (CSV / API)", values: [true, true, true] },
    ],
  },
  {
    name: "Automation & Workflows",
    rows: [
      { feature: "Visual workflow builder", values: [true, false, "Basic"] },
      { feature: "200+ templates", values: [true, "50+", false] },
      { feature: "Conditional branching", values: [true, true, false] },
      { feature: "API triggers & webhooks", values: [true, true, true] },
    ],
  },
  {
    name: "Security & Compliance",
    rows: [
      { feature: "SOC 2 Type II", values: [true, true, false] },
      { feature: "SSO / SAML", values: [true, "Enterprise only", true] },
      { feature: "Role-based access control", values: [true, true, "Basic"] },
      { feature: "End-to-end encryption", values: [true, false, true] },
      { feature: "Audit logs", values: [true, false, false] },
    ],
  },
  {
    name: "Support & Reliability",
    rows: [
      { feature: "99.99% uptime SLA", values: [true, "99.9%", "99.5%"] },
      { feature: "24/7 support", values: [true, "Business hours", false] },
      { feature: "Dedicated CSM", values: [true, "Enterprise only", false] },
      { feature: "Free onboarding", values: [true, false, false] },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <PageWrapper>
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Features built for scale
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything your team needs to move faster, make smarter decisions,
            and operate with confidence — in one platform.
          </p>
        </div>
      </Section>

      <Section id="features">
        <BentoGrid
          heading="The complete platform"
          subheading="From analytics to automation, every capability is designed to work together seamlessly."
          items={bentoItems}
        />
      </Section>

      <Section>
        <FeatureShowcase
          heading="Built for the way you work"
          subheading="Deep-dive into the core capabilities that set Bizzed apart from the rest."
          features={showcaseFeatures}
        />
      </Section>

      <Section id="comparison" className="bg-muted/30">
        <ComparisonTable
          heading="See how Bizzed compares"
          subheading="Feature-by-feature comparison against the leading alternatives."
          columns={comparisonColumns}
          categories={comparisonCategories}
          highlightColumn={0}
        />
      </Section>

      <CtaSection
        headline="Ready to see it in action?"
        description="Start your free trial today. No credit card required."
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to Sales", href: "/about#contact" }}
      />
    </PageWrapper>
  );
}
