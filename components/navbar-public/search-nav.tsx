"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { searchItems } from "@/components/constants/search-items";

export function SearchNav() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const router = useRouter();

  const filteredSearchItems = searchItems.filter((searchItem) =>
    searchItem.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-expanded={open} className="w-[150px] justify-between">
          {value ? searchItems.find((searchItem) => searchItem.value === value)?.label : "Recherche..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <Input
            type="text"
            placeholder="   .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="focus:outline-none focus:ring-0 focus:shadow-none focus:bg-white focus:border-transparent"
          />
          <CommandList>
            {filteredSearchItems.length > 0 ? (
              <CommandGroup>
                {filteredSearchItems.map((searchItem) => (
                  <CommandItem
                    key={searchItem.value}
                    onSelect={() => {
                      setValue(searchItem.value);
                      setOpen(false);
                      router.push(`/${searchItem.value}`);
                      setValue("");
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4 ", value === searchItem.value ? "opacity-100" : "opacity-0")} />
                    <p className="cursor-pointer">{searchItem.label}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty></CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
