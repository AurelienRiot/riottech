"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { ArrowLeftRightIcon, Copy, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BiBookOpen } from "react-icons/bi";
import type { SubscriptionOrderColumn } from "./subscription-order-column";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumn;
}

export const SubscriptionOrderCellAction: React.FC<SubscriptionOrderCellActionProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order Id copied to the clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/subscription-orders/${data.id}`);
      router.refresh();
      toast.success("Order deleted.");
    } catch (error) {
      toast.error("Something Went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onActive = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/subscription-orders/${data.id}`, {
        isActive: data.isActive,
      });
      router.refresh();
      toast.success("Abonnement mis à jour.");
    } catch (error) {
      toast.error("Something Went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only w-0">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)} className="cursor-copy">
            <Copy className="mr-2 h-4 w-4" />
            Copier Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onActive()}>
            <ArrowLeftRightIcon className="mr-2 h-4 w-4" />
            Activité
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center justify-center" href={`${pathname}/${data.id}`}>
              <BiBookOpen className="mr-2 h-4 w-4" />
              Historique
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
