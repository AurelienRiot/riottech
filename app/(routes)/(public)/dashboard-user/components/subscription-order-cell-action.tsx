"use client";

import { SubscriptionOrderColumnType } from "./subscription-order-column";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiBookOpen } from "react-icons/bi";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumnType;
}

export const SubscriptionOrderCellAction: React.FC<
  SubscriptionOrderCellActionProps
> = ({ data }) => {
  const pathname = usePathname();

  return (
    <>
      {/* <Button
        variant="ghost"
        className="w-8 h-8 p-0"
        onClick={() => router.push(`${pathname}/${data.id}`)}
      >
        <BiBookOpen className="flex-shrink-0 w-4 h-4 mr-2" />
      </Button> */}
      {data.histories > 0 ? (
        <Link href={`${pathname}/${data.id}`} className="hover:underline">
          Voir mes paiements
        </Link>
      ) : null}
    </>
  );
};
