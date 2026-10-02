
export default function ProductSkeleton({}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-pulse">
      {/* Top Product Hero Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-neutral-200 pb-12">
        
        {/* Left Column: Image Skeleton (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="aspect-square w-full rounded-2xl bg-neutral-200" />
        </div>

        {/* Right Column: Details Skeleton (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-20 bg-neutral-200 rounded-md" />
              <div className="h-4 w-28 bg-neutral-200 rounded-md" />
            </div>

            <div className="h-9 w-3/4 bg-neutral-200 rounded-lg" />
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <div className="h-3 w-32 bg-neutral-200 rounded-md" />
            <div className="h-4 w-full bg-neutral-100 rounded-md" />
            <div className="h-4 w-4/5 bg-neutral-100 rounded-md" />
          </div>

          {/* Pricing & Quantity Selector Card */}
          <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-neutral-200 rounded-md" />
              <div className="h-8 w-32 bg-neutral-200 rounded-md" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 w-16 bg-neutral-200 rounded-md" />
              <div className="h-10 w-28 bg-neutral-200 rounded-lg" />
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="h-12 w-full bg-neutral-200 rounded-xl" />

          {/* Specifications Table */}
          <div className="space-y-3 pt-2">
            <div className="h-4 w-28 bg-neutral-200 rounded-md" />
            <div className="rounded-xl border border-neutral-200/80 overflow-hidden space-y-2 p-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <div className="h-3.5 w-20 bg-neutral-200 rounded-md" />
                  <div className="h-3.5 w-12 bg-neutral-200 rounded-md" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}