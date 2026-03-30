"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

interface TeamGridProps {
  heading: string;
  subheading?: string;
  members: TeamMember[];
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

function TeamGrid({
  heading,
  subheading,
  members,
  className,
}: TeamGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="team-grid" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <motion.div
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {members.map((member) => (
          <motion.div
            key={member.name}
            className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/50"
            variants={prefersReducedMotion ? undefined : itemVariants}
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
              {member.initials}
            </div>
            <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {member.bio}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export { TeamGrid };
export type { TeamGridProps, TeamMember };
