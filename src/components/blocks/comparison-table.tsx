"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  values: (boolean | string)[];
}

interface ComparisonCategory {
  name: string;
  rows: ComparisonRow[];
}

interface ComparisonTableProps {
  heading: string;
  subheading?: string;
  columns: string[];
  categories: ComparisonCategory[];
  highlightColumn?: number;
  className?: string;
}

function ComparisonTable({
  heading,
  subheading,
  columns,
  categories,
  highlightColumn,
  className,
}: ComparisonTableProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div data-slot="comparison-table" className={cn(className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        )}
      </div>

      <motion.div
        className="mt-16 overflow-x-auto rounded-xl border border-border"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="py-4 pl-6 pr-4 text-left font-medium text-muted-foreground">
                Feature
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={cn(
                    "px-6 py-4 text-center font-semibold",
                    highlightColumn === i &&
                      "bg-foreground/5 text-foreground",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <Fragment key={cat.name}>
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="border-t border-border px-6 pb-3 pt-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {cat.name}
                  </td>
                </tr>
                {cat.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="py-3.5 pl-6 pr-4">{row.feature}</td>
                    {row.values.map((val, i) => (
                      <td
                        key={`${row.feature}-${columns[i]}`}
                        className={cn(
                          "px-6 py-3.5 text-center",
                          highlightColumn === i && "bg-foreground/5",
                        )}
                      >
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="mx-auto size-4 text-foreground" />
                          ) : (
                            <X className="mx-auto size-4 text-muted-foreground/30" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export { ComparisonTable };
export type { ComparisonTableProps, ComparisonCategory, ComparisonRow };
