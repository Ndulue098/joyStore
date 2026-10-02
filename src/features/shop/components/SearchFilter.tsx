"use client"
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface SearchFilterProps {
  sortItems?: { label: string; value: string }[];
}

const sortItems = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest Added", value: "newest" },
]

export default function SearchFilter({}: SearchFilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [isPending,startTransition]=useTransition()
    const [value, setValue] = useState(searchParams.get("search") || "");

    function handleSort(value:string | null){
        if (!value) return;
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    function handleSearch(term:string){
        const params=new URLSearchParams(searchParams.toString());
        setValue(term)
        if (term.trim()){
            params.set("search",term)
        }else{
            params.delete("search")
        }

        startTransition(()=>{
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        })

    }

    function handleClear() {
    handleSearch("");
  }
    const getSortVal=searchParams.get("sort") 
    const getSearch=searchParams.get("search")

    

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 mt-8 border-b border-neutral-200">
        {/* Search Input */}
          
        <Field className="flex flex-row items-center gap-2.5 w-full max-w-md bg-white p-2 rounded-md border border-neutral-300">
      {/* Search Icon */}
            <Search className="h-4 w-4 shrink-0 text-neutral-500" />

            {/* Input Field */}
            <Input
                value={value}
                onChange={(e) => handleSearch(e.target.value)}
                id="search-products"
                type="text"
                placeholder="search products..."
                className="w-auto flex-1 min-w-0 h-auto rounded-md p-0 border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none"
            />

            {/* Clear Field Button */}
            {value && (
                <button
                type="button"
                onClick={handleClear}
                className="p-0.5 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer shrink-0"
                aria-label="Clear search"
                >
                <X className="h-4 w-4" />
                </button>
            )}
            </Field>

        {/* Right side: Mobile filter toggle & Sort selector */}
        <div className="flex items-center justify-between md:justify-end gap-3">
            <p>Sort:</p>
            <Field>
            <Select
                items={sortItems}
                value={searchParams.get("sort") || ""}
                onValueChange={handleSort}
                >
                <SelectTrigger className="w-[200px] appearance-none rounded-md border border-neutral-300 bg-white py-2 pl-3  text-xs font-semibold 
                text-neutral-800 shadow-2xs cursor-pointer focus:border-neutral-900 focus:outline-none">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {sortItems.map((item) => (
                        <SelectItem  key={item.value} value={item.value}>
                        {item.label}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            </Field>

        </div>
      </div>
  );
}