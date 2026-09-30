export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-neutral-200/80 bg-white p-3 sm:p-4 space-y-3"
        >
          {/* Image Placeholder */}
          <div className="aspect-square w-full rounded-xl bg-neutral-200/80" />

          {/* Text Line Placeholders */}
          <div className="space-y-2 pt-1">
            <div className="h-3 w-1/3 bg-neutral-200 rounded-md" />
            <div className="h-4 w-4/5 bg-neutral-200 rounded-md" />
            <div className="h-4 w-1/2 bg-neutral-200 rounded-md" />
          </div>

          {/* Price & Action Placeholder */}
          <div className="pt-3 flex items-center justify-between border-t border-neutral-100">
            <div className="h-5 w-16 bg-neutral-200 rounded-md" />
            <div className="h-8 w-8 bg-neutral-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}