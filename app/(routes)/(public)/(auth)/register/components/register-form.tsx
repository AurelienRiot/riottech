"use client";

import AddressAutocomplete from "@/actions/adress-autocompleteFR";
import CreatUser from "@/actions/create-user";
import GetValideVat from "@/actions/get-valide-vat";
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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import Spinner from "@/components/animations/spinner";
import { AdressForm } from "@/components/adress-form";
import { TVAForm } from "@/components/tva-form";
import {
  AnimateHeight,
  AnimateHeightInner,
  AnimateHeightOuter,
} from "@/components/animations/animate-height";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const formSchema = z
  .object({
    email: z
      .string()
      .email({ message: "L'email doit être un email valide" })
      .min(1, { message: "L'email ne peut pas être vide" })
      .max(100, {
        message: "L'email ne peut pas dépasser 100 caractères",
      }),
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
    name: z.string().min(1).max(100, {
      message: "Le nom ne peut pas dépasser 100 caractères",
    }),
    surname: z.string().min(1).max(100, {
      message: "Le prénom ne peut pas dépasser 100 caractères",
    }),
    phone: z
      .string()
      .refine(isValidPhoneNumber, {
        message: "Le numéro de téléphone n'est pas valide",
      })
      .refine(
        (value) => value === "" || /^\+?[0-9] ?(\d ?){1,14}$/.test(value),
        { message: "Le numéro de téléphone n'est pas valide" }
      ),
    adresse: z.string().min(0).max(100, {
      message: "L'adresse ne peut pas dépasser 100 caractères",
    }),
    tva: z.string().min(0).max(100, {
      message: "Le numéro de TVA ne peut pas dépasser 100 caractères",
    }),
    raisonSocial: z.string().min(0).max(100, {
      message: "La raison sociale ne peut pas dépasser 100 caractères",
    }),
    isPro: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe doivent correspondre",
    path: ["confirmPassword"],
  });
export type RegisterFormValues = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPro, setIsPro] = useState(true);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState({
    label: "",
    city: "",
    country: "fr",
    line1: "",
    line2: "",
    postalCode: "",
    state: "",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      if (isPro) {
        if (!data.raisonSocial) {
          toast.error(
            "Veuillez renseigner la raison sociale ou passer en particulier."
          );
          return;
        }
        if (data.tva) {
          const valideVat = await GetValideVat(data.tva);
          if (!valideVat) {
            toast.error(
              "Numéro de TVA inconnu, vous pouvez le corriger ou le supprimer pour continuer."
            );
            return;
          }
          data.isPro = Boolean(valideVat);
        }
      } else {
        data.isPro = false;
        data.raisonSocial = "";
      }
      data.name = data.name.trim();
      data.surname = data.surname.trim();
      data.raisonSocial = data.raisonSocial.trim();
      data.adresse = JSON.stringify(selectedAddress);
      // const res = await CreatUser(data);
      // toast.success("Compte crée");
      // signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      //   callbackUrl,
      // });
      console.log(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data && axiosError.response.status === 400) {
        toast.error(axiosError.response.data as string, {
          duration: 8000,
        });
        router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      phone: "",
      adresse: "",
      tva: "",
      raisonSocial: "",
      isPro: false,
    },
  });

  return (
    <div>
      <p className="text-center">
        Vous avez un compte ?{" "}
        <Link
          className="text-indigo-500 hover:underline"
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
        >
          {" "}
          Connectez vous ici{" "}
        </Link>{" "}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}
          className="w-full space-y-12 sm:w-[400px]"
        >
          <div
            data-state={isPro}
            className="mt-6 flex justify-between data-[state=false]:-mb-12 transition-all duration-500"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsPro(false);
                form.setValue("tva", "");
              }}
              className={
                !isPro
                  ? "selected ml-3 bg-green-500 text-black hover:bg-green-500"
                  : " ml-3 bg-gray-500 hover:bg-green-200  hover:text-black"
              }
            >
              Particulier
            </Button>

            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsPro(true);
              }}
              className={
                isPro
                  ? "selected ml-3 bg-green-500 text-black hover:bg-green-500"
                  : " ml-3 bg-gray-500 hover:bg-green-200  hover:text-black"
              }
            >
              Professionnel
            </Button>
          </div>
          <AnimateHeight display={isPro} className="p-1">
            <TVAForm
              form={form}
              loading={loading}
              setLoading={setLoading}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <FormField
              control={form.control}
              name="raisonSocial"
              render={({ field }) => (
                <FormItem className="mt-12">
                  <FormLabel>Raison Social</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Entreprise"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimateHeight>
          <div className="grid w-full  items-center gap-1.5 p-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Nom"
                        {...field}
                        autoComplete="family-name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 p-1">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Prénom
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="prénom"
                        {...field}
                        autoComplete="given-name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 p-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        type="email"
                        autoCapitalize="off"
                        disabled={loading}
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
          <div className="grid w-full  items-center gap-1.5 p-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      {/* <Input
                        disabled={loading}
                        placeholder="06 23 39 94 39"
                        {...field}
                        autoComplete="tel"
                      /> */}
                      <PhoneInput
                        placeholder="Entrer un numéro de téléphone"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 p-1">
            <AdressForm
              form={form}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 p-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mot de passe
                    <span className="text-red-500">*</span>
                  </FormLabel>
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
          <div className="grid w-full  items-center gap-1.5 p-1">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirmer le mot de passe
                    <span className="text-red-500">*</span>
                  </FormLabel>
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
            className="w-full p-1"
            size="lg"
          >
            {loading ? <Spinner size={20} /> : "Créer le compte"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
