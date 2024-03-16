"use client";

import { OrderColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal-form";
import { useRouter } from "next/navigation";

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
      await axios.delete(`/api/orders/${data.id}`);
      router.refresh();
      toast.success("Commande supprimée");
    } catch (error) {
      toast.error("Erreur");
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

      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};
