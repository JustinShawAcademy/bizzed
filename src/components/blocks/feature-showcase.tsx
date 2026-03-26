"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
}

interface FeatureShowcaseProps {
  heading: string;
  subheading?: string;
  features: Feature[];
  className?: string;
}

function FeatureRow({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      className="grid items-center gap-12 lg:grid-cols-2"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Text column */}
      <div className={cn(isReversed && "lg:order-2")}>
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
          {feature.icon}
        </div>
        <h3 className="mt-6 text-2xl font-bold tracking-tight">
          {feature.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
        <ul className="mt-6 space-y-3">
          {feature.highlights.map((point) => (
            <li
              key={point}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-xs text-background">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual column with parallax */}
      <div
        className={cn(
          "overflow-hidden rounded-xl",
          isReversed && "lg:order-1",
        )}
      >
        <motion.div
          className="aspect-4/3 rounded-xl border border-border bg-muted"
          style={prefersReducedMotion ? undefined : { y: parallaxY }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            {/* Subtle grid pattern to suggest a dashboard UI */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-br from-background/0 via-background/30 to-background/80" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FeatureShowcase({
  heading,
  subheading,
  features,
  className,
}: FeatureShowcaseProps) {
  return (
    <div data-slot="feature-showcase" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <div className="mt-24 space-y-32">
        {features.map((feature, index) => (
          <FeatureRow key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
}

export { FeatureShowcase };
export type { FeatureShowcaseProps, Feature };
