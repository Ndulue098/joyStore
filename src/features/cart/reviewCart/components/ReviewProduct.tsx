"use client"
import { useCartContext } from "@/src/features/context/CartContext";
import Link from "next/link";
import ReviewItem from "./ReviewItem";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface ReviewProductProps {
  isPending:boolean
}

export default function ReviewProduct({isPending}: ReviewProductProps) {
    const {cart,cartItemsLength,totalPrice}=useCartContext()    
    
  return (
    <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-3 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Selected Products ({cartItemsLength})
              </h3>
              <Link href="/cart" className="text-xs text-amber-700 font-semibold hover:underline">
                Edit Items
              </Link>
            </div>

            {/* List of items */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-neutral-100">
              {cart.map((item) => (
                <ReviewItem item={item}  key={item.id}/>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-neutral-700">Estimated Total:</span>
                {/* <PriceDisplay amount={estimatedTotal} size="lg" isEstimated /> */}
                <span className="text-xl font-bold tracking-tight">{totalPrice}</span>
              </div>
              <p className="text-[11px] text-neutral-500 italic">
                * Note: Final agreed price will be finalized with the seller during WhatsApp negotiation.
              </p>
            </div>

            {/* Submit Action */}
              <button
              type="submit"
              form="review-cart-form"
                className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-sm py-1.5 px-2 bg-neutral-800 text-gray-200 font-bold shadow-sm"
              >
                {isPending?"submitting...": <span className="flex items-center gap-2">
                  Generate Order
                  <ArrowRight className="h-4 w-4" />
                </span>}
              </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Secure order generation &bull; No online card required</span>
          </div>
        </div>
  );
}