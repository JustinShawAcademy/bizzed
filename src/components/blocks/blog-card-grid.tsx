"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface BlogPostCard {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
}

interface BlogCardGridProps {
  heading: string;
  subheading?: string;
  posts: BlogPostCard[];
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

function BlogCardGrid({
  heading,
  subheading,
  posts,
  className,
}: BlogCardGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];
  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div data-slot="blog-card-grid" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      {/* Category filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid — key forces re-mount to replay stagger on filter change */}
      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="show"
        key={activeCategory}
      >
        {filtered.map((post) => (
          <motion.article
            key={post.slug}
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/50"
            >
              <Badge variant="secondary" className="w-fit">
                {post.category}
              </Badge>
              <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}

export { BlogCardGrid };
export type { BlogCardGridProps, BlogPostCard };
