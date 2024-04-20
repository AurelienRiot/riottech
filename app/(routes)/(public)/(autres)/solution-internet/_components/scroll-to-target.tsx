"use client";

import { cn } from "@/lib/utils";

export const ScrollToTargetSpan = ({
  target,
  className,
  text,
}: {
  target: string;
  className?: string;
  text: string;
}) => {
  return (
    <span
      className={cn("cursor-pointer text-blue-500", className)}
      onClick={() => scrollToTarget(target)}
    >
      {text}
    </span>
  );
};

function scrollToTarget(id: string) {
  const target = document.getElementById(id);
  const navbarHeight = 74;

  if (target) {
    const offset = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: offset - navbarHeight, behavior: "smooth" });

    setTimeout(() => {
      target.classList.add("ring-2");
      target.classList.add("dark:bg-slate-900");
      target.classList.add("bg-slate-200");

      setTimeout(() => {
        target.classList.remove("ring-2");
        target.classList.remove("dark:bg-slate-900");
        target.classList.remove("bg-slate-200");
      }, 500);
    }, 1000);
  }
}
