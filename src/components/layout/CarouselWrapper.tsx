"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselWrapperProps {
  children: React.ReactNode;
}

export default function CarouselWrapper({ children }: CarouselWrapperProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div>
      {/* Scroll controls */}
      <div className="flex items-center gap-2 mb-4 justify-end">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="h-9 w-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="h-9 w-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Carousel Track containing Server Children */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}