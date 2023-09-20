"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { ProductWithCategoryAndImages } from "@/types";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface CartItemProps {
  data: ProductWithCategoryAndImages;
  isPro: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ data, isPro }) => {
  const cart = useCart();

  const taxRate = isPro ? 1 : 1.2;
  const value = Number(data.priceHT) * taxRate;
  const taxText = isPro ? "(HT)" : "(TTC)";
  const quantity = cart.quantities[data.id];

  const onRemove = () => {
    cart.removeItem(data.id);
    toast.success("Produit retiré du panier");
  };

  const handleIncrement = () => {
    cart.addOneItem(data.id);
  };
  const handleDecrement = () => {
    cart.removeOneItem(data.id);
  };

  return (
    <>
      <div className="relative w-24 h-24 overflow-hidden bg-white rounded-md sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt="image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-4 sm:ml-6">
        <div className="absolute top-0 right-0 z-10">
          <IconButton
            className="bg-primary-foreground"
            onClick={onRemove}
            icon={<X size={15} className="text-primary" />}
          />
        </div>
        <div className="relative content-center sm:gap-x-6">
          <div className="flex justify-between ">
            <Link
              href={`/product/${data.id}`}
              className="pr-10 text-lg font-semibold text-primary"
            >
              {data.name}
            </Link>
          </div>
          <Currency value={value} taxtext={taxText} /> <br />
          <div className="flex gap-2 sm:flex-col items-left ">
            Quantité :
            <div className="flex items-center gap-2">
              <IconButton
                className="w-5 h-5 p-0.5 bg-primary-foreground  "
                onClick={handleDecrement}
                icon={<Minus size={20} className="text-primary" />}
              />
              {quantity}
              <IconButton
                className="w-5 h-5 p-0.5 bg-primary-foreground "
                onClick={handleIncrement}
                icon={<Plus size={20} className="font-bold stroke-2" />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
