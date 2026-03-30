import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {}

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8", className)}
      {...props}
    />
  );
}

export { Container };