"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

interface TestimonialsProps {
  heading: string;
  subheading?: string;
  testimonials: Testimonial[];
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

function Testimonials({
  heading,
  subheading,
  testimonials,
  className,
}: TestimonialsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="testimonials" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <motion.div
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {testimonials.map((t) => (
          <motion.blockquote
            key={t.name}
            className="flex flex-col rounded-xl border border-border bg-card p-6"
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </motion.blockquote>
        ))}
      </motion.div>
    </div>
  );
}

export { Testimonials };
export type { TestimonialsProps, Testimonial };
