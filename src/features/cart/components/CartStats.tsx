"use client"
import { useCartContext } from "../../context/CartContext";
 
interface CartStatsProps {
  
}

export default function CartStats({}: CartStatsProps) {

      const {totalPrice,cartItemsLength,totalCategories}=useCartContext()

      if(!totalCategories)return null

  return (
    <div className="space-y-3 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Total Items Selected:</span>
          <span className="font-semibold text-neutral-900">{cartItemsLength} units</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Distinct Products:</span>
          <span className="font-semibold text-neutral-900">{totalCategories} categories</span>
        </div>

        <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between">

        <div className="flex justify-between items-center w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                Estimated Total:
            </span>
            <span className="font-semibold text-neutral-900">{totalPrice}</span>
        </div>
        {/* <PriceDisplay amount={estimatedTotal} size="lg" isEstimated /> */}
        </div>
    </div>
  );
}