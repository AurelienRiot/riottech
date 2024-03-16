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
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import ButtonBackward from "@/components/ui/button-backward";

const formSchema = z
  .object({
    password: z.string().optional(),
    newPassword: z
      .string()
      .min(1, { message: "Le mot de passe ne peut pas être vide" })
      .max(100, {
        message: "Le mot de passe ne peut pas dépasser 100 caractères",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Le mot de passe ne peut pas être vide" })
      .max(100, {
        message: "Le mot de passe ne peut pas dépasser 100 caractères",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe doivent correspondrent",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof formSchema>;

export const PasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const title = "Changer le mot de passe";
  const toastMessage = "Mot de passe mise à jour";
  const action = "Appliquer les modifications";

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/users/password`, {
        oldPassword: data.password,
        newPassword: data.newPassword,
      });
      router.push(`/dashboard-user/settings`);
      toast.success(toastMessage);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data as string);
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight"> {title} </h2>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe actuel</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="**********"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="**********"
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        tabIndex={-1}
                      >
                        {showNewPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Confirmer le nouveau mot de passe"}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="**********"
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        tabIndex={-1}
                      >
                        {showNewPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <ButtonBackward url="/dashboard-user/settings" />
    </>
  );
};
