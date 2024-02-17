"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Dispatch, SetStateAction, useState } from "react";
import AddressAutocomplete, {
  Suggestion,
} from "@/actions/adress-autocompleteFR";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

interface UserFormProps {
  name: string;
  adresse: string;
}

export type FullAdress = {
  label: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
};

const formSchema = z.object({
  name: z.string().min(1),
  adresse: z.string().min(0),
});

type UserFormValues = z.infer<typeof formSchema>;

export const TestForm = ({ initialData }: { initialData: UserFormProps }) => {
  const [selectedAddress, setSelectedAddress] = useState({
    label: "",
    city: "",
    country: "fr",
    line1: "",
    line2: "",
    postalCode: "",
    state: "",
  });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      adresse: initialData.adresse,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    console.log(data);
    console.log(JSON.stringify(selectedAddress));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-3.5">
        <AdressForm
          form={form}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
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
        // @ts-expect-error
        name="adresse"
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
                        // @ts-expect-error
                        form.setValue("adresse", "");
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
                        value={query}
                        key={address.label}
                        onSelect={() => {
                          // @ts-expect-error
                          form.setValue("adresse", address.label);
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
          addressKey="line1"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Complément d'adresse"
          addressKey="line2"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Ville"
          addressKey="city"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Code postal"
          addressKey="postalCode"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressInput
          label="Région"
          addressKey="state"
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        {!filter && (
          <AddressInput
            label="Pays"
            addressKey="country"
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}
      </div>
    </div>
  );
};

type AddressInputProps = {
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
