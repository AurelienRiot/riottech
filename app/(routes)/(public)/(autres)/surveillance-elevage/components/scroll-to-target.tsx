"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ScrollToForm = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  const scrollToForm = () => {
    const form = document.getElementById("form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Button className={cn("cursor-pointer hover:underline", className)} asChild>
      <a onClick={() => scrollToForm()} aria-label="Scroll to form">
        {" "}
        {text}
      </a>
    </Button>
  );
};
