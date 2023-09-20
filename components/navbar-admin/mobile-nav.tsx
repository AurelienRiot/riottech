"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarSearchIcon,
  Check,
  ChevronsUpDown,
  LayoutDashboardIcon,
  ListOrderedIcon,
  Menu,
  PackageIcon,
  PhoneCallIcon,
  PresentationIcon,
  RowsIcon,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface MobileNavProps extends PopoverTriggerProps {}

export default function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selectionner"
          className={cn("w-[75px] justify-between ", className)}
        >
          <Menu className="mr-2 h-4 w-4" />

          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-auto p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="recherche" />
            <CommandEmpty> Aucun resultat</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  router.push(`/`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/` ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/billboards`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <PresentationIcon className="mr-2 h-4 w-4" />
                {"Panneaux d'affichages"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/admin/billboards`
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/categories`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <RowsIcon className="mr-2 h-4 w-4" />
                {"Categories"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/admin/categories`
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/products`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <PackageIcon className="mr-2 h-4 w-4" />
                {"Produits"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/admin/products` ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/subscriptions`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <CalendarSearchIcon className="mr-2 h-4 w-4" />
                {"Abonnements"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/admin/subscriptions`
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/orders`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <ListOrderedIcon className="mr-2 h-4 w-4" />
                {"Commandes"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/admin/orders` ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/users`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <Users className="mr-2 h-4 w-4" />
                {"Clients"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/amdin/users` ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/contacts`);
                  setOpen(false);
                }}
                className="test-sm"
              >
                <PhoneCallIcon className="mr-2 h-4 w-4" />
                {"Contacts"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === `/admin/contacts` ? "opacity-100" : "opacity-0"
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
