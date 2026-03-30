"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/shared/checkout-button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface PricingTier {
  name: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  description: string;
  features: string[];
  cta: string;
  href?: string;
  action?: "checkout";
  popular?: boolean;
}

interface PricingPreviewProps {
  heading: string;
  subheading?: string;
  tiers: PricingTier[];
  className?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function PricingPreview({
  heading,
  subheading,
  tiers,
  className,
}: PricingPreviewProps) {
  const [yearly, setYearly] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="pricing-preview" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      {/* Billing toggle */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            !yearly ? "text-foreground" : "text-muted-foreground",
          )}
        >
          Monthly
        </span>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            yearly ? "text-foreground" : "text-muted-foreground",
          )}
        >
          Yearly
        </span>
        <Badge variant="secondary" className="ml-1">
          Save 20%
        </Badge>
      </div>

      <motion.div
        className="mt-12 grid gap-6 lg:grid-cols-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {tiers.map((tier) => {
          const price = yearly ? tier.yearlyPrice : tier.monthlyPrice;

          return (
            <motion.div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-xl border p-8",
                tier.popular
                  ? "border-foreground bg-card shadow-lg"
                  : "border-border bg-card",
              )}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <div className="mt-6">
                {price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={yearly ? "yearly" : "monthly"}
                        className="text-4xl font-bold tracking-tight"
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, y: -10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        ${price}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-muted-foreground">
                      /{yearly ? "year" : "month"}
                    </span>
                  </div>
                ) : (
                  <p className="text-4xl font-bold tracking-tight">Custom</p>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.action === "checkout" ? (
                <CheckoutButton
                  className="mt-8 w-full"
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  {tier.cta}
                </CheckoutButton>
              ) : (
                <Button
                  className="mt-8 w-full"
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href={tier.href ?? "/"}>{tier.cta}</Link>
                </Button>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export { PricingPreview };
export type { PricingPreviewProps, PricingTier };
