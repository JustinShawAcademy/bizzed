"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CtaLink {
  label: string;
  href: string;
}

interface CtaSectionProps {
  headline: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  className?: string;
}

function CtaSection({
  headline,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CtaSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      data-slot="cta-section"
      className={cn("relative overflow-hidden py-32", className)}
    >
      {/* Gradient background with animated spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-linear-to-b from-muted/50 via-muted to-muted/50" />
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/3 blur-[100px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <motion.div
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">{description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { CtaSection };
export type { CtaSectionProps };
