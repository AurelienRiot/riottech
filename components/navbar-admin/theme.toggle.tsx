"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <>
      {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
        <Button
          variant={"rounded"}
          onClick={() => setTheme("light")}
          size="icon"
          title="light theme"
        >
          <SunIcon className=" absolute h-[1.2rem] w-[1.2rem] " />
        </Button>
      ) : (
        <Button
          variant={"rounded"}
          onClick={() => setTheme("dark")}
          size="icon"
          title="dark theme"
        >
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem]  " />
        </Button>
      )}
      <span className="sr-only w-0">Toggle theme</span>
    </>
  );
}
