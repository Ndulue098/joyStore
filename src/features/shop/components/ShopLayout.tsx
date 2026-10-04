import Link from "next/link"
import { RotateCcw, ChevronRight, SlidersHorizontal, X } from "lucide-react"
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import MobileFilterSheet from "./MobileFilterSheet";

export default function ShopLayout({
  
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {/* Mobile Trigger Component (Rendered outside grid to avoid occupying CSS Grid columns) */}
      <MobileFilterSheet>
        <ProductFilter />
      </MobileFilterSheet>

      {/* Main Grid Layout (Strictly 2 children on desktop: aside [3 cols] + main [9 cols]) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-4 sm:mt-8 relative">
        
        {/* Desktop Sidebar (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-2xs sticky top-24 z-10">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800 mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Filter Catalogue
            </h3>
            
            <Link
              href="/shop"
              className="text-xs font-semibold text-neutral-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </Link>
          </div>

          {/* Subcategories & Filters Accordion */}
          <ProductFilter />
        </aside>

        {/* Product Grid Listing Area (9 Cols on Desktop, Full Width on Mobile) */}
        <main className="lg:col-span-9 relative z-10 min-w-0">
          <ProductGrid searchParams={searchParams} />
        </main>

      </div>
    </>
  )
}