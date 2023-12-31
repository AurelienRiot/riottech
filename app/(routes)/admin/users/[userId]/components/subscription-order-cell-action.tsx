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
import Link from "next/link";

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
        isActive: data.isActive === "oui" ? false : true,
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
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="w-0 sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
            className="cursor-copy"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copier Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onActive()}>
            <ArrowLeftRightIcon className="w-4 h-4 mr-2" />
            Activité
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center justify-center"
              href={`${pathname}/${data.id}`}
            >
              <BiBookOpen className="w-4 h-4 mr-2" />
              Historique
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
