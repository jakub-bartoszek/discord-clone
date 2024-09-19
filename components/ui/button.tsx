import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
   <Comp
    className={cn(
     "focus-visible:ring-ring inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#5e25bc] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#7f32ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
     className
    )}
    ref={ref}
    {...props}
   />
  );
 }
);
Button.displayName = "Button";

export { Button };
