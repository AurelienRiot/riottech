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
        className="focus:outline-hidden focus:ring-0 focus:shadow-none focus:bg-white focus:border-transparent "
      />

      {searchValue.trim() !== "" && filteredSearchItems.length > 0 ? (
        filteredSearchItems.map((searchItem) => (
          <div
            key={searchItem.value}
            className="text-blue-900 ml-1 mr-1 mt-2 hover:bg-gray-100 font-bold relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden aria-selected:bg-accent aria-selected:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 "
          >
            <button
              type="button"
              onClick={() => {
                setValue(searchItem.value);
                router.push(`/${searchItem.value}`);
              }}
            >
              <FileSearch2Icon className="inline mr-1 h-4 w-4" />
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
