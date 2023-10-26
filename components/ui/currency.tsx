"use client";

import { useIsProContext } from "@/hooks/use-is-pro";
import { cn, formatter } from "@/lib/utils";
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
  const taxeText = isPro ? "(HT)" : "(TTC)";

  return (
    <span
      onClick={() => setIsPro(!isPro)}
      className={cn(
        `font-semibold  text-primary cursor-pointer flex items-center tabular-nums hover:font-SourceCodePro `,
        className
      )}
    >
      {`${formatter.format(price)} `} {displayText ? taxeText : ""}
      {displayLogo ? (
        <ArrowUpDown className={cn("inline w-4 h-4 ml-1", classNameLogo)} />
      ) : (
        ""
      )}
    </span>
  );
};

export default Currency;
