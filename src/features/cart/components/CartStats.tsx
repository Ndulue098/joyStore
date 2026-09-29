"use client"
import { useCartContext } from "../../context/CartContext";
 

export default function CartStats({}) {
const { totalPrice, cartItemsLength, totalCategories } = useCartContext();

  if (!totalCategories) return null;

  return (
    <div className="space-y-3.5 text-sm">
      {/* Total Items Row */}
      <div className="flex items-center justify-between text-neutral-600">
        <span className="text-xs font-medium">Total Items Selected</span>
        <span className="font-semibold font-mono text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md text-xs">
          {cartItemsLength} {cartItemsLength === 1 ? "unit" : "units"}
        </span>
      </div>

      {/* Categories Row */}
      <div className="flex items-center justify-between text-neutral-600">
        <span className="text-xs font-medium">Distinct Products</span>
        <span className="font-semibold font-mono text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md text-xs">
          {totalCategories} {totalCategories === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Estimated Total Divider & Row */}
      <div className="pt-3.5 border-t border-neutral-200/80">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
              Estimated Total
            </span>
            <span className="text-[11px] text-neutral-400 block font-normal">
              Excl. taxes & shipping
            </span>
          </div>

          <span className="text-2xl font-extrabold font-mono text-neutral-900 tracking-tight">
            ₦{Number(totalPrice).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}