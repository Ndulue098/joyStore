import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface SearchFilterProps {
  sortItems?: { label: string; value: string }[];
}

const sortItems = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "popular" },
  { label: "Newest Added", value: "newest" },
]

export default function SearchFilter({}: SearchFilterProps) {

    function handleSort(e){
        e.preventDefault()

    }

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 mt-8 border-b border-neutral-200">
        {/* Search Input */}
          
        <Field className="flex flex-row items-center gap-2.5 w-full max-w-md bg-white p-2 rounded-md border border-neutral-300">
        {/* Search Icon: Fixed dimensions */}
        <Search className="h-4 w-4 shrink-0 text-neutral-500" />

        {/* Shadcn Input: Override w-full with w-auto flex-1 */}
        <Input
            id="search-products"
            type="text"
            placeholder="search products..."
            className="w-auto flex-1 min-w-0 h-auto rounded-md p-0 border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none"
        />
        </Field>

        {/* Right side: Mobile filter toggle & Sort selector */}
        <div className="flex items-center justify-between md:justify-end gap-3">
            <p>Sort:</p>
            <Field>
            <Select
                items={sortItems}
                // onValueChange={(value) => onSortChange(value as SortOption)}
                >
                <SelectTrigger className="w-[200px] appearance-none rounded-md border border-neutral-300 bg-white py-2 pl-3  text-xs font-semibold 
                text-neutral-800 shadow-2xs cursor-pointer focus:border-neutral-900 focus:outline-none">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {sortItems.map((item) => (
                        <SelectItem onChange={()=>handleSort(e)} key={item.value} value={item.value}>
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