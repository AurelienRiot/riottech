"use client";
import Loading from "@/components/loading";
import { Suspense } from "react";
import ImageLoaderBillboard from "@/components/ui/image-loader-billboard";
import { useCategories } from "@/hooks/use-categories";

interface BillboardProps {
  categoryId: string;
}

const Billboard: React.FC<BillboardProps> = ({ categoryId }) => {
  const categories = useCategories((s) => s.categories);

  const category = categories.find((category) => category.id === categoryId);

  if (!category || !category.billboard) {
    return null;
  }

  return (
    <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
      <ImageLoaderBillboard src={category.billboard.imageUrl}>
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
          <div className="max-w-xs p-2 pb-3 text-3xl font-bold bg-gray-800 rounded-lg sm:text-5xl lg:text-6xl sm:max-w-xl bg-opacity-40 text-gray-50">
            {category.billboard.label}
          </div>
        </div>
      </ImageLoaderBillboard>
    </div>
  );
};

export default Billboard;
