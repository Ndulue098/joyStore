// components/ShopSkeleton.tsx

export function FilterSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title Header Skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
        <div className="h-4 bg-neutral-200 rounded-md w-28" />
        <div className="h-3 bg-neutral-200 rounded-md w-12" />
      </div>

      {/* Categories List Skeleton */}
      <div className="space-y-3">
        <div className="h-3 bg-neutral-200 rounded-md w-20 mb-4" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-3.5 bg-neutral-100 rounded-md w-32" />
            <div className="h-3 bg-neutral-100 rounded-md w-6" />
          </div>
        ))}
      </div>

      {/* Price Slider Skeleton */}
      <div className="space-y-3 pt-4 border-t border-neutral-100">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-neutral-200 rounded-md w-16" />
          <div className="h-3 bg-neutral-200 rounded-md w-16" />
        </div>
        <div className="h-2 bg-neutral-200 rounded-full w-full" />
        <div className="flex justify-between">
          <div className="h-2 bg-neutral-100 rounded-md w-8" />
          <div className="h-2 bg-neutral-100 rounded-md w-8" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs animate-pulse">
      {/* Image Container Aspect Ratio */}
      <div className="relative aspect-4/3 bg-neutral-100 dark:bg-neutral-800 p-3 flex items-center justify-center">
        {/* Badge Placeholder */}
        <div className="absolute top-3 right-3 h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      </div>

      {/* Card Content Placeholder */}
      <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Brand/Category Label Skeleton */}
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-md w-24" />
          {/* Title Placeholder */}
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-5/6" />
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div className="space-y-1">
            <div className="h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-md w-14" />
            <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-20" />
          </div>
          {/* Button Placeholder */}
          <div className="h-9 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function ShopSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}