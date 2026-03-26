"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  badge?: string;
  headline: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  className?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Hero({
  badge,
  headline,
  description,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      data-slot="hero"
      className={cn(
        "relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-20",
        className,
      )}
    >
      {/* Spotlight / aurora background — two animated gradient blobs */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-foreground/3 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-foreground/2 blur-[80px]"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 50, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
        >
          {badge && (
            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <span className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="mt-8 text-[2.75rem] font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <Button size="lg" asChild>
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
export type { HeroProps };
