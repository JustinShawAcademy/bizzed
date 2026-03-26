"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  className?: string;
  children: React.ReactNode;
}

function PageWrapper({ className, children }: PageWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.main
      data-slot="page-wrapper"
      className={cn("flex flex-1 flex-col", className)}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}

export { PageWrapper };
