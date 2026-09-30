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
   <section id="how-it-works" className="relative bg-neutral-900 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" /> */}
    <div className='max-w-7xl mx-auto '>

{/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" /> */}

{/* Edge Dark Vignette Overlay */}
<div className="absolute inset-0 bg-neutral-950/20 pointer-events-none" />

      <div className="  text-white p-6 md:p-8 relative overflow-hidden">
        {/* Subtle Ambient Backing */}

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            How Ordering Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
            Build your order online, then talk to us directly to finalize the price. No online card payments required.
          </p>
        </div>

        {/* 4 Steps Horizontal (Desktop) & Cards (Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {STEPS.map((step, index) => (
              <div
              key={step.number}
              className={` relative flex flex-col justify-between rounded-md  bg-neutral-800/80 border border-neutral-800 p-6 shadow-md hover:border-amber-400/50 transition-all duration-200 group`}
              >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-4 ">
                  <span className="text-sm font-semibold text-amber-500/90 group-hover:text-amber-400 transition-colors">
                    {step.number}
                  </span>
                  <div className="h-8 w-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <div className="mb-2 ">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    {step.badge}
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-700 flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Step {index+1} Complete</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 pt-8 border-t border-neutral-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs sm:text-sm text-neutral-300">
            Have a custom list from your electrician or site engineer?
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all"
            >
            <span>Start Building Your Order</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>

    </section>
  );
}
