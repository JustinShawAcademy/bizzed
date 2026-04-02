import type { Metadata } from "next";
import { ApplicationForm } from "@/components/blocks/application-form";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for access to Bizzed. Tell us about your business acquisition goals and get started in minutes.",
};

export default function ApplyPage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 py-16">
      <ApplicationForm className="mx-auto w-full max-w-2xl" />
    </main>
  );
}
