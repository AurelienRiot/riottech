"use client";
import { LoginButton } from "@/components/auth/auth-button";
import CartItem from "@/components/cart-item";
import { Icons } from "@/components/icons";
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
  useMotionValueEvent,
  useScroll,
  useTime,
  useTransform,
} from "framer-motion";
import {
  ChevronDown,
  LucidePhoneCall,
  ShoppingBag,
  Siren,
  Store,
  StoreIcon,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import Magnetic from "./magnetic";

type NavigationStateContextType = {
  navState: "open" | "closed";
  setNavState: React.Dispatch<React.SetStateAction<"open" | "closed">>;
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

  const [navState, setNavState] = useState<"open" | "closed">("open");
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollThreshold = 30;
    const previous = scrollY.getPrevious();
    const direction = latest > previous ? "down" : "up";

    if (direction === "down" && latest - previous > scrollThreshold) {
      setNavState("closed");
    } else if (direction === "up" && previous - latest > scrollThreshold) {
      setNavState("open");
    }
  });

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
              data-nav={navState}
              href="/"
              className="justify-center items-center gap-6 data-[nav=closed]:gap-2 hidden sm:flex transition-all duration-300"
            >
              <div
                data-nav={navState}
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
                data-nav={navState}
                className="relative font-bold data-[nav=closed]:text-base text-2xl [&[data-nav=open]>span.riot]:translate-y-2 [&[data-nav=open]>span.tech]:translate-y-4  "
              >
                <span className="riot inline-block transition-all duration-300">
                  Riot{" "}
                </span>{" "}
                <span className="tech inline-block transition-all duration-300">
                  Tech
                </span>
              </span>
            </Link>
          </Magnetic>
        </div>

        <MainNav />

        <div className="flex gap-2 ">
          <Magnetic className="flex items-center justify-center w-auto h-auto ">
            {session?.user ? (
              <Link
                data-nav={navState}
                href={
                  session.user.role === "admin" ? "/admin" : "/dashboard-user"
                }
                className="group flex items-center justify-center  text-primary  transition-all  hover:bg-accent hover:text-accent-foreground data-[nav=open]:translate-y-4 hover:scale-150 rounded-full"
              >
                <User2
                  data-nav={navState}
                  className="h-10 w-10  data-[nav=closed]:h-6 data-[nav=closed]:w-6 duration-300 transition-all "
                />
              </Link>
            ) : (
              <LoginButton
                data-nav={navState}
                className="[&[data-nav=open]>svg]:w-12  [&[data-nav=open]>svg]:h-12 [&[data-nav=closed]>svg]:h-6 [&[data-nav=closed]>svg]:w-6 bg-primary-foreground hover:bg-accent hover:text-accent-foreground text-primary  data-[nav=open]:translate-y-4 "
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
      className={`lg:flex items-center justify-center gap-4 hidden [&[data-nav=closed]>*]:translate-y-0
      [&[data-nav=open]>*:nth-child(1)]:translate-y-8 [&[data-nav=open]>*:nth-child(2)]:translate-y-12
      [&[data-nav=open]>*:nth-child(3)]:translate-y-16 [&[data-nav=open]>*:nth-child(4)]:translate-y-12
      [&[data-nav=open]>*:nth-child(5)]:translate-y-8
      text-[calc(2vw*0.7)] data-[nav=closed]:text-sm  `}
      onMouseEnter={() => {
        cursorConfig.opacity.set(0.5);
      }}
      onMouseLeave={() => {
        cursorConfig.opacity.set(initialCursorConfig.opacity);
      }}
      data-nav={navState}
    >
      <Popover>
        <PopoverTrigger
          data-nav={navState}
          className={`text-primary  font-semibold  transition-all duration-300 flex justify-center  items-center 
            data-[nav=closed]:font-light  [&[data-state=open]>svg.chevron]:rotate-0 [&[data-state=open]>svg.store]:scale-110 [&[data-nav=open]>svg.store]:translate-y-[-15%]
            before:h-1 data-[nav=closed]:before:h-px before:w-0 data-[state=open]:before:w-4/5 before:bg-primary before:absolute before:left-0 before:-bottom-1 before:rounded-md before:transition-all before:duration-300
            `}
        >
          <Store
            data-nav={navState}
            className="w-8 h-8 mr-2 data-[nav=closed]:w-4 data-[nav=closed]:h-4 xl:inline hidden transition-all duration-300 store "
          />
          Produits
          <ChevronDown
            data-nav={navState}
            className="relative h-8 w-8 data-[nav=closed]:h-4 data-[nav=closed]:w-4 transition-all duration-300 -rotate-90 chevron "
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
            data-nav={navState}
            data-active={pathname.startsWith(data.href) ? "true" : "false"}
            className={`text-primary group  flex gap-1 items-end font-semibold  transition-all duration-300
            data-[nav=closed]:font-light 
            before:h-1 data-[nav=closed]:before:h-px before:w-0 hover:before:w-full before:bg-primary before:absolute before:left-0 before:-bottom-2 before:rounded-md before:transition-all before:duration-300
            
            `}
            href={data.href}
          >
            <data.icon
              data-nav={navState}
              className="w-8 h-8  data-[nav=closed]:w-4 data-[nav=closed]:h-4 xl:inline hidden transition-all duration-300 data-[nav=open]:group-hover:scale-110 "
            />{" "}
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
    icon: Icons.Sim,
    label: "Activation Sim",
  },
  {
    href: "/anomaly-detect",
    label: "Anomaly detect",
    icon: Siren,
  },
  {
    href: "/surveillance-elevage",
    label: "Surveillance élevage",
    icon: Icons.CCTV,
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
          className="  relative rounded-full w-10 h-10 group data-[state=open]:text-destructive-foreground transition-colors   data-[state=open]:bg-destructive  duration-300 mr-4"
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
        data-nav={navState}
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
          data-nav={navState}
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
        console.log(theme);
      }}
      size="icon"
      className="bg-primary-foreground text-primary rounded-full  px-0 py-0 [&[data-nav=open]>svg]:w-12  [&[data-nav=open]>svg]:h-12 [&[data-nav=closed]>svg]:h-6 [&[data-nav=closed]>svg]:w-6 data-[nav=open]:translate-y-2"
      data-nav={navState}
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
    progress.stop();
    animate(progress, indexOfPath.get(), {
      duration: 0.5,
      ease: "easeInOut",
    });
    if (indexOfPath.get() === 0) {
      indexOfPath.set(1);
    } else {
      indexOfPath.set(0);
    }
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

  const progress = useMotionValue(navState === "open" ? 1 : 0);
  const [scope, animate] = useAnimate();

  const path = useTransform(progress, [0, 1], [initialPath, targetPath], {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 20 }),
  });

  useEffect(() => {
    progress.stop();
    animate(progress, navState === "open" ? 0 : 1, {
      duration: 0.2,
      ease: "easeInOut",
    });
  }, [animate, progress, navState, windowWidth]);
  return (
    <motion.svg
      ref={scope}
      className={"absolute bottom-0 left-0 w-full h-px overflow-visible "}
      stroke="none"
    >
      <motion.path className={"fill-primary-foreground"} d={path}></motion.path>
    </motion.svg>
  );
}
