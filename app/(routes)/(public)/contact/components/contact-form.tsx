"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
import { LoadingButton } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { TextArea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom ne peut pas être vide" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  mail: z
    .string()
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "L'email ne peut pas être vide" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  phone: z
    .string()
    .refine((value) => value === "" || value.length <= 20, {
      message: "Le numéro de téléphone ne peut pas dépasser 20 caractères",
    })
    .refine((value) => value === "" || /^\+?[0-9] ?(\d ?){1,14}$/.test(value), {
      message: "Le numéro de téléphone n'est pas valide",
    }),
  subject: z
    .string()
    .min(1, { message: "Le sujet ne peut pas être vide" })
    .max(100, { message: "Le sujet ne peut pas dépasser 100 caractères" }),
  message: z
    .string()
    .min(1, { message: "Le message ne peut pas être vide" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export const ContactForm: React.FC = (): React.ReactNode => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const action = "Envoyer";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user?.name || "",
      mail: session?.user?.email || "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      await axios.post(`/api/contacts`, data);
      router.refresh();
      router.push(`/`);
      toast.success("Message envoyé");
    } catch (error) {
      toast.error("Erreur.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = async () => {
    setOpen(false);
    await onSubmit(form.getValues());
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleModalConfirm}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Formulaire de Contact"
          description="Demande d'information"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setOpen(true))}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="name"
                      disabled={loading}
                      label="Nom/Prénom ou nom d'entreprise"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="email"
                      disabled={loading}
                      label="Email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="phone"
                      disabled={loading}
                      label="Téléphone"
                      autoComplete="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="subject"
                      disabled={loading}
                      label="Sujet"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextArea
                      disabled={loading}
                      placeholder="Message"
                      {...field}
                      className="placeholder:text-primary placeholder:font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton disabled={loading} variant={"shadow"}>
            {action}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
};
