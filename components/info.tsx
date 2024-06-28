"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import type { ProductWithCategoryAndImages } from "@/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { PlateVis } from "./plate-vis";

interface InfoProps {
  data: ProductWithCategoryAndImages;
  scroll?: boolean;
}

const Info: React.FC<InfoProps> = ({ data, scroll }) => {
  const cart = useCart();

  const value = Number(data.priceHT);

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div>
      <Link href={`/product/${data.id}`} className="text-3xl font-bold text-gray-900 dark:text-white">
        {data.name}
      </Link>
      <div className="items-end justify-between mt-3">
        <p className="text-2xl text-gray-900 dark:text-white">
          <Currency value={value} classNameLogo="w-6 h-6" />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <p>{data.description}</p>
        </div>
      </div>
      <div className="flex items-center mt-10 gap-x-3">
        <Button variant="rounded" className="flex items-center gap-x-2 hover:scale-105" onClick={onAddToCart}>
          Ajouter au panier
          <ShoppingCart />
        </Button>
      </div>

      {/* <Markdown className="mt-8 ">{data.productSpecs}</Markdown> */}
      <PlateVis value={data.productSpecs} className={scroll ? "overflow-scroll h-[500px] hide-scrollbar" : ""} />
    </div>
  );
};

export default Info;
