"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LucidePhoneCall, Wifi } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../icons2";

const MainNav = () => {
  const pathname = usePathname();
  // Compute active route once per path change
  const activeByHref = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const r of navRoutes) {
      const href = r.href;
      const isActive =
        pathname === href ||
        pathname?.startsWith(`${href}?`) ||
        pathname?.startsWith(`${href}/`);
      map.set(href, !!isActive);
    }
    return map;
  }, [pathname]);

  // const routes = categories.map((route) => ({
  //   href: `/category/${route.id}`,
  //   label: route.name,
  //   active: pathname === `/category/${route.id}`,
  // }));

  return (
    <nav className="mx-6 flex items-center space-x-3 lg:space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navRoutes.map((route) => {
            const isActive = activeByHref.get(route.href);
            return (
              <NavigationMenuItem key={route.title} className="group rounded-xl">
                <NavigationMenuLink
                  href={route.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "relative overflow-hidden rounded-xl border border-transparent pl-3 pr-4 transition-all duration-200",
                    "hover:border-primary/30 hover:bg-accent/60 hover:shadow-sm",
                    isActive &&
                      "bg-accent/70 text-accent-foreground ring-1 ring-primary/30 shadow-sm",
                  )}
                >
                  <route.Icone className="mr-2 h-4 w-4 shrink-0 opacity-80 transition-transform duration-200 group-hover:scale-110" />
                  {route.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}

          {/* <NavigationMenuItem className="relative rounded-lg border-2 border-border">
                        <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                            className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 "
                        >
                            {"  "}{" "}
                            <StoreIcon className="mr-2 hidden h-4 w-4 xl:flex" />{" "}
                            Produits
                            <ChevronDown
                                className={cn(
                                    "relative top-px ml-1 h-3 w-3 transition duration-200",
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
                                                        "block w-full rounded-lg py-1 pl-4 text-sm font-medium leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
