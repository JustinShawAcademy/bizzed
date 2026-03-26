"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SocialProofProps {
  heading?: string;
  companies: string[];
  className?: string;
}

function SocialProof({
  heading = "Trusted by industry leaders",
  companies,
  className,
}: SocialProofProps) {
  const prefersReducedMotion = useReducedMotion();
  const duplicated = [...companies, ...companies];

  return (
    <section
      data-slot="social-proof"
      className={cn("overflow-hidden border-y border-border py-12", className)}
    >
      <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
        {heading}
      </p>

      <div className="relative">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

        <motion.div
          className="flex items-center gap-16"
          animate={prefersReducedMotion ? undefined : { x: "-50%" }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  x: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }
          }
        >
          {duplicated.map((company, i) => (
            <span
              key={`${company}-${i}`}
              className="shrink-0 select-none text-xl font-semibold tracking-tight text-muted-foreground/40"
            >
              {company}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { SocialProof };
export type { SocialProofProps };
