"use client";

import { AlertModal } from "@/components/modals/alert-modal-form";
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
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import GetValideVat from "@/actions/get-valide-vat";
import ButtonBackward from "@/components/ui/button-backward";
import { signOut } from "next-auth/react";
import AddressAutocomplete from "@/actions/adress-autocompleteFR";
import { Switch } from "@/components/ui/switch";
import { User } from "@prisma/client";

interface UserFormProps {
  initialData: User;
}
type FullAdress = {
  label: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
};
interface Suggestion {
  label: string;
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().min(0),
  adresse: z.string().min(0),
  tva: z.string().min(0),
  raisonSocial: z.string().min(0),
  isPro: z.boolean(),
});

type UserFormValues = z.infer<typeof formSchema>;

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(!!initialData?.raisonSocial);

  const [suggestions, setSuggestions] = useState([]);
  const fullAdress: FullAdress = JSON.parse(
    initialData.adresse ? initialData.adresse : "{}"
  );
  const [filter, setFilter] = useState(fullAdress.line1 ? true : false);
  const [query, setQuery] = useState(fullAdress.label);
  const [city, setCity] = useState(fullAdress.city);
  const [country, setCountry] = useState(fullAdress.country);
  const [state, setState] = useState(fullAdress.state);
  const [postalCode, setPostalCode] = useState(fullAdress.postalCode);
  const [line2, setLine2] = useState(fullAdress.line2);
  const [line1, setLine1] = useState(fullAdress.line1);

  const title = "Modifier le profil";
  const toastMessage = "Profil mise à jour";
  const action = "Enregistrer les modifications";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      surname: initialData.surname,
      phone: initialData.phone,
      adresse: initialData.adresse,
      tva: initialData.tva,
      raisonSocial: initialData.raisonSocial,
      isPro: initialData.isPro,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);

      if (isPro) {
        if (!data.raisonSocial) {
          toast.error(
            "Veuillez renseigner la raison sociale ou passer en particulier."
          );
          return;
        }
        const valideVat = await GetValideVat(data.tva);
        if (!valideVat) {
          toast.error(
            "Numéro de TVA inconnu, vous pouvez le corriger ou le supprimer pour continuer."
          );
          return;
        }
        data.isPro = Boolean(valideVat);
      } else {
        data.isPro = false;
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
      await axios.patch(`/api/users/id`, data);
      router.refresh();
      router.push(`/dashboard-user`);
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

  const passwordModify = () => {
    router.push(`/dashboard-user/settings/password`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/users/id`);
      signOut({ callbackUrl: "/" });
      toast.success("Utilisateur supprimé.");
    } catch (error) {
      toast.error("Erreur.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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

  return (
    <div onClick={() => setSuggestions([])}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-col items-center justify-between gap-4 mb-4 md:flex-row">
        <h2 className="text-3xl font-bold tracking-tight"> {title} </h2>
        <Button onClick={passwordModify} variant="outline" className="ml-3">
          {" "}
          Changer de mot de passe{" "}
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          className="ml-3"
        >
          Supprimer le compte <Trash className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <Separator />
      <p>{initialData.email}</p>
      <div className="flex mt-6 ">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsPro(false);
            form.setValue("tva", "");
          }}
          className={
            !isPro
              ? "selected bg-green-500 ml-3 hover:bg-green-500 text-black"
              : " bg-gray-500 ml-3 hover:bg-green-200  hover:text-black"
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
              ? "selected bg-green-500 ml-3 hover:bg-green-500 text-black"
              : " bg-gray-500 ml-3 hover:bg-green-200  hover:text-black"
          }
        >
          Professionnel
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Prénom" {...field} />
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
                  <FormLabel>Numeros de téléphone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="06 00 00 00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <div className="relative items-start text-sm">
                      <div className="flex items-center pl-2 mb-2 space-x-2">
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
                      />
                      {line1 && (
                        <div className="flex flex-col gap-1 mt-2">
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
                        <ul className="absolute left-0 z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg top-16 dark:bg-blue-950 ">
                          {suggestions.map(
                            (suggestion: Suggestion, index: number) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-900"
                                onClick={() => {
                                  handleOnChangeAddress(suggestion);
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

            {isPro && (
              <>
                <FormField
                  control={form.control}
                  name="tva"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numeros de TVA</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input
                            type="text"
                            disabled={loading}
                            placeholder="FR03132345"
                            {...field}
                          />
                        </FormControl>
                        <Button
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
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="raisonSocial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raison social</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          disabled={loading}
                          placeholder="Raison social"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <Button disabled={loading} className="ml-auto " type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <ButtonBackward
        onClick={() => router.replace("/dashboard-user")}
        className="mt-4"
      />
    </div>
  );
};
