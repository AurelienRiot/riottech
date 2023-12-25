"use client";
import ResetPass from "@/actions/reset-pass";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ResetPasswordProps {
  params: {
    resetToken: string;
  };
}

const formSchema = z
  .object({
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe doivent correspondre",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof formSchema>;

const ResetPassword: React.FC<ResetPasswordProps> = ({
  params: { resetToken },
}) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      await ResetPass(data.password, resetToken);
      router.replace("/login");
      toast.success("Mot de passe changé, vous pouvez vous connecter");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        toast.error(axiosError.response.data as string);
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex items-center justify-center w-screen h-sccreen bg-slate-100 dark:bg-slate-900">
      <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white sm:dark:bg-black rounded-xl">
        <h1 className="text-2xl font-semibold"> Changer votre mot de passe</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}
            className="space-y-12 w-full sm:w-[400px]"
          >
            <div className="grid w-full  items-center gap-1.5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-4">
                        <Input
                          disabled={loading}
                          placeholder="*********"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
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
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-4">
                        <Input
                          disabled={loading}
                          placeholder="*********"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
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
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              Changer le mot de passe
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
