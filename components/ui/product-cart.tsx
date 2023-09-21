"use client";

import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { VisibleElement } from "../animations/visible-element";
import { motion } from "framer-motion";
import { ProductWithCategoryAndImages } from "@/types";

interface ProductCartProps {
  data: ProductWithCategoryAndImages;
}

const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal();

  const value = Number(data.priceHT);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-3 m-2 space-y-4 border cursor-pointer group rounded-xl bg-secondary "
    >
      <VisibleElement
        onClick={handleClick}
        className="relative bg-white aspect-square rounded-xl before:rounded-xl before:inset-0 before:absolute before:z-10 before:bg-black/20 before:opacity-0 before:animate-in before:duration-300 before:ease-linear group-hover:before:opacity-100 "
      >
        <Image
          src={data?.images?.[0].url}
          fill
          sizes="80vw"
          alt="Image"
          className="object-cover rounded-md aspect-square "
        />
        <div className="absolute w-full px-6 sm:transition sm:opacity-0 sm:group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton
              className="z-20"
              title="Aperçue"
              onClick={onPreview}
              icon={<Expand size={20} className="text-foreground" />}
            />
            <IconButton
              className="z-20"
              title="Ajouté au panier"
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-foreground" />}
            />
          </div>
        </div>
      </VisibleElement>
      <div onClick={handleClick}>
        <p className="text-lg font-semibold text-primary">{data.name}</p>
        <p className="text-sm text-secondary-foreground">
          {data.category?.name}
        </p>
      </div>
      <div className="flex items-center justify-between text-primary">
        <Currency value={value} />
      </div>
    </motion.div>
  );
};

export default ProductCart;
