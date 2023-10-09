"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"rounded"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
      className="bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground"
    >
      <SunIcon className="absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 h-6 w-6  " />
      <MoonIcon className="absolute  h-6 w-6   rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0  " />
      <span className="sr-only w-0">Toggle theme</span>
    </Button>
  );
}
