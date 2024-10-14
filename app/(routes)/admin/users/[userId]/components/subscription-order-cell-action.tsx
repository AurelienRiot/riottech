"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import useServerAction from "@/hooks/use-server-action";
import ky, { type HTTPError } from "ky";
import { ArrowLeftRightIcon, Copy, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import { BsFillSimFill } from "react-icons/bs";
import { toast } from "sonner";
import changeActivity from "../_actions/change-activity";
import changeSim from "../_actions/change-sim";
import type { SubscriptionOrderColumn } from "./subscription-order-column";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumn;
}

export const SubscriptionOrderCellAction: React.FC<SubscriptionOrderCellActionProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { serverAction } = useServerAction(changeActivity);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order Id copied to the clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await ky.delete(`/api/subscription-orders/${data.id}`);
      router.refresh();
      toast.success("Order deleted.");
    } catch (error) {
      const kyError = error as HTTPError;
      if (kyError.response) {
        const errorData = await kyError.response.text();
        toast.error(errorData);
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onActive = async () => {
    setLoading(true);
    serverAction({
      data: { subscriptionId: data.id, isActive: !data.isActive },
      onSuccess: () => {
        setOpen(false);
        router.refresh();
      },
      onFinally: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <SimModal openModal={openModal} onClose={() => setOpenModal(false)} subscriptionId={data.id} />
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
            {data.isActive ? "Desactiver" : "Activer"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            <BsFillSimFill className="mr-2 h-4 w-4" />
            Changer SIM
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

function SimModal({
  subscriptionId,
  onClose,
  openModal,
}: { subscriptionId: string; onClose: () => void; openModal: boolean }) {
  const { serverAction, loading } = useServerAction(changeSim);
  const [sim, setSim] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function onSuccess() {
      onClose();
      setSim("");
      router.refresh();
    }

    await serverAction({ data: { subscriptionId, sim }, onSuccess });
  };
  return (
    <Modal
      title="Changer le numéro de SIM"
      description="Entrez le nouveau numéro de SIM ci-dessous. Cliquez sur sauvegarder une fois terminé."
      isOpen={openModal}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Label htmlFor="sim-number" className="text-right">
            Numéro de SIM
          </Label>
          <Input
            id="sim-number"
            value={sim}
            onChange={(e) => setSim(e.target.value)}
            placeholder="Entrez le nouveau numéro de SIM"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button disabled={loading} type="submit">
            Sauvegarder les changements
          </Button>
        </DialogFooter>
      </form>
    </Modal>
  );
}
