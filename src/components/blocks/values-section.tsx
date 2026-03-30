"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  heading: string;
  subheading?: string;
  values: Value[];
  className?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
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

function ValuesSection({
  heading,
  subheading,
  values,
  className,
}: ValuesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="values-section" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <motion.div
        className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            className="text-center"
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted">
              {value.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export { ValuesSection };
export type { ValuesSectionProps, Value };
