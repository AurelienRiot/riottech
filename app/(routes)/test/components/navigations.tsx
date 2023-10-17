"use client";
import { LoginButton } from "@/components/auth/auth-button";
import CartItem from "@/components/cart-item";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCart from "@/hooks/use-cart";
import { useCategories } from "@/hooks/use-categories";
import { useCursor } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";
import { cn, isWindowSmallerThan } from "@/lib/utils";
import { interpolate } from "flubber";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ChevronDown,
  LucidePhoneCall,
  ShoppingBag,
  StoreIcon,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCctv } from "react-icons/bi";
import { BsSim } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RiAlarmWarningLine } from "react-icons/ri";
import Magnetic from "./magnetic";

const Navigations = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="p-4 flex justify-between fixed top-0 right-0 left-0 z-50  items-center bg-gradient-to-b from-primary-foreground to-transparent from-75%">
        <div className="flex h-auto gap-2 p-2 bg-primary-foreground rounded-lg justify-center items-center">
          <NavMobile />
          <Magnetic>
            <Link href="/" className="flex justify-center items-center gap-2">
              <Image
                src="/icon-riot-tech.png"
                alt="logo Riot Tech"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="font-bold"> Riot Tech</span>
            </Link>
          </Magnetic>
        </div>

        <div className="flex gap-2 ">
          <Magnetic>
            {session?.user ? (
              <Link
                href={
                  session.user.role === "admin" ? "/admin" : "/dashboard-user"
                }
                className="group flex items-center justify-center rounded-full border bg-primary-foreground p-2 text-primary shadow-md transition hover:rounded-full hover:bg-accent hover:text-accent-foreground"
              >
                <User2 className="h-6 w-6 duration-300 ease-linear group-hover:scale-150 " />
              </Link>
            ) : (
              <LoginButton className="bg-primary-foreground hover:bg-accent hover:text-accent-foreground text-primary" />
            )}
          </Magnetic>
          <ThemeToggle />
          <Cart />
        </div>
      </div>
    </>
  );
};

export default Navigations;

const NavMobile = () => {
  const pathname = usePathname();
  const { categories } = useCategories();
  const { cursorConfig, initialCursorConfig } = useCursor();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(isWindowSmallerThan(1024));
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) {
    return null;
  }

  const categoriesRoutes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname.startsWith(`/category/${route.id}`),
  }));

  const mainRoutes = [
    {
      href: "/activation-sim",
      icon: BsSim,
      label: "Activation Sim",
      active: pathname.startsWith(`/category/activation-sim`),
    },
    {
      href: "/anomaly-detect",
      label: "Anomaly detect",
      icon: RiAlarmWarningLine,
      active: pathname.startsWith(`/category/anomaly-detect`),
    },
    {
      href: "/surveillance-elevage",
      label: "Surveillance élevage",
      icon: BiCctv,
      active: pathname.startsWith(`/category/surveillance-elevage`),
    },
    {
      href: "/contact",
      label: "Contact",
      icon: LucidePhoneCall,
      active: pathname.startsWith(`/category/contact`),
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onMouseEnter={() => {
            cursorConfig.opacity.set(0);
          }}
          onMouseLeave={() => {
            cursorConfig.opacity.set(initialCursorConfig.opacity);
          }}
          variant="outline"
          size="sm"
          role="combobox"
          aria-label="Select"
          className="  relative rounded-full w-10 h-10 group data-[state=open]:text-destructive-foreground transition-colors   data-[state=open]:bg-destructive  duration-300 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="absolute w-4 h-4 transition-transform  duration-300 group-data-[state=open]:-rotate-45 top-[18px] left-[10px] group-data-[state=open]:translate-x-[5px] group-data-[state=open]:translate-y-[-2px] "
            viewBox="0 0 24 24"
          >
            <line x1="2" y1="2" x2="22" y2="2"></line>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="absolute w-4 h-4 transition-transform duration-300 top-[13px] left-[10px] group-data-[state=open]:rotate-45 group-data-[state=open]:translate-x-[-4px] group-data-[state=open]:translate-y-[3px]  "
            viewBox="0 0 24 24"
          >
            <line x1="2" y1="2" x2="14" y2="2"></line>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="absolute w-4 h-4 transition-transform  duration-300 top-[23px] left-[15px] group-data-[state=open]:rotate-45 group-data-[state=open]:translate-x-[-5px] group-data-[state=open]:translate-y-[-3px] "
            viewBox="0 0 24 24"
          >
            <line x1="2" y1="2" x2="14" y2="2"></line>
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => {
          cursorConfig.opacity.set(0);
        }}
        onMouseLeave={() => {
          cursorConfig.opacity.set(initialCursorConfig.opacity);
        }}
        sideOffset={15}
        align="start"
        alignOffset={-10}
        className="w-[180px] h-auto p-2 flex flex-col gap-3"
      >
        <Collapsible>
          <CollapsibleTrigger className="flex gap-2 justify-center items-center [&[data-state=open]>svg.chevron]:rotate-0">
            {" "}
            <StoreIcon className="w-4 h-4  " /> Produits
            <ChevronDown
              className="relative  h-3 w-3 transition duration-200 -rotate-90 chevron"
              aria-hidden="true"
            />
          </CollapsibleTrigger>
          <CollapsibleContent
            className="overflow-hidden data-[state=open]:animate-collapsible-down
          data-[state=closed]:animate-collapsible-up flex flex-col  gap-1  rounded-lg bg-green-600"
          >
            {categoriesRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="px-1 first:pt-1"
              >
                {route.label}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
        {mainRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex gap-2 items-center"
          >
            <route.icon className="w-4 h-4 inline " /> {route.label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const { cursorConfig, initialCursorConfig } = useCursor();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant={"rounded"}
        className="bg-primary-foreground text-primary"
      >
        <ShoppingBag size={20} />
        <span className="w-3 ml-1 text-sm font-medium ">0</span>
      </Button>
    );
  }

  const totalQuantity = Object.values(cart.quantities).reduce((total, qte) => {
    return total + qte;
  }, 0);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "rounded", size: "default" }),
          "bg-primary-foreground text-primary"
        )}
        onMouseEnter={() => {
          cursorConfig.opacity.set(0);
        }}
        onMouseLeave={() => {
          cursorConfig.opacity.set(initialCursorConfig.opacity);
        }}
      >
        <ShoppingBag size={20} />
        <span className="w-3 ml-1 text-sm font-medium ">{totalQuantity}</span>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Link
              onClick={() => setIsOpen(false)}
              href="/cart"
              className="flex items-center justify-center h-10 gap-2 px-4 py-2 mt-6 font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:underline"
            >
              {" "}
              Passer commande{" "}
              <HiOutlineExternalLink className="w-4 h-4 shrink-0" />
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
                  className="flex p-1 mb-4 border rounded-lg sm:border-2 sm:p-2 bg-card border-border"
                >
                  <CartItem data={item} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { cursorConfig, initialCursorConfig } = useCursor();

  return (
    <Button
      onMouseEnter={() => {
        cursorConfig.opacity.set(0);
      }}
      onMouseLeave={() => {
        cursorConfig.opacity.set(initialCursorConfig.opacity);
        cursorConfig.color.set(Color(initialCursorConfig.color));
      }}
      variant={"rounded"}
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      size="icon"
      className="bg-primary-foreground text-primary rounded-full  px-0 py-0"
    >
      <AnimatedIcon className="w-6 h-6 " theme={theme} />
      {/* <SunIcon className="absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 h-6 w-6  " />
      <MoonIcon className="absolute  h-6 w-6   rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0   " /> */}
      <span className="sr-only w-0">Toggle theme</span>
    </Button>
  );
}

const AnimatedIcon = ({
  className,
  theme,
}: {
  className: string;
  theme: string | undefined;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { cursorConfig } = useCursor();
  const [scope, animate] = useAnimate();
  const progress = useMotionValue(theme === "dark" ? 0 : 1);
  const indexOfPath = useMotionValue(theme === "dark" ? 1 : 0);
  const strokeWidth = useTransform(progress, [0, 1], [3, 0]);

  const path = useTransform(progress, [0, 1], [sun, moon], {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const animatePath = () => {
    animate(progress, indexOfPath.get(), {
      duration: 0.5,
      ease: "easeInOut",
      onComplete: () => {
        if (indexOfPath.get() === 0) {
          indexOfPath.set(1);
        } else {
          indexOfPath.set(0);
        }
      },
    });
  };

  return (
    <motion.svg
      className={className}
      ref={scope}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={() => {
        cursorConfig.opacity.set(0);
      }}
      onClick={animatePath}
    >
      <motion.path d={path} />
      <motion.path d={ray1} strokeWidth={strokeWidth} />
      <motion.path d={ray2} strokeWidth={strokeWidth} />
      <motion.path d={ray3} strokeWidth={strokeWidth} />
      <motion.path d={ray4} strokeWidth={strokeWidth} />
      <motion.path d={ray5} strokeWidth={strokeWidth} />
      <motion.path d={ray6} strokeWidth={strokeWidth} />
      <motion.path d={ray7} strokeWidth={strokeWidth} />
      <motion.path d={ray8} strokeWidth={strokeWidth} />
    </motion.svg>
  );
};

const sun = "M 8 12 a 4 4 0 0 1 8 0 a 4 4 0 0 1 -8 0";
const moon = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z";
const ray1 = "M12 2v2";
const ray2 = "M12 20v2";
const ray3 = "m4.93 4.93 1.41 1.41";
const ray4 = "m17.66 17.66 1.41 1.41";
const ray5 = "M2 12h2";
const ray6 = "M20 12h2";
const ray7 = "m6.34 17.66-1.41 1.41";
const ray8 = "m19.07 4.93-1.41 1.41";
