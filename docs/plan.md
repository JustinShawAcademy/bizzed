# Bizzed — Enterprise SaaS Landing Page

## Architecture Plan

> **Tech Stack**: Next.js 15 (App Router) · Tailwind CSS v4 · Framer Motion · Shadcn UI (CLI v4) · Aceternity UI
> **Target**: Lighthouse 90+ across all categories · Strict TypeScript · Dark/Light mode (black & white)

---

## Table of Contents

1. [Project Initialization](#phase-0-project-initialization)
2. [Design System & Theming](#phase-1-design-system--theming)
3. [Component Architecture](#phase-2-component-architecture)
4. [Layout Shell & Navigation](#phase-3-layout-shell--navigation)
5. [Home Page](#phase-4-home-page)
6. [Inner Pages](#phase-5-inner-pages)
7. [Animation System](#phase-6-animation-system)
8. [Performance & SEO](#phase-7-performance--seo)
9. [Testing & Deployment](#phase-8-testing--deployment)

---

## Phase 0: Project Initialization

### Why These Defaults


| Choice                  | Reasoning                                                                                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 15 (latest)** | Next.js 15 is the current stable version with full App Router maturity, React Server Components, and production-ready Turbopack. We will use `create-next-app@latest` to get the most current stable release.                 |
| **App Router**          | Server Components by default means smaller client bundles. Layouts, loading states, and streaming are first-class. This is the future of Next.js — Pages Router is in maintenance mode.                                       |
| **Turbopack**           | Rust-based dev bundler. 5–10x faster HMR than Webpack. Critical for DX when iterating on 50+ components. Enabled by default in Next.js 15 for `next dev`.                                                                     |
| `**src/` directory**    | Separates application code from config files (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`). Keeps the root clean. Standard in enterprise codebases.                                                               |
| **TypeScript (strict)** | Non-negotiable for enterprise. Strict mode catches null/undefined bugs at compile time. Enables better IDE autocomplete and refactoring. We will enable `"strict": true` plus `"noUncheckedIndexedAccess": true` in tsconfig. |
| **ESLint**              | Next.js includes `eslint-config-next` which catches common React/Next.js anti-patterns (missing `alt` on images, incorrect `<Link>` usage, etc.). We will extend this with stricter rules.                                    |
| **Tailwind CSS v4**     | CSS-first configuration via `@theme` directive (no more `tailwind.config.js`). New Oxide engine is 100x faster on incremental builds. Automatic content detection. Ships with `create-next-app --tailwind`.                   |


### Initialization Commands

```bash
# 1. Scaffold the project
npx create-next-app@latest bizzed \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. Initialize Shadcn UI (CLI v4 — released March 2026)
npx shadcn@latest init

# 3. Install animation & UI dependencies
npm install motion clsx tailwind-merge

# 4. Install Aceternity UI components via Shadcn registry
# (individual components added as needed per phase)
npx shadcn@latest add https://ui.aceternity.com/registry/<component>.json

# 5. Install dark mode tooling
npm install next-themes
```

### Why Shadcn over a Traditional Component Library

Shadcn UI is **not** a package — it copies component source code into your project. This means:

- **Zero runtime overhead** — no library bundle shipped to the client.
- **Full ownership** — you can modify any component without fighting upstream opinions.
- **Tree-shaking is irrelevant** — you only have what you use.
- **Aceternity UI integrates via the same registry pattern** — both libraries coexist cleanly.

---

## Phase 1: Design System & Theming

### Color System (Black & White with Semantic Tokens)

The design uses a strict black-and-white palette with CSS custom properties that flip between light and dark mode. No grays with color tint — pure neutral scale.

```
Light Mode                    Dark Mode
─────────────────────────     ─────────────────────────
--background:  #FFFFFF        --background:  #000000
--foreground:  #0A0A0A        --foreground:  #FAFAFA
--muted:       #F5F5F5        --muted:       #171717
--muted-fg:    #737373        --muted-fg:    #A3A3A3
--border:      #E5E5E5        --border:      #262626
--ring:        #0A0A0A        --ring:        #D4D4D4
--primary:     #0A0A0A        --primary:     #FAFAFA
--primary-fg:  #FAFAFA        --primary-fg:  #0A0A0A
--accent:      #F5F5F5        --accent:      #262626
--accent-fg:   #0A0A0A        --accent-fg:   #FAFAFA
```

### Typography Scale

Using `Inter` as the primary sans-serif (clean, enterprise feel) and `JetBrains Mono` for code blocks:

```
Display:    4.5rem / 1.0  (72px) — Hero headlines
H1:         3.0rem / 1.1  (48px) — Page titles
H2:         2.25rem / 1.2 (36px) — Section headers
H3:         1.5rem / 1.3  (24px) — Card titles
Body:       1.0rem / 1.6  (16px) — Paragraph text
Small:      0.875rem / 1.5 (14px) — Captions, labels
```

### Spacing & Layout Tokens

```
Container max-width:  1280px (with 2rem horizontal padding)
Section padding:      6rem vertical (96px)
Grid gap:             1.5rem (24px)
Border radius:        0.75rem (12px) for cards, 0.5rem (8px) for buttons
```

### Deliverables

- `src/app/globals.css` — Theme tokens via Tailwind `@theme` directive
- `src/lib/fonts.ts` — Next.js font optimization for Inter + JetBrains Mono
- `src/components/providers/theme-provider.tsx` — `next-themes` wrapper
- `src/app/layout.tsx` — Root layout with font classes and theme provider

---

## Phase 2: Component Architecture

### Folder Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, theme, metadata)
│   ├── page.tsx                  # Home page
│   ├── features/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx              # Blog index
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post
│   └── globals.css
│
├── components/
│   ├── ui/                       # ── LAYER 1: UI Primitives (Shadcn) ──
│   │   ├── button.tsx            # Atomic, stateless, reusable
│   │   ├── card.tsx              # No business logic
│   │   ├── badge.tsx             # Styled with Tailwind + CVA
│   │   ├── input.tsx             # Composable via props/slots
│   │   ├── navigation-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── switch.tsx
│   │   └── separator.tsx
│   │
│   ├── blocks/                   # ── LAYER 2: Complex Sections (Aceternity + Custom) ──
│   │   ├── hero.tsx              # Combines UI primitives + animation
│   │   ├── bento-grid.tsx        # Aceternity bento grid with custom content
│   │   ├── feature-cards.tsx     # Animated feature showcase
│   │   ├── pricing-table.tsx     # Interactive pricing with toggle
│   │   ├── testimonials.tsx      # Scroll-based testimonial carousel
│   │   ├── cta-section.tsx       # Call-to-action with gradient effects
│   │   ├── stats-section.tsx     # Animated number counters
│   │   └── blog-preview.tsx      # Latest posts grid
│   │
│   ├── layout/                   # ── LAYER 3: Layout Wrappers ──
│   │   ├── header.tsx            # Navigation + theme toggle
│   │   ├── footer.tsx            # Links + branding
│   │   ├── section.tsx           # Reusable section container with consistent padding
│   │   ├── container.tsx         # Max-width wrapper
│   │   └── page-wrapper.tsx      # Page-level animation wrapper
│   │
│   └── shared/                   # ── Shared Utilities ──
│       ├── theme-toggle.tsx      # Dark/light mode switch
│       ├── logo.tsx              # SVG logo component
│       ├── animated-text.tsx     # Reusable text animation wrapper
│       └── gradient-blob.tsx     # Background decoration element
│
├── lib/                          # Utility functions
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── fonts.ts                  # Next.js font declarations
│   └── constants.ts              # Navigation links, site metadata
│
├── hooks/                        # Custom React hooks
│   ├── use-scroll-position.ts
│   └── use-media-query.ts
│
├── types/                        # Shared TypeScript types
│   └── index.ts
│
└── content/                      # Static content (blog posts, copy)
    └── blog/
        └── *.mdx
```

### The Three-Layer Component Pattern — Explained

**Layer 1 — UI Primitives (`/components/ui/`)**

These come directly from Shadcn. They are the atoms of the design system. Rules:

- Never contain business logic or data fetching.
- Accept only props and children.
- Styled exclusively via Tailwind + CVA (Class Variance Authority).
- Should work identically in isolation (storybook-ready).
- Example: `<Button variant="outline" size="lg">` — knows nothing about where it lives.

**Layer 2 — Complex Sections (`/components/blocks/`)**

These are the page sections that compose UI primitives into meaningful blocks. Rules:

- May import from `/ui/` and `/shared/` but never from other blocks.
- Own their Framer Motion animations (entrance, hover, scroll triggers).
- Accept content via props (not hardcoded) for reusability.
- Can be Server Components if they have no interactivity, or Client Components if animated.
- Example: `<BentoGrid items={features} />` — composes Cards, Badges, and motion divs.

**Layer 3 — Layout Wrappers (`/components/layout/`)**

These define the spatial structure of pages. Rules:

- Never contain visual design beyond spacing and max-widths.
- Provide consistent padding, margins, and responsive behavior.
- The `<Section>` component enforces vertical rhythm site-wide.
- Example: `<Section id="features" className="bg-muted">` wraps any block with correct spacing.

### Why This Separation Matters

```
Traditional approach:          Modular approach:
┌────────────────────┐        ┌────────────────────┐
│  HeroSection.tsx   │        │  Layout: Section    │  ← Spacing only
│  - styles          │        │  ┌────────────────┐ │
│  - animation       │   →    │  │ Block: Hero     │ │  ← Animation + composition
│  - layout          │        │  │  ┌────────────┐ │ │
│  - button logic    │        │  │  │ UI: Button  │ │ │  ← Pure primitive
│  - everything...   │        │  │  └────────────┘ │ │
└────────────────────┘        │  └────────────────┘ │
                              └────────────────────┘
```

The modular approach means you can change the hero animation without touching buttons, swap the layout without touching content, or reuse the same Button across 30 different blocks.

---

## Phase 3: Layout Shell & Navigation

### Header / Navigation

A floating header that:

- Is transparent on scroll top, gains a backdrop blur on scroll.
- Contains the logo, navigation links, theme toggle, and CTA button.
- Collapses to a mobile sheet (hamburger) on small screens.
- Uses `motion.header` with `useMotionValueEvent` for scroll-based styling.

### Footer

Minimal, clean footer with:

- Logo and tagline.
- Column layout: Product, Company, Legal, Social.
- Newsletter email input.
- Copyright line.

### Deliverables

- `src/components/layout/header.tsx` — Animated floating navbar
- `src/components/layout/footer.tsx` — Multi-column footer
- `src/components/layout/section.tsx` — Reusable section wrapper
- `src/components/layout/container.tsx` — Max-width container
- `src/components/layout/page-wrapper.tsx` — Page entrance animation
- `src/components/shared/theme-toggle.tsx` — Light/dark toggle with animation
- `src/components/shared/logo.tsx` — SVG logo
- `src/lib/constants.ts` — Nav links, site config

---

## Phase 4: Home Page

The home page is the centerpiece. It follows a proven SaaS landing page flow:

```
┌─────────────────────────────────────────┐
│  HEADER (floating, blur on scroll)      │
├─────────────────────────────────────────┤
│                                         │
│  1. HERO SECTION                        │
│     - Animated headline (staggered)     │
│     - Subtext + CTA buttons             │
│     - Aceternity spotlight/aurora bg    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  2. SOCIAL PROOF BAR                    │
│     - "Trusted by" logo strip           │
│     - Infinite marquee animation        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  3. BENTO GRID (features)               │
│     - 4–6 cards in asymmetric grid      │
│     - Each card: icon, title, desc      │
│     - Staggered viewport entrance       │
│     - Aceternity bento-grid component   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  4. FEATURE DEEP-DIVE                   │
│     - Alternating image/text rows       │
│     - Parallax or reveal animations     │
│     - 3 key features highlighted        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  5. STATS / METRICS                     │
│     - Animated counter numbers          │
│     - "10k+ users", "99.9% uptime"     │
│     - Viewport-triggered count-up       │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  6. TESTIMONIALS                        │
│     - Card carousel or grid             │
│     - Avatar, name, role, quote         │
│     - Subtle entrance animation         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  7. PRICING PREVIEW                     │
│     - 2–3 tier cards                    │
│     - Monthly/yearly toggle             │
│     - Highlighted "popular" tier        │
│     - Links to full pricing page        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  8. CTA SECTION                         │
│     - Bold closing headline             │
│     - Gradient or spotlight background  │
│     - Primary + secondary action        │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

### Deliverables

- `src/components/blocks/hero.tsx` — With Aceternity spotlight/aurora effect
- `src/components/blocks/social-proof.tsx` — Infinite marquee logo strip
- `src/components/blocks/bento-grid.tsx` — Asymmetric feature grid
- `src/components/blocks/feature-showcase.tsx` — Alternating image/text sections
- `src/components/blocks/stats-section.tsx` — Animated counters
- `src/components/blocks/testimonials.tsx` — Testimonial cards
- `src/components/blocks/pricing-preview.tsx` — Condensed pricing
- `src/components/blocks/cta-section.tsx` — Closing CTA
- `src/app/page.tsx` — Home page composing all blocks

---

## Phase 5: Inner Pages

### Features Page (`/features`)

- Full bento grid with expanded feature details.
- Each feature gets a mini-section with illustration and bullet points.
- Comparison table showing Bizzed vs competitors.

### Pricing Page (`/pricing`)

- Full pricing table with feature comparison matrix.
- Monthly/Yearly toggle with animated price transitions.
- FAQ accordion below the pricing cards.
- Enterprise "Contact Us" CTA.

### About Page (`/about`)

- Company story / mission statement.
- Team grid with hover effects.
- Timeline of company milestones.
- Values section with icons.

### Blog Page (`/blog`)

- Grid of blog post cards with image, title, date, tag.
- Category filter tabs.
- Individual post pages rendered from MDX.
- Reading time estimate.

### Deliverables

- `src/app/features/page.tsx`
- `src/app/pricing/page.tsx`
- `src/components/blocks/pricing-table.tsx`
- `src/components/blocks/faq-accordion.tsx`
- `src/app/about/page.tsx`
- `src/components/blocks/team-grid.tsx`
- `src/components/blocks/timeline.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- MDX configuration and sample posts

---

## Phase 6: Animation System

### Framer Motion Architecture

We use a layered animation approach. Every animation decision is intentional.

#### Pattern 1: Viewport-Triggered Entrance (Sections)

```tsx
// Every block section uses this pattern
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
```

**Why this is better than CSS:**
CSS `@keyframes` with `IntersectionObserver` requires manual JavaScript to toggle classes, doesn't support spring physics or custom easing curves, and can't coordinate staggered children declaratively. Framer Motion's `whileInView` handles the observer internally and gives you physics-based transitions.

#### Pattern 2: Staggered Children (Grids, Lists)

```tsx
// Parent orchestrates timing
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,    // 100ms between each child
      delayChildren: 0.2,      // Wait 200ms before starting
    },
  },
};

// Children inherit animation state from parent
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
```

**Why this is better than CSS:**
CSS `animation-delay` on nth-child requires hardcoding delays for each child count. Adding or removing grid items breaks the timing. Framer Motion's `staggerChildren` automatically adapts to any number of children.

#### Pattern 3: Scroll-Linked Parallax

```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
```

**Why this is better than CSS:**
CSS `scroll-timeline` has limited browser support. Framer Motion provides consistent cross-browser scroll-linked animations with a declarative API.

#### Pattern 4: Page Transitions

Using the `<PageWrapper>` component to animate page entrances:

```tsx
// Wraps each page for consistent entrance
<motion.main
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
>
```

### Animation Performance Rules

1. **Only animate `transform` and `opacity`** — these are GPU-composited and don't trigger layout/paint.
2. **Use `will-change: transform`** sparingly — only on elements that will definitely animate.
3. `**viewport.once: true**` — animate in once, don't re-trigger on scroll back up.
4. **Reduce motion preference** — respect `prefers-reduced-motion` via a global check.
5. **No animation on Server Components** — only Client Components get `motion.`* wrappers.

### Deliverables

- `src/components/shared/animated-text.tsx` — Reusable text reveal animation
- `src/components/layout/page-wrapper.tsx` — Page transition wrapper
- `src/hooks/use-scroll-position.ts` — Scroll tracking hook
- `src/hooks/use-media-query.ts` — Responsive + reduced-motion detection
- Motion variants defined per-block (co-located, not in a shared animations file)

---

## Phase 7: Performance & SEO

### Lighthouse 90+ Strategy


| Category           | Strategy                                                                                                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Performance**    | Server Components by default (zero JS shipped for static sections). Dynamic imports for heavy animation blocks. Next.js Image component for all images. Font optimization via `next/font`. Turbopack for dev, production builds already optimized. |
| **Accessibility**  | Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`). ARIA labels on interactive elements. Focus management on mobile nav. Color contrast ratio 4.5:1+ on all text. Skip-to-content link.                                                   |
| **Best Practices** | HTTPS, no mixed content. No `document.write`. No vulnerable libraries. Correct image aspect ratios.                                                                                                                                                |
| **SEO**            | `generateMetadata()` on every page. Open Graph + Twitter Card meta. JSON-LD structured data for organization + blog posts. Dynamic `sitemap.xml` via Next.js route handler. `robots.txt`. Canonical URLs.                                          |


### Image Strategy

- All images served via `<Image>` from `next/image` with `width`, `height`, and `alt`.
- Use WebP/AVIF formats (Next.js handles this automatically).
- Blur placeholder data URIs for above-the-fold images.
- Lazy loading for below-the-fold.

### Bundle Optimization

- Heavy components (blog MDX renderer, pricing calculator) loaded via `next/dynamic`.
- Aceternity effects that use WebGL or Canvas isolated to Client Component boundaries.
- `"use client"` directive placed as low in the tree as possible.

### Deliverables

- `src/app/layout.tsx` — Root metadata, viewport, Open Graph defaults
- `src/app/sitemap.ts` — Dynamic sitemap generation
- `src/app/robots.ts` — Robots configuration
- Per-page `generateMetadata()` functions
- JSON-LD structured data component
- Accessibility audit pass (keyboard nav, screen reader, contrast)

---

## Phase 8: Testing & Deployment

### Testing Strategy


| Layer       | Tool                           | What We Test                                       |
| ----------- | ------------------------------ | -------------------------------------------------- |
| Component   | Vitest + React Testing Library | UI primitives render correctly, props work         |
| Visual      | Storybook (optional)           | Component library documentation                    |
| E2E         | Playwright                     | Navigation flows, theme toggle, responsive layouts |
| Performance | Lighthouse CI                  | Regression monitoring on every PR                  |


### Deployment

- **Platform**: Vercel (first-class Next.js support, edge functions, image optimization CDN).
- **Preview deployments**: Every PR gets a preview URL.
- **Environment**: Production branch deploys to `bizzed.com` (or whatever domain).

### Deliverables

- Vitest configuration
- Sample component tests for key UI primitives
- Playwright config + smoke tests
- Vercel project configuration
- `README.md` with setup instructions

---

## Phase Execution Order

```
Phase 0 ──→ Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 4 ──→ Phase 5 ──→ Phase 6 ──→ Phase 7 ──→ Phase 8
 Init       Design      Component    Layout      Home Page   Inner        Animation    Perf/SEO    Test/
            System      Structure    Shell                   Pages        Polish                   Deploy
 ─────      ──────      ─────────    ──────      ─────────   ─────        ─────────    ────────    ──────
 30 min     1 hour      30 min       2 hours     4 hours     4 hours      2 hours      2 hours     2 hours
```

**Total estimated build time: ~18 hours** (for a polished, production-quality result)

### Key Dependencies Between Phases

- Phase 1 must complete before Phase 2 (theming tokens needed for components).
- Phase 2 structure must be established before Phase 3 (layout components depend on the folder convention).
- Phase 3 must complete before Phase 4 (home page needs the layout shell).
- Phase 6 runs **in parallel** with Phases 4 and 5 (animations are built into each block as we go).
- Phase 7 is a continuous concern but gets a dedicated pass after all pages exist.
- Phase 8 can begin as soon as Phase 4 is complete (test the home page first).

---

## Notes

- **Next.js 15 vs 16**: As of March 2026, Next.js 15 is the latest stable release. The `create-next-app@latest` command will scaffold a Next.js 15 project with App Router and Turbopack support. If Next.js 16 releases during development, we can upgrade — the App Router API is stable.
- **Aceternity UI components are installed individually** via the Shadcn registry pattern (`npx shadcn@latest add https://ui.aceternity.com/registry/<component>.json`). We add each component as needed rather than installing a monolithic package.
- **Framer Motion is now `motion`** (the package was renamed). Install via `npm install motion` and import from `"motion/react"`.

