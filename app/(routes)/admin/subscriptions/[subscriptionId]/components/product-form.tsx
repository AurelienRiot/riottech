"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TextArea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { FormattedSubscription } from "../page";

interface SubscriptionFormProps {
  initialData: FormattedSubscription | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  priceHT: z.coerce.number().min(1),
  productSpecs: z.string().default(""),
  description: z.string().min(1),
  fraisActivation: z.coerce.number().min(1),
  dataCap: z.coerce.number().min(0),
  recurrence: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type SubscriptionFormValues = z.infer<typeof formSchema>;

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Modifier l'abonnement" : "Créer un abonnement";
  const description = initialData
    ? "Modifier l'abonnement"
    : "Ajouter un nouvelle abonnement";
  const toastMessage = initialData
    ? "Abonnement mise à jour"
    : "Abonnement créé";
  const action = initialData
    ? "Sauvegarder les changements"
    : "Créer l'abonnement";

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          priceHT: 0,
          description: "",
          productSpecs: "",
          fraisActivation: 0,
          dataCap: 0,
          recurrence: "year",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: SubscriptionFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/subscriptions/${params.subscriptionId}`, data);
      } else {
        await axios.post(`/api/subscriptions`, data);
      }
      router.push(`/admin/subscriptions`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data as string);
      } else {
        toast.error("Erreur");
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/subscriptions/${params.subscriptionId}`);
      router.push(`/admin/subscriptions`);
      router.refresh();

      toast.success("Abonnement supprimé");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nom de l'abonnement"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceHT"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix HT</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9,99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataCap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limite de donnée (GB)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fraisActivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Frais d'activation"}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9,99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Récurrence</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Récurence"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["year", "month", "day", "week"].map((recur) => (
                        <SelectItem key={recur} value={recur}>
                          {recur}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TextArea
                      disabled={loading}
                      placeholder="Description de l'abonnement"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productSpecs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Spécifications de l'abonnement"}</FormLabel>
                  <FormControl>
                    <TextArea
                      disabled={loading}
                      placeholder="Spécifications"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md cursor-pointer">
                  <label className="flex flex-row items-start space-x-3 space-y-0 cursor-pointer">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mise en avant</FormLabel>
                      <FormDescription>
                        {"L'abonnement apparaitra sur la page d'accueil."}
                      </FormDescription>
                    </div>
                  </label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md cursor-pointer">
                  <label className="flex flex-row items-start space-x-3 space-y-0 cursor-pointer">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archivé</FormLabel>
                      <FormDescription>
                        {"L'abonnement n'apparaitra plus sur le site."}
                      </FormDescription>
                    </div>
                  </label>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
