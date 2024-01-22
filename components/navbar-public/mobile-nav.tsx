"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, LucidePhoneCall, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { RiAlarmWarningLine } from "react-icons/ri";
import { BsSim } from "react-icons/bs";
import { BiCctv } from "react-icons/bi";
import Link from "next/link";
import { VisibleElement } from "../animations/visible-element";
import { AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/use-categories";

type MobileNavProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

export default function MobileNav({ className }: MobileNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const categories = useCategories((s) => s.categories);

    const [open, setOpen] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);

    const routes = categories.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
    }));

    const setPopover = (state: boolean) => {
        if (state) {
            setOpen(state);
        } else {
            setOpen(state);
            setOpenProduct(state);
        }
    };

    return (
        <Popover open={open} onOpenChange={setPopover}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select"
                    className={cn(
                        "  group relative h-10 w-10 rounded-full transition-colors duration-300   data-[state=open]:bg-destructive  data-[state=open]:text-destructive-foreground ",
                        className,
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="absolute left-[10px] top-[18px] h-4  w-4 transition-transform duration-300 group-data-[state=open]:translate-x-[5px] group-data-[state=open]:translate-y-[-2px] group-data-[state=open]:-rotate-45 "
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
                        className="absolute left-[10px] top-[13px] h-4 w-4 transition-transform duration-300 group-data-[state=open]:translate-x-[-4px] group-data-[state=open]:translate-y-[3px] group-data-[state=open]:rotate-45  "
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
                        className="absolute left-[15px] top-[23px] h-4  w-4 transition-transform duration-300 group-data-[state=open]:translate-x-[-5px] group-data-[state=open]:translate-y-[-3px] group-data-[state=open]:rotate-45 "
                        viewBox="0 0 24 24"
                    >
                        <line x1="2" y1="2" x2="14" y2="2"></line>
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="h-auto w-[200px] p-0">
                <Command>
                    <CommandList>
                        <Link
                            href="/"
                            className="text-center sm:hidden"
                            onClick={() => {
                                setOpen(false);
                                setOpenProduct(false);
                            }}
                        >
                            <p className="pt-2 text-lg font-bold text-primary">
                                {" "}
                                RIOT TECH
                            </p>
                        </Link>
                        {/* <SearchNavMobile /> */}
                        {/* <CommandInput placeholder="recherche"/>
                        <CommandEmpty> Aucun resultat</CommandEmpty> */}
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    router.push("/activation-sim");
                                    setOpen(false);
                                    setOpenProduct(false);
                                }}
                                className="test-sm cursor-pointer "
                            >
                                <BsSim className="mr-2 h-4 w-4" />
                                Activation Sim
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        pathname === "/activation-sim"
                                            ? "opacity-100"
                                            : "opacity-0",
                                    )}
                                />
                            </CommandItem>

                            <DisplayRoutes
                                routes={routes}
                                setOpen={setOpen}
                                setOpenProduct={setOpenProduct}
                                openProduct={openProduct}
                            />

                            {/* <CommandItem
                                onSelect={() => {
                                    router.push("/anomaly-detect");
                                    setOpen(false);
                                    setOpenProduct(false);
                                }}
                                className="test-sm cursor-pointer "
                            >
                                <RiAlarmWarningLine className="mr-2 h-4 w-4" />
                                {"Détection d'anomalies"}
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        pathname === "/anomaly-detect"
                                            ? "opacity-100"
                                            : "opacity-0",
                                    )}
                                />
                            </CommandItem> */}
                            <CommandItem
                                onSelect={() => {
                                    router.push("/surveillance-elevage");
                                    setOpen(false);
                                    setOpenProduct(false);
                                }}
                                className="test-sm cursor-pointer"
                            >
                                <BiCctv className="mr-2 h-4 w-4" />
                                {"Surveillance élevage"}
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        pathname === "/surveillance-elevage"
                                            ? "opacity-100"
                                            : "opacity-0",
                                    )}
                                />
                            </CommandItem>

                            <CommandItem
                                onSelect={() => {
                                    router.push("/contact");
                                    setOpen(false);
                                    setOpenProduct(false);
                                }}
                                className="test-sm cursor-pointer "
                            >
                                <LucidePhoneCall className="mr-2 h-4 w-4" />
                                Contact
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        pathname === "/contact"
                                            ? "opacity-100"
                                            : "opacity-0",
                                    )}
                                />
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                </Command>
            </PopoverContent>
        </Popover>
    );
}
type DisplayRoutesProps = {
    routes: { href: string; label: string; active: boolean }[];
    setOpen: (state: boolean) => void;
    openProduct: boolean;
    setOpenProduct: (state: boolean) => void;
};
const DisplayRoutes = ({
    routes,
    setOpen,
    openProduct,
    setOpenProduct,
}: DisplayRoutesProps) => {
    return (
        <CommandItem
            aria-expanded={openProduct}
            onSelect={() => setOpenProduct(!openProduct)}
            className="test-sm relative cursor-pointer"
        >
            {"  "} <StoreIcon className="mr-2 h-4 w-4 " /> Produits
            <ChevronDown
                className={cn(
                    "relative top-[1px] ml-1 h-3 w-3 transition duration-200",
                    openProduct ? "" : "-rotate-90",
                )}
                aria-hidden="true"
            />
            <ul
                // className="absolute left-20 top-6 z-40 grid w-auto gap-2 rounded-lg border-2 border-border bg-popover p-4"
                data-state={openProduct}
                className="absolute left-20  top-6 z-40 grid w-auto gap-1 rounded-lg border-2 border-border  bg-popover py-4  opacity-100 transition-all duration-300  data-[state=false]:z-0 data-[state=false]:opacity-0 "
            >
                {routes.map((route) => (
                    <li key={route.href}>
                        <Link
                            href={route.href}
                            onClick={() => {
                                setOpenProduct(false);
                                setOpen(false);
                            }}
                            className={cn(
                                route.active
                                    ? "text-popover-foreground "
                                    : "text-muted-foreground ",
                                "block w-full rounded-lg px-4 py-1  text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                        >
                            {route.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </CommandItem>
    );
};
