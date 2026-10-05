"use client";

import { useState } from "react";
import { Package, PencilLine, Trash, ChevronDown, Plus } from "lucide-react";
import Button from "./Button";
import ProductForm from "./ProductForm";
import CateForm from "./CateForm";
import ProductCom from "./ProductCom";
// import { CategoryType } from "@/src/features/type";
import ConfirmDel from "./ConfirmDel";
import { toast } from "@/components/ui/toast";
import { deleteCategoryById } from "../action";
import { CategoryType, Subcategories } from "@/src/types/types";


// interface ParentCategoryType extends CategoryType {
//   subcategories?: CategoryType[];
// }

interface CategoryCardProps {
  categoryList: Subcategories[]
  category: Subcategories
  categoryParentList:CategoryType[]

}

  // console.log("category,  , ", category);
  // console.log("categoryList,  ,",categoryList);
  // console.log("categoryParentList,  ,",categoryParentList);

export default function CategoryCard({ category,categoryList,categoryParentList}: CategoryCardProps) {

  

  const [open, setOpen] = useState(false);
  const hasProducts = Boolean(category?.products?.length);


  function handleDeleteClick(){
    toast.add({type:"error",priority:"high", description: `Cannot delete "${category.name}" because it contains products. Remove or reassign the products first.`});
  }

  // 

  return (
    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xs transition-all">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2 sm:p-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
    
    {/* LEFT: Category Details */}
    <div className="flex items-start gap-3 min-w-0 flex-1">
      {/* Thumbnail Container */}
      <div className="h-11 w-11 shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center text-neutral-400 dark:text-neutral-500">
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Package className="h-5 w-5 stroke-[1.5]" />
        )}
      </div>

      {/* Text Details */}
      <div className="space-y-1 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 tracking-tight">
            {category.name}
          </h3>

          {/* Category Slug Badge */}
          <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 rounded-md px-2 py-0.5">
            /{category.slug}
          </span>

          {/* Active Status Badge */}
          {category.is_active ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/80 rounded-full px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Inactive
            </span>
          )}
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed">
          {category.description || "No description provided."}
        </p>
      </div>
    </div>

    {/* RIGHT: Actions & Meta Indicators */}
    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
      
      <div className="flex items-center gap-2">
        {/* Expand / Collapse Toggle Pill */}
        {hasProducts && (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            title="Toggle products list"
          >
            <Package className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
              {category.products.length}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        )}

        {/* Add Product Trigger (Icon on mobile, compact pill on sm+) */}
        <ProductForm id={category.id} name={category.name}>
          <button className="!px-2.5 !py-1.5 bg-neutral-800 rounded-md text-white text-xs inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </ProductForm>
      </div>

      {/* Edit & Delete Action Group */}
      <div className="flex items-center  gap-0.5 border-l border-neutral-200 dark:border-neutral-800 sm:pl-2 shrink-0">
        <CateForm category={category} categoryList={categoryList} categoryParentList={categoryParentList}>
          <button
            type="button"
            className="sm:p-1.5 p-1 rounded-lg text-neutral-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 transition-colors cursor-pointer"
            title="Edit category"
          >
            <PencilLine className="h-4 w-4" />
          </button>
        </CateForm>

        {hasProducts ? (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete category"
          >
            <Trash className="h-4 w-4" />
          </button>
        ) : (
          <ConfirmDel onDelete={() => deleteCategoryById(category.id)} name={category.name} tablename="category">
            <button
              type="button"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors cursor-pointer"
              title="Delete category"
            >
              <Trash className="h-4 w-4" />
            </button>
          </ConfirmDel>
        )}
      </div>

    </div>
  </div>

  {/* Expanded Products Nested Table/List */}
  {open && <ProductCom categoryList={categoryList} id={category.id} products={category?.products} name={category.name} />}
</div>
  );
}