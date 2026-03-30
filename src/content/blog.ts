interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "introducing-bizzed-2",
    title: "Introducing Bizzed 2.0: A New Era of Enterprise Analytics",
    description:
      "Our biggest release yet brings a redesigned analytics engine, AI-powered insights, and a completely new dashboard experience.",
    category: "Product",
    author: "Emily Rodriguez",
    date: "2026-03-15",
    readingTime: "5 min read",
    content: `Today we're thrilled to announce Bizzed 2.0 — the most significant update since we launched three years ago. This release represents months of work from our engineering and design teams, guided by feedback from thousands of customers.

At the heart of 2.0 is a completely rebuilt analytics engine. We've moved from batch processing to a real-time streaming architecture that delivers insights the moment your data arrives. No more waiting for overnight refreshes or stale dashboards. Every metric updates in real time, and our new anomaly detection system alerts you before small problems become big ones.

The dashboard experience has been redesigned from the ground up. A new drag-and-drop report builder lets anyone on your team create custom views without writing SQL or waiting on a data team. Predictive forecasting, powered by machine learning models trained on your historical data, is now available on every chart.

We've also introduced Bizzed Copilot — an AI assistant that lives inside your workspace. Ask it questions in plain English like "What drove the revenue spike last Tuesday?" and it will surface the relevant data, charts, and context automatically.

Bizzed 2.0 is rolling out to all customers over the next two weeks. Existing Pro and Enterprise plans get every new feature at no additional cost. If you're on the Starter plan, the new dashboard and real-time engine are included — Copilot is available as an add-on.`,
  },
  {
    slug: "real-time-data-pipeline",
    title: "How We Built a Real-Time Data Pipeline at Scale",
    description:
      "A deep dive into the architecture behind Bizzed's sub-second analytics, from ingestion to query layer.",
    category: "Engineering",
    author: "Marcus Johnson",
    date: "2026-03-01",
    readingTime: "8 min read",
    content: `When we set out to rebuild our analytics engine for Bizzed 2.0, we knew the old batch-processing approach wouldn't cut it. Customers were asking for real-time dashboards, and the 15-minute refresh cycle was the number-one complaint in our feedback surveys.

Our new pipeline processes over 2 billion events per day with a p99 latency of under 200 milliseconds from ingestion to query availability. Here's how we built it.

The ingestion layer uses a horizontally scalable fleet of stateless workers behind a load balancer. Events arrive via our REST API or one of 200+ integration connectors, get validated and enriched with metadata, then land in a durable message queue. We chose Apache Kafka for its proven reliability at scale and its ability to replay events when we need to backfill.

From Kafka, a stream processing layer built on Apache Flink handles the heavy lifting: deduplication, sessionization, and real-time aggregation. Flink's exactly-once semantics give us confidence that no events are double-counted, even during node failures or rebalancing.

The query layer is where the magic happens for end users. We use Apache Druid as our OLAP store, optimized for the kind of slice-and-dice queries that dashboards generate. Druid's column-oriented storage and bitmap indexing mean that even queries across billions of rows return in under a second.

The entire pipeline runs on Kubernetes across three cloud regions, with automatic failover and a 99.99% uptime SLA. We monitor everything with a custom observability stack that alerts on ingestion lag, query latency, and data freshness.

The result: dashboards that update in real time, anomaly detection that fires within seconds, and an architecture that scales linearly with customer growth.`,
  },
  {
    slug: "black-and-white-design",
    title: "Why We Chose a Black-and-White Design System",
    description:
      "The design philosophy behind Bizzed's monochrome aesthetic and how constraints drive creativity.",
    category: "Engineering",
    author: "James Park",
    date: "2026-02-15",
    readingTime: "4 min read",
    content: `Most SaaS products reach for vibrant color palettes — bold blues, gradient purples, splashes of orange. When we redesigned Bizzed's interface, we went the opposite direction: pure black and white with a neutral gray scale.

This wasn't a trendy aesthetic choice. It was a deliberate constraint that solved real problems.

Enterprise customers use dozens of tools every day. Each one screams for attention with its own color language. Bizzed's monochrome palette is designed to disappear — to let the data and the user's work take center stage. When everything is neutral, the content becomes the color.

The constraint also simplified our design system dramatically. With no color decisions to make, our component library is smaller, more consistent, and faster to maintain. A button is black on white in light mode, white on black in dark mode. There's no debate about which shade of blue to use for a CTA.

Accessibility improved too. Pure black on white provides the maximum possible contrast ratio. We never have to worry about color combinations that fail WCAG guidelines, because there are no color combinations — just light and dark.

The system does use one accent: the user's own data. Charts, graphs, and visualizations bring color into the interface exactly where it matters. Against the monochrome backdrop, data literally pops off the screen.

Would this approach work for every product? Probably not. But for an enterprise analytics platform where clarity and data density matter more than brand expression, the constraint has been liberating.`,
  },
  {
    slug: "soc2-compliance-journey",
    title: "Our Journey to SOC 2 Type II Compliance",
    description:
      "What we learned going through a nine-month security audit — and why we'd do it again from day one.",
    category: "Security",
    author: "David Kim",
    date: "2026-02-01",
    readingTime: "6 min read",
    content: `In early 2023, we made the decision to pursue SOC 2 Type II certification. Nine months later, we passed with zero exceptions. Here's what the process looked like and what we'd tell any startup considering it.

SOC 2 Type II is an audit standard that evaluates how a company protects customer data over a sustained period (typically 6–12 months). Unlike Type I, which is a point-in-time snapshot, Type II requires you to demonstrate that your controls are consistently effective over time. It's the gold standard for enterprise SaaS security.

We started by documenting every system, process, and control that touches customer data. This mapping exercise alone took six weeks and involved every engineering team. We discovered gaps we didn't know existed: logging that wasn't comprehensive enough, access reviews that happened ad hoc instead of on a schedule, and incident response procedures that lived in someone's head instead of a runbook.

The technical controls were the easier part. We implemented end-to-end encryption for data in transit and at rest, enforced SSO for all internal systems, deployed automated vulnerability scanning on every CI/CD pipeline, and built comprehensive audit logging that captures every data access event.

The harder part was the organizational controls: formal change management processes, quarterly access reviews, employee security training, vendor risk assessments, and a tested incident response plan. These require cultural change, not just code.

Our advice for startups: start early. Every security control you implement from day one is one fewer thing to retrofit later. The cost of doing SOC 2 at 20 employees is a fraction of doing it at 200.`,
  },
  {
    slug: "ai-workflow-automation",
    title: "The Future of AI-Powered Workflow Automation",
    description:
      "How large language models are transforming enterprise automation — and what Bizzed is building next.",
    category: "Product",
    author: "Sarah Chen",
    date: "2026-01-15",
    readingTime: "6 min read",
    content: `For the past decade, workflow automation has meant the same thing: if-this-then-that logic with drag-and-drop interfaces. Define a trigger, set conditions, choose actions. It works, but it requires someone to anticipate every scenario and build every path.

Large language models are about to change that paradigm entirely.

Imagine describing a workflow in plain English: "When a customer files a support ticket about billing, check their account status, draft a response with the relevant invoice details, and escalate to finance if the amount is over $10,000." Today, building that automation requires connecting three or four systems, mapping fields, handling edge cases, and maintaining the workflow as APIs change. With LLM-powered automation, the description is the workflow.

We're building this capability into Bizzed's automation platform. Our approach combines the reliability of traditional workflow engines — deterministic execution, audit trails, error handling — with the flexibility of LLM-powered reasoning. The AI handles interpretation and decision-making; the workflow engine handles execution and compliance.

The key insight is that enterprises don't want AI making unsupervised decisions. They want AI that can understand context, draft responses, and suggest actions — but with human approval gates at critical points. Our system lets teams define where the AI can act autonomously and where it needs a human in the loop.

Early beta customers are seeing 60% reductions in workflow creation time and 40% fewer maintenance interventions. The workflows are also more resilient, because the AI can handle edge cases that would break a rigid if-then chain.

We'll be rolling out AI-powered workflows to all Enterprise customers in Q2 2026, with Pro plan access following in Q3.`,
  },
  {
    slug: "remote-first-culture",
    title: "Building a Remote-First Culture at Bizzed",
    description:
      "Lessons from scaling a distributed team across 12 time zones while maintaining velocity and connection.",
    category: "Company",
    author: "Olivia Thompson",
    date: "2026-01-01",
    readingTime: "5 min read",
    content: `Bizzed has been remote-first since day one. Not remote-friendly, not hybrid — fully distributed across 12 time zones with no physical office. As we've grown from 5 to 150 people, we've learned a lot about what makes distributed teams work.

The foundation is asynchronous communication. We write everything down. Every decision, every design review, every architecture discussion starts as a written document. This isn't just a nice-to-have — it's a requirement when your team spans from São Paulo to Singapore. Real-time meetings happen, but they're the exception, not the default.

We use a structured decision-making framework we call "RFC-lite." Anyone can propose a change by writing a short document: context, proposal, trade-offs, and a deadline for feedback. After the feedback window closes, the author makes the call and documents the decision. This gives everyone a voice regardless of time zone and creates a searchable archive of why we made every important choice.

For connection and culture, we've invested heavily in two areas: virtual social spaces and in-person gatherings. We run optional daily "coffee roulette" calls that pair random teammates for 15-minute chats. We host monthly team game nights and quarterly all-hands with interactive segments. And twice a year, the entire company meets in person for a week-long offsite focused on collaboration and relationship-building.

The hardest part of remote work isn't productivity — it's ensuring that junior team members get the mentorship and context they need to grow. We've addressed this with structured onboarding buddies, weekly 1:1s between every manager and report, and a culture of over-communicating context in written updates.

Remote-first isn't easier than co-located. It's different. It requires more discipline, more writing, and more intentional culture-building. But when it works, it gives you access to talent everywhere and a team that judges contributions by output, not office presence.`,
  },
];

function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}

export { blogPosts, getPostBySlug, getAllCategories };
export type { BlogPost };
