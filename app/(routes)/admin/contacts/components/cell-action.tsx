"use client";

import type { ContactColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal-form";

interface CellActionProps {
  data: ContactColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/contacts/${data.id}`);
      router.refresh();
      toast.success("Message supprimé.");
    } catch (error) {
      toast.error("Erreur");
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
