import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export function GetWindowWidth() {
  if (typeof window === "undefined") {
    return 0;
  }
  return window.innerWidth;
}
export function GetWindowHeight() {
  if (typeof window === "undefined") {
    return 0;
  }
  return window.innerHeight;
}
export function isWindowSmallerThan(windowSize: number) {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth < windowSize;
}

export function isMobile() {
  if (typeof window === "undefined") {
    return false;
  }
  return navigator.userAgent.indexOf("Mobile") !== -1;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export const dateFormatter = (date: Date) => {
  return format(date, "d MMMM yyyy", { locale: fr });
};

export function addDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const randomFromInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
