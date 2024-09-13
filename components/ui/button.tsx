import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils"; // Utility to combine class names

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  // Static CSS styles (previously the default variant)
  const staticClasses =
   "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5e25bc] hover:bg-[#7f32ff] h-10 px-4 py-2";

  return (
   <Comp
    className={cn(staticClasses, className)} // Combine static styles with any additional className provided
    ref={ref}
    {...props}
   />
  );
 }
);
Button.displayName = "Button";

export { Button };
