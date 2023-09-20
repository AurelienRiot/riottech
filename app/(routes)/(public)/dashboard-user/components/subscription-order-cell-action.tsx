"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubscriptionOrderColumn } from "./subscription-order-column";
import { Button } from "@/components/ui/button";
import { ArrowLeftRightIcon, Copy, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal-form";
import { BiBookOpen } from "react-icons/bi";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumn;
}

export const SubscriptionOrderCellAction: React.FC<
  SubscriptionOrderCellActionProps
> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
