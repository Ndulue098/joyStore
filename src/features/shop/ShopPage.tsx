import { Suspense } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductGrid from "./components/ProductGrid";
import SearchFilter from "./components/SearchFilter";
import ShopHero from "./components/ShopHero";
import { ShopSkeleton } from "./components/ShopSkeleton";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
}

export default function ShopPage({searchParams}: ShopPageProps) {
  return (
    <div>
      <CustomBreadcrumbs
              items={[
                { label: "Shop", href: "/shop" },
              ]}
            />
        <ShopHero/>
        <SearchFilter/>


      <Suspense fallback={<ShopSkeleton/>}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">

          {/* Desktop Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 rounded-md border border-neutral-200 bg-white p-5 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 mb-1.5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Filter Catalogue
              </h3>
              <button
                type="button"
                className="text-xs font-semibold text-neutral-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <Link href={"/shop"}>Reset</Link>
              </button>
            </div>
            <ProductFilter/>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 ">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              {/* <span>
                Showing <strong className="text-neutral-900 font-semibold">{filteredProducts.length}</strong> electrical product(s)
              </span> */}
              {/* {activeFilterCount > 0 && (
                <button 
                  type="button"
                  onClick={handleResetFilters}
                  className="text-amber-700 hover:text-amber-800 font-medium underline cursor-pointer"
                >
                  Clear all active filters
                </button>
              )} */}
            </div>
              <ProductGrid searchParams={searchParams}/>
            </main>
        </div>
      </Suspense>    
    </div>
  );
} 