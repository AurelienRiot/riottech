"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Cctv, LucidePhoneCall, Wifi } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCctv } from "react-icons/bi";
import { BsSim } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { Icons } from "../icons2";

const MainNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // const categories = useCategories((s) => s.categories);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // const routes = categories.map((route) => ({
  //   href: `/category/${route.id}`,
  //   label: route.name,
  //   active: pathname === `/category/${route.id}`,
  // }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 ">
      <NavigationMenu>
        <NavigationMenuList>
          {navRoutes.map((route) => (
            <NavigationMenuItem key={route.title} className="rounded-lg border-2 border-border">
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <route.Icone className="mr-2 hidden h-4 w-4 xl:flex" />
                  {route.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          {/* <NavigationMenuItem className="relative rounded-lg border-2 border-border">
                        <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                            className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                        >
                            {"  "}{" "}
                            <StoreIcon className="mr-2 hidden h-4 w-4 xl:flex" />{" "}
                            Produits
                            <ChevronDown
                                className={cn(
                                    "relative top-[1px] ml-1 h-3 w-3 transition duration-200",
                                    open ? "rotate-180" : "",
                                )}
                                aria-hidden="true"
                            />
                        </button>
                        <Suspense fallback={null}>
                            <AnimatePresence>
                                {open && (
                                    <VisibleElement
                                        as="ul"
                                        variant="bottom"
                                        className="absolute top-12 z-50 grid w-full gap-3 rounded-lg border-2 border-border bg-popover py-6 xl:px-2"
                                    >
                                        {routes.map((route) => (
                                            <li key={route.href}>
                                                <Link
                                                    href={route.href}
                                                    className={cn(
                                                        route.active
                                                            ? "text-popover-foreground "
                                                            : "text-muted-foreground ",
                                                        "block w-full rounded-lg py-1 pl-4 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                    )}
                                                >
                                                    {route.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </VisibleElement>
                                )}
                            </AnimatePresence>
                        </Suspense>
                    </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      {/* <SearchNav /> */}
    </nav>
  );
};

export default MainNav;

export const navRoutes = [
  {
    href: "/activation-sim",
    title: "J'Active ma SIM",
    Icone: Icons.Sim,
  },
  {
    href: "/surveillance-elevage",
    title: "Surveillance Agricole",
    Icone: Icons.CCTV,
  },
  {
    href: "/solution-internet",
    title: "La connexion internet RIOT TECH",
    Icone: Wifi,
  },
  {
    href: `/solution-internet?btn=${encodeURIComponent("Revendeur-Intégration")}`,
    title: "Revendeur/Intégration",
    Icone: LucidePhoneCall,
  },
];
