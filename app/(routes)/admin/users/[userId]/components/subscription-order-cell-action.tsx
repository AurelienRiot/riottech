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
import { ArrowLeftRightIcon, CalendarSearchIcon, Copy, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import { BsFillSimFill } from "react-icons/bs";
import { toast } from "sonner";
import changeActivity from "../_actions/change-activity";
import changeSim from "../_actions/change-sim";
import { getSubscriptions } from "../_functions/get-subscriptions";
import type { SubscriptionOrderColumn } from "./subscription-order-column";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Spinner from "@/components/animations/spinner";
import changeSub from "../_actions/change-sub";

interface SubscriptionOrderCellActionProps {
  data: SubscriptionOrderColumn;
}

export const SubscriptionOrderCellAction: React.FC<SubscriptionOrderCellActionProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSimModal, setOpenSimModal] = useState(false);
  const [openSubsriptionModal, setOpenSubsriptionModal] = useState(false);
  const { serverAction } = useServerAction(changeActivity);
  const { serverAction: getSubscriptionsAction } = useServerAction(getSubscriptions);
  const [subscriptions, setSubscriptions] = useState<{ id: string; name: string }[] | undefined>(undefined);

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
      <SimModal openModal={openSimModal} onClose={() => setOpenSimModal(false)} subscriptionId={data.id} />
      <SubcriptionModal
        openModal={openSubsriptionModal}
        onClose={() => setOpenSubsriptionModal(false)}
        subscriptionId={data.id}
        subscriptions={subscriptions}
      />
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
          <DropdownMenuItem onClick={() => setOpenSimModal(true)}>
            <BsFillSimFill className="mr-2 h-4 w-4" />
            Changer SIM
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              getSubscriptionsAction({ data: {}, onSuccess: (res) => setSubscriptions(res) });
              setOpenSubsriptionModal(true);
            }}
          >
            <CalendarSearchIcon className="mr-2 h-4 w-4" />
            Changer abonnement
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

function SubcriptionModal({
  subscriptionId,
  onClose,
  openModal,
  subscriptions,
}: {
  subscriptionId: string;
  onClose: () => void;
  openModal: boolean;
  subscriptions: { id: string; name: string }[] | undefined;
}) {
  const { serverAction, loading } = useServerAction(changeSub);

  const [subId, setSubId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(subId);
    function onSuccess() {
      setSubId("");
      router.refresh();
      onClose();
    }

    await serverAction({ data: { subscriptionId, subId }, onSuccess });
  };
  return (
    <Modal
      title="Changer l'abonnement"
      description="Selectionez l'abonnement ci-dessous. Cliquez sur sauvegarder une fois terminé."
      isOpen={openModal}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Label htmlFor="subscription" >
            Abonnement
          </Label>

          <Select disabled={loading} onValueChange={setSubId} value={subId}>
            {subscriptions ? (
              <>
                <SelectTrigger>
                  <SelectValue  placeholder="..." />
                </SelectTrigger>

                <SelectContent>
                  {subscriptions.map((subscription) => (
                    <SelectItem key={subscription.id} value={subscription.id}>
                      {subscription.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </>
            ) : (
              <Spinner size={20} />
            )}
          </Select>
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
