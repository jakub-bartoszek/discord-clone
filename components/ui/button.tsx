import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
 "focus-visible:ring-ring inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
 {
  variants: {
   variant: {
    default: "bg-zinc-600 hover:bg-zinc-500",
    ghost: "bg-transparent hover:bg-black/10",
    destructive: "bg-rose-600 hover:bg-rose-500",
    primary: "bg-[#5e25bc] hover:bg-[#7f32ff]"
   }
  },
  defaultVariants: {
   variant: "default"
  }
 }
);

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
 asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
   <Comp
    className={cn(buttonVariants({ variant, className }))}
    ref={ref}
    {...props}
   />
  );
 }
);
Button.displayName = "Button";

export { Button, buttonVariants };
