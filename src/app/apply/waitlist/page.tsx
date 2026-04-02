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
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-md">
        <Clock className="mx-auto size-16 text-foreground" />

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          You&apos;re on the list
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Thanks for your interest in Bizzed. Due to the size of your
          acquisition, our enterprise team will reach out personally to discuss
          next steps.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Expect to hear from us within 1&ndash;2 business days.
        </p>

        <Button className="mt-8" size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
