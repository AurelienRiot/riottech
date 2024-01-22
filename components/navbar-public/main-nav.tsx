"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BsSim } from "react-icons/bs";
import { LucidePhoneCall, StoreIcon } from "lucide-react";
import { BiCctv } from "react-icons/bi";
import { RiAlarmWarningLine } from "react-icons/ri";
import { Suspense, useEffect, useState } from "react";
import { VisibleElement } from "../animations/visible-element";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/use-categories";

const MainNav = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const categories = useCategories((s) => s.categories);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const routes = categories.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
    }));

    return (
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 ">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className="rounded-lg border-2 border-border">
                        <Link href="/activation-sim" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <BsSim className="mr-2 hidden h-4 w-4 xl:flex" />
                                Activation Sim
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="relative rounded-lg border-2 border-border">
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
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem className="border-2 rounded-lg border-border">
                            <Link href="/anomaly-detect" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <RiAlarmWarningLine className="hidden w-4 h-4 mr-2 xl:flex" />
                                    Anomaly Detect
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem> */}
                    <NavigationMenuItem className="rounded-lg border-2 border-border ">
                        <Link
                            href="/surveillance-elevage"
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <BiCctv className="mr-2 hidden h-4 w-4 xl:flex" />
                                Surveillance elevage
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="rounded-lg border-2 border-border">
                        <Link href="/contact" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <LucidePhoneCall className="mr-2 hidden h-4 w-4 xl:flex" />
                                Contact
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {/* <SearchNav /> */}
        </nav>
    );
};

export default MainNav;
