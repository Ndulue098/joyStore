import { getCategoriesSubcategoriesAndProducts } from "../../admin/categories/data/getComponent";
import FilterByCategory from "./FilterByCategory";
import Link from "next/link";


export default async function ProductFilter({}) {
// comming formt the admin function
  const data=await getCategoriesSubcategoriesAndProducts()
  const dataList=data || []
  

  console.log("ca-te-go-ries",data); 

  return ( 
   <div className={`space-y-6 `}>
      {/* Header with Reset */}
      <div className="space-y-3">
        
        <div className="max-h-56 overflow-y-auto pr-1">
          <Link href={"/shop"} className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer`}>
            <span>All Categories</span>
          </Link>
          <div className="space-y-1 w-full">
            {dataList?.map((cat) => <FilterByCategory key={cat.id} cat={cat} />)}
          </div>
        </div>
      </div>

      {/* Price Range */}
      {/* <div className="space-y-3 pt-2 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            Max Price
          </label>
          <span className="text-xs font-bold text-neutral-900 font-mono">
            #250,000
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={150000}
          step={5000}
          className="w-full accent-amber-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
          <span>₦2,000</span>
          <span>₦75,000</span>
          <span>₦150k+</span>
        </div>
      </div> */}


      
    </div>
  );
}