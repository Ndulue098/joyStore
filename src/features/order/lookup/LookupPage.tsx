"use client";

import { Search, Hash, PackageCheck, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getOrderById } from "../data/getOrderByid";
import { useState } from "react";
import useTrackOrder from "./hooks/useTrackOrder";



export default function LookupPage() {

  const {error,loading,handleSubmitForm,setOrderCode,orderCode,setError}=useTrackOrder(getOrderById)

  return (
    <div className="min-h-[calc(100dvh-5rem)] flex flex-col justify-center max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-amber-500/20 shadow-2xs">
          <PackageCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          Order Tracking
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Find Your Order Quotation
        </h1>
        
        <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          Retrieve your electrical quotation summary to track status, review line items, or finalize WhatsApp negotiation.
        </p>
      </div>

      {/* Main Search Card */}
      <div className="max-w-md sm:max-w-lg w-full mx-auto bg-white dark:bg-neutral-900 rounded-2xl p-3 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-5 sm:space-y-6">
        
        {/* Error Alert Box */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-3 text-xs text-rose-800 dark:text-rose-300 font-medium animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>Order not found. Please double-check your reference code and try again.</span>
          </div>
        )}

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmitForm}>
          <div className="space-y-1.5 sm:space-y-2">
            <label 
              htmlFor="orderReference" 
              className="block text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
            >
              Order Reference Code <span className="text-rose-500">*</span>
            </label>
            
            <div className="relative flex items-center group">
              <div className="absolute left-3.5 sm:left-4 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-100 transition-colors pointer-events-none">
                <Hash className="w-4 h-4 stroke-[2.25]" />
              </div>

              <input
                id="orderReference"
                type="text"
                value={orderCode}
                onChange={(e) => {
                  setOrderCode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="e.g. ORD-F5NRQ"
                className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-neutral-900 dark:text-neutral-100 bg-neutral-50/80 dark:bg-neutral-800/50 border border-neutral-300/80 dark:border-neutral-700 rounded-md text-sm font-semibold uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-neutral-400 transition-all focus:outline-none focus:bg-white dark:focus:bg-neutral-900 focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !orderCode.trim()}
            className="w-full py-3.5 px-6 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] text-white dark:text-neutral-900 font-semibold text-sm rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 stroke-[2.25]" />
                <span>View Order Quotation</span>
                <ArrowRight className="w-4 h-4 stroke-[2.25]" />
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="pt-3.5 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-medium text-center">
          {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" /> */}
          <span>Enter the reference code generated when you placed your order</span>
        </div>
      </div>

      {/* Security/Trust Note */}
      <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
        <span>No login required. Your code gives instant access to your quote.</span>
      </div>

    </div>
  );
}