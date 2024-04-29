"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  {
    className?: string;
    children: React.ReactNode;
    classNameHeader?: string;
    classNameIcon?: string;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, classNameHeader, classNameIcon, ...props }, ref) => (
  <AccordionPrimitive.Header className={cn("flex", className)}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium hover:underline [&[data-state=open]>svg.chevron]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "chevron h-4 w-4 shrink-0 transition-transform duration-500 [transition-timing-function:_cubic-bezier(0.34,_1.56,_0.64,_1)]",
          classNameIcon,
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden pb-4 pt-0 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
