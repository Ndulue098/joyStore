import React from 'react';
import { Search, ShoppingCart, MessageSquare, Store, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Browse',
    description: 'Explore verified electrical products, certified pure copper cables, and lighting categories.',
    icon: <Search className="h-4 w-4 " />,
    badge: 'Storefront Catalogue',
  },
  {
    number: '02',
    title: 'Select',
    description: 'Add everything you need to your order with quantities. Review the estimated total upfront.',
    icon: <ShoppingCart className="h-4 w-4 " />,
    badge: 'Order Builder',
  },
  {
    number: '03',
    title: 'Negotiate',
    description: 'Review your estimated total and negotiate directly with us on WhatsApp for bulk discounts.',
    icon: <MessageSquare className="h-4 w-4 " />,
    badge: 'WhatsApp Chat',
  },
  {
    number: '04',
    title: 'Pick Up',
    description: 'Once your order is confirmed with agreed pricing, pick it up safely at our physical store.',
    icon: <Store className="h-4 w-4 " />,
    badge: 'In-Store Handover',
  },
];

export function HowItWorks() {
  return (
   <section
      id="how-it-works"
      className="relative bg-neutral-100 dark:bg-neutral-900/50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-neutral-800 dark:text-neutral-200">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
              How Ordering Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-medium leading-relaxed">
              Build your order online, then talk to us directly to finalize the price. No online card payments required.
            </p>
          </div>

          {/* 4 Steps Grid with Visual Process Line */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-80 mx-auto sm:max-w-full">
            {STEPS.map((step, index) => (
              <div
                key={step.number || index}
                className="relative z-10 flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs hover:border-amber-400 dark:hover:border-amber-500/80 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-extrabold text-amber-600 dark:text-amber-500 font-mono tracking-wider">
                      {step.number}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-500/90 block mb-1">
                      {step.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer Indicator */}
                <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Step {index + 1} Workflow</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-10 sm:mt-12 pt-8 px-7 md:px-0  border-t border-neutral-200/80 dark:border-neutral-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              Have a custom list from your electrician or site engineer?
            </p>
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <span>Start Building Your Order</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
