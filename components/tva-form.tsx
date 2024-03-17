"use client";
import AddressAutocomplete from "@/actions/adress-autocompleteFR";
import GetValideVat from "@/actions/get-valide-vat";
import { Dispatch, SetStateAction } from "react";
import {
  ControllerRenderProps,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export type FullAdress = {
  label: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
};

type TVAFormProps = {
  loading: boolean;
  disabled?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedAddress: FullAdress;
  setSelectedAddress: Dispatch<SetStateAction<FullAdress>>;
};

export const TVAForm = <T extends { tva: string; raisonSocial: string }>({
  loading,
  disabled = false,
  setLoading,
  selectedAddress,
  setSelectedAddress,
}: TVAFormProps) => {
  const form = useFormContext<T>();
  const verifyTVA = async (field: ControllerRenderProps<T, Path<T>>) => {
    setLoading(true);
    const valideVat = await GetValideVat(field.value);
    if (valideVat) {
      const temp = await AddressAutocomplete(valideVat.address);
      setSelectedAddress({
        ...selectedAddress,
        label: temp[0].label,
        city: temp[0].city,
        country: temp[0].country,
        line1: temp[0].line1,
        postalCode: temp[0].postal_code,
        state: temp[0].state,
      });

      form.setValue(
        "raisonSocial" as Path<T>,
        valideVat.name as PathValue<T, Path<T>>,
      );
      toast.success("TVA valide");
    } else {
      toast.error("TVA non valide");
    }
    setLoading(false);
  };

  return (
    <>
      <FormField
        control={form.control}
        name={"tva" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de TVA</FormLabel>
            <div className="flex space-x-2">
              <FormControl>
                <Input
                  type="text"
                  disabled={loading || disabled}
                  placeholder="FR03132345"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                disabled={loading || !field.value}
                onClick={async (e) => {
                  e.preventDefault();
                  await verifyTVA(field);
                }}
              >
                Vérifier la TVA
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
