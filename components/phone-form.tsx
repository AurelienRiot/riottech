import { Path, useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { PhoneInput } from "./ui/phone-input";

interface AdressFormProps<T extends { phone: string }> {
  form: ReturnType<typeof useForm<T>>;
}

export const AdressForm = <T extends { phone: string }>({
  form,
}: AdressFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={"phone" as Path<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel className="text-left">Phone Number</FormLabel>
          <FormControl className="w-full">
            <PhoneInput placeholder="Enter a phone number" {...field} />
          </FormControl>
          <FormDescription className="text-left">
            Enter a phone number
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
