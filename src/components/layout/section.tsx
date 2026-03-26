import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  /** Wrap children in a max-width Container. Defaults to true. */
  container?: boolean;
}

function Section({
  className,
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn("py-24", className)}
      {...props}
    >
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export { Section };
