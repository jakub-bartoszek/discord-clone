"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Overlay>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
 <DialogPrimitive.Overlay
  ref={ref}
  className={cn(
   "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
   className
  )}
  {...props}
 />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Content>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
 <DialogPortal>
  <DialogOverlay />
  <DialogPrimitive.Content
   ref={ref}
   className={cn(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden rounded-md bg-[#250f4a] p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-lg",
    className
   )}
   {...props}
  >
   {children}
   <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
   </DialogPrimitive.Close>
  </DialogPrimitive.Content>
 </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
 className,
 ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
 <div
  className={cn(
   "flex flex-col space-y-1.5 text-center sm:text-left pt-8 px-6",
   className
  )}
  {...props}
 />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
 className,
 ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
 <div
  className={cn(
   "flex flex-col-reverse px-6 py-4 sm:flex-row sm:justify-end sm:space-x-2",
   className
  )}
  {...props}
 />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Title>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
 <DialogPrimitive.Title
  ref={ref}
  className={cn(
   "text-center text-2xl font-bold leading-none tracking-tight pb-2",
   className
  )}
  {...props}
 />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Description>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
 <DialogPrimitive.Description
  ref={ref}
  className={cn("text-sm text-white/70", className)}
  {...props}
 />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
 Dialog,
 DialogPortal,
 DialogOverlay,
 DialogClose,
 DialogTrigger,
 DialogContent,
 DialogHeader,
 DialogFooter,
 DialogTitle,
 DialogDescription
};
