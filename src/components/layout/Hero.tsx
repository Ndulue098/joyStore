"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface HeroSlide {
  id: string;
  categorySlug: string;
  eyebrow: string;
  headline: string;
  highlightText: string;
  supportingText: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  badge: string;
  badgeCategory: string;
  imageUrl: string;
  imageAlt: string;
  bgColor: string;
  accentColor: string;
  gradient: string;
  edgeColor?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-lighting',
    categorySlug: 'chandeliers',
    eyebrow: 'MODERN ARCHITECTURAL ILLUMINATION',
    headline: 'Light Up Your Space',
    highlightText: 'Beautifully',
    supportingText:
      'Discover chandeliers, ceiling lights, bulbs, and modern lighting solutions tailored for homes, offices, and luxury commercial interiors.',
    ctaText: 'Shop Lighting',
    ctaHref: '/shop/chandeliers',
    secondaryCtaText: 'How Ordering Works',
    secondaryCtaHref: '/#how-it-works',
    badge: 'Trending Collection',
    badgeCategory: 'Over 30+ Chandeliers & Downlights',
    imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern crystal chandelier and luxury ceiling lighting fixture',
    bgColor: 'from-amber-950/20 via-neutral-900 to-neutral-950',
    accentColor: 'text-amber-400',

    gradient: "bg-transparent",
    edgeColor: '#1A1614',
  },
  {
    id: 'slide-switches',
    categorySlug: 'switches-sockets',
    eyebrow: 'CERTIFIED WALL ACCESSORIES & FITTINGS',
    headline: 'The Details That Power',
    highlightText: 'Every Space',
    supportingText:
      'Find reliable switches, USB-enabled power sockets, and premium electrical accessories from certified brands for your next renovation.',
    ctaText: 'Explore Switches & Sockets',
    ctaHref: '/shop/switches-sockets',
    secondaryCtaText: 'Browse Catalogue',
    secondaryCtaHref: '/shop',
    badge: 'Contractor Grade',
    badgeCategory: 'Modular Wall Plates & USB Sockets',
    imageUrl: 'https://images.unsplash.com/photo-1636368208791-17b81ed832d2?q=80&w=1029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Sleek modern minimalist light switches and USB wall sockets',
    bgColor: 'from-blue-950/20 via-neutral-900 to-neutral-950',
    accentColor: 'text-amber-400',

    // gradient:"bg-gradient-to-t from-[#121316] via-[#202226] to-[#32353B]",
    gradient: "bg-transparent",
    edgeColor: '#242629',

  },
  {
    id: 'slide-fans',
    categorySlug: 'fans',
    eyebrow: 'HIGH PERFORMANCE RESIDENTIAL & COMMERCIAL COOLING',
    headline: 'Stay Cool.',
    highlightText: 'Stay Comfortable.',
    supportingText:
      'Explore quality ceiling fans, silent exhaust systems, and electrical cooling solutions built to handle Nigerian climate conditions.',
    ctaText: 'Shop Fans',
    ctaHref: '/shop/fans',
    secondaryCtaText: 'View All Products',
    secondaryCtaHref: '/shop',
    badge: 'Energy Efficient',
    badgeCategory: 'Silent DC Motors & Heavy Blade Span',
    // imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1200&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1675850520159-bafc0736b15b?q=80&w=995&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Modern high performance ceiling fan in a contemporary room',
    bgColor: 'from-emerald-950/20 via-neutral-900 to-neutral-950',
    accentColor: 'text-amber-400',

    // gradient:"bg-gradient-to-t from-[#0F0E0E] via-[#1A1614] to-[#2A221E]",
    gradient: "bg-transparent",
        edgeColor: '#221D1A',

    
  },
  {
    id: 'slide-cables',
    categorySlug: 'cables-wires',
    eyebrow: '100% PURE COPPER CERTIFIED CONDUCTORS',
    headline: 'Build With the Right',
    highlightText: 'Electrical Essentials',
    supportingText:
      'From certified pure copper cables and conduit wires to lamp holders and heavy-duty extension boxes, find all your project essentials in one place.',
    ctaText: 'Shop Electrical Supplies',
    ctaHref: '/shop/cables-wires',
    secondaryCtaText: 'Negotiate Bulk Price',
    secondaryCtaHref: '/shop',
    badge: '100% Pure Copper',
    badgeCategory: 'Tested NIS & Standard Breakers',
    imageUrl: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Pure copper electrical cables, coils and installation supplies',
    bgColor: 'from-amber-950/30 via-neutral-900 to-neutral-950',
    accentColor: 'text-amber-400',

      // gradient:"bg-gradient-to-t from-[#0F0E0E] via-[#1A1614] to-[#2A221E]"
    // gradient:"bg-gradient-to-b from-[#222325] via-[#2f3032] to-[#454344]",
    gradient: "bg-transparent",
        edgeColor: '#3A3B3D',

  },
];


export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
  <section
  className={`relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4 md:mt-6 rounded-2xl transition-colors `}
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
  aria-label="Electrical Store Highlights"
>
  <div className="relative text-primary-H overflow-hidden">
    
    {/* Main Slide Content Grid */}
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[480px] sm:min-h-[520px] p-4 lg:p-6 gap-8 lg:gap-12">
      
      {/* Left Column: Typography & CTAs */}
      <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
        
        {/* Eyebrow / Badge */}
      

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-textPry-H leading-[1.1]">
          {slide.headline}{' '}
          <span className="inline-block font-black underline decoration-amber-500/40 underline-offset-8">
            {slide.highlightText}
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl font-medium leading-relaxed">
          {slide.supportingText}
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
          <button className="px-6 py-3 rounded-md bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2">
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button className="px-6 py-3 rounded-md border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-white font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 cursor-pointer">
            {slide.secondaryCtaText}
          </button>
        </div>

        {/* Value Proposition Badges */}
        <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-500 ">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Upfront Listed Prices</span>
          </div>
          <span className="text-neutral-600">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Direct WhatsApp Negotiation</span>
          </div>
          <span className="text-neutral-600">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
            <span>In-Store Pickup</span>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Visual Showcase */}
      <div className="lg:col-span-6 relative flex items-center justify-end rounded-2xl overflow-hidden ">
        {/* Fixed Aspect Ratio Container preventing Layout Shift */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center overflow-hidden rounded-2xl ">
            <img
              key={slide.id}
              src={slide.imageUrl}
              alt={slide.imageAlt}
              className="h-full w-full object-contain object-center transition-all duration-700 ease-out transform-gpu will-change-transform mix-blend-multiply scale-105"
            />
        </div>
      </div>
    </div>

    {/* Carousel Controls: Arrows & Indicators */}
    <div className="relative z-20 px-4 pb-2 pt-4 flex items-center justify-center border-t border-white/5">
      {/* Slide Indicator Bars */}
      <div className="flex items-center gap-2">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}: ${s.headline}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide
                ? 'w-8 bg-amber-400 shadow-sm shadow-amber-400/50'
                : 'w-2 bg-neutral-700 hover:bg-neutral-500'
            }`}
          />
        ))}
        {/* <span className="text-xs font-mono text-neutral-400 ml-2">
          0{currentSlide + 1} / 0{totalSlides}
        </span> */}
      </div>

    
    </div>
  </div>
</section>
)
}