"use client";

import * as React from "react";
import { FileSearch2Icon } from "lucide-react";

import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { searchItems } from "../constants/search-items";

export function SearchNavMobile() {
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const router = useRouter();

  const filteredSearchItems = searchItems.filter((searchItem) =>
    searchItem.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="  Recherche... "
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="rounded-full focus:outline-hidden focus:ring-0 focus:shadow-none focus:bg-white focus:border-transparent"
      />

      {searchValue.trim() !== "" && filteredSearchItems.length > 0 ? (
        filteredSearchItems.map((searchItem) => (
          <div
            key={searchItem.value}
            className="ml-1 mr-1 mt-2 cursor-pointer select-none rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/20 hover:bg-accent hover:text-accent-foreground"
          >
            <button
              type="button"
              onClick={() => {
                setValue(searchItem.value);
                router.push(`/${searchItem.value}`);
              }}
            >
              <FileSearch2Icon className="mr-2 inline h-4 w-4 opacity-80" />
              {searchItem.label}
            </button>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
