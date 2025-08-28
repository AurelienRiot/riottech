"use client";

import { createContact } from "@/components/contact/create-contact";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { Heading } from "../ui/heading";
import { useToastPromise } from "../ui/sonner";
import { contactSchema, type ContactFormValues } from "./contact-schema";

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
  const action = "Envoyer";
  const [showCheckbox, setShowCheckbox] = useState(false);
  const { toastServerAction, loading } = useToastPromise({
    serverAction: createContact,
    message: "Envoi du message",
    errorMessage: "Echec de l'envoi du message",
  });

  const form = useForm({
    resolver: zodResolver(contactSchema),
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
    function onSuccess() {
      form.reset();
      router.push(`/`);
    }
    toastServerAction({ data, onSuccess });
  };

  return (
    <div className={cn("mx-auto w-full space-y-6 p-8", className)}>
      <Heading id="contact-form" description={description} title={title} className="space-y-2" />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nom/Prénom ou nom d'entreprise :"}</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nom" {...field} autoComplete="name" />
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
                    <Input disabled={loading} placeholder="exemple@mail.com" {...field} autoComplete="email" />
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
                        value={(field.value as number) ?? ""}
                        onChange={(e) => {
                          const value = Number(e.target.value.replace(/[^\d]/g, ""));
                          if (!Number.isNaN(value) && value > 0) {
                            field.onChange(value);
                          } else {
                            field.onChange("");
                          }

                          if (confirmPostalCode) {
                            const shouldShowCheckbox =
                              value.toString().length >= 2 &&
                              !["35", "22", "29", "56"].some((prefix) => value.toString().startsWith(prefix));
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
                    <label
                      htmlFor="inBretagne"
                      className="flex cursor-pointer flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox id="inBretagne" checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="inBretagne" className="text-foreground cursor-pointer">
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
                      <Input disabled={loading} placeholder="Renseignement" {...field} />
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
                      <AutosizeTextarea disabled={loading} placeholder="..." {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button iconPlacement="right" Icon={SendHorizonal} disabled={loading} variant={"expandIcon"}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
