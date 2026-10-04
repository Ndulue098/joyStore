"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryType } from "@/src/types/types";
import { useCartContext } from "../../context/CartContext";

// interface ParentCategoryType extends CategoryType {
//   subcategories?: (CategoryType & { products?: any[] })[];
//   products?: any[];
// }

interface FilterByCategoryProps {
  cat: CategoryType;
} 

export default function FilterByCategory({ cat }: FilterByCategoryProps) {
  const {setOpen}=useCartContext()

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Filter subcategories that actually contain products
  const validSubcategories =
    cat?.subcategories?.filter(
      (sub) => sub.products && sub.products.length > 0
    ) || [];

  const hasSubProducts = validSubcategories.length > 0;
  // const hasDirectProducts = Boolean(cat.products && cat.products.length > 0);

  // Show this category if either the main category OR its subcategories have products
  const shouldDisplay = hasSubProducts;

  const [isOpen, setIsOpen] = useState(false);
 
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    if(params.get("page")){
      params.delete("page")
    }
    params.set("category", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

  }

  if (!shouldDisplay) return null;

  const currentCategoryParam = searchParams.get("category");
  const isParentSelected = currentCategoryParam === cat.slug;


 

  return (
    <div className="group">
      {/* Main Category Header */}
      <button
        type="button"
        onClick={() => {
          if (hasSubProducts) {
            setIsOpen((prev) => !prev);
          } else {
            handleFilter(cat.slug);
          }
        }}
        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          isParentSelected
            ? "bg-amber-50 text-amber-800 font-bold"
            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {hasSubProducts ? (
            <ChevronDown
              className={`${
                isOpen ? "rotate-180" : ""
              } w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 shrink-0 transition-transform duration-200`}
            />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}
          <span className="truncate">{cat.name}</span>
        </div>

        {/* Total Count Badge */}
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-neutral-200/60 bg-neutral-100 text-neutral-500 group-hover:bg-white shrink-0">
          {(cat.products?.length || 0) +
            validSubcategories.reduce(
              (acc, sub) => acc + (sub.products?.length || 0),
              0
            )}
        </span>
      </button>

      {/* Subcategories Container */}
      {isOpen && hasSubProducts && (
        <div className="ml-5 pl-2.5 my-1 border-l border-neutral-200/80 space-y-1">
          {validSubcategories.map((subProduct) => {
            const isSubSelected = currentCategoryParam === subProduct.slug;
            return (
              <button
                key={subProduct.id}
                onClick={() =>{ handleFilter(subProduct.slug)
                   setOpen(false)
                  }}
                type="button"
                className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors truncate block cursor-pointer ${
                  isSubSelected
                    ? "text-amber-800 font-bold bg-amber-50"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80"
                }`}
              >
                {subProduct.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}