"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/shared/checkout-button";

const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((mod) => mod.Globe3D),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

interface HeroCta {
  label: string;
  href?: string;
  action?: "checkout";
}

interface HeroProps {
  badge?: string;
  headline: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
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

const globeConfig = {
  autoRotateSpeed: 0.4,
  enableZoom: false,
  enablePan: false,
  showAtmosphere: false,
  backgroundColor: null as string | null,
};

const globeMarkers = [
  { lat: 40.71, lng: -74.01, src: "https://i.pravatar.cc/80?img=1", label: "New York" },
  { lat: 51.51, lng: -0.13, src: "https://i.pravatar.cc/80?img=5", label: "London" },
  { lat: 35.68, lng: 139.65, src: "https://i.pravatar.cc/80?img=12", label: "Tokyo" },
  { lat: -33.87, lng: 151.21, src: "https://i.pravatar.cc/80?img=16", label: "Sydney" },
  { lat: -23.55, lng: -46.63, src: "https://i.pravatar.cc/80?img=22", label: "São Paulo" },
  { lat: 25.2, lng: 55.27, src: "https://i.pravatar.cc/80?img=32", label: "Dubai" },
  { lat: 1.35, lng: 103.82, src: "https://i.pravatar.cc/80?img=36", label: "Singapore" },
  { lat: 52.52, lng: 13.41, src: "https://i.pravatar.cc/80?img=44", label: "Berlin" },
  { lat: 19.08, lng: 72.88, src: "https://i.pravatar.cc/80?img=48", label: "Mumbai" },
  { lat: 6.52, lng: 3.38, src: "https://i.pravatar.cc/80?img=53", label: "Lagos" },
];

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
      {/* Spotlight / aurora background */}
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
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
              {primaryCta.action === "checkout" ? (
                <CheckoutButton size="lg">
                  {primaryCta.label}
                  <ArrowRight className="ml-2 size-4" />
                </CheckoutButton>
              ) : (
                <Button size="lg" asChild>
                  <Link href={primaryCta.href ?? "/"}>
                    {primaryCta.label}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}

                {secondaryCta ? (
                secondaryCta.action === "checkout" ? (
                    <CheckoutButton size="lg" variant="outline">
                    {secondaryCta.label}
                    </CheckoutButton>
                ) : (
                    <Button size="lg" variant="outline" asChild>
                    <Link href={secondaryCta.href ?? "/"}>
                        {secondaryCta.label}
                    </Link>
                    </Button>
                )
                ) : null}
            </motion.div>
          </motion.div>

          {/* Globe column */}
          <motion.div
            className="relative h-[350px] lg:h-[500px]"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Globe3D
              markers={globeMarkers}
              config={globeConfig}
              className="h-full w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
export type { HeroProps };
