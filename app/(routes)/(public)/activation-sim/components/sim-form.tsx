"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const simSchema = z.object({
  sim: z
    .string({
      invalid_type_error: "La Sim doit être un numéro de 19 chiffres",
      required_error: "La Sim doit être un numéro de 19 chiffres",
    })
    .refine((value) => /^\d{19}$/.test(value), {
      message: "La Sim doit être un numéro de 19 chiffres",
    }),
});

type SimSchema = z.infer<typeof simSchema>;

type ActivationSimFormProps = {
  sim: string | undefined;
  availableSim: boolean;
};

export const SimForm: React.FC<ActivationSimFormProps> = ({ sim, availableSim }) => {
  const router = useRouter();
  const [isSimInvalid, setIsSimInvalid] = useState(!availableSim);

  const form = useForm({
    resolver: zodResolver(simSchema),
    defaultValues: {
      sim: sim || "",
    },
  });

  const onSubmit = async (data: SimSchema) => {
    router.push(`/activation-sim?sim=${encodeURIComponent(data.sim)}`, {
      scroll: false,
    });
    router.refresh();
  };
  const simValue = form.watch("sim");
  useEffect(() => {
    if (!availableSim) {
      setIsSimInvalid(true);
    }
    if (simValue !== sim) {
      setIsSimInvalid(false);
    }
  }, [simValue, sim, setIsSimInvalid, availableSim]);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <FormField
            control={form.control}
            name="sim"
            render={({ field }) => (
              <FormItem className=" flex flex-col items-center justify-center  ">
                <FormLabel className={cn("mr-4", isSimInvalid ? "text-red-500" : "")}>Numéro de SIM</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="89882470000XXXXXXXX" {...field} />
                </FormControl>
                {isSimInvalid && <FormMessage>Numéro de SIM Incorrect</FormMessage>}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full">
            {"Vérifier le numéro de SIM"}
          </Button>
        </form>
      </Form>
    </>
  );
};
