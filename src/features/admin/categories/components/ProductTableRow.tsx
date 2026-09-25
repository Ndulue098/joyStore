import { CategoryType, ProductType } from "@/src/features/type";
import { Package, PencilLine, Trash } from "lucide-react";
import ProductForm from "./ProductForm";
import ConfirmDel from "./ConfirmDel";
import { deleteProductById } from "../action";

interface ProductTableRowProps {
 product:ProductType ;
  id:number;
  name:string
  categoryList:CategoryType[]
  productId:number
}

export default function ProductTableRow({product,id,name,categoryList,productId}: ProductTableRowProps) {
  return (
    <tr className="hover:bg-neutral-50/80 transition-colors">
              {/* Product Info & Thumbnail */}
              <td className="py-3 px-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-md border border-neutral-200 bg-neutral-100 overflow-hidden flex items-center justify-center text-neutral-400">
                    <Package className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-neutral-900 leading-snug">
                    {product.name}
                  </span>
                </div>
              </td>

              {/* Brand */}
              <td className="py-3 px-3 font-medium text-neutral-600">
                {product.brand}
              </td>

              {/* Price */}
              <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900">
                ₦{product.price}
              </td>

              {/* Stock */}
              <td className="py-3 px-3 text-center font-mono text-neutral-600">
                {product.stock_quantity} units
              </td>

              {/* Status Badge */}
              <td className="py-3 px-3 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {product.stock_status}
                </span>
              </td>

              {/* Actions */}
              <td className="py-3 px-3 text-right"> 
                <div className="inline-flex items-center gap-1">
                  {/* edit */}
                  <ProductForm id={id} name={name} product={product} categoryList={categoryList} >
                    <span>
                      <button
                        type="button"
                        className="p-1.5 rounded-md text-neutral-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                        title="Edit product"
                        >
                        <PencilLine className="h-4 w-4" />
                      </button>
                    </span>
                  </ProductForm>

                  <ConfirmDel onDelete={()=>deleteProductById(productId)} name={product.name} tablename="product">
                    <span>
                      <button
                        type="button"
                        className="p-1.5 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete product"
                        >
                        <Trash className="h-4 w-4" />
                      </button>
                    </span>
                  </ConfirmDel>
                </div>
              </td>
            </tr>
  );
}