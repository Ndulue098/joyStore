"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';

interface HeroSlide {
  id: string;
  component: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  tag: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-chandelier',
    component: 'Chandelier',
    title: 'Grand Uplight Chandeliers',
    subtitle: 'Signature Collection',
    description: 'Where sculpture meets illumination. Elevate your room with timeless chandeliers designed to cast a warm, breathtaking glow over your most cherished spaces.',
    price: '₦120,000',
    tag: 'Luxury Statement Pieces',
    ctaText: 'Shop Chandeliers',
    ctaHref: '/shop/chandeliers',
    image: '/image/img7.jpg',
  },
  {
    id: 'slide-switches',
    component: 'Switches & Sockets',
    title: 'Precision Wall Fittings',
    subtitle: 'Architectural Hardware',
    description: 'Perfection in the details. Frame your walls in minimalist luxury with precision-crafted switches and power fittings that feel as exquisite as they look.',
    price: '₦3,500',
    tag: 'Contractor Certified',
    ctaText: 'Explore Sockets',
    ctaHref: '/shop/switches-sockets',
    image: '/image/img2.jpg',
  },
  {
    id: 'slide-christmas',
    component: 'Christmas Light',
    title: 'Festive & Ambient Illumination',
    subtitle: 'Seasonal Decor',
    description: 'Weave magic through your spaces. Elevate your room with delicate string lights that cast a warm, festive glow and turn quiet evenings into celebrations.',
    price: '₦15,000',
    tag: 'Holiday Collection',
    ctaText: 'Shop Christmas Lights',
    ctaHref: '/shop/christmas-lights',
    image: '/image/img3.jpg',
  },
  {
    id: 'slide-dropdown',
    component: 'DropDown Light',
    title: 'Pendant & DropDown Luminaires',
    subtitle: 'Statement Lighting',
    description: 'Sleek black pendant lamps tailored for modern kitchen islands, dining spaces, and contemporary restaurant interiors.',
    price: '₦18,000',
    tag: 'Pendant Fixtures',
    ctaText: 'Shop DropDown Lights',
    ctaHref: '/shop/profile-light',
    image: '/image/img4.jpg',
  },
  {
    id: 'slide-wall-light',
    component: 'Wall Light',
    title: 'Atmospheric Wall Sconces',
    subtitle: 'Accent Illumination',
    description: 'Paint your walls with light. Let a subtle, lingering glow wash across your surfaces, bringing quiet drama and organic warmth to your interior narrative.',
    price: '₦12,500',
    tag: 'Designer Wall Lights',
    ctaText: 'Explore Wall Lights',
    ctaHref: '/shop/wall-lights',
    image: '/image/img5.jpg',
  },
  {
    id: 'slide-street-light',
    component: 'Street Light',
    title: 'Solar Perimeter Illumination',
    subtitle: 'Outdoor Architecture',
    description: 'Command the night outside. Crown your perimeters and open pathways with architectural solar illumination designed to cast a powerful, guiding presence under the open sky.',
    price: '₦45,000',
    tag: 'Industrial Grade',
    ctaText: 'Shop Street Lights',
    ctaHref: '/shop/street-light',
    image: '/image/img6.jpg',
  },
];


export default function HeroSection({
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section 
      className="relative w-full h-[calc(100dvh-5rem)] min-h-screen bg-white text-neutral-900 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Electrical fixtures collection"
    >
      {/* 2-Column Grid: Stacks vertically on mobile, side-by-side on lg+ */}
      <div className="relative w-full h-full grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
        
        {/* Column 1: Image occupying 100% of its slot */}
        <div className="relative w-full h-full mt-8 md:mt-0 overflow-hidden bg-neutral-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div 
                className="absolute inset-0 bg-black/25 pointer-events-none" 
                aria-hidden="true" 
              />
            </motion.div>
          </AnimatePresence>

          {/* Series Tag on top corner of image */}
          <div className="absolute md:mt-8 top-8 left-8 z-20 pointer-events-none">
            <span className="text-[11px] font-mono tracking-[0.22em] text-white bg-black/60 px-3 py-1.5 backdrop-blur-md rounded-sm border border-white/20 uppercase">
              0{currentIndex + 1} {"//"} {currentSlide.component}
            </span>
          </div>
        </div>

        {/* Column 2: Fully Responsive Text Column */}
        <div className="relative w-full h-full bg-[#FFFFFF] flex flex-col justify-between p-6 sm:p-10 lg:p-[5%] xl:p-[8%] border-l border-neutral-200">
          
          {/* Top Header of Right Column */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 lg:mt-8">
            <span className="text-xs font-medium tracking-[0.24em] uppercase text-neutral-400">
              {currentSlide.tag}
            </span>
            <span className="text-xs font-mono text-neutral-400 tabular-nums">
              0{currentIndex + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Middle Title Area */}
          <div className="flex-1 flex items-center justify-center w-full px-1 my-0 md:px-4 text-center md:my-4 ">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
                className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl tracking-tight text-neutral-950 leading-[1.1] text-balance"
              >
                {currentSlide.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Bottom Corner Content Area */}
          <div className="max-w-lg w-full mx-auto lg:mx-0 lg:ml-auto pt-4 lg:pt-6 border-t border-neutral-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}    
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-xs font-mono tracking-widest text-amber-700 uppercase">
                    {currentSlide.subtitle}
                  </span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-xs font-mono font-medium text-neutral-900 tabular-nums">
                    From {currentSlide.price}
                  </span>  
                </div>

                <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light leading-relaxed mb-4 sm:mb-6">
                  {currentSlide.description}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
                  <button
                    // onClick={() => onExploreProducts(currentSlide.component)}
                    className="py-2.5 sm:py-3 px-3 sm:px-4 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs tracking-[0.14em] uppercase transition-all duration-200 rounded-sm flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    // onClick={onOpenCategories}
                    className="py-2.5 sm:py-3 px-3 sm:px-4 border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 font-medium text-xs tracking-[0.12em] uppercase transition-all duration-200 rounded-sm flex items-center gap-2 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Browse Categories</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Bottom progress bar */}
      {/* <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-100 z-30">
        <motion.div
          key={currentIndex}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
          className="h-full bg-amber-600/80"
        />
      </div> */}
    </section>
  );
}