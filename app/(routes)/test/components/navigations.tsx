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
import { GetWindowWidth, cn, isWindowSmallerThan } from "@/lib/utils";
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
import { useEffect, useState, createContext, useContext } from "react";
import { BiCctv } from "react-icons/bi";
import { BsSim } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RiAlarmWarningLine } from "react-icons/ri";
import Magnetic from "./magnetic";

type NavigationStateContextType = {
  navState: boolean;
  setNavState: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavigationStateContext = createContext<
  NavigationStateContextType | undefined
>(undefined);

export function useNavigationState() {
  const context = useContext(NavigationStateContext);

  if (context === undefined) {
    throw new Error(
      "useNavigationState must be used within a NavigationStateContext.Provider"
    );
  }

  return context;
}

const Navigations = () => {
  const { data: session } = useSession();

  const [navState, setNavState] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollThreshold = 30;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction === "down" &&
        scrollY > 0 &&
        scrollY - lastScrollY > scrollThreshold
      ) {
        setNavState(false);
      } else if (direction === "up") {
        setNavState(true);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <NavigationStateContext.Provider value={{ navState, setNavState }}>
      <div className="p-4 flex justify-between fixed top-0 right-0 left-0 z-50  items-center bg-primary-foreground">
        {isMounted && <Curve />}
        <div className="flex h-auto  p-2  rounded-lg justify-center items-center">
          <NavMobile />
          <Magnetic>
            <Link
              data-nav={navState ? "open" : "closed"}
              href="/"
              className="justify-center items-center gap-6 data-[nav=closed]:gap-2 hidden sm:flex transition-all duration-300"
            >
              <div
                data-nav={navState ? "open" : "closed"}
                className="w-14 h-14 relative transition-all duration-300 data-[nav=closed]:w-8  data-[nav=closed]:h-8"
              >
                <Image
                  src="/icon-riot-tech.png"
                  alt="logo Riot Tech"
                  fill
                  sizes="100%"
                  className="object-contain rounded-md"
                />
              </div>
              <span
                data-nav={navState ? "open" : "closed"}
                className="font-bold transition-all duration-300 data-[nav=closed]:text-base text-2xl"
              >
                {" "}
                Riot Tech
              </span>
            </Link>
          </Magnetic>
        </div>

        <MainNav />

        <div className="flex gap-2 ">
          <Magnetic>
            {session?.user ? (
              <Link
                href={
                  session.user.role === "admin" ? "/admin" : "/dashboard-user"
                }
                className="group flex items-center justify-center rounded-full border bg-primary-foreground p-2 text-primary shadow-md transition hover:rounded-full hover:bg-accent hover:text-accent-foreground"
              >
                <User2
                  data-nav={navState ? "open" : "closed"}
                  className="h-12 w-12  data-[nav=closed]:h-6 data-[nav=closed]:w-6 duration-300 transition-all group-hover:scale-150 "
                />
              </Link>
            ) : (
              <LoginButton
                data-nav={navState ? "open" : "closed"}
                className="[&[data-nav=open]>svg]:w-12  [&[data-nav=open]>svg]:h-12 [&[data-nav=closed]>svg]:h-6 [&[data-nav=closed]>svg]:w-6 bg-primary-foreground hover:bg-accent hover:text-accent-foreground text-primary "
              />
            )}
          </Magnetic>
          <ThemeToggle />
          <Cart />
        </div>
      </div>
    </NavigationStateContext.Provider>
  );
};

export default Navigations;

const MainNav = () => {
  const pathname = usePathname();
  const { categories } = useCategories();
  const { navState } = useNavigationState();
  const { cursorConfig, initialCursorConfig } = useCursor();

  const categoriesRoutes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    isActive: pathname.startsWith(`/category/${route.id}`),
  }));

  return (
    <nav
      className="lg:flex items-center justify-center gap-4 hidden "
      onMouseEnter={() => {
        cursorConfig.opacity.set(0.5);
      }}
      onMouseLeave={() => {
        cursorConfig.opacity.set(initialCursorConfig.opacity);
      }}
    >
      <Popover>
        <PopoverTrigger
          data-nav={navState ? "open" : "closed"}
          className={`text-primary text-xl font-semibold  transition-all duration-300 flex  justify-center items-center translate-y-4 data-[nav=closed]:translate-y-0
            data-[nav=closed]:font-light data-[nav=closed]:text-sm [&[data-state=open]>svg.chevron]:rotate-0
            `}
        >
          Produits
          <ChevronDown
            data-nav={navState ? "open" : "closed"}
            className="relative  h-8 w-8 data-[nav=closed]:h-4 data-[nav=closed]:w-4 transition-all duration-300 -rotate-90 chevron"
            aria-hidden="true"
          />
        </PopoverTrigger>
        <PopoverContent
          sideOffset={15}
          align="start"
          alignOffset={-10}
          className="w-[180px] h-auto p-2 flex flex-col gap-3"
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
        </PopoverContent>
      </Popover>
      {mainRoutes.map((data, index) => {
        return (
          <Link
            key={index}
            data-nav={navState ? "open" : "closed"}
            data-active={pathname.startsWith(data.href) ? "true" : "false"}
            className={`text-primary text-xl font-semibold  transition-all duration-300
            data-[nav=closed]:font-light data-[nav=closed]:text-sm translate-y-4 data-[nav=closed]:translate-y-0
            `}
            href={data.href}
          >
            {data.label}
          </Link>
        );
      })}
    </nav>
  );
};

const mainRoutes = [
  {
    href: "/activation-sim",
    icon: BsSim,
    label: "Activation Sim",
  },
  {
    href: "/anomaly-detect",
    label: "Anomaly detect",
    icon: RiAlarmWarningLine,
  },
  {
    href: "/surveillance-elevage",
    label: "Surveillance élevage",
    icon: BiCctv,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: LucidePhoneCall,
  },
];
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
  const { navState } = useNavigationState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant={"rounded"}
        className="bg-primary-foreground text-primary "
      >
        <ShoppingBag className="h-10 w-10" />
        <span className="w-3 ml-1  font-medium text-2xl">0</span>
      </Button>
    );
  }

  const totalQuantity = Object.values(cart.quantities).reduce((total, qte) => {
    return total + qte;
  }, 0);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger
        data-nav={navState ? "open" : "closed"}
        className={cn(
          buttonVariants({ variant: "rounded", size: "default" }),
          "bg-primary-foreground text-primary  [&[data-nav=open]>svg]:w-10  [&[data-nav=open]>svg]:h-10 [&[data-nav=closed]>svg]:h-6 [&[data-nav=closed]>svg]:w-6"
        )}
        onMouseEnter={() => {
          cursorConfig.opacity.set(0);
        }}
        onMouseLeave={() => {
          cursorConfig.opacity.set(initialCursorConfig.opacity);
        }}
      >
        <ShoppingBag className="duration-300 transition-all" />
        <span
          data-nav={navState ? "open" : "closed"}
          className="w-3 ml-1  font-medium duration-300 transition-all data-[nav=closed]:text-sm text-2xl"
        >
          {totalQuantity}
        </span>
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
  const { navState } = useNavigationState();

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
      className="bg-primary-foreground text-primary rounded-full  px-0 py-0 [&[data-nav=open]>svg]:w-12  [&[data-nav=open]>svg]:h-12 [&[data-nav=closed]>svg]:h-6 [&[data-nav=closed]>svg]:w-6"
      data-nav={navState ? "open" : "closed"}
    >
      <AnimatedIcon className="duration-300 transition-all " theme={theme} />

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

function Curve() {
  const { navState } = useNavigationState();
  const windowWidth = GetWindowWidth() === 0 ? 1000 : GetWindowWidth();

  const initialPath = `M0 0 L${windowWidth} 0 Q${windowWidth / 2} 100 0 0`;
  const targetPath = `M0 0 L${windowWidth} 0 Q${windowWidth / 2} 0 0 0`;
  // const initialPath = useTransform(
  //   windowWidth,
  //   (w) => `M0 0 L${w} 0 Q${w / 2} 500 0 0`
  // );
  // const targetPath = useTransform(
  //   windowWidth,
  //   (w) => `M0 0 L${w} 0 Q${w / 2} 0 0 0`
  // );

  const progress = useMotionValue(navState ? 1 : 0);
  const indexOfPath = useMotionValue(navState ? 0 : 1);
  const [scope, animate] = useAnimate();

  const path = useTransform(progress, [0, 1], [initialPath, targetPath], {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 20 }),
  });

  useEffect(() => {
    animate(progress, progress.get() === 1 ? 0 : 1, {
      duration: 0.1,
      ease: "easeInOut",
    });
  }, [animate, progress, indexOfPath, navState, windowWidth]);
  return (
    <motion.svg
      ref={scope}
      className={"absolute bottom-0 left-0 w-full h-px overflow-visible "}
      stroke="none"

      // fill={"red"}
    >
      <motion.path fill={Color("primary-foreground")} d={path}></motion.path>
    </motion.svg>
  );
}
