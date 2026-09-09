import { FileSearch, ArrowRight, Search, CheckCircle2, AlertCircle } from 'lucide-react';

interface TrackOrderProps {
  
}

export default function TrackOrder({}: TrackOrderProps) {
  return (
    <section className=" px-4 sm:px-6 lg:px-8 py-8 sm:py-12" aria-labelledby="order-lookup-heading bg-red-100">
      <div className="relative overflow-hidden rounded-md bg-neutral-100/90  p-8 sm:p-10 max-w-4xl mx-auto ">

        {/* Top Right Gentle Warm Sunburst */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

{/* Edge Dark Vignette Overlay */}
<div className="absolute inset-0 bg-neutral-950/20 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Left Text */}
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
              <FileSearch className="h-4 w-4 text-amber-600" />
              <span>Track Existing Submission</span>
            </div>
            <h2 id="order-lookup-heading" className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Already Have an Order?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
              Enter your order reference code to view your order summary, agreed price updates, and store pickup readiness.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="e.g. BL-X7K29P"
                    className="w-full pl-10 pr-4 py-2.5 rounded-md border border-neutral-300 bg-white text-xs sm:text-sm font-mono uppercase font-semibold text-neutral-900 placeholder:normal-case placeholder:font-sans placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs py-2 rounded-md px-5 shrink-0"
                >
                  Find My Order
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}