import { cn } from "@/lib/utils";
import * as React from "react";

export interface AnimateHeightProps
  extends React.HTMLAttributes<HTMLDivElement> {
  display: boolean;
}

const AnimateHeightOuter = React.forwardRef<HTMLDivElement, AnimateHeightProps>(
  ({ className, display, children, ...props }, ref) => {
    return (
      <div
        data-state={display}
        className={cn(
          "grid grid-rows-[0fr] data-[state=true]:grid-rows-[1fr]   transition-[grid-template-rows] duration-500 ",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AnimateHeightOuter.displayName = "AnimateHeightOuter";

const AnimateHeightInner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("overflow-hidden ", className)} ref={ref} {...props}>
      <div>{children}</div>
    </div>
  );
});
AnimateHeightInner.displayName = "AnimateHeightInner";

const AnimateHeight = React.forwardRef<HTMLDivElement, AnimateHeightProps>(
  ({ display, children, ...props }, ref) => {
    return (
      <AnimateHeightOuter display={display}>
        <AnimateHeightInner ref={ref} {...props}>
          {children}
        </AnimateHeightInner>
      </AnimateHeightOuter>
    );
  }
);
AnimateHeight.displayName = "AnimateHeight";

export { AnimateHeightOuter, AnimateHeightInner, AnimateHeight };
