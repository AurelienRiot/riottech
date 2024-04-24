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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Veuillez entrer votre nom" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  email: z
    .string()
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "Veuillez entrer votre email" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  phone: z.string().refine(
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
    })
    .min(6, { message: "Veuillez entrer un code postal valide" }),
  message: z
    .string()
    .min(1, { message: "Veuillez entrer votre message" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
  inBretagne: z.boolean().refine((value) => value === true, {
    message: "Veuillez cochez la case",
  }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

export const ContactForm = ({ title }: { title: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const action = "Envoyer";
  const [showCheckbox, setShowCheckbox] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inBretagne: true,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    const response = await createContact(data);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    router.push(`/`);
    toast.success("Message envoyé");
    setLoading(false);
  };

  const handleModalConfirm = async () => {
    setOpen(false);
    await onSubmit(form.getValues());
  };

  return (
    <div className="mx-auto space-y-6 p-8">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleModalConfirm}
        loading={loading}
      />
      <div id="form" className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
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
                  <FormLabel>Code Postal</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="35600"
                        {...field}
                        onChange={(e) => {
                          const value = Number(
                            e.target.value.replace(/[^\d]/g, ""),
                          );
                          if (!isNaN(value)) {
                            field.onChange(value);
                          } else {
                            field.onChange("");
                          }

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
