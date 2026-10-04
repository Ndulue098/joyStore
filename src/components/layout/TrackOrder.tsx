"use client";

import { getOrderById } from "@/src/features/order/data/getOrderByid";
import useTrackOrder from "@/src/features/order/lookup/hooks/useTrackOrder";
import { FileSearch, ArrowRight, Search, AlertCircle, Loader2 } from "lucide-react";


export default function TrackOrder({}) {
  const { error, loading, handleSubmitForm, setOrderCode, orderCode, setError } =useTrackOrder(getOrderById);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="relative z-10 overflow-hidden rounded-xl bg-neutral-100/90 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-10 max-w-4xl mx-auto shadow-xs
        justify-center flex
      ">
        {/* Soft Background Accent Glow */}
        <div className="absolute -top-20 -left-10 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 lg:gap-12">
          
          {/* Left Side: Header & Text */}
          <div className="space-y-2.5 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <FileSearch className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Track Existing Submission</span>
            </div>
            
            <h2
              id="order-lookup-heading"
              className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight"
            >
              Already Have an Order?
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
              Enter your order reference code to view your order summary, agreed price updates, and store pickup readiness.
            </p>
          </div>

          {/* Right Side: Form & Inputs */}
          <div className="w-full md:w-auto  flex-1 max-w-md space-y-3">
            <form onSubmit={handleSubmitForm}>
              <div className="flex flex-col sm:flex-row gap-2.5 ">
                
                {/* Input Field */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. BL-X7K29P"
                    value={orderCode}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-xs sm:text-sm font-mono uppercase font-bold text-neutral-900 dark:text-neutral-100 placeholder:normal-case placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-xs"
                    onChange={(e) => {
                      setOrderCode(e.target.value)
                      if (error) setError(false)
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !orderCode.trim()}
                  className="py-3 px-5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 font-bold text-xs sm:text-sm rounded-lg transition-all shadow-xs hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-center gap-2.5 text-xs text-rose-800 dark:text-rose-300 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Order not found. Please double-check your code.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}