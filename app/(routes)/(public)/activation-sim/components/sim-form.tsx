import Spinner from "@/components/animations/spinner";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const simSchema = z.object({
  sim: z.string().refine((value) => /^\d{19}$/.test(value), {
    message: "La Sim doit être un numéro de 19 chiffres",
  }),
});

type SimSchema = z.infer<typeof simSchema>;

type ActivationSimFormProps = {
  sim: string;
  loading: boolean;
};

export const SimForm: React.FC<ActivationSimFormProps> = ({ sim, loading }) => {
  const router = useRouter();

  const form = useForm<SimSchema>({
    resolver: zodResolver(simSchema),
    defaultValues: {
      sim,
    },
  });

  const onSubmit = async (data: SimSchema) => {
    router.push(
      `/activation-sim?sim=${encodeURIComponent(
        data.sim
      )}&callbackUrl=${encodeURIComponent("/activation-sim?sim=" + data.sim)}`
    );
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
                    placeholder="89882470000XXXXXXXX"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? <Spinner size={20} /> : "Vérifier le numéro de SIM"}
          </Button>
        </form>
      </Form>
      {/* <div id="commande" className="w-full">
        {selectedGroupedSubscription && (
          <SelectSubscription
            subscriptions={selectedGroupedSubscription}
            sim={sim}
          />
        )}
      </div> */}
    </>
  );
};
