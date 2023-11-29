"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { SelectSubscription } from "./select-subscription";
import { Subscription } from "@prisma/client";
import { useLocalStorage } from "@/hooks/use-local-storage";

const simSchema = z.object({
  sim: z.string().refine((value) => /^\d{19}$/.test(value), {
    message: "La Sim doit être un numéro de 19 chiffres",
  }),
});

type SimSchema = z.infer<typeof simSchema>;

type ActivationSimFormProps = {
  groupedSubscriptions: Subscription[][];
};

export const ActivationSimForm: React.FC<ActivationSimFormProps> = ({
  groupedSubscriptions,
}) => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = `/activation-sim`;
  const { getValue, setValue } = useLocalStorage("activatedSim");
  const [sim, setSim] = useState(getValue() ?? "");
  const [selectedGroupedSubscription, setSelectedGroupedSubscription] =
    useState<Subscription[] | null>(null);

  if (typeof window !== "undefined") {
    if (searchParams.get("canceled")) {
      toast.error("Erreur de paiement.");
      router.replace(
        `/activation-sim?callbackUrl=${encodeURIComponent(callbackUrl)}`
      );
    }
  }

  const form = useForm<SimSchema>({
    resolver: zodResolver(simSchema),
    defaultValues: {
      sim,
    },
  });

  useEffect(() => {
    if (sim) {
      const index = parseInt(sim[0]);
      setSelectedGroupedSubscription(
        groupedSubscriptions[index % groupedSubscriptions.length]
      );
    }
  }, [groupedSubscriptions, sim]);

  const onSubmit = async (data: SimSchema) => {
    setLoading(true);
    setValue(data.sim);
    setSim(data.sim);

    await new Promise((r) => setTimeout(r, 100));
    document.getElementById("commande")?.scrollIntoView({
      behavior: "smooth",
    });
    setLoading(false);
  };

  return (
    <>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <FormField
            control={form.control}
            name="sim"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel className="mr-4">Numéros de SIM</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="89882470000XXXXXXXX"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            Vérifier le numéro de SIM
          </Button>
        </form>
      </Form>
      <div id="commande" className="w-full">
        {selectedGroupedSubscription && (
          <SelectSubscription
            subscriptions={selectedGroupedSubscription}
            sim={sim}
          />
        )}
      </div>
    </>
  );
};
