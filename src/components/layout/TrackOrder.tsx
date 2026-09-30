"use client";

import { getOrderById } from "@/src/features/order/data/getOrderByid";
import useTrackOrder from "@/src/features/order/lookup/hooks/useTrackOrder";
import { FileSearch, ArrowRight, Search, AlertCircle, Loader2 } from "lucide-react";


export default function TrackOrder({}) {
  const { error, loading, handleSubmitForm, setOrderCode, orderCode, setError } =
    useTrackOrder(getOrderById);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-md bg-neutral-100 p-6 sm:p-10 max-w-4xl mx-auto">
        {/* Soft Background Accent Glow */}
        <div className="absolute -top-24 -left-6 w-20 h-20 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 lg:gap-12">
          
          {/* Left Side: Header & Text */}
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-amber-50 border border-amber-200/60 text-[11px] font-bold uppercase tracking-wider text-amber-800">
              <FileSearch className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>Track Existing Submission</span>
            </div>
            
            <h2
              id="order-lookup-heading"
              className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight"
            >
              Already Have an Order?
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto md:mx-0">
              Enter your order reference code to view your order summary, agreed price updates, and store pickup readiness.
            </p>
          </div>

          {/* Right Side: Form & Inputs */}
          <div className="w-full md:w-auto flex-1 max-w-md space-y-3">
            <form onSubmit={handleSubmitForm}>
              <div className="flex flex-col sm:flex-row gap-2.5">
                
                {/* Input Field */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. BL-X7K29P"
                    value={orderCode}
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-neutral-300 bg-neutral-50/50 text-xs sm:text-sm font-mono uppercase font-semibold text-neutral-900 placeholder:normal-case placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition-all"
                    onChange={(e) => {
                      setOrderCode(e.target.value);
                      if (error) setError(false);
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !orderCode.trim()}
                  className="py-3 px-5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 shrink-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <span>View Order</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.25]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error Message Alert */}
            {error && (
              <div className="p-3 rounded-md bg-rose-50 border border-rose-200/80 flex items-center gap-2.5 text-xs text-rose-800 font-medium animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Order not found. Please double-check your code.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}