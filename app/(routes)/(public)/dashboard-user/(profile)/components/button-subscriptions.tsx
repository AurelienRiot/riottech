"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

const ButtonSubscriptions: React.FC<{ stripeCustomerId: string }> = ({
  stripeCustomerId,
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/manage-subscription`, {
        stripeCustomerId,
      });
      window.location = response.data.url;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError?.response?.data as string, { duration: 8000 });
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
