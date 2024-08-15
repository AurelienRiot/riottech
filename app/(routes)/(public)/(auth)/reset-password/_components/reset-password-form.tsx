"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import ky, { type HTTPError } from "ky";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "L'email ne peut pas être vide" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
});

type ResetPasswordFormValues = z.infer<typeof formSchema>;

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const messageRef = useRef(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);

    try {
      await ky.post("/api/users/reset-password", { json: { email: data.email } });
      setSuccess(true);
    } catch (error) {
      const kyError = error as HTTPError;
      if (kyError.response) {
        const errorData = await kyError.response.text();
        toast.error(errorData);
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success ? null : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}
            className="w-full space-y-12 sm:w-[400px]"
          >
            <div className="grid w-full  items-center gap-1.5">
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
                          disabled={loading}
                          placeholder="exemple@email.com"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              Réinisialiser votre mot de passe
            </Button>
          </form>
        </Form>
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={success ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3 }}
        ref={messageRef}
      >
        <p className="text-center text-xl">E-mail envoyé ! </p>
        <p className="text-center text-xl">Veuillez vérifier votre boîte mail.</p>
      </motion.div>
    </>
  );
};

export default ResetPasswordForm;
