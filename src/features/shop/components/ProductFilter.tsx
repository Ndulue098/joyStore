import { getCategoriesSubcategoriesAndProducts } from "../../admin/categories/data/getComponent";
import FilterByCategory from "./FilterByCategory";
import Link from "next/link";


export default async function ProductFilter({}) {
// comming formt the admin function
  const data=await getCategoriesSubcategoriesAndProducts()
  const dataList=data || []
  

  console.log("ca-te-go-ries",data); 

  return ( 
   <div className="flex flex-col h-full space-y-3">
  {/* Filter Container filling remaining height */}
  <div className="flex-1 h-full overflow-y-auto pr-1 flex flex-col min-h-0">
    <Link
      href="/shop"
      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer shrink-0"
    >
      <span>All Categories</span>
    </Link>

    <div className="space-y-1 w-full">
      {dataList?.map((cat) => (
        <FilterByCategory key={cat.id} cat={cat} />
      ))}
    </div>
  </div>
</div>
  );
}