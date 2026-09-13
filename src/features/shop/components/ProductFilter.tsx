// import { categoriesData } from "@/app/data/categoriesData";
import { categoriesData } from "@/src/components/data/categoriesData";
import { RotateCcw, Sparkles } from "lucide-react";

interface ProductFilterProps {
  
}

export default function ProductFilter({}: ProductFilterProps) {
  return (
   <div className={`space-y-6 `}>
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
          Filter Catalogue
        </h3>
        <button
          type="button"
          className="text-xs font-semibold text-neutral-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
          Categories
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer 
            
            `}
          >
            <span>All Categories</span>
          </button>
          {categoriesData.map((cat) => {
            const isSelected = false; // Replace with actual selection logic
            return (
              <button
                key={cat.id}
                type="button"
                // onClick={() => onFilterChange({ categorySlug: isSelected ? '' : cat.slug })}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className={`text-[10px] ml-2 ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  {cat.productCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      {/* <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
          Brand
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => onFilterChange({ brand: '' })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
              filters.brand === ''
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>All Brands</span>
          </button>
          {BRANDS.map((brandName) => {
            const isSelected = filters.brand === brandName;
            return (
              <button
                key={brandName}
                type="button"
                onClick={() => onFilterChange({ brand: isSelected ? '' : brandName })}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>{brandName}</span>
                {isSelected && <Check className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
      </div> */}

      {/* Price Range */}
      <div className="space-y-3 pt-2 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            Max Price
          </label>
          <span className="text-xs font-bold text-neutral-900 font-mono">
            #250,000
            {/* {filters.maxPrice >= 150000 ? 'Any Price' : formatNaira(filters.maxPrice)} */}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={150000}
          step={5000}
        //   value={filters.maxPrice}
        //   onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-amber-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
          <span>₦2,000</span>
          <span>₦75,000</span>
          <span>₦150k+</span>
        </div>
      </div>


      {/* {isMobileDrawer && onCloseMobileDrawer && (
        <div className="pt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold cursor-pointer"
          >
            Apply Filters & View Products
          </button>
        </div>
      )} */}
    </div>
  );
}