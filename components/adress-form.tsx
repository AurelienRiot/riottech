"use client";
import AddressAutocomplete, {
  Suggestion,
} from "@/actions/adress-autocompleteFR";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type FullAdress = {
  label: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
};

interface AdressFormProps<T extends { adresse: string }> {
  form: ReturnType<typeof useForm<T>>;
  selectedAddress: FullAdress;
  setSelectedAddress: Dispatch<SetStateAction<FullAdress>>;
  className?: string;
}

export const AdressForm = <T extends { adresse: string }>({
  form,
  selectedAddress,
  setSelectedAddress,
  className,
}: AdressFormProps<T>) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([] as Suggestion[]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(
    selectedAddress.country === "fr" ? true : false
  );

  const setSearchTerm = async (value: string) => {
    setQuery(value);
    const temp = await AddressAutocomplete(value);
    setSuggestions(temp);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <FormField
        control={form.control}
        name={"adresse" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Adresse</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <FormControl>
                <div className="relative items-start space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <p>Autres</p>
                    <Switch
                      onCheckedChange={() => {
                        setFilter(!filter);
                        filter
                          ? setSelectedAddress({
                              ...selectedAddress,
                              country: "",
                            })
                          : setSelectedAddress({
                              ...selectedAddress,
                              country: "fr",
                            });
                      }}
                      checked={filter}
                    />
                    <p>France</p>
                  </div>
                  {filter && (
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        onClick={() => setOpen((open) => !open)}
                        className={cn(
                          " justify-between active:scale-100",
                          field.value && "text-muted-foreground font-normal "
                        )}
                      >
                        Rechercher votre adresse
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  )}
                </div>
              </FormControl>
              <PopoverContent className="w-fit p-0" side="bottom" align="start">
                <Command>
                  <CommandInput
                    placeholder="Entrer l'adresse..."
                    className="h-9"
                    value={query}
                    onValueChange={(e) => {
                      setSearchTerm(e);
                      if (query.length < 3) {
                        form.setValue(
                          "adresse" as Path<T>,
                          "" as PathValue<T, Path<T>>
                        );
                      }
                      setOpen(true);
                    }}
                  />
                  {query.length > 2 && (
                    <CommandEmpty>Adresse introuvable</CommandEmpty>
                  )}
                  <CommandGroup>
                    {suggestions.map((address) => (
                      <CommandItem
                        // value={Object.values(address).join(", ")}
                        className="cursor-pointer bg-white hover:bg-slate-100"
                        value={query}
                        key={address.label}
                        onSelect={() => {
                          form.setValue(
                            "adresse" as Path<T>,
                            address.label as PathValue<T, Path<T>>
                          );
                          setSelectedAddress((selectedAddress) => ({
                            ...selectedAddress,
                            label: address.label,
                            city: address.city,
                            country: address.country,
                            line1: address.line1,
                            postalCode: address.postal_code,
                            state: address.state,
                          }));
                          setOpen(false);
                        }}
                      >
                        {address.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-1 ">
        <AddressInput
          label="Adresse"
          placeholder="Adresse"
          addressKey="line1"
          autoComplete="street-address"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Complément d'adresse"
          addressKey="line2"
          placeholder="App., bureau, local, etc. (facultatif)"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Ville"
          addressKey="city"
          autoComplete="address-level2"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Code postal"
          addressKey="postalCode"
          autoComplete="postal-code"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Région"
          addressKey="state"
          autoComplete="address-level1"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        {!filter && (
          <AddressInput
            label="Pays"
            addressKey="country"
            autoComplete="country"
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}
      </div>
    </div>
  );
};

type AddressInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  addressKey: keyof FullAdress;
  selectedAddress: FullAdress;
  setSelectedAddress: Dispatch<SetStateAction<FullAdress>>;
};

const AddressInput = ({
  label,
  addressKey,
  selectedAddress,
  setSelectedAddress,
  ...props
}: AddressInputProps) => {
  return (
    <span className="flex flex-col  gap-1 justify-left w-fit">
      <span className="inline text-sm min-w-max">
        {addressKey === "country" ? (
          <Tooltip>
            <TooltipTrigger asChild className="hover:underline group ">
              <Link
                href={"https://fr.wikipedia.org/wiki/ISO_3166-1_alpha-2"}
                target="_blank"
              >
                {label}
                <sup className="text-xs text-blue-500 group-hover:no-underline ">
                  ?
                </sup>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code de pays à deux lettres</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          label
        )}
        {" :"}
      </span>

      <input
        className="border h-6 px-2 py-1 rounded-md text-sm inline "
        type="text"
        value={selectedAddress[addressKey]}
        onChange={(e) => {
          setSelectedAddress((selectedAddress) => ({
            ...selectedAddress,
            [addressKey]: e.target.value,
          }));
        }}
        {...props}
      />
    </span>
  );
};

const SkeletonAdressInput = ({ label }: { label: string }) => {
  return (
    <span className="flex  gap-1 items-center justify-left w-full">
      <span className="inline text-sm min-w-max">{label + " :"}</span>

      <span className="border h-6 px-2 py-1 rounded-md text-sm flex justify-center items-center">
        <Skeleton className="w-20 h-4 rounded-full" />
      </span>
    </span>
  );
};

export const SkeletonAdressForm = () => {
  return (
    <div className={"space-y-2"}>
      <div className="flex flex-col gap-2">
        <div>Adresse</div>
        <div>
          <Skeleton className="w-40 h-6 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-1 ">
        <SkeletonAdressInput label="Adresse" />
        <SkeletonAdressInput label="Complément d'adresse" />
        <SkeletonAdressInput label="Ville" />
        <SkeletonAdressInput label="Code postal" />
        <SkeletonAdressInput label="Région" />
      </div>
    </div>
  );
};
