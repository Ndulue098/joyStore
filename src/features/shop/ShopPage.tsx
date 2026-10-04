import { Suspense } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductGrid from "./components/ProductGrid";
import SearchFilter from "./components/SearchFilter";
import ShopHero from "./components/ShopHero";
import { ShopSkeleton } from "./components/ShopSkeleton";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import ShopLayout from "./components/ShopLayout";
interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-screen">
      {/* Navigation Breadcrumbs */}
      <CustomBreadcrumbs items={[{ label: "Shop", href: "/shop" }]} />

      {/* Hero Header */}
      <div className="mt-4">
        <ShopHero />
      </div>

      {/* Search Bar & Mobile Filter Trigger Bar */}
      <div className="mt-6">
        <SearchFilter />
      </div>

      {/* Main Grid Content Area */}
      <Suspense fallback={<ShopSkeleton />}>
        <ShopLayout searchParams={searchParams} />
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-6 sm:mt-8">
          
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

            <ProductFilter />
          </aside>

          <main className="lg:col-span-9 relative z-10 min-w-0">
            <ProductGrid searchParams={searchParams} />
          </main>

        </div> */}
      </Suspense>
    </div>
  );
}