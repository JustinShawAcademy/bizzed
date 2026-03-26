import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";

export default function Home() {
  return (
    <PageWrapper>
      <Section>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Bizzed
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            The modern enterprise platform that scales with your business.
            Powerful analytics, seamless integrations, and world-class security.
          </p>
        </div>
      </Section>
    </PageWrapper>
  );
}
