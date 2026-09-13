import ProductFilter from "./components/ProductFilter";
import ProductGrid from "./components/ProductGrid";
import SearchFilter from "./components/SearchFilter";
import ShopHero from "./components/ShopHero";

interface ShopPageProps {
  
}

export default function ShopPage({}: ShopPageProps) {
  return (
    <div>
        <ShopHero/>
        <SearchFilter/>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 rounded-md border border-neutral-200 bg-white p-5 shadow-xs sticky top-24">
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

          <ProductGrid/>
        </main>
      </div>
    </div>
  );
}