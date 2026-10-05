"use client";

import { useState } from "react";
import {
  Folder,
  Layers,
  ChevronDown,
  PencilLine,
  Trash,
  Plus,
} from "lucide-react";
import CategoryCard from "./CategoryCard";
import CateForm from "./CateForm";
import ConfirmDel from "./ConfirmDel";
import { toast } from "@/components/ui/toast";
import { deleteCategoryById } from "../action";
import { CategoryType } from "@/src/features/type";

interface ParentCategoryType extends CategoryType {
  subcategories?: CategoryType[];
}

interface ParentCardProps {
  parent: ParentCategoryType;
  // categoryList: CategoryType[];
  categoriesParent:ParentCategoryType[]
}

export default function ParentCard({ parent,categoriesParent }: ParentCardProps) {
  const [open, setOpen] = useState(false);

  const subcategories = parent.subcategories || [];
  const categoryList=parent?.subcategories || []
  const totalSubcategories = subcategories.length;

  // Calculate total products across all nested subcategories + direct parent products
  const totalProducts =
    (parent.products?.length || 0) +
    subcategories.reduce(
      (acc, sub) => acc + (sub.products?.length || 0),
      0
    );

  const hasSubcategories = totalSubcategories > 0;

  

  function handleDeleteClick() {
    toast.add({
      type: "error",
      priority: "high",
      description: `Cannot delete parent category "${parent.name}" because it contains ${totalSubcategories} subcategories. Delete or move subcategories first.`,
    });
  }

  return (
    <div className="flex flex-col border border-neutral-200/80 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-xs transition-all">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 sm:p-4">
        {/* LEFT: Thumbnail, Titles & Badges */}
        <div className="flex flex-col md:flex-row items-start gap-3.5 min-w-0 flex-1">
          {/* Thumbnail / Folder Icon */}
          <div className="h-12 w-12 mx-auto  sm:h-14 sm:w-14 shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            {parent?.imageUrl ? (
              <img
                src={parent.imageUrl}
                alt={parent.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Folder className="h-6 w-6 stroke-[1.75]" />
            )}
          </div>

          {/* Text Details */}
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 rounded-md px-1.5 py-0.5">
                Parent Category
              </span>

              <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                {parent.name}
              </h3>

              <span className="font-mono text-[11px] text-neutral-500 bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 rounded-md px-2 py-0.5">
                /{parent.slug}
              </span>

              {/* Status Badge */}
              {parent.is_active ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2 py-0.5 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-full px-2 py-0.5 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  Inactive
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed">
              {parent.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* RIGHT: Badges & Action Toolbar */}
        <div className="flex items-center flex-col md:flex-row gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0">
          {/* Subcategory Count */}
          <div className=" flex gap-1.5 sm:gap-2.5 border-b border-neutral-500 pb-2 md:border-b-0">
            <div
              className="inline-flex items-center gap-1.5 px-2 py-1.5  sm:px-2.5 sm:py-1.5 flex-wrap p-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900 rounded-md"
              title="Subcategories count"
              >
              <Layers className="hidden sm:block h-3.5 w-3.5 text-indigo-500" />
              <span>
                {totalSubcategories}{" "}
                {totalSubcategories === 1 ? "Sub" : "Subs"}
              </span>
            </div>

            {/* Toggle Expand / Products Count */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-700 rounded-md transition-colors cursor-pointer"
              title="Toggle subcategories view"
              >
              <span>{totalProducts} Pro...</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                />
            </button>
          </div>

          {/* Actions: Edit & Delete */}
          <div className="flex items-center gap-0.5 md:border-l  ml-auto border-neutral-200 dark:border-neutral-800 pl-2 md:ml-1">
            <CateForm category={parent} categoryList={categoryList}>
              <button
                type="button"
                className="p-1.5 rounded-md text-neutral-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 transition-colors cursor-pointer"
                title="Edit category"
              >
                <PencilLine className="h-4 w-4" />
              </button>
            </CateForm>

            {hasSubcategories ? (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="p-1.5 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors cursor-pointer"
                title="Delete category"
              >
                <Trash className="h-4 w-4" />
              </button>
            ) : (
              <ConfirmDel
                onDelete={() => deleteCategoryById(parent.id)}
                name={parent.name}
                tablename="parent category"
              >
                <button
                  type="button"
                  className="p-1.5 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete category"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </ConfirmDel>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDABLE BODY: Subcategories Container */}
      {open && (
        <div className="p-4 sm:p-5 bg-neutral-50/70 dark:bg-neutral-950/50 space-y-3 border-t border-neutral-200/60 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-end sm:justify-between pb-1">
            <h4 className="text-[11px] font-extrabold text-center text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Subcategories under {parent.name}
            </h4>

            {/* Quick Add Subcategory Button */}
            <CateForm
              parentId={parent.id}
              parentName={parent.name}
              categoryParentList={categoriesParent}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 bg-indigo-500/30 rounded-md py-1 px-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Subcategory</span>
              </button>
            </CateForm>
          </div>

          {/* Subcategories List */}
          {subcategories.length > 0 ? (
            <div className="space-y-3 pl-1 sm:pl-4 sm:border-l-2 border-indigo-200 dark:border-indigo-900/60">
              {subcategories.map((subcategory) => (
                <CategoryCard
                  key={subcategory.id}
                  category={subcategory}
                  categoryList={categoryList}
                  categoryParentList={categoriesParent}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900/60">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                No subcategories found under this category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}