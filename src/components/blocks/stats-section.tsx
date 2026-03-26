"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "motion/react";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  heading?: string;
  stats: Stat[];
  className?: string;
}

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion) {
      ref.current.textContent = formatValue(value, value) + suffix;
      return;
    }

    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = formatValue(latest, value) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {prefersReducedMotion
        ? formatValue(value, value) + suffix
        : "0" + suffix}
    </span>
  );
}

function formatValue(current: number, target: number): string {
  if (!Number.isInteger(target)) {
    return current.toFixed(1);
  }
  return Math.round(current).toLocaleString();
}

function StatsSection({ heading, stats, className }: StatsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="stats-section" className={cn(className)}>
      {heading && (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
        </div>
      )}

      <motion.div
        className={cn(
          "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
          heading && "mt-16",
        )}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export { StatsSection };
export type { StatsSectionProps, Stat };
