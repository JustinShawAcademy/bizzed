// documentation: https://ui.shadcn.com/docs/components/section
import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> { // This tells TypeScript that SectionProps should inherit every single property that a regular HTML <section> has. Because of this, you can pass onClick, id, style, onMouseOver, or children to your <Section /> and it won't throw an error.
  /** Wrap children in a max-width Container. Defaults to true. */
  container?: boolean; // MOST IMPORANT: "Do you want this content centered in a box, or should it go edge-to-edge?"
}

// option A: container = true
// It wraps your content in a div with max-w-7xl (1280px) and mx-auto (centered). Most of your content (text, grids, cards) will use this.

// option B: container = false
// It doesn't wrap your content in a div. Your content will stretch the full width of the screen. This is useful for things like hero sections or full-width backgrounds.

function Section({
  className,
  children,
  container = true,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section" 
      className={cn("py-24", className)} 
      // This is where you add your own custom classes. So if you write <Section className="bg-red-500" />, the bg-red-500 class will be added to the parent section.
      // This is also the "Vertical Rhythm." Every section on your site will automatically have 6rem (96px) of padding on the top and bottom. This ensures your site doesn't feel cramped.
      {...props} // This "spreads" those props onto the actual section. This is why if you write <Section id="main" />, the ID actually ends up on the HTML element in the browser.
    >
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
            {/* This is the container div. It wraps your content in a div with max-w-7xl (1280px) and mx-auto (centered). */}
          {children} 
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export { Section };

// Example usage:
// <Section>
//   <div className="flex items-center justify-center">
//     <h1 className="text-4xl font-bold">Hello World</h1>
//   </div>
// </Section>

// <Section container={false}>
//   <div className="bg-red-500">
//     <h1 className="text-4xl font-bold">Hello World</h1>
//   </div>
// </Section>
