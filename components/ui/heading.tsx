import * as React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = React.forwardRef<
  HTMLDivElement,
  HeadingProps
>(({ title, description, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <h2 className="text-3xl font-bold tracking-tight"> {title} </h2>
      <p className=" text-muted-foreground">{description}</p>
    </div>
  );
});

Heading.displayName = "Heading";
