"use client";

import CartItem from "@/components/cart-item";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCart from "@/hooks/use-cart";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  const totalQuantity = Object.values(cart.quantities).reduce((total, qte) => {
    return total + qte;
  }, 0);

  if (!isMounted) {
    return (
      <Button
        variant={"rounded"}
        className="bg-primary-foreground text-primary"
      >
        <ShoppingBag size={20} />
        <span className="ml-1 w-3 text-sm font-medium ">0</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center  gap-x-2 sm:gap-x-4 ">
      <Link
        href={
          !session?.user
            ? "/login"
            : session.user.role === "admin"
              ? "/admin"
              : "/dashboard-user"
        }
        className="group flex items-center justify-center rounded-full border  p-2 text-sm shadow-md transition hover:rounded-full hover:bg-accent hover:text-accent-foreground sm:text-base"
      >
        Mon Compte
        {/* <User2 className="h-6 w-6 duration-300 ease-linear group-hover:scale-150 " /> */}
      </Link>

      <ThemeToggle />

      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger asChild>
          <Button
            variant={"rounded"}
            className="bg-primary-foreground tabular-nums text-primary	"
          >
            <ShoppingBag size={20} />
            <span className="ml-1 w-3 text-sm font-medium ">
              {totalQuantity}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <Link
                onClick={() => setIsOpen(false)}
                href="/cart"
                className="mt-6 flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {" "}
                Passer commande{" "}
                <HiOutlineExternalLink className="h-4 w-4 shrink-0" />
              </Link>
            </SheetTitle>
            <SheetDescription>Contenue de votre panier</SheetDescription>
          </SheetHeader>

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
                    className="mb-4 flex rounded-lg border border-border bg-card p-1 sm:border-2 sm:p-2"
                  >
                    <CartItem data={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarAction;
