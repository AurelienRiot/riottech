"use client";
import { Button } from "@/components/ui/button";
import ky, { type HTTPError } from "ky";
import { useState } from "react";
import { toast } from "sonner";

const ButtonSubscriptions: React.FC<{ stripeCustomerId: string }> = ({ stripeCustomerId }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const response = await ky
        .post("/api/manage-subscription", {
          json: {
            stripeCustomerId,
          },
        })
        .json<{ url: string }>();

      window.location.href = response.url;
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
    }
  };

  return (
    <Button onClick={onClick} className="mb-4" disabled={loading}>
      Gerer les abonnements
    </Button>
  );
};

export default ButtonSubscriptions;
