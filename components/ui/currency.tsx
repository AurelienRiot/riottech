"use client";

import { useIsProContext } from "@/hooks/use-is-pro";
import { cn, currencyFormatter } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value: number;
  className?: string;
  classNameLogo?: string;
  displayText?: boolean;
  displayLogo?: boolean;
}

const Currency: React.FC<CurrencyProps> = ({
  value,
  displayText = true,
  displayLogo = true,
  className,
  classNameLogo,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isPro, setIsPro } = useIsProContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const taxe = isPro ? 1 : 1.2;
  const price = value * taxe;
  const taxeText = isPro ? "HT" : "TTC";

  return (
    <button
      type="button"
      onClick={() => setIsPro(!isPro)}
      className={cn(`inline  cursor-pointer items-center font-semibold tabular-nums text-primary `, className)}
    >
      {`${currencyFormatter.format(price)} `} {displayText ? taxeText : ""}
      {displayLogo ? <ArrowUpDown className={cn("ml-1 inline h-4 w-4", classNameLogo)} /> : ""}
    </button>
  );
};

export default Currency;
