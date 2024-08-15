"use client";

import UploadImage from "@/components/images-upload/image-upload";
import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button, LoadingButton } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category } from "@prisma/client";
import ky, { type HTTPError } from "ky";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { getFileKey } from "../../../products/[productId]/components/product-form";

const bucketName = process.env.NEXT_PUBLIC_SCALEWAY_BUCKET_NAME as string;

interface CategoryFormProps {
  initialData: Category | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>(
    initialData?.imageUrl ? [getFileKey(initialData?.imageUrl)] : [],
  );

  const title = initialData ? "Modifier la categorie" : "Créer une nouvelle categorie";
  const description = initialData ? "Modifier la categorie" : "Ajouter une nouvelle categorie";
  const toastMessage = initialData ? "Categorie mise à jour" : "Categorie créée";
  const action = initialData ? "Sauvegarder les changements" : "Créer la categorie";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (!selectedFiles[0]) {
        toast.error("Veuillez ajouter une image");
        return;
      }
      data.imageUrl = `https://${bucketName}.s3.fr-par.scw.cloud/${selectedFiles[0]}`;
      if (initialData) {
        await ky.patch(`/api/categories/${params.categoryId}`, { json: data });
      } else {
        await ky.post(`/api/categories`, { json: data });
      }
      router.push(`/admin/categories`);
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
      await ky.delete(`/api/categories/${params.categoryId}`);
      router.push(`/admin/categories`);
      router.refresh();
      toast.success("Categrorie supprimée");
    } catch (error) {
      toast.error("Assurez vous de bien supprimer tous les produits de la categorie");
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Image du panneau d'affichage"} </FormLabel>
                <FormControl>
                  <UploadImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-fit
                  "
                    disabled={loading}
                    placeholder="Nom de la categorie"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton disabled={loading} className="ml-auto" type="submit">
            {action}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
};
