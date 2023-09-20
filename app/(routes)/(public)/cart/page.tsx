"use client";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

const CartPage = () => {
  const cart = useCart();
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const isPro = session?.user?.isPro ? session.user.isPro : false;
  const stripeCustomerId = session?.user?.stripeCustomerId
    ? session.user.stripeCustomerId
    : "";

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className="px-2 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold ">Pannier</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-secondary-foreground ">
                  Aucun produit dans le panier
                </p>
              )}
              <ul>
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{
                        layout: { type: "tween" },
                        animate: { duration: 1 },
                      }}
                      className="flex p-1 mb-4 border rounded-lg sm:border-2 sm:p-2 bg-card border-border"
                    >
                      <CartItem data={item} isPro={isPro} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
            <Summary
              userId={userId}
              isPro={isPro}
              stripeCustomerId={stripeCustomerId}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
