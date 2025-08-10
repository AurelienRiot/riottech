"use client";

import UploadImage from "@/components/images-upload/image-upload";
import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button, LoadingButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TextArea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Image } from "@prisma/client";
import ky, { type HTTPError } from "ky";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import type { FormattedProduct } from "../page";
import { ProductSpecs } from "./product-specs";

const bucketName = process.env.NEXT_PUBLIC_SCALEWAY_BUCKET_NAME as string;

interface ProductFormProps {
  initialData:
    | (FormattedProduct & {
        images: Image[];
      })
    | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),

  images: z
    .object({
      url: z.string(),
    })
    .array(),

  priceHT: z.coerce.number().min(1, { message: "Le prix HT doit être supérieur à 0" }),

  categoryId: z.string().min(1, { message: "La catégorie est requise" }),

  productSpecs: z.string().min(1, { message: "Les spécifications sont requises" }),

  description: z.string().min(1, { message: "La description est requise" }),

  isFeatured: z.boolean().default(false).optional(),

  isArchived: z.boolean().default(false).optional(),
});

export type ProductFormValues = z.infer<typeof formSchema>;

export const getFileKey = (url: string): string => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>(
    initialData?.images.map((image) => getFileKey(image.url)) || [],
  );

  const title = initialData ? "Modifier le produit" : "Crée un nouveau produit";
  const description = initialData ? "Modifier le produit" : "Ajouter un nouveau produit";
  const toastMessage = initialData ? "Produit mise à jour" : "Produit crée";
  const action = initialData ? "Sauvegarder les changements" : "Crée le produit";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          images: [],
          categoryId: "",
          description: "",
          productSpecs: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      data.images = selectedFiles.map((file) => ({
        url: `https://${bucketName}.s3.fr-par.scw.cloud/${file}`,
      }));
      if (initialData) {
        await ky.patch(`/api/products/${params.productId}`, { json: data });
      } else {
        await ky.post(`/api/products`, { json: data });
      }
      router.push(`/admin/products`);
      router.refresh();
      toast.success(toastMessage);
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

  const onDelete = async () => {
    try {
      setLoading(true);
      await ky.delete(`/api/products/${params.productId}`);
      router.push(`/admin/products`);
      router.refresh();
      toast.success("Produit supprimé");
    } catch (error) {
      toast.error("Erreur");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 ">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <UploadImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} multipleImages />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-48">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nom du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceHT"
              render={({ field }) => (
                <FormItem className="w-48">
                  <FormLabel>Prix HT</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9,99"
                      {...field}
                      value={(field.value as number) ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="min-w-48">
                  <FormLabel>Categorie</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Selectionner une categorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-96">
                  <FormLabel>Drescription</FormLabel>
                  <FormControl>
                    <TextArea disabled={loading} placeholder="Description du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex cursor-pointer flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <label htmlFor="featured" className="flex cursor-pointer flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox id="featured" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mise en avant</FormLabel>
                      <FormDescription>{"Ce produit apparaitra sur la page d'accueil."}</FormDescription>
                    </div>
                  </label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex cursor-pointer flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <label htmlFor="archived" className="flex cursor-pointer flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox id="archived" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archivé</FormLabel>
                      <FormDescription>{"Ce produit n'apparaitra pas sur le site."}</FormDescription>
                    </div>
                  </label>
                </FormItem>
              )}
            />
          </div>

          <ProductSpecs />

          <LoadingButton disabled={loading} className="ml-auto" type="submit">
            {action}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
};
