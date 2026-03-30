"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  heading: string;
  subheading?: string;
  events: TimelineEvent[];
  className?: string;
}

function Timeline({
  heading,
  subheading,
  events,
  className,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <div data-slot="timeline" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <div ref={containerRef} className="relative mx-auto mt-16 max-w-3xl">
        {/* Track line (static background) */}
        <div className="absolute bottom-0 left-6 top-0 w-px bg-border md:left-1/2 md:-translate-x-px">
          {/* Animated fill that draws as user scrolls */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-foreground"
              style={{ scaleY: lineScaleY }}
            />
          )}
        </div>

        <div className="space-y-12">
          {events.map((event, index) => {
            const isRight = index % 2 !== 0;

            return (
              <motion.div
                key={event.year}
                className="relative pl-16 md:pl-0"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Dot on the line */}
                <div className="absolute left-6 top-1 z-10 flex -translate-x-1/2 items-center justify-center md:left-1/2">
                  <div className="size-3 rounded-full bg-foreground ring-4 ring-background" />
                </div>

                {/* Content — alternates sides on desktop */}
                <div
                  className={cn(
                    "md:w-[calc(50%-2rem)]",
                    isRight
                      ? "md:ml-[calc(50%+2rem)]"
                      : "md:mr-[calc(50%+2rem)] md:text-right",
                  )}
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {event.year}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { Timeline };
export type { TimelineProps, TimelineEvent };
