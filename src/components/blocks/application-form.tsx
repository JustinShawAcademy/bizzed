"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  INDUSTRIES,
  ANNUAL_REVENUE_RANGES,
  CAPITAL_STRUCTURES,
  FINANCING_STATUSES,
  CLOSING_TIMELINES,
  type ApplicationFormData,
} from "@/lib/schemas/application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface ApplicationFormProps {
  className?: string;
}

interface ApiResponse {
  result?: "eligible" | "waitlisted";
  url?: string;
  error?: string;
  fields?: Record<string, string[]>;
}

function ApplicationForm({ className }: ApplicationFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      businessDescription: "",
      businessVintage: undefined as unknown as number,
      acquisitionExperience: undefined as unknown as number,
      industry: undefined,
      estimatedAcquisitionValue: undefined as unknown as number,
      annualRevenueRange: undefined,
      capitalStructure: undefined,
      financingStatus: undefined,
      desiredClosingTimeline: undefined,
      referralSource: "",
    },
  });

  async function onSubmit(values: ApplicationFormData) {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.result === "eligible" && data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.result === "waitlisted") {
        router.push("/apply/waitlist");
        return;
      }

      setServerError("Unexpected response. Please try again.");
      setSubmitting(false);
    } catch {
      setServerError("Network error. Please check your connection.");
      setSubmitting(false);
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Bizzed Application</CardTitle>
        <CardDescription>
            To better assist with your application, please fill out the form below. If you have any questions, please contact us at <a href="mailto:support@bizzed.com" className="text-primary underline">janine@bizzed.ai</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DELETE: we're not taking company name for now */}
            {/* <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            
            {/* Section 1: Target Business Details */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium mb-0">Section 1: Target Business Details</h3>
                <p className="text-sm text-muted-foreground"></p>
            </div>


            <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Primary Industry Sector</FormLabel>
                <FormDescription>Select the industry that most closely aligns with the target acquisition.</FormDescription>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                        {industry}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormDescription>
                    Briefly describe the nature of the business you are seeking
                    to acquire.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. A profitable 3-person landscaping agency based in Florida."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessVintage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Vintage (Years in Operation)</FormLabel>
                  <FormDescription>
                    Approximately how many years has the business been
                    established?
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 5 years"
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acquisitionExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acquisition Experience</FormLabel>
                  <FormDescription>
                    How many businesses have you previously acquired, if any?
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Section 2: Your Company Details */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium mb-0">Section 2: Financial Profile</h3>
                <p className="text-sm text-muted-foreground"></p>
            </div>

            <FormField
              control={form.control}
              name="estimatedAcquisitionValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Acquisition Value (USD)</FormLabel>
                  <FormDescription>
                    Enter the target purchase price. Please note: We currently specialize in deals up to $5,000,000.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1000000"
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="annualRevenueRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Revenue Range</FormLabel>
                  <FormDescription>
                    What is the current &quot;size&quot; of the business in terms
                    of gross annual sales?
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a revenue range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ANNUAL_REVENUE_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium mb-0">Section 3: Capital & Funding</h3>
            </div>

            <FormField
              control={form.control}
              name="capitalStructure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capital Structure</FormLabel>
                  <FormDescription>
                    Please indicate the primary source of funding for this
                    transaction
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a capital structure" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CAPITAL_STRUCTURES.map((structure) => (
                        <SelectItem key={structure} value={structure}>
                          {structure}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financingStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financing Status</FormLabel>
                  <FormDescription>
                    If raising capital, do you have a formal pre-approval or
                    letter of intent from a lender?
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select financing status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FINANCING_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium mb-0">Section 4: Acquisition Timeline</h3>
            </div>

            <FormField
              control={form.control}
              name="desiredClosingTimeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Closing Timeline</FormLabel>
                  <FormDescription>
                    How quickly do you intend to complete the turnaround/closing
                    process?
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CLOSING_TIMELINES.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referralSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about Bizzed?</FormLabel>
                  <FormDescription>
                    Let us know where you came across us. This helps us
                    understand how to better serve buyers like you.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="—" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {serverError && (
              <p className="text-sm text-destructive" role="alert">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { ApplicationForm };
export type { ApplicationFormProps };
