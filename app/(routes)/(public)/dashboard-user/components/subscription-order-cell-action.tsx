"use client";

import { SubscriptionOrderColumn } from "./subscription-order-column";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumn;
}

export const SubscriptionOrderCellAction: React.FC<
  SubscriptionOrderCellActionProps
> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="ghost"
        className="w-8 h-8 p-0"
        onClick={() => router.push(`${pathname}/${data.id}`)}
      >
        <BiBookOpen className="flex-shrink-0 w-4 h-4 mr-2" />
      </Button>
    </>
  );
};
