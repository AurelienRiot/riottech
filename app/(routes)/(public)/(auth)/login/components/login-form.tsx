"use client";

import { LoadingButton } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const baseUrl = process.env.NEXT_PUBLIC_URL;

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "L'email ne peut pas être vide" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  password: z.string().min(1, { message: "Le mot de passe ne peut pas être vide" }).max(100, {
    message: "Le mot de passe ne peut pas dépasser 100 caractères",
  }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export const LoginForm: React.FC = (): React.ReactNode => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const callbackUrl = decodeURI(searchParams.get("callbackUrl") || "/dashboard-user");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const authentifier = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (authentifier?.error) {
      toast.error("Email ou mot de passe incorrect");
    } else {
      router.refresh();
      router.push(callbackUrl);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))} className="w-full space-y-12 sm:w-[400px]">
          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        type="email"
                        autoCapitalize="off"
                        disabled={form.formState.isSubmitting}
                        placeholder="exemple@email.com"
                        {...field}
                        autoComplete="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <>
                      <div className="flex items-center gap-x-4">
                        <Input
                          disabled={form.formState.isSubmitting}
                          placeholder="*********"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <div className="flex">
                        <Link className="mt-2 text-sm text-indigo-500 hover:underline" href={`/reset-password`}>
                          {" "}
                          Mot de passe oublié ?{" "}
                        </Link>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton disabled={form.formState.isSubmitting} type="submit" className="w-full">
            Se connecter
          </LoadingButton>
        </form>
      </Form>
      <p className="text-center">
        {"Vous n'avez pas de compte ?"}{" "}
        <Link
          className="text-indigo-500 hover:underline"
          href={`/register?callbackUrl=${encodeURIComponent(baseUrl + callbackUrl)}`}
        >
          {" "}
          Crée un compte ici{" "}
        </Link>{" "}
      </p>
    </>
  );
};
