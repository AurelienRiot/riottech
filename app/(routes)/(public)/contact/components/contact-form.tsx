"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
import { LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { TextArea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Toaster as Sonner, toast } from "sonner";
import * as z from "zod";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom ne peut pas être vide" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  email: z
    .string()
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "L'email ne peut pas être vide" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  phone: z.string().refine(
    (value) => {
      return value === "" || isValidPhoneNumber(value);
    },
    {
      message: "Le numéro de téléphone n'est pas valide",
    },
  ),
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
      email: session?.user?.email || "",
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

      <h2 className="mr-auto text-3xl font-bold tracking-tight">
        {" "}
        Formulaire de Contact
      </h2>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setOpen(true))}
          // onSubmit={form.handleSubmit(() => {
          //   const promise = () =>
          //     new Promise((resolve) =>
          //       setTimeout(() => resolve({ name: "Sonner" }), 2000),
          //     );

          //   toast.promise(promise, {
          //     loading: "Loading...",
          //     success: () => {
          //       return ` toast has been added`;
          //     },
          //     action: {
          //       label: "Undo",
          //       onClick: () => console.log("Undo"),
          //     },
          //     error: "Error",
          //   });
          // })}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nom/Prénom ou nom d'entreprise :"}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nom"
                      {...field}
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="exemple@mail.com"
                        {...field}
                        autoComplete="email"
                      />
                    </div>
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
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <PhoneInput
                      placeholder="Entrez votre numéro de téléphone"
                      defaultCountry="FR"
                      autoComplete="tel"
                      className="w-full"
                      {...field}
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
                  <FormLabel>Sujet</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Renseignement"
                        {...field}
                      />
                    </div>
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <TextArea
                        disabled={loading}
                        placeholder="..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton disabled={loading} type="submit">
            {action}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
};
