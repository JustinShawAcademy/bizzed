import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist",
  description:
    "You've been added to the Bizzed waitlist. We'll be in touch soon.",
};

export default function WaitlistPage() {
  return (
    <main className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-md">
        <Clock className="mx-auto size-16 text-foreground" />

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
            High-Value Acquisition Waitlist
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
            Bizzed is purpose-built for acquisitions under $5,000,000
        </p>

        <p className="mt-2 text-base text-muted-foreground">
            We're building a premium advisory tier for larger transactions, and we're selectively onboarding founding members now. 
        </p>

        <p className="mt-2 text-base text-muted-foreground">
            You'll be the first to know when we open access.
        </p>

        <Button className="mt-8" size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
