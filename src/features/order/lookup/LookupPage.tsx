import { Search, Hash, PackageCheck, ArrowRight } from "lucide-react"

export default function LookupPage({}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold tracking-wide uppercase border border-amber-500/20">
          <PackageCheck className="w-3.5 h-3.5" />
          Order Tracking
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Your Order Quotation
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Retrieve your electrical quotation summary to track status, review line items, or finalize WhatsApp negotiation.
        </p>
      </div>

      {/* Main Search Card */}
      <div className="relative bg-white rounded-md p-6 sm:p-8  border border-slate-400 backdrop-blur-sm">
        {/* Glow accent */}

        <form className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="orderReference" 
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1"
            >
              Order Reference Code <span className="text-amber-500">*</span>
            </label>
            
            <div className="relative flex items-center group">
              <div className="absolute left-4 text-slate-400 group-focus-within:text-amber-500 transition-colors">
                <Hash className="w-5 h-5" />
              </div>

              <input
                id="orderReference"
                type="text"
                placeholder="e.g. BL-X7K29P"
                className="w-full pl-12 pr-4 py-4 text-slate-900 bg-slate-50/80 border border-slate-200 rounded-md text-base font-medium placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-semibold text-base rounded-md shadow-lg shadow-slate-900/10 hover:shadow-amber-500/25 transition-all duration-300 ease-out active:scale-[0.99]"
          >
            <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>View Order Quotation</span>
            <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </button>
        </form>

        {/* Subtle Footer Note */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Enter the reference code generated when you placed your order
        </div>
      </div>
    </div>
  );
}