"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BentoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BentoGridProps {
  heading: string;
  subheading?: string;
  items: BentoItem[];
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

function BentoGrid({ heading, subheading, items, className }: BentoGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="bento-grid" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <motion.div
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {items.map((item, index) => {
          const isWide = index % 4 === 0 || index % 4 === 3;

          return (
            <motion.div
              key={item.title}
              className={cn(
                "group rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/50",
                isWide && "lg:col-span-2",
              )}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export { BentoGrid };
export type { BentoGridProps, BentoItem };
