import type { Metadata } from "next";
import {
  Lightbulb,
  Heart,
  Shield,
  Rocket,
  Users,
  Globe,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { ValuesSection } from "@/components/blocks/values-section";
import { TeamGrid } from "@/components/blocks/team-grid";
import { Timeline } from "@/components/blocks/timeline";
import { CtaSection } from "@/components/blocks/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the team and mission behind Bizzed — building the future of enterprise analytics and collaboration.",
};

const values = [
  {
    icon: <Lightbulb className="size-5 text-foreground" />,
    title: "Innovation First",
    description:
      "We push boundaries with every release. If there's a better way to solve a problem, we'll find it — even if it means rethinking our own assumptions.",
  },
  {
    icon: <Heart className="size-5 text-foreground" />,
    title: "Customer Obsession",
    description:
      "Every feature starts with a customer conversation. We measure success not by lines shipped, but by problems solved.",
  },
  {
    icon: <Shield className="size-5 text-foreground" />,
    title: "Trust & Security",
    description:
      "Your data is sacred. We've built security into every layer — from infrastructure to process — because trust is earned, not declared.",
  },
  {
    icon: <Rocket className="size-5 text-foreground" />,
    title: "Speed of Execution",
    description:
      "We ship weekly, iterate daily, and deploy multiple times per day. Small batches, fast feedback, continuous improvement.",
  },
  {
    icon: <Users className="size-5 text-foreground" />,
    title: "Radical Collaboration",
    description:
      "Great products come from diverse teams working in the open. We share context generously and make decisions transparently.",
  },
  {
    icon: <Globe className="size-5 text-foreground" />,
    title: "Global by Default",
    description:
      "We build for the world, not a zip code. Our team, our infrastructure, and our product are distributed by design.",
  },
];

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "CEO & Co-founder",
    bio: "Former VP at Stripe. Built payments infrastructure serving 100M+ businesses.",
    initials: "AR",
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-founder",
    bio: "Ex-Google engineer. Led the team behind Cloud Spanner's distributed query engine.",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "VP of Engineering",
    bio: "15 years building enterprise platforms. Previously engineering director at Datadog.",
    initials: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Product",
    bio: "Led product at three YC-backed startups through Series B. Obsessed with user research.",
    initials: "ER",
  },
  {
    name: "James Park",
    role: "VP of Design",
    bio: "Previously design lead at Figma. Believes great design disappears into the experience.",
    initials: "JP",
  },
  {
    name: "Aisha Patel",
    role: "VP of Sales",
    bio: "Built enterprise sales teams at Salesforce and Notion. 12 years closing seven-figure deals.",
    initials: "AP",
  },
  {
    name: "David Kim",
    role: "Head of Security",
    bio: "Former security engineer at AWS. Led the team to SOC 2 Type II with zero exceptions.",
    initials: "DK",
  },
  {
    name: "Olivia Thompson",
    role: "Head of Marketing",
    bio: "Growth leader from HubSpot. Scaled pipeline from $2M to $40M ARR in three years.",
    initials: "OT",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Founded",
    description:
      "Alex and Sarah started Bizzed in a San Francisco apartment with a simple thesis: enterprise software should be beautiful, fast, and a joy to use.",
  },
  {
    year: "2022",
    title: "Seed Round — $5M",
    description:
      "Raised a seed round led by Sequoia Capital. Used the funding to hire the first 15 engineers and launch the private beta.",
  },
  {
    year: "2022",
    title: "First 100 Customers",
    description:
      "Hit 100 paying customers within six months of the beta launch, validating the core analytics and collaboration thesis.",
  },
  {
    year: "2023",
    title: "Series A — $25M",
    description:
      "Led by Andreessen Horowitz. Doubled the team to 60 people and launched the workflow automation platform.",
  },
  {
    year: "2023",
    title: "SOC 2 Type II Certified",
    description:
      "Passed the SOC 2 Type II audit with zero exceptions, opening the door to Fortune 500 enterprise deals.",
  },
  {
    year: "2024",
    title: "Series B — $80M",
    description:
      "Led by Lightspeed with participation from existing investors. Expanded to 150 employees across 12 countries.",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description:
      "Opened data centers in Europe and Asia-Pacific. Launched localized support in 8 languages.",
  },
  {
    year: "2026",
    title: "10,000+ Customers",
    description:
      "Crossed the 10,000 customer milestone. Launched Bizzed 2.0 with AI-powered analytics and workflow automation.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Mission hero */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Building the future of enterprise software
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We started Bizzed because we believed enterprise teams deserve tools
            as good as the ones consumers use every day — fast, intuitive, and
            beautifully designed. Three years and 10,000 customers later, we're
            just getting started.
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <ValuesSection
          heading="What we believe"
          subheading="These principles guide every decision we make — from product roadmap to hiring."
          values={values}
        />
      </Section>

      <Section>
        <TeamGrid
          heading="Meet the team"
          subheading="A distributed team of operators, engineers, and designers who've built some of the biggest names in SaaS."
          members={teamMembers}
        />
      </Section>

      <Section className="bg-muted/30">
        <Timeline
          heading="Our journey"
          subheading="From a two-person apartment to a global platform serving thousands of enterprises."
          events={milestones}
        />
      </Section>

      <CtaSection
        headline="Want to join the team?"
        description="We're always looking for talented people who want to build the future of enterprise software. Check out our open roles."
        primaryCta={{ label: "View Open Roles", href: "/about#careers" }}
        secondaryCta={{ label: "Learn More", href: "/blog" }}
      />
    </PageWrapper>
  );
}
