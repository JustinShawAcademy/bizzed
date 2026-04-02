import { z } from "zod";

export const ELIGIBILITY_THRESHOLD = 5_000_000;

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Education",
  "Energy",
  "Transportation",
  "Hospitality",
  "Other",
] as const;

export const TEAM_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
] as const;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be under 200 characters"),
  industry: z.enum(INDUSTRIES, {
    message: "Please select an industry",
  }),
  teamSize: z.enum(TEAM_SIZES, {
    message: "Please select a team size",
  }),
  estimatedAcquisitionValue: z
    .number({ message: "Please enter a number" })
    .positive("Value must be greater than zero")
    .max(100_000_000_000, "Value seems unreasonably high"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export function isEligible(estimatedValue: number): boolean {
  return estimatedValue <= ELIGIBILITY_THRESHOLD;
}
