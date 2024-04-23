import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-[pulse_1s_ease-in-out_infinite] rounded-md bg-muted-foreground/50",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
