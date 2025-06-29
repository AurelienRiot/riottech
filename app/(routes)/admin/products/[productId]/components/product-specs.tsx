"use client";


import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { ProductFormValues } from "./product-form";


export function ProductSpecs() {
  const form = useFormContext<ProductFormValues>();

  return (
    <FormField
      control={form.control}
      name="productSpecs"
      render={({ field }) => (
        <FormItem>
          <>
            <FormLabel>Spécification du produit</FormLabel>

            <div className="flex">
              <FormControl className="min-h-[20rem] lg:w-1/2">
              <MinimalTiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  throttleDelay={2000}
                  className="w-full"
                  editorContentClassName="p-5"
                  output="html"
                  placeholder="Entrez votre texte ici"
                  immediatelyRender={false}
                  editable={true}
                  injectCSS={true}
                  disabled={form.formState.isSubmitting}
                  editorClassName="focus:outline-none"
                />
              </FormControl>
            </div>

            <FormMessage />
          </>
        </FormItem>
      )}
    />
  );
}
