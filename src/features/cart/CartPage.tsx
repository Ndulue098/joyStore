"use client"
import { ArrowLeft, ArrowRight, MessageSquare, ShieldCheck, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import CartItemRow from "./components/CartItemRow";
import CartStats from "./components/CartStats";
import { useCartContext } from "../context/CartContext";


export default function CartPage({}) {

     const {cart}=useCartContext()    
  
      if (!cart.length){ 
        return <div className="h-full flex flex-1 min-h-[calc(100dvh-64px)] w-full items-center ">
              <div className="flex flex-col items-center justify-center p-4 rounded-md max-w-sm w-full bg-white border border-neutral-200 shadow-xs text-center mx-auto space-y-4">
          {/* Icon Badge */}
          <div className="h-14 w-14 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
            <ShoppingCart className="h-6 w-6 stroke-[1.75]" />
          </div>

          {/* Text Content */}
          <div className="space-y-1.5">
            <h2 className="font-bold text-lg text-neutral-900 tracking-tight">
              Your Order List is Empty
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[260px] mx-auto">
              You haven&apos;t selected any electrical supplies or appliances yet. Explore our store catalogue to add items to your quotation list.
            </p>
          </div>

          {/* Action Button */}
          <Link 
            href="/shop" 
            className="w-full inline-flex gap-2 items-center justify-center bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 px-4 rounded-sm transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 active:bg-amber-700"
          >
            <ArrowLeft className="w-4 h-4 "/>
            Browse Store Catalogue
          </Link>
        </div>      
        </div>
      }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Your Order List
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review your selected electrical appliances & supplies before generating your quotation
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-neutral-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Order</span>
        </button>
      </div>

      {/* 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 rounded-md border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">
            <span>Product</span>
            <span>Quantity / Subtotal</span>
          </div>

          <div className="divide-y divide-neutral-100">
            {/* your data goes here-----------> */}
            <CartItemRow/>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Link
              href="/shop"
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Continue Adding Items</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Order Quotation Summary
            </h3>

            <CartStats/>

            {/* Negotiation Notice */}
            <div className="rounded-md bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>How pricing works:</strong> This total is our listed catalogue estimate. On the next step, you'll generate your official order code to negotiate discounts directly with our sales rep!
                </p>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="space-y-3 pt-2">
              <Link href={"/cart/review"} >
              <button
                className="w-full bg-neutral-900 py-1.5 mb-2 px-2 hover:bg-neutral-800 text-white font-bold"
                >
                Proceed to Order Review
              </button>
              </Link>

              <button
                className="w-full bg-neutral-300 py-1.5 px-2 text-white font-bold"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 text-xs text-neutral-500 rounded-md bg-neutral-100/70 border border-neutral-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>No upfront payment required. Confirm price before pickup.</span>
          </div>
        </div>
      </div>
    </div>
  );
}