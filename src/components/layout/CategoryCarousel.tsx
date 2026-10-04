
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import CarouselWrapper from './CarouselWrapper';
import CategoryCardsContainer from './CategoryCardsContainer';
import Link from 'next/link';



export default function CategoryCarousel({}) {
  return (
    <section
      id="categories"
      className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      aria-labelledby="browse-category-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6">
        <div>
          {/* Eyebrow / Badge */}
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-1.5">
            <Layers className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Shop By Category</span>
          </div>

          {/* Heading */}
          <h2
            id="browse-category-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight"
          >
            Everything You Need, Organized Simply
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-xl font-medium leading-relaxed">
            Explore our electrical products by category and find exactly what you&apos;re looking for.
          </p>
        </div>

        {/* Right Header Action: Navigation & View All */}
        
      </div>

      {/* Horizontal Carousel Track */}
      <CarouselWrapper>
        <CategoryCardsContainer />
      </CarouselWrapper>
    </section>
    )
}
