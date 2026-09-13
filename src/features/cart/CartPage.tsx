import { ArrowLeft, ArrowRight, MessageSquare, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";

interface CartPageProps {
  
}

export default function CartPage({}: CartPageProps) {
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
        <div className="lg:col-span-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">
            <span>Product</span>
            <span>Quantity / Subtotal</span>
          </div>

          <div className="divide-y divide-neutral-100">
            {/* your data goes here-----------> */}
            {/* {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))} */}
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
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Order Quotation Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Total Items Selected:</span>
                <span className="font-semibold text-neutral-900">{"X"} units</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Distinct Products:</span>
                <span className="font-semibold text-neutral-900">{"X"} categories</span>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Estimated Total:
                  </span>
                  <span className="text-xs text-amber-700 font-medium">
                    * Subject to final WhatsApp negotiation
                  </span>
                </div>
                {/* <PriceDisplay amount={estimatedTotal} size="lg" isEstimated /> */}
              </div>
            </div>

            {/* Negotiation Notice */}
            <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>How pricing works:</strong> This total is our listed catalogue estimate. On the next step, you'll generate your official order code to negotiate discounts directly with our sales rep!
                </p>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold"
              >
                Proceed to Order Review
              </button>

              <button
                className="w-full"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 text-xs text-neutral-500 rounded-xl bg-neutral-100/70 border border-neutral-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>No upfront payment required. Confirm price before pickup.</span>
          </div>
        </div>
      </div>
    </div>
  );
}