"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button } from "@/components/ui/button";
import ky, { type HTTPError } from "ky";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { OrderColumn } from "./columns";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setLoading(true);
      await ky.delete(`/api/orders/${data.id}`);
      router.refresh();
      toast.success("Commande supprimée");
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

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />

      <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};
