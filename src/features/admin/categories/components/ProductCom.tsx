import { Package, PencilLine, Plus, Trash } from "lucide-react";
import ProductForm from "./ProductForm";
import { ProductType } from "@/src/features/type";
import ProductTableRow from "./ProductTableRow";
import { CategoryType, ProductsType, Subcategories } from "@/src/types/types";

interface ProductComProps {
 products:ProductsType[] ;
 name:string;
  id: number
  categoryList:Subcategories[]
}

export default function ProductCom({products,name,id,categoryList}: ProductComProps) {
  return (
    <div className="bg-neutral-50/60 border-t border-t-neutral-400   border-neutral-200 p-2 sm:p-5 space-y-3.5">
      
      {/* Sub-header Bar */} 
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Products under
          </span>
          <span className="text-xs font-extrabold text-neutral-900 bg-white border border-neutral-200 rounded-sm px-2 py-0.5 shadow-2xs">
            {name}
          </span>
        </div>

        <ProductForm id={id} name={name} categoryList={categoryList}> 
            <span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500/20 text-amber-700 hover:text-amber-800 hover:bg-amber-100/60 sm:px-2.5 sm:py-1.5 px-1.5 py-1  rounded-md transition-colors cursor-pointer"
                >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Product</span>
              </button>
            </span>
          </ProductForm>

      </div>

      {/* Nested Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white ">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-100/70 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <th className="py-2.5 px-3">Product Name</th>
              <th className="py-2.5 px-3">Brand</th>
              <th className="py-2.5 px-3 text-right">Price (₦)</th>
              <th className="py-2.5 px-3 text-center">Stock</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
 
          <tbody className="divide-y divide-neutral-100">
            {products.map((product)=><ProductTableRow productId={+product.id} categoryList={categoryList} id={id} name={name} product={product} key={product.id}/>)}

            
          </tbody>
        </table>
      </div>

    </div>
  );
}