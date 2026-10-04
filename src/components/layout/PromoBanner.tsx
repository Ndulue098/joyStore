import {ArrowRight, ShieldCheck, Zap} from 'lucide-react';


export default function PromoBanner({}) {
  return (
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative rounded-md text-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800 overflow-hidden shadow-xs">
        
        {/* --- Corner Accents --- */}
        {/* Top-Right Corner Accent */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-neutral-700 rounded-tr-md pointer-events-none z-20" />
     
        {/* Bottom-Left Corner Accent */}
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-neutral-700 rounded-bl-md pointer-events-none z-20" />
        {/* ---------------------- */}

        {/* Ambient Glows */}
        <div className="absolute -top-12 -left-12 w-80 sm:w-96 h-80 sm:h-96 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-14 gap-8 lg:gap-12">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 ">

            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-800 leading-tight">
              Upgrade Your Space With <span className="text-transparent [-webkit-text-stroke:1px_#f59e0b]">Better Lighting</span>
            </h2>

            <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed font-normal ">
              Explore modern crystal chandeliers, energy-saving LED ceiling panels, architectural wall sconces, and decorative pendant fixtures designed for high-end residential and commercial developments.
            </p>

            {/* Feature Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <div className="h-7 w-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span>Certified Genuine Brands</span>
              </div>
              
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <div className="h-7 w-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <span>Direct WhatsApp Negotiation</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
              {/* Primary CTA */}
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
                <span>Explore Lighting</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Secondary CTA */}
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 cursor-pointer flex items-center justify-center">
                Browse All Supplies
              </button>
            </div>
          </div>

          {/* Right Product Spotlight Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-4/3 sm:aspect-square rounded-xl overflow-hidden group border border-neutral-200/80 dark:border-neutral-800 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
                alt="Contemporary luxury pendant chandelier"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/10" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}