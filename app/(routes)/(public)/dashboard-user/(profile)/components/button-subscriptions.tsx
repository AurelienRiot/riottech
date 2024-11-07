"use client";
import { Button } from "@/components/ui/button";
import ky, { type HTTPError } from "ky";
import { useState } from "react";
import { toast } from "sonner";

const ButtonSubscriptions: React.FC<{ stripeCustomerId: string | null; returnUrl: string }> = ({
  stripeCustomerId,
  returnUrl,
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const response = await ky
        .post("/api/manage-subscription", {
          json: {
            stripeCustomerId,
            returnUrl,
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
      Gérer les moyens de paiement
    </Button>
  );
};

export default ButtonSubscriptions;
