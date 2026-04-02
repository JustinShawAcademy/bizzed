import { z } from "zod";

export const ELIGIBILITY_THRESHOLD = 5_000_000;

export const INDUSTRIES = [
    "SaaS / Software",
    "E-commerce / D2C",
    "Professional Services (Agency, Consulting)",
    "Manufacturing / Industrial",
    "Food & Beverage / Hospitality",
    "Home Services (HVAC, Plumbing, Landscaping)",
    "Content / Media",
    "Health & Wellness",
    "Transportation / logistics",
    "Education / Training",
    "Financial Services / Banking",
    "Other",
  ] as const;

export const ANNUAL_REVENUE_RANGES = [
  "Under $250,000",
  "$250,000 — $750,000",
  "$750,000 — $1,500,000",
  "$1,500,000 — $3,000,000",
  "$3,000,000 — $5,000,000",
  "$5,000,000+",
] as const;

export const CAPITAL_STRUCTURES = [
  "100% Self-Funded",
  "Seeking Outside Capital",
  "Combination of both",
] as const;

export const FINANCING_STATUSES = [
  "Pre-approved",
  "In Progress",
  "Not Yet Started",
] as const;

export const CLOSING_TIMELINES = [
  "Under 30 days",
  "30-90 days",
  "90+ days",
] as const;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z
    .string()
    .max(200, "Company name must be under 200 characters")
    .optional(),
  businessDescription: z
    .string()
    .min(10, "Please provide at least a brief description")
    .max(1000, "Description must be under 1000 characters"),
  businessVintage: z
    .number({ message: "Please enter a number" })
    .int("Must be a whole number")
    .nonnegative("Must be zero or greater")
    .max(500, "Value seems unreasonably high"),
  acquisitionExperience: z
    .number({ message: "Please enter a number" })
    .int("Must be a whole number")
    .nonnegative("Must be zero or greater")
    .max(1000, "Value seems unreasonably high"),
  industry: z.enum(INDUSTRIES, {
    message: "Please select an industry",
  }),
  estimatedAcquisitionValue: z
    .number({ message: "Please enter a number" })
    .positive("Value must be greater than zero")
    .max(100_000_000_000, "Value seems unreasonably high"),
  annualRevenueRange: z.enum(ANNUAL_REVENUE_RANGES, {
    message: "Please select a revenue range",
  }),
  capitalStructure: z.enum(CAPITAL_STRUCTURES, {
    message: "Please select a capital structure",
  }),
  financingStatus: z.enum(FINANCING_STATUSES, {
    message: "Please select a financing status",
  }),
  desiredClosingTimeline: z.enum(CLOSING_TIMELINES, {
    message: "Please select a timeline",
  }),
  referralSource: z
    .string()
    .max(500, "Must be under 500 characters")
    .optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export function isEligible(estimatedValue: number): boolean {
  return estimatedValue <= ELIGIBILITY_THRESHOLD;
}
