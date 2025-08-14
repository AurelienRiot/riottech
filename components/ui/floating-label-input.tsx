import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn("peer", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        " absolute start-2 top-2  z-10  origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-primary duration-300 dark:bg-background peer-focus:rtl:left-auto peer-focus:rtl:translate-x-1/4",
        className,
      )}
      // className={cn(
      //   " absolute start-2 top-2  z-10  origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-primary duration-300 dark:bg-background peer-focus:rtl:left-auto peer-focus:rtl:translate-x-1/4",
      //   className,
      // )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

interface FloatingLabelInputProps extends InputProps {
  label?: string;
}

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {
  return (
    <div className="relative ">
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
