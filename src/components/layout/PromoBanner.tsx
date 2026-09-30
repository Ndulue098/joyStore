import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

interface PromoBannerProps {
  
}

export default function PromoBanner({}: PromoBannerProps) {
  return (
    <section className="max-w-7xl mx-auto p-6">
  <div className="relative rounded-md text-neutral-800 overflow-hidden">
    
    {/* --- Corner Accents --- */}
    {/* Top-Left Corner Accent */}
    <div className="absolute top-0 right-0  w-16 h-16 border-t border-r border-neutral-500 rounded-tr-md pointer-events-none z-20" />
 
    {/* Bottom-Right Corner Accent */}
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-neutral-500 rounded-bl-md pointer-events-none z-20" />
    {/* ---------------------- */}

    {/* Subtle Ambient Background */}
    {/* Top Left Soft Yellow Highlight */}
    <div className="absolute -top-12 -left-12 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

    {/* Bottom Right Warm Amber Glow */}
    <div className="absolute -bottom-16 -right-16 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-8 sm:p-12 lg:p-14 gap-8 lg:gap-12">
      {/* Left Text Block */}
      <div className="lg:col-span-6 space-y-5">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-800 leading-tight">
          Upgrade Your Space With <span className="text-transparent [-webkit-text-stroke:1px_#f59e0b]">Better Lighting</span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 max-w-xl leading-relaxed font-normal">
          Explore modern crystal chandeliers, energy-saving LED ceiling panels, architectural wall sconces, and decorative pendant fixtures designed for high-end residential and commercial developments.
        </p>

        {/* Feature Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 pt-2">
          <div className="flex items-center gap-2.5 text-xs text-neutral-700">
            <div className="h-6 w-6 rounded-sm flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span>Certified Genuine Brands (Philips, Havells)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-neutral-700">
            <div className="h-6 w-6 rounded-sm flex items-center justify-center shrink-0">
              <Zap className="h-4 w-4" />
            </div>
            <span>Direct WhatsApp Negotiation on Bulk Quantities</span>
          </div>
        </div>

        <div className="pt-3 flex flex-wrap items-center gap-4">
          {/* Primary CTA */}
          <button className="px-6 py-3 rounded-md bg-amber-500 text-neutral-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2">
            <span>Explore Lighting</span>
          </button>

          {/* Secondary CTA */}
          <button className="px-6 py-3 rounded-md border transition-all duration-500 border-neutral-700/80 hover:bg-neutral-900 hover:text-gray-200 font-semibold text-sm sm:text-base backdrop-blur-sm shadow-xs cursor-pointer flex items-center justify-center">
            Browse All Supplies
          </button>
        </div>
      </div>

      {/* Right Product Spotlight Image */}
      <div className="lg:col-span-6 relative flex items-center justify-end">
        <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 sm:aspect-square rounded-md overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
            alt="Contemporary luxury pendant chandelier"
            className="h-full w-full object-cover object-center aspect-12/10 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20" />
        </div>
      </div>
    </div>
  </div>
</section>
  );
}