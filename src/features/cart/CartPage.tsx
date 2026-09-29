"use client";

import Link from "next/link";
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useCartContext } from "../context/CartContext";
import CartItemRow from "./components/CartItemRow";
import CartStats from "./components/CartStats";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
   // Adjust path if needed

export default function CartPage() {
  const { cart, clearCart, updateQuantity, removeItemFromCart } = useCartContext();

  console.log("carrrrrrtt",cart);
  

  /* -------------------------------------------------------------------------- */
  /*                              EMPTY CART STATE                             */
  /* -------------------------------------------------------------------------- */
  if (!cart.length) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl max-w-md w-full bg-white border border-neutral-200/80 shadow-sm text-center space-y-5">
          {/* Icon Badge */}
          <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
            <ShoppingCart className="h-7 w-7 stroke-[1.75]" />
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h2 className="font-bold text-xl text-neutral-900 tracking-tight">
              Your Order List is Empty
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[280px] mx-auto">
              You haven&apos;t selected any electrical supplies or appliances yet. Explore our store catalogue to generate your quotation.
            </p>
          </div>

          {/* Action Button */}
          <Link
            href="/shop"
            className="w-full inline-flex gap-2 items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-3 px-5 rounded-xl transition-all shadow-xs active:scale-[0.99] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Store Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                            POPULATED CART STATE                            */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Your Order List
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Review your selected electrical appliances & supplies before generating your quotation
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-neutral-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent hover:border-rose-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Order</span>
        </button>
      </div>


      <CustomBreadcrumbs
          items={[
              { label: "Shop", href: "/shop" },
              {label:"Cart", href:"/order/lookup"}
          ]}
      />

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            <span>Product</span>
            <span>Quantity / Subtotal</span>
          </div>

          {/* Render Cart Item Rows */}
          <div className="divide-y divide-neutral-100">
            {cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                deleteItem={removeItemFromCart}
              />
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors py-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Continue Adding Items</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
            <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Order Quotation Summary
            </h3>

            {/* Price & Quantities Stats */}
            <CartStats />

            {/* Price Negotiation Callout */}
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MessageSquare className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold">How pricing works:</strong> This total is our listed catalogue estimate. On the next step, you&apos;ll generate your official order code to negotiate discounts directly with our sales rep!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Link href="/cart/review" className="block w-full">
                <button
                  type="button"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] transition-all text-white font-semibold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Proceed to Order Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/shop" className="block w-full">
                <button
                  type="button"
                  className="w-full bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.99] transition-all text-neutral-800 font-semibold text-xs py-3 px-4 rounded-xl border border-neutral-200/60 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center gap-2.5 p-3.5 text-xs text-neutral-600 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>No upfront payment required. Confirm price before pickup.</span>
          </div>
        </div>

      </div>
    </div>
  );
}