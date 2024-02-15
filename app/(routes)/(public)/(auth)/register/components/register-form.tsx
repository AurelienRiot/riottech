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

interface Suggestion {
  label: string;
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
}

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
      .refine((value) => value === "" || value.length <= 20, {
        message: "Le numéro de téléphone ne peut pas dépasser 20 caractères",
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
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard-user";
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState(true);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [line2, setLine2] = useState("");
  const [line1, setLine1] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (filter) {
      const temp = await AddressAutocomplete(value);
      setSuggestions(temp);
    } else {
      setSuggestions([]);
    }
  };

  const handleOnChangeAddress = async (suggestion: Suggestion) => {
    setQuery(suggestion.label);
    setCity(suggestion.city);
    setCountry(suggestion.country);
    setState(suggestion.state);
    setPostalCode(suggestion.postal_code);
    setLine1(suggestion.line1);
    setSuggestions([]);
  };

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

      data.adresse = JSON.stringify({
        label: query,
        line1,
        line2,
        city,
        country,
        state,
        postalCode,
      });
      const res = await CreatUser(data);
      toast.success("Compte crée");
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl,
      });
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
    <div
      onClick={() => setSuggestions([])}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSuggestions([]);
        }
      }}
    >
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
          <div className="mt-6 flex justify-between">
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
          {isPro && (
            <>
              <div className="grid w-full  items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="tva"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de TVA</FormLabel>
                      <FormControl>
                        <div className="flex items-start gap-x-4">
                          <Input
                            disabled={loading}
                            placeholder="FR32948952"
                            {...field}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                  .getElementById("verify-button")
                                  ?.click();
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <Button
                        id="verify-button"
                        disabled={loading || !field.value}
                        onClick={async (e) => {
                          e.preventDefault();
                          setLoading(true);
                          const valideVat = await GetValideVat(field.value);
                          if (valideVat) {
                            const temp = await AddressAutocomplete(
                              valideVat.address
                            );
                            setQuery(temp[0].label);
                            setCity(temp[0].city);
                            setCountry(temp[0].country);
                            setState(temp[0].state);
                            setPostalCode(temp[0].postal_code);
                            setLine1(temp[0].line1);

                            form.setValue("raisonSocial", valideVat.name);
                            toast.success("TVA valide");
                          } else {
                            toast.error("TVA non valide");
                          }
                          setLoading(false);
                        }}
                      >
                        Vérifier la TVA
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="raisonSocial"
                  render={({ field }) => (
                    <FormItem>
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
              </div>
            </>
          )}
          <div className="grid w-full  items-center gap-1.5">
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
          <div className="grid w-full  items-center gap-1.5">
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
          <div className="grid w-full  items-center gap-1.5">
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
          <div className="grid w-full  items-center gap-1.5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="06 23 39 94 39"
                        {...field}
                        autoComplete="tel"
                      />
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
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <div className="relative items-start text-sm">
                      <div className="mb-2 flex items-center space-x-2 pl-2">
                        <p>Autres</p>
                        <Switch
                          onCheckedChange={() => {
                            setFilter(!filter);
                            setLine1("");
                          }}
                          checked={filter}
                        />
                        <p>France</p>
                      </div>
                      <Input
                        disabled={loading}
                        placeholder="1 Rue Sainte-Barbe, Strasbourg, 67000, FR"
                        {...field}
                        value={query}
                        onChange={handleChange}
                        // autoComplete="address-line1"
                      />
                      {line1 && (
                        <div className="mt-2 flex flex-col gap-1">
                          <span>
                            <b>{"Adresse:"}</b>{" "}
                            <input
                              className="border-2"
                              type="text"
                              value={line1}
                              onChange={(e) => setLine1(e.currentTarget.value)}
                            />{" "}
                          </span>
                          <span>
                            <b>{"Complément d'adresse:"}</b>{" "}
                            <input
                              className="border-2"
                              type="text"
                              value={line2}
                              onChange={(e) => setLine2(e.currentTarget.value)}
                            />{" "}
                          </span>
                          <span>
                            {" "}
                            <b>Ville:</b> {city}{" "}
                          </span>
                          <span>
                            {" "}
                            <b>Code postal:</b> {postalCode}{" "}
                          </span>
                          <span>
                            {" "}
                            <b>Région:</b> {state}{" "}
                          </span>
                          {/* <span> <b>Pays:</b> {country} </span> */}
                        </div>
                      )}
                      {suggestions.length > 0 && (
                        <ul className="absolute left-0 top-16 z-10 mt-2 rounded-lg border border-gray-300 bg-white shadow-lg dark:bg-blue-950 ">
                          {suggestions.map(
                            (suggestion: Suggestion, index: number) => (
                              <li
                                key={index}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-900"
                                onClick={() => {
                                  handleOnChangeAddress(suggestion);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleOnChangeAddress(suggestion);
                                  }
                                }}
                              >
                                {suggestion.label}
                              </li>
                            )
                          )}
                        </ul>
                      )}
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
          <div className="grid w-full  items-center gap-1.5">
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
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? <Spinner size={20} /> : "Créer le compte"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
