"use client"
import React, { useCallback, useMemo, useRef } from 'react';
import {productsData} from '../data/productsData';
import {categoriesData} from '../data/categoriesData';

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface CategoryCarouselProps {
  
}

export default function CategoryCarousel({}: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeCategories = categoriesData.filter((c) => c.isActive);



//  const getProductsByCategoryId = useCallback(
//     (categoryId: string) => {
//       return productsData.filter((p) => p.categoryId === categoryId);
//     },
//     [productsData]
//   );




  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="categories" className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" aria-labelledby="browse-category-heading">
      {/* Section Header with Eyebrow, Heading, and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1.5">
            <Layers className="h-4 w-4 text-amber-500" />
            <span>Shop By Category</span>
          </div>
          <h2 id="browse-category-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Everything You Need, Organized Simply
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Explore our electrical products by category and find exactly what you&apos;re looking for.
          </p>
        </div>

        {/* Carousel Prev/Next Controls + View All */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll Categories Left"
            className="h-9 w-9 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll Categories Right"
            className="h-9 w-9 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          
          <Link
            href="/shop"
            className="text-xs font-bold text-neutral-800 hover:text-amber-600 flex items-center gap-1 mr-2 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        
          
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {activeCategories.map((cat) => {

          return (
            <div
              key={cat.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <Link
                href={`/shop/${cat.slug}`}
                className="group flex flex-col h-full bg-white border border-neutral-200 hover:border-amber-400 overflow-hidden shadow-2xs "
              >
                {/* Visual Image Header */}
                <div className="relative aspect-12/10 w-full overflow-hidden bg-neutral-100 ">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/20 to-transparent" />

                  

                  {/* Title Overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors drop-shadow-xs">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Visual Image Header  ends-----*/}

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2  ">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                    <span>Explore Department</span>
                    <div className="h-7 w-7 rounded-full bg-neutral-100 group-hover:bg-amber-500 group-hover:text-neutral-950 flex items-center justify-center transition-all">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>)
}