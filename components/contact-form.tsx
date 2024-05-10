"use client";

import { createContact } from "@/actions/create-contact";
import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { TextArea } from "@/components/ui/text-area";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as z from "zod";
import { Heading } from "./ui/heading";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Veuillez entrer votre nom",
    })
    .min(1, { message: "Veuillez entrer votre nom" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  email: z
    .string({
      required_error: "Veuillez entrer votre adresse email",
    })
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "Veuillez entrer votre adresse email" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  subject: z.string().optional(),
  phone: z
    .string({
      required_error: "Veuillez entrer votre numéro de téléphone",
    })
    .refine(
      (value) => {
        return isValidPhoneNumber(value);
      },
      {
        message: "Le numéro de téléphone n'est pas valide",
      },
    ),
  postalCode: z.coerce
    .number({
      invalid_type_error: "Veuillez entrer un code postal valide",
      required_error: "Veuillez entrer votre code postal",
    })
    .min(6, { message: "Veuillez entrer un code postal valide" }),
  message: z
    .string({ required_error: "Veuillez entrer votre message" })
    .min(1, { message: "Veuillez entrer votre message" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
  inBretagne: z.boolean().refine((value) => value === true, {
    message: "Veuillez cochez la case",
  }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

export const ContactForm = ({
  title,
  className,
  subject,
  confirmPostalCode,
  description,
}: {
  confirmPostalCode?: boolean;
  title: string;
  description: string;
  subject?: string;
  className?: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const action = "Envoyer";
  const [showCheckbox, setShowCheckbox] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      inBretagne: true,
      subject: subject || "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    const response = await createContact(data);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    form.reset();

    router.push(`/`);
    toast.success("Message envoyé");

    setLoading(false);
  };

  const handleModalConfirm = async () => {
    setOpen(false);
    await onSubmit(form.getValues());
  };

  return (
    <div className={cn("mx-auto w-full space-y-6 p-8", className)}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleModalConfirm}
        loading={loading}
      />
      <Heading
        id="form"
        description={description}
        title={title}
        className="space-y-2"
      />
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setOpen(true))}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
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
                  <FormLabel>Email :</FormLabel>
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
                  <FormLabel>Numéro de téléphone :</FormLabel>
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
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Postal :</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="35600"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = Number(
                            e.target.value.replace(/[^\d]/g, ""),
                          );
                          if (!isNaN(value) && value > 0) {
                            field.onChange(value);
                          } else {
                            field.onChange("");
                          }

                          if (confirmPostalCode) {
                            const shouldShowCheckbox =
                              value.toString().length >= 2 &&
                              !["35", "22", "29", "56"].some((prefix) =>
                                value.toString().startsWith(prefix),
                              );
                            console.log(value);
                            setShowCheckbox((prev) => {
                              if (!prev && shouldShowCheckbox) {
                                form.setValue("inBretagne", false);
                                return true;
                              }
                              if (prev && !shouldShowCheckbox) {
                                form.setValue("inBretagne", true);

                                return false;
                              }
                              return prev;
                            });
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showCheckbox && (
              <FormField
                control={form.control}
                name="inBretagne"
                render={({ field }) => (
                  <FormItem className="relative flex cursor-pointer flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <label className="flex cursor-pointer flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-foreground">
                          {" "}
                          {
                            "Je suis conscient que RIOT TECH n’opère qu’en Bretagne, mais je souhaite tout de même leur soumettre mon projet."
                          }
                        </FormLabel>
                      </div>
                    </label>
                    <FormMessage className="absolute bottom-1 left-0" />
                  </FormItem>
                )}
              />
            )}
            {!subject && (
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Sujet :"}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Renseignement"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message :</FormLabel>
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
          <Button
            iconPlacement="right"
            Icon={MdSend}
            disabled={loading}
            variant={"expandIcon"}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
