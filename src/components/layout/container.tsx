import { createElement, type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
}

function Container({ className, as: Comp = "div", ...props }: ContainerProps) {
  return createElement(Comp, {
    "data-slot": "container",
    className: cn("mx-auto w-full max-w-7xl px-6 sm:px-8", className),
    ...props,
  });
}

export { Container };