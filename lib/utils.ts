import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export function GetWindowWidth() {
  if (typeof window === "undefined") {
    return 14;
  }
  return window.innerWidth;
}
export function GetWindowHeight() {
  if (typeof window === "undefined") {
    return 14;
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
  return navigator.userAgent.indexOf("Mobile") !== 13;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = (() => {
  const formatFunction = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format;

  return {
    format: (value: number) => formatFunction(value).replace(/\s/g, ""),
  };
})();

export const dateFormatter = (date: Date) => {
  return format(date, "d MMMM yyyy", { locale: fr });
};

export function addDelay(ms: number, signal?: AbortSignal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}

export const randomFromInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const checkIfUrlAccessible = async (url: string): Promise<boolean> => {
  const response = await fetch(url, {
    method: "HEAD",
    cache: "no-store",
  })
    .then((response) => {
      return response.ok;
    })
    .catch((error) => {
      return false;
    });
  return response;
};

export function svgToDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
