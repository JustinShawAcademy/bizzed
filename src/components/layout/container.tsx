// its primary job is to ensure that every major block the website has consistent vertical spacing (breathing room) and horizontal alignment.

import { cn } from "@/lib/utils";

interface ContainerProps<T extends React.ElementType> {
    as?: T;
    className?: string;
    // This helper merges the standard props of the element (T) 
    // with your custom props.
  }
  
  function Container<T extends React.ElementType = "div">({
    className,
    as,
    ...props
  }: ContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
    const Comp = as || "div"; // Use "div" if no 'as' is provided
    
    return (
      <Comp
        data-slot="container"
        className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8", className)}
        {...props}
      />
    );
  }

  export { Container };

//   Why do we even use as (the "Comp" pattern)?
//   You'll see this a lot in high-quality codebases. It allows you to use your Container styles but change the underlying HTML tag for SEO and Accessibility.
//   Example usage:
//   <Container as="section">
//     <h1>Hello World</h1>
//   </Container>
//   // This is the default behavior if you don't specify "as".
//   <Container as="div">
//     <h1>Hello World</h1>
//   </Container>
//   // This renders a <main> tag. Better for SEO.
//   <Container as="main">
//     <h1>Hello World</h1>
//   </Container>

// ability to make your layouts Polymorphic, which is a "pro-level" way to build reusable components.