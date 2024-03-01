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
          "group/height grid grid-rows-[0fr] data-[state=true]:grid-rows-[1fr] opacity-0 data-[state=true]:opacity-100 transition-all duration-500 ",
          className
        )}
        ref={ref}
        {...props}
        aria-hidden={!display}
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
    <div
      className={cn(
        "overflow-hidden group-data-[state=false]/height:p-0 transition-all",
        className
      )}
      ref={ref}
      {...props}
    >
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
