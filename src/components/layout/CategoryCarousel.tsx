
import {
  Layers,
} from 'lucide-react';
import CarouselWrapper from './CarouselWrapper';
import CategoryCardsContainer from './CategoryCardsContainer';



export default function CategoryCarousel({}) {
  return (
    <section id="categories" className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" aria-labelledby="browse-category-heading">
      {/* Section Header with Eyebrow, Heading, and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
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

      </div>

      {/* Horizontal Carousel Track */}
      <CarouselWrapper>
          <CategoryCardsContainer/>
      </CarouselWrapper>
    </section>
    )
}
