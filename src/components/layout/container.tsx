import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  as?: React.ElementType;
}

function Container({
  className,
  as: Comp = "div",
  ...props
}: ContainerProps) {
  return (
    <Comp
      data-slot="container"
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8", className)}
      {...props}
    />
  );
}

export { Container };
