"use client";

import { cn, formatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
  taxtext?: string;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({
  value,
  taxtext = "",
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let text;
  if (taxtext) {
    text = "(HT)";
  } else {
    text = taxtext;
  }

  return (
    <span className={cn(`font-semibold text-primary`, className)}>
      {`${formatter.format(Number(value))} ${text}`}
    </span>
  );
};

export default Currency;
