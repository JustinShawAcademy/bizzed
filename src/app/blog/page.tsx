import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { BlogCardGrid } from "@/components/blocks/blog-card-grid";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, updates, and stories from the Bizzed team on enterprise SaaS, engineering, product, and company culture.",
};

export default function BlogPage() {
  return (
    <PageWrapper>
      <Section>
        <BlogCardGrid
          heading="Blog"
          subheading="Insights, updates, and stories from the Bizzed team."
          posts={blogPosts}
        />
      </Section>
    </PageWrapper>
  );
}
