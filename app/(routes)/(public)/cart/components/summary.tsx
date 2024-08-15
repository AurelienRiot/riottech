"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import ky, { type HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_URL;

interface SummaryProps {
  userId: string | undefined;
}

const Summary: React.FC<SummaryProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.priceHT) * Number(cart.quantities[item.id]);
  }, 0);

  const onCheckout = async () => {
    setLoading(true);
    if (!userId) {
      const callbackUrl = "/cart";
      router.replace(`/register?callbackUrl=${encodeURIComponent(baseUrl + callbackUrl)}`);
      return;
    }
    const itemsWithQuantities = cart.items.map((item) => {
      return {
        id: item.id,
        quantity: cart.quantities[item.id],
      };
    });
    try {
      const response = (await ky
        .post(`/api/checkout`, {
          json: {
            itemsWithQuantities,
            totalPrice: totalPrice.toFixed(2),
          },
        })
        .json()) as { url: string };
      // const response = await axios.post(`/api/checkout`, {
      //   itemsWithQuantities,
      //   totalPrice: totalPrice.toFixed(2),
      // });
      window.location.href = response.url;
    } catch (error) {
      const kyError = error as HTTPError;
      if (kyError.response) {
        const errorData = await kyError.response.text();
        toast.error(errorData, { duration: 8000 });
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg border-2 bg-gray-100 px-4 py-6 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-xl font-medium text-gray-500">Votre Commmande</h2>
      <ul className="pt-4">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between tabular-nums	">
            <div>
              {cart.quantities[item.id] > 1 && <span> {cart.quantities[item.id]}x </span>}
              <strong>{item.name} </strong>{" "}
            </div>
            <Currency
              value={Number(item.priceHT) * cart.quantities[item.id]}
              displayText={false}
              displayLogo={false}
              className="justify-self-end"
            />
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500">Total</div>
          <Currency value={totalPrice} displayLogo={false} />
        </div>
      </div>
      <Button
        disabled={cart.items.length === 0 || loading}
        onClick={onCheckout}
        variant="rounded"
        className="mt-6 w-full"
      >
        Passer la commande
      </Button>
    </div>
  );
};
export default Summary;
