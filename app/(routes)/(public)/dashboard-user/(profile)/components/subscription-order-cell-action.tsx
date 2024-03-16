"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubscriptionOrderColumnType } from "./subscription-order-column";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumnType;
}

export const SubscriptionOrderCellAction: React.FC<
  SubscriptionOrderCellActionProps
> = ({ data }) => {
  const pathname = usePathname();

  return (
    <>
      {data.histories > 0 ? (
        <Link href={`${pathname}/${data.id}`} className="hover:underline">
          Voir mes paiements
        </Link>
      ) : null}
    </>
  );
};
