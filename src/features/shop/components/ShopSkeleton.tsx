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
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-xs animate-pulse flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-neutral-100 p-3">
        <div className="absolute top-3 right-3 h-5 w-16 bg-neutral-200 rounded-full" />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-neutral-200 rounded-md w-20 mb-2" />
          <div className="h-4 bg-neutral-200 rounded-md w-4/5" />
        </div>

        {/* Price & Button Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="h-2.5 bg-neutral-100 rounded-md w-12" />
            <div className="h-5 bg-neutral-200 rounded-md w-16" />
          </div>
          <div className="h-9 w-28 bg-neutral-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
      {/* Desktop Sidebar Skeleton (3 cols) */}
      <aside className="hidden lg:block lg:col-span-3 rounded-md border border-neutral-200 bg-white p-5 shadow-xs sticky top-24">
        <FilterSkeleton />
      </aside>

      {/* Product Grid Skeleton (9 cols) */}
      <main className="lg:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}