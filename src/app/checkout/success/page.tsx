import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Bizzed",
  description: "Thank you for your purchase.",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-md">
        <CheckCircle2 className="mx-auto size-16 text-foreground" />

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Payment successful
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Thank you for your purchase! You&apos;ll receive a confirmation email
          shortly with your receipt and next steps.
        </p>

        <Button className="mt-8" size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
